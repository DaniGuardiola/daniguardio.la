import React from 'react'
import { FallbackProps } from 'react-error-boundary'
import { makeStyles } from '@material-ui/core'

import Trouble from './Trouble'

const useStyles = makeStyles({
  button: {
    marginTop: 8,
    marginBottom: 16,
    border: '2px solid #000',
    borderRadius: 4,
    padding: '8px 16px',
    fontSize: 20,
    background: '#000',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  info: {
    overflow: 'auto',
    whiteSpace: 'pre-wrap',
    maxWidth: '100%',
    textAlign: 'left',
    maxHeight: 126,
    fontSize: 13,
    userSelect: 'all'
  }
})

export default function ErrorFallback ({
  error,
  componentStack,
  resetErrorBoundary
}: FallbackProps) {
  const classes = useStyles()
  if (error?.name === 'ChunkLoadError')
    return (
      <Trouble image='dino'>
        Failed to load the page :(
        <br />
        Are you connected to the internet?
        <br />
        <button
          onClick={() => window.location.reload()}
          className={classes.button}
        >
          Reload!
        </button>
      </Trouble>
    )
  return (
    <Trouble image='dino'>
      Ouch! Some error happened :(
      <br />
      Could you send me this by email?
      <br />
      <pre className={classes.info}>
        {window.location.href}
        <br />
        {document.referrer}
        <br />
        <br />
        {error?.name ?? 'undefined!!1'}
        <br />
        {error?.message ?? 'undefined!!1'}
        {componentStack}
      </pre>
      <button onClick={resetErrorBoundary} className={classes.button}>
        Reload!
      </button>
    </Trouble>
  )
}
