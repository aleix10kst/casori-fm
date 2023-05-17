import { ComponentPropsWithoutRef } from 'react';

export type ButtonProps = ComponentPropsWithoutRef<'button'>;

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-full border border-black p-2 text-lg font-bold ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
