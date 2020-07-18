import React, { useState } from 'react'
import { Box, useMediaQuery } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { NavLink, Link, useLocation } from 'react-router-dom'

import Centerer from 'utils/Centerer'
import { SOCIAL, SECTIONS } from 'content/data'
import TypewriterText from 'utils/TypewriterText'

// workaround for weirdness on decoration width transition
const MOBILE_NAV_FIXED_WIDTH = 260
// a nice shadow
const BOX_SHADOW_VALUE =
  '0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12), 0 3px 1px -2px rgba(0,0,0,.2)'
// I don't like these but whatever
const HEADER_HEIGHT = 119
const HEADER_HEIGHT_COLLAPSED = 72
const MOBILE_HEADER_HEIGHT = 106
const MOBILE_HEADER_HEIGHT_COLLAPSED = 50

const useStyles = makeStyles({
  header: {
    transition:
      // I don't remember why I chose this timing and this curve, but it looks fine
      'box-shadow .28s cubic-bezier(.4,0,.2,1), height .28s cubic-bezier(.4,0,.2,1)'
  },
  title: {
    display: 'inline-block',
    textDecoration: 'none',
    textDecorationThickness: '1px', // CSS 4... ugh
    color: 'initial',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  socialLink: {
    textDecoration: 'none',
    marginRight: 16,
    '&:last-child': {
      marginRight: 0
    },
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  section: {
    color: '#006324',
    textDecoration: 'none',
    marginRight: 32,
    '&:last-child': {
      marginRight: 0
    },
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  sectionMobile: {
    marginRight: 16
  },
  activeSection: {
    fontWeight: 'bold',
    pointerEvents: 'none',
    '& .decoration': {
      width: 22
    }
  },
  activeSectionMobile: {
    '& .decoration': {
      width: 16
    }
  },
  sectionDecoration: {
    transition: 'width 0.2s'
  }
})

export default function Header ({
  shadow,
  collapsed: collapsedProp
}: {
  collapsed: boolean
  shadow: boolean
}) {
  const [hovering, setHovering] = useState(false)
  const classes = useStyles()
  const mobile = useMediaQuery('(max-width: 550px)', { noSsr: true })
  const location = useLocation()
  const collapsed = collapsedProp && !hovering

  const socialLinks = SOCIAL.map(({ title, url, color }, i) => (
    <a
      key={i}
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className={classes.socialLink}
      style={{ color }}
    >
      {title}
    </a>
  ))
  return (
    <Box
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      component='header'
      borderBottom='2px solid #0000001a'
      bgcolor='#f7f7f7'
      position='fixed'
      top={0}
      left={0}
      overflow='hidden'
      zIndex={1}
      width='100%'
      height={
        collapsed
          ? mobile
            ? MOBILE_HEADER_HEIGHT_COLLAPSED
            : HEADER_HEIGHT_COLLAPSED
          : mobile
          ? MOBILE_HEADER_HEIGHT
          : HEADER_HEIGHT
      }
      boxShadow={shadow ? BOX_SHADOW_VALUE : ''}
      className={classes.header}
    >
      <Centerer>
        <Box width='100%' display='flex'>
          <Box
            component='span'
            paddingLeft={2}
            paddingTop={mobile ? '4px' : 2}
            whiteSpace='nowrap'
            lineHeight='42px'
            textAlign={mobile ? 'center' : 'left'}
            margin={0}
            fontSize={mobile ? 34 : 42}
            fontWeight={300}
            flexGrow={1}
          >
            <Link to='/' className={classes.title}>
              <TypewriterText text='Dani Guardiola' />
            </Link>
          </Box>
          <Box marginTop={2} marginRight={2}>
            {!mobile && socialLinks}
          </Box>
        </Box>
        {mobile && (
          <Box textAlign='center' paddingTop='2px'>
            {socialLinks}
          </Box>
        )}
        <Box
          paddingY={mobile ? 1 : 2}
          paddingX={2}
          color='#006324'
          fontSize={mobile ? 16 : 22}
          fontFamily='"Roboto Mono", monospace'
          whiteSpace='nowrap'
          display='flex'
          justifyContent={mobile ? 'center' : 'left'}
        >
          <Box component='span' flexShrink={0} width={mobile ? 30 : 40}>
            {'//'}
          </Box>
          <Box
            component='nav'
            display='inline'
            overflow='auto'
            width={mobile ? MOBILE_NAV_FIXED_WIDTH : 'initial'}
          >
            {SECTIONS.map(({ title, path, subpath }, i) => (
              <NavLink
                key={i}
                to={path}
                style={
                  location.pathname.startsWith(`/${subpath}/`)
                    ? {
                        fontWeight: 'bold'
                      }
                    : {}
                }
                className={`${classes.section} ${
                  mobile ? classes.sectionMobile : ''
                }`}
                activeClassName={`${classes.activeSection} ${
                  mobile ? classes.activeSectionMobile : ''
                }`}
                exact
              >
                <span>
                  <Box
                    component='span'
                    width={0}
                    display='inline-block'
                    overflow='hidden'
                    lineHeight={mobile ? '14px' : '17px'}
                    className={`${classes.sectionDecoration} decoration`}
                  >
                    {'> '}
                  </Box>
                  {title}
                </span>
              </NavLink>
            ))}
          </Box>
        </Box>
      </Centerer>
    </Box>
  )
}
