import { ButtonHTMLAttributes } from 'react'
type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const TextButton = (props: Props) => {
  return (
    <button
      {...props}
      className={`active:bg-primary-press-press rounded-oval bg-primary px-24 py-8 font-bold text-white hover:bg-primary-hover disabled:bg-primary-disabled  ${props.className}`}
    >
      {props.children}
    </button>
  )
}
