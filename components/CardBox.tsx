import React, { ReactNode } from 'react'
import CardBoxComponentBody from './CardBoxComponentBody'
import CardBoxComponentFooter from './CardBoxComponentFooter'

type Props = {
  rounded?: string,
  flex?: string,
  className?: string,
  hasComponentLayout?: boolean,
  hasTable?: boolean,
  isForm?: boolean,
  isHoverable?: boolean,
  isModal?: boolean,
  children: ReactNode,
  footer?: ReactNode
}

export default function CardBox({
  rounded = 'rounded-2xl',
  flex = 'flex-col',
  className = '',
  hasComponentLayout=false,
  hasTable=false,
  isForm=false,
  isHoverable=false,
  isModal=false,
  children,
  footer,
}: Props) {
  const componentClass = [
    'bg-white flex',
    className,
    rounded,
    flex,
    isModal ? 'dark:bg-slate-900' : 'dark:bg-slate-900/70',
  ]

  if (isHoverable) {
    componentClass.push('hover:shadow-lg transition-shadow duration-500')
  }

  return React.createElement(
    isForm ? 'form' : 'div',
    { className: componentClass.join(' ') },
    hasComponentLayout ? (
      children
    ) : (
      <>
        <CardBoxComponentBody noPadding={hasTable}>{children}</CardBoxComponentBody>
        {footer && <CardBoxComponentFooter>{footer}</CardBoxComponentFooter>}
      </>
    )
  )
}