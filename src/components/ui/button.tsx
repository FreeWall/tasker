import cn from 'classnames';
import React, { ButtonHTMLAttributes } from 'react';
import { CgSpinner } from 'react-icons/cg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = 'block', children, disabled, loading, ...rest }, ref) => {
    return (
      <button
        className={cn(
          'relative flex select-none items-center rounded border-conversion bg-conversion p-2.5 px-4 font-bold text-white transition-[padding] duration-300 hover:border-conversionHover hover:bg-conversionHover active:brightness-90',
          {
            'pointer-events-none bg-conversionHover pr-12 brightness-75':
              loading,
            'pointer-events-none brightness-75 grayscale': disabled,
          },
          className,
        )}
        ref={ref}
        {...rest}
      >
        {children}
        <CgSpinner
          className={cn(
            'absolute right-4 animate-spin text-body transition-[opacity] duration-300',
            {
              'opacity-100': loading,
              'opacity-0': !loading,
            },
          )}
          size={24}
        />
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
