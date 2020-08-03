import React from "react";
import { useForm } from "react-hook-form";
import { Validate } from "react-hook-form/dist/types/form";

/**
 * Component that uses a full-screen input to request a single value.
 */
export function InputFormStep({
  label,
  onSubmit,
  defaultValue,
  validate,
}: {
  validate?: Validate;
  label: string;
  onSubmit: (val: string) => void;
  defaultValue?: string;
}) {
  const { register, handleSubmit, errors } = useForm<{ value: string }>();

  return (
    <form onSubmit={handleSubmit((form) => onSubmit(form.value))}>
      <p>{label}</p>
      <input defaultValue={defaultValue} name="value" type="text" ref={register({ validate })} />
      {errors.value?.message && <span>{errors.value.message}</span>}
    </form>
  );
}
