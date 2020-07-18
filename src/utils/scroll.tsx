// modified from: https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
// thanks @n8tb1t!

import { useRef, useLayoutEffect, useState } from 'react'
import { throttle } from 'lodash'

export type TLastScrollDirection = 'up' | 'down'

// I'll leave this here in case I ever implement SSR
const isBrowser = typeof window !== `undefined`

function getScrollPosition (target?: HTMLElement) {
  return isBrowser && target ? target.scrollTop : 0
}

export function useScroll (
  target?: HTMLElement,
  upThreshold: number = 180
): [TLastScrollDirection, boolean] {
  const position = useRef(getScrollPosition(target))
  const scrollHandler = useRef<() => void>()
  const [lastDirection, setLastDirection] = useState<TLastScrollDirection>(
    position.current === 0 ? 'up' : 'down'
  )
  const [scrolled, setScrolled] = useState(false)

  const oldTarget = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    if (!target || target === oldTarget.current) return

    // this might work if I ever change the target dinamically
    // if (scrollHandler.current)
    //   oldTarget.current?.removeEventListener('scroll', scrollHandler.current)

    oldTarget.current = target

    scrollHandler.current = throttle(() => {
      const newPosition = getScrollPosition(target)
      if (newPosition <= upThreshold) setLastDirection('up')
      else if (newPosition > position.current) setLastDirection('down')
      else if (newPosition < position.current) setLastDirection('up')
      position.current = newPosition
      setScrolled(newPosition > 5)
    }, 100)

    const { current: handler } = scrollHandler
    target.addEventListener('scroll', handler)
  }, [scrolled, target, upThreshold])

  return [lastDirection, scrolled]
}
