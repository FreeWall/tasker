import cn from 'classnames';
import React, { InputHTMLAttributes, useId } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = 'block', name, type = 'text', label, ...rest }, ref) => {
    const id = useId();

    return (
      <div className={cn('relative h-12', className)}>
        <input
          id={id}
          name={name}
          type={type}
          ref={ref}
          className="peer mr-4 h-full w-full rounded border-2 border-darker bg-darker p-2 px-3 outline-none"
          placeholder=""
          {...rest}
        />
        {label && (
          <label
            htmlFor={id}
            className="before:content[' '] after:content[' '] before:border-blue-gray-200 after:border-blue-gray-200 peer-placeholder-shown:text-blue-gray-500 peer-disabled:peer-placeholder-shown:text-blue-gray-500 pointer-events-none absolute -top-1.5 left-0 flex h-full w-full select-none text-[13px] font-normal leading-[0.75] text-placeholder transition-all before:pointer-events-none before:mr-1 before:mt-[6.5px] before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:transition-all after:pointer-events-none after:ml-1 after:mt-[6.5px] after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:transition-all peer-placeholder-shown:text-base peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[13px] peer-focus:leading-[0.75] peer-focus:text-conversionText peer-disabled:text-transparent"
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
