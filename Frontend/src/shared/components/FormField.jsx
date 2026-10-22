import React from "react";

const FormField = ({
  label,
  icon: Icon,
  id,
  name,
  type = "text",
  placeholder,
  autoComplete,
  register,
  required = true,
}) => {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-slate-300">
        {label}
      </label>

      <div className="relative">
        {Icon && (
          <Icon
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            size={18}
          />
        )}

        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register(name, { required })}
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-600 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10"
        />
      </div>
    </div>
  );
};

export default FormField;
