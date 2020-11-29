import { useEffect, useState } from 'react'

export function useIsExactRouteActive (target?: string, pathname?: string) {
  const [isExactRouteActive, setIsExactRouteActive] = useState(false)

  useEffect(() => {
    if (pathname === undefined || target === undefined)
      return setIsExactRouteActive(false)
    if (pathname === target) setIsExactRouteActive(true)
    else setIsExactRouteActive(false)
  }, [target, pathname])
  return isExactRouteActive
}

export function useIsRouteActive (target?: string, pathname?: string) {
  const [isRouteActive, setIsRouteActive] = useState(false)

  useEffect(() => {
    if (pathname === undefined || target === undefined)
      return setIsRouteActive(false)
    if (pathname.startsWith(target)) setIsRouteActive(true)
    else setIsRouteActive(false)
  }, [target, pathname])
  return isRouteActive
}
