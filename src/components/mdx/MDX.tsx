import { PropsWithChildren } from 'react'
import codeStyles from 'styles/code-styles'

export default function MDX ({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <div className='max-w-2xl px-4 py-10 mx-auto prose select-text nice-scrollbar lg:prose-xl'>
        {children}
      </div>
      <style global jsx>
        {codeStyles}
      </style>
    </>
  )
}
