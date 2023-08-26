import React, { InputHTMLAttributes, useId } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = 'block', name, type = 'text', label, ...rest }, ref) => {
    const id = useId();

    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={id}
            className="mb-3 block font-semibold leading-none"
          >
            {label}
          </label>
        )}
        <input
          id={id}
          name={name}
          type={type}
          ref={ref}
          className="bg-darker p-2 px-3 mr-4 w-full border-2 border-darker focus:border-conversion rounded outline-none font-semibold placeholder:text-[#858688]"
          {...rest}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
