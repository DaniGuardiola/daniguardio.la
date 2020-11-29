import { useEffect, useRef, useState } from 'react'

import cn from 'classnames'

const DEFAULT_INTERVAL = 100
const DEFAULT_BLINK_INTERVAL = 1300
const DEFAULT_WAIT = 1800
const DEFAULT_CURSOR = '_'

const emptyChar = '‎' // this is an empty character, prevents height changes

function delay (time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

export default function TypeWriter ({
  text,
  charInterval,
  blinkInterval,
  wait,
  cursor,
  emptyString, // default: false
  whitespace, // default: false
  textClassName,
  cursorClassName,
  disableBlink,
  onCursorBlink
}: {
  text: string
  charInterval?: number
  blinkInterval?: number
  wait?: number
  cursor?: string
  emptyString?: boolean
  whitespace?: boolean
  textClassName?: string
  cursorClassName?: string
  disableBlink?: boolean
  onCursorBlink?: () => void
}) {
  const mounted = useRef(true)
  const [currentText, setCurrentText] = useState(emptyString ? '' : emptyChar)
  const [blinkingCursor, setBlinkingCursor] = useState(true)
  const cursorRef = useRef<HTMLSpanElement>(null)

  async function typeText (remainingChars: number): Promise<void> {
    // recursive!
    if (!remainingChars || !mounted.current) return
    setBlinkingCursor(false)
    setCurrentText(text.substring(0, text.length - remainingChars + 1))
    const nextChar = text[text.length - remainingChars]
    if (!whitespace && !/\s/.test(nextChar))
      await delay(charInterval || DEFAULT_INTERVAL)
    return typeText(remainingChars - 1)
  }
  async function typeWriterAnimation () {
    await delay(wait !== undefined ? wait : DEFAULT_WAIT)
    await typeText(text.length)
    if (mounted.current) setBlinkingCursor(true)
  }

  function bindCursorAnimationEvents () {
    if (!cursorRef.current)
      throw new Error('Cursor element ref is not available')
    if (onCursorBlink) {
      cursorRef.current.addEventListener('animationstart', onCursorBlink)
      cursorRef.current.addEventListener('animationiteration', onCursorBlink)
    }
  }

  useEffect(() => {
    typeWriterAnimation()
    bindCursorAnimationEvents()

    return () => {
      mounted.current = false
    }
  }, [])
  return (
    <>
      <span className={textClassName}>{currentText}</span>
      <span
        ref={cursorRef}
        className={cn(cursorClassName, {
          blinking: blinkingCursor && !disableBlink
        })}
      >
        {cursor || DEFAULT_CURSOR}
      </span>
      <style jsx>{`
        .blinking {
          animation: blink ${blinkInterval || DEFAULT_BLINK_INTERVAL}ms
            ${(blinkInterval || DEFAULT_BLINK_INTERVAL) / 2}ms infinite step-end;
        }
        @keyframes blink {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </>
  )
}
