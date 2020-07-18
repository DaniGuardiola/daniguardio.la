import React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import originalPrismTheme from 'prism-react-renderer/themes/nightOwl'
// @ts-ignore (hacky but it works)
import Prism from 'prism-react-renderer/prism'
;(typeof global !== 'undefined' ? global : window).Prism = Prism

const PRISM_THEME = {
  ...originalPrismTheme,
  plain: {
    ...originalPrismTheme.plain,
    backgroundColor: 'transparent'
  }
}

require('prismjs/components/prism-prolog')

export default function CodeBlock ({
  children,
  className = ''
}: React.HTMLProps<HTMLElement>) {
  const language = className.replace(/language-/, '') as Language
  const code = children as string
  return className ? (
    <Highlight
      {...defaultProps}
      code={code.trim()}
      language={language}
      theme={PRISM_THEME}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={className} style={{ ...style, padding: '20px' }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  ) : (
    <pre style={{ padding: '20px' }}>{code}</pre>
  )
}
