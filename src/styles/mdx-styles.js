const h = (s = '') => [1, 2, 3, 4, 5, 6].map(n => `h${n}${s}`).join(', ')
module.exports = theme => ({
  DEFAULT: {
    css: {
      wordBreak: 'break-word',
      nav: {
        backgroundColor: '#1a281e',
        borderRadius: '0.5rem',
        lineHeight: '1.25rem',
        paddingTop: '0.25rem',
        paddingBottom: '0.25rem',
        paddingLeft: '2rem',
        paddingRight: '2rem',
        marginBottom: '2rem',
        marginTop: '-7rem !important'
      },
      'nav p': {
        fontSize: '1rem',
        fontFamily: theme('fontFamily.mono'),
        color: theme('colors.white'),
        fontWeight: 'bold'
      },
      'nav ol > li': {
        paddingLeft: '1em',
        fontSize: '1rem'
      },
      'nav ol > li > a': {
        fontFamily: theme('fontFamily.mono'),
        color: theme('colors.white')
      },
      'nav ol > li:before': {
        color: theme('colors.white'),
        opacity: 0.5,
        fontWeight: 'bold'
      },
      'nav > ol > li:before': {
        content: '">"',
        top: -1
      },
      'nav > ol > li li:before': {
        content: '"-"'
      },
      a: {
        color: theme('colors.blue.800'),
        textDecoration: 'none'
      },
      'a:hover': {
        textDecoration: 'underline'
      },
      blockquote: {
        fontStyle: 'initial',
        borderLeftColor: theme('colors.gray.500'),
        backgroundColor: theme('colors.gray.100'),
        paddingRight: '1em',
        paddingTop: '0.125em',
        paddingBottom: '0.125em',
        borderRadius: '0 0.5rem 0.5rem 0'
      },
      'blockquote p:first-of-type::before': {
        content: ''
      },
      'blockquote p:last-of-type::after': {
        content: ''
      },
      code: {
        backgroundColor: theme('colors.gray.200'),
        paddingLeft: '0.25rem',
        paddingRight: '0.25rem',
        borderRadius: '0.5rem'
      },
      'code::before': {
        content: ''
      },
      'code::after': {
        content: ''
      },
      [h()]: {
        scrollMarginTop: '5rem'
      },
      [h(' > a')]: {
        color: theme('colors.gray.900'),
        position: 'relative'
      },
      img: {
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    }
  },
  xl: {
    css: {
      [h(' > a:hover:before')]: {
        content: '"#"',
        position: 'absolute',
        color: theme('colors.gray.600'),
        left: '-0.75em'
      },
      'nav ol > li': {
        fontSize: '1.125rem'
      }
    }
  }
})
