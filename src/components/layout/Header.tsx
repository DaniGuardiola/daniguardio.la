import { NAV_LINKS, NavLinkData, SOCIAL_LINKS } from 'data'
import { useIsExactRouteActive, useIsRouteActive } from 'lib/use-route-active'

import FaviconBlinkHead from 'components/head/FaviconBlinkHead'
import Link from 'next/link'
import TypeWriter from 'components/ui/TypeWriter'
import cn from 'classnames'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useWindowFocus from 'use-window-focus'

const BLINK_INTERVAL = 1300

function useBlink () {
  const [faviconCursor, setFaviconCursor] = useState(true)
  const isWindowFocused = useWindowFocus()
  const disableBlink = !isWindowFocused

  function onCursorBlink () {
    setFaviconCursor(false)
    setTimeout(() => {
      setFaviconCursor(true)
    }, BLINK_INTERVAL / 2)
  }

  return {
    onCursorBlink,
    faviconCursor: disableBlink || faviconCursor,
    disableBlink
  }
}

function Title () {
  const { onCursorBlink, faviconCursor, disableBlink } = useBlink()
  const { pathname } = useRouter()
  const isExactRouteActive = useIsExactRouteActive('/', pathname)

  return (
    <>
      <FaviconBlinkHead cursor={faviconCursor} />
      <div className='flex-grow text-4xl font-light text-center sm:text-left'>
        <Link href='/'>
          <a
            className={cn({
              'pointer-events-none': isExactRouteActive
            })}
          >
            <TypeWriter
              text='Dani Guardiola'
              textClassName={cn({
                'hover:underline': !isExactRouteActive
              })}
              blinkInterval={BLINK_INTERVAL}
              disableBlink={disableBlink}
              onCursorBlink={onCursorBlink}
            />
          </a>
        </Link>
      </div>
    </>
  )
}

function SocialLinks () {
  return (
    <ul className='flex justify-center mt-2 sm:mt-0'>
      {SOCIAL_LINKS.map(({ title, url, className }) => (
        <li
          key={url}
          className={cn('mr-3 last:mr-0 hover:underline', className)}
        >
          <a href={url} target='_blank'>
            {title}
          </a>
        </li>
      ))}
    </ul>
  )
}

function TopBar () {
  return (
    <div className='sm:flex'>
      <Title />
      <SocialLinks />
    </div>
  )
}

function NavLink ({ title, path, subpath }: NavLinkData) {
  const { pathname } = useRouter()
  const isExactRouteActive = useIsExactRouteActive(path, pathname)
  const isRouteActive = useIsRouteActive(subpath, pathname)

  return (
    <div
      key={path}
      className={cn(
        'flex first:ml-auto sm:first:ml-0 last:mr-auto mr-4 sm:mr-6 sm:last:mr-0 text-green-900 sm:text-md text-lg',
        {
          'font-bold': isExactRouteActive || isRouteActive
        }
      )}
    >
      <div
        className={cn('overflow-hidden transition-all w-0', {
          'w-4': isExactRouteActive,
          transform: !isExactRouteActive
        })}
      >
        {'>'}
      </div>
      <Link href={path}>
        <a
          className={cn({
            'pointer-events-none': isExactRouteActive,
            'hover:underline': !isExactRouteActive
          })}
        >
          {title}
        </a>
      </Link>
    </div>
  )
}

function Nav () {
  return (
    <nav className='flex py-1 mt-1 overflow-auto font-mono text-xl sm:mt-0 sm:justify-start whitespace-nowrap'>
      {NAV_LINKS.map(NavLink)}
    </nav>
  )
}

export default function Header ({
  scrolled,
  collapsed
}: {
  scrolled: boolean
  collapsed: boolean
}) {
  return (
    <>
      <header className='sticky top-0 z-10 h-32 pointer-events-none sm:h-24'>
        <div
          className={cn(
            'bg-gray-100 border-b-2 border-gray-300 pointer-events-auto',
            'hover:h-32 sm:hover:h-24 overflow-hidden transition-all duration-300',
            {
              'shadow-md': scrolled,
              'h-16': collapsed,
              'h-32 sm:h-24': !collapsed
            }
          )}
        >
          <div className='scrollbar-fix'>
            <div className='container px-6 pt-4 pb-1 mx-auto lg:container-lg'>
              <TopBar />
              <Nav />
            </div>
          </div>
        </div>
      </header>
      <style jsx>{`
        .scrollbar-fix {
          margin-left: calc(100vw - 100%);
          margin-right: 0;
        }
      `}</style>
    </>
  )
}
