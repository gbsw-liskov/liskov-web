import Input from "./Field/Input";

interface Field {
  label: string;
  name: string;
  placeholder: string;
  type: string;
}

interface AuthFormProps {
  fields: readonly Field[];
  formData: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  submitText: string;
  footerText: string;
  footerLinkText: string;
  onFooterLinkClick: () => void;
  height?: string;
}

export default function AuthForm({
  fields,
  formData,
  onChange,
  onSubmit,
  submitText,
  footerText,
  footerLinkText,
  onFooterLinkClick,
  height = "h-[411px]",
}: AuthFormProps) {
  return (
    <div
      className={`w-full ${height} mt-[45px] rounded-2xl shadow-[0_0_10px_#F2F2F2] px-[60px] pt-[55px]`}
    >
      <form onSubmit={onSubmit} className="w-[417px] flex flex-col">
        {fields.map((field) => (
          <Input
            key={field.name}
            label={field.label}
            name={field.name}
            placeholder={field.placeholder}
            type={field.type}
            value={formData[field.name] || ""}
            onChange={onChange}
          />
        ))}
        <button
          type="submit"
          className="mt-[31px] w-[417px] min-h-[47px] bg-[#58CCFF] text-white text-[16px] font-medium rounded-md hover:bg-[#4BB8E5] transition"
        >
          {submitText}
        </button>
      </form>

      <div className="flex w-full mt-[35px] justify-center">
        <p className="flex text-[14px] font-medium">
          {footerText}
          <span
            onClick={onFooterLinkClick}
            className="pl-[10px] font-bold cursor-pointer text-[#3A98FF]"
          >
            {footerLinkText}
          </span>
        </p>
      </div>
    </div>
  );
}
