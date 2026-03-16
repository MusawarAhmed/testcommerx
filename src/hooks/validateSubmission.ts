import { CollectionBeforeValidateHook } from 'payload'

export const validateSubmission: CollectionBeforeValidateHook = async ({
  data,
  req,
  operation,
}) => {
  if (operation !== 'create' || !data) return data

  const submissionData = data.submissionData as { field: string; value: unknown }[]

  if (!submissionData) return data

  // Extract Honeypot and Turnstile tokens
  // Check both underscored and non-underscored for robustness
  const hpValue = submissionData.find((d) => ['_hp_website', 'hp_website'].includes(d.field))?.value
  const turnstileToken = submissionData.find((d) => ['_turnstileToken', 'turnstileToken'].includes(d.field))?.value

  // 1. Check Honeypot
  if (hpValue) {
    req.payload.logger.warn('Bot detected by Honeypot')
    throw new Error('Robot detected. Submission rejected.')
  }

  // 2. Check Cloudflare Turnstile
  const secretKey = process.env.TURNSTILE_SECRET_KEY
  
  if (!secretKey) {
    req.payload.logger.warn('TURNSTILE_SECRET_KEY is missing in environment. Skipping Turnstile validation.')
    // Fallback: still remove the internal fields before saving
    data.submissionData = submissionData.filter(
      (d) => !['_turnstileToken', '_hp_website'].includes(d.field)
    )
    return data
  }

  if (typeof turnstileToken !== 'string') {
    throw new Error('Cloudflare Turnstile verification failed: Missing token.')
  }

  try {
    const formData = new FormData()
    formData.append('secret', secretKey)
    formData.append('response', turnstileToken)
    
    // In Payload 3, req is a standard Request object (Web API)
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip')
    if (clientIp) {
      formData.append('remoteip', clientIp)
    }

    const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      body: formData,
      method: 'POST',
    })

    const outcome = await result.json()

    if (!outcome.success) {
      req.payload.logger.error({ msg: 'Turnstile verification failed', outcome })
      throw new Error('Security verification failed. Please try again.')
    }
  } catch (err) {
    req.payload.logger.error({ msg: 'Error during Turnstile verification', err })
    throw new Error('An error occurred during verification.')
  }

  // Remove internal fields before saving to DB
  data.submissionData = submissionData.filter(
    (d) => !['_turnstileToken', '_hp_website'].includes(d.field)
  )

  return data
}
