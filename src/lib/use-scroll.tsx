// modified from: https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
// thanks @n8tb1t!

import { useLayoutEffect, useRef, useState } from 'react'

import { throttle } from 'lodash'

export type TLastScrollDirection = 'up' | 'down'

function getScrollPosition (target?: HTMLElement | Window) {
  if (!target) return 0
  if (target instanceof HTMLElement) return target.scrollTop
  return target.scrollY
}

export default function useScroll (
  target: HTMLElement | Window = window,
  upThreshold: number = 180,
  scrolledThreshold: number = 5
): [TLastScrollDirection, boolean] {
  const position = useRef(getScrollPosition(target))
  const scrollHandler = useRef<() => void>()
  const [lastDirection, setLastDirection] = useState<TLastScrollDirection>(
    position.current === 0 ? 'up' : 'down'
  )
  const [scrolled, setScrolled] = useState(false)
  const oldTarget = useRef<HTMLElement | Window | null>(null)

  useLayoutEffect(() => {
    if (!target || target === oldTarget.current) return

    if (scrollHandler.current)
      oldTarget.current?.removeEventListener('scroll', scrollHandler.current)

    oldTarget.current = target

    scrollHandler.current = throttle(() => {
      const newPosition = getScrollPosition(target)
      if (newPosition <= upThreshold) setLastDirection('up')
      else if (newPosition > position.current) setLastDirection('down')
      else if (newPosition < position.current) setLastDirection('up')
      position.current = newPosition
      setScrolled(newPosition > scrolledThreshold)
    }, 100)

    const { current: handler } = scrollHandler
    target.addEventListener('scroll', handler)
  }, [scrolled, target, upThreshold])

  return [lastDirection, scrolled]
}
