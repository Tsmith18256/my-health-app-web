import { ComponentProps } from 'react';


export const Button = (props: IButtonProps) => {
  return (
    <button className='bg-gray-700 p-4 w-full'>
      {props.children}
    </button>
  );
};

export interface IButtonProps {
  children: ComponentProps<'button'>['children'];
}
