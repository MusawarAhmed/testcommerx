import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required, width }) => {
  return (
    <Width width={width}>
      <label htmlFor={name} className="text-[16px] font-sans text-[#8F8F8F] block mb-2">
        {label}
        {required && '*'}
      </label>
      <input
        defaultValue={defaultValue}
        id={name}
        type="text"
        {...register(name, { required })}
        className="w-full border-b border-gray-300 py-2 focus:border-[#D02030] outline-none transition-colors text-black bg-transparent"
      />
      {errors[name] && <Error name={name} />}
    </Width>
  )
}
