import React from 'react';

interface InputProps {
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

export default function Input({
  label,
  placeholder,
  name,
  value,
  onChange,
  type = "text",
}: InputProps) {

  return (
    <div className="flex flex-col w-full mb-6">
      <label className="mb-2 text-[12px] font-medium text-black">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className="pl-4 py-[14px] rounded-[5px] shadow-[0_0_10px_#F2F2F2] outline-none focus:ring-2 text-[12px]"
      />
    </div>
  );
}
