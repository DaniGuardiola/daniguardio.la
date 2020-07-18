import React, { useRef, useState, useEffect } from 'react'
import { Box } from '@material-ui/core'

export default function TypewriterText ({
  text,
  blink = true,
  delay = 0,
  charInterval = 80,
  spaceWait = 150,
  delayCursorInterval = 700,
  cursorInterval = 700,
  cursorWidth = 18,
  cursorHeight = 4,
  cursorMargin = 4
}: {
  text: string
  blink?: boolean
  delay?: number
  charInterval?: number
  spaceWait?: number
  delayCursorInterval?: number
  cursorInterval?: number
  cursorWidth?: number
  cursorHeight?: number
  cursorMargin?: number
}) {
  const [chars, setChars] = useState(text.split(''))
  const [currentText, setCurrentText] = useState('')
  const [cursor, setCursor] = useState(true)
  const [delayStatus, setDelayStatus] = useState<
    'initial' | 'delaying' | 'done'
  >('initial')
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cursorTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    // add the next char to the text
    function pushChar () {
      // if no chars left, switch to cursor blink animation
      if (!chars.length) return blink && toggleCursor(true)

      // push char into text
      const nextChar = chars.shift()
      setChars(chars)
      setCurrentText(currentText => `${currentText}${nextChar}`)

      // recursive timeout
      timeoutRef.current = setTimeout(
        () => pushChar(),
        charInterval + (chars[0] === ' ' ? spaceWait : 0)
      )
    }

    // cursor blink animation
    function toggleCursor (initial = false, delay = false) {
      !initial && setCursor(cursor => !cursor)
      cursorTimeout.current = setTimeout(
        () => toggleCursor(false, delay),
        delay ? delayCursorInterval : cursorInterval
      )
    }

    // start with delay
    function startDelay (delay: number) {
      setDelayStatus('delaying')
      toggleCursor(true, true)
      setTimeout(() => {
        setDelayStatus('done')
        cursorTimeout.current && clearTimeout(cursorTimeout.current)
        cursorTimeout.current = null
        setCursor(true)
        pushChar()
      }, delay)
    }

    // initialize animation
    if (delayStatus === 'delaying') return
    if (delay && delayStatus === 'initial') startDelay(delay)
    else if (!delay && !currentText) pushChar()
  }, [
    chars,
    currentText,
    charInterval,
    cursorInterval,
    spaceWait,
    delay,
    blink,
    delayStatus,
    delayCursorInterval
  ])

  return (
    <Box maxWidth='fit-content' whiteSpace='nowrap'>
      <span>{currentText}</span>
      <Box
        display='inline-block'
        width={cursorWidth}
        marginLeft={`${cursorMargin}px`}
        borderBottom={`${cursorHeight}px solid #000`}
        style={{
          opacity: cursor ? 1 : 0
        }}
      />
    </Box>
  )
}
