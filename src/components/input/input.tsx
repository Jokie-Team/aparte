"use client";

import React, { useState } from "react";

interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "onBlur"
  > {
  className?: string;
  disabled?: boolean;
  iconComponent?: React.ReactElement;
  id: string;
  label: string;
  maxLength?: number;
  onBlur?: (value: string) => void;
  onChange: (value: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste?: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  tooltipText?: string;
  valid?: boolean;
  required?: boolean;
  value?: string;
}

export default function Input({
  className,
  disabled,
  iconComponent,
  id,
  label,
  maxLength,
  onBlur,
  onChange,
  onPaste,
  pattern,
  placeholder,
  tooltipText,
  valid,
  value,
  required = true,
}: InputProps) {
  const [htmlValid, setHtmlValid] = useState(true);
  const [hasFocus, setHasFocus] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;
    setHtmlValid(target.checkValidity());

    onChange(target.value, e);
  }

  function handleBlur(e: React.FormEvent<EventTarget>) {
    setHasFocus(false);

    const target = e.target as HTMLInputElement;
    setHtmlValid(target.checkValidity());

    if (onBlur) onBlur(target.value);
  }

  function handleFocus() {
    setHasFocus(true);
  }

  const hasError = !!(htmlValid === false || valid === false);

  const inputProps = {
    id,
    name: id,
    "data-testid": id,
    onBlur: handleBlur,
    onChange: handleChange,
    onFocus: handleFocus,
    onPaste,
    value,
    pattern,
    placeholder,
    disabled,
    type: "text",
  };

  return (
    <div className="pt-8">
      <input
        className="font-neue placeholder-black w-full py-2 border-b border-1 border-black"
        {...inputProps}
        maxLength={maxLength}
        placeholder={`${label}${required && "*"}`}
        required={required}
      />
    </div>
  );
}
