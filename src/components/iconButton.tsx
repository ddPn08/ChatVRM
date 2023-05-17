import { KnownIconType } from '@charcoal-ui/icons'
import { ButtonHTMLAttributes } from 'react'
type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconName: keyof KnownIconType
  isProcessing: boolean
  label?: string
}

export const IconButton = ({ iconName, isProcessing, label, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={`mr-2 inline-flex items-center rounded-16 bg-primary p-8 text-center text-sm text-white hover:bg-primary-hover active:bg-primary-press disabled:bg-primary-disabled
        ${rest.className}
      `}
    >
      {isProcessing ? <pixiv-icon name="24/Dot" scale="1"></pixiv-icon> : <pixiv-icon name={iconName} scale="1"></pixiv-icon>}
      {label && <div className="mx-4 font-M_PLUS_2 font-bold">{label}</div>}
    </button>
  )
}
