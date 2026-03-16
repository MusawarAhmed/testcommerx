'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

import { fields } from './fields'
import { Turnstile } from '@marsidev/react-turnstile'
import { getClientSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: DefaultTypedEditorState
}

export const Width: React.FC<{
  children: React.ReactNode
  className?: string
  width?: number | string
}> = ({ children, className, width }) => {
  return (
    <div
      className={cn('w-full px-4 mb-8', className)}
      style={{ width: width ? `${width}%` : '100%' }}
    >
      {children}
    </div>
  )
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm<any>({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)
  const router = useRouter()

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  const onSubmit = useCallback(
    (data: any) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend: any[] = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // Add Turnstile token and Honeypot if available
        if (turnstileToken) {
          dataToSend.push({
            field: '_turnstileToken',
            value: turnstileToken,
          })
        }

        // Get Honeypot value (it's a ref or we can just grab it from the form data if we register it)
        // For simplicity, let's just grab it from the form methods
        const honeypotValue = formMethods.getValues('hp_website')
        if (honeypotValue) {
          dataToSend.push({
            field: '_hp_website',
            value: honeypotValue,
          })
        }

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType, turnstileToken, formMethods],
  )

  return (
    <div className="w-full">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <div className="bg-[#111111] border border-white/10 p-10 rounded-3xl text-center animate-in fade-in zoom-in duration-500 my-8 shadow-2xl">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D02030]/20 text-[#D02030] mx-auto">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <RichText
                data={confirmationMessage}
                className="text-white prose-h1:text-white prose-p:text-gray-300 mx-auto"
              />
            </div>
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && (
            <div className="text-red-500 mb-4">{`${error.status || '500'}: ${error.message || ''}`}</div>
          )}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-wrap -mx-4">
                {/* Honeypot field - hidden from users */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input
                    type="text"
                    autoComplete="off"
                    {...register('hp_website')}
                    tabIndex={-1}
                  />
                </div>

                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <Field
                          key={index}
                          form={formFromProps}
                          {...field}
                          {...formMethods}
                          control={control}
                          errors={errors}
                          register={register}
                        />
                      )
                    }
                    return null
                  })}
              </div>

              {siteKey && (
                <div className="pt-4 px-4 overflow-hidden">
                  <Turnstile
                    siteKey={siteKey}
                    onSuccess={(token) => setTurnstileToken(token)}
                    onExpire={() => setTurnstileToken(null)}
                    onError={() => setTurnstileToken(null)}
                    options={{
                      theme: 'dark',
                    }}
                  />
                </div>
              )}

              <div className="pt-8">
                <button
                  form={formID}
                  type="submit"
                  disabled={siteKey ? !turnstileToken || isLoading : isLoading}
                  className={cn(
                    'bg-[#D02030] text-white px-10 py-3 rounded-full font-cal text-[14px] cursor-pointer hover:bg-[#B01A28] transition-all transform hover:scale-105',
                    siteKey && !turnstileToken && 'opacity-50 cursor-not-allowed hover:scale-100',
                    isLoading && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {isLoading ? 'Sending...' : submitButtonLabel}
                </button>
              </div>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}
