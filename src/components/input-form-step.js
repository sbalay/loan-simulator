import React from "react";
import { useForm } from "react-hook-form";

/**
 * Form to request a single value
 */
export function InputFormStep({ label, onSubmit, initialValue, errorMessages }) {
  const { register, handleSubmit, errors } = useForm();

  return <form onSubmit={handleSubmit((form) => onSubmit(form.value))}></form>;
}
