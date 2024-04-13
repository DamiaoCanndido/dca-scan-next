import { ComponentProps } from 'react';

interface IconButtonProps extends ComponentProps<'button'> {}

export const IconButton = (props: IconButtonProps) => {
  return (
    <button
      {...props}
      className="border bg-green-100 border-green-600 rounded-md p-1.5"
    />
  );
};
