import React, { useState, ReactNode, useEffect } from 'react'
import { Box, makeStyles } from '@material-ui/core'

const IMAGES = {
  dino: '/img/dino.gif'
}

const useStyles = makeStyles({
  content: {
    opacity: 0,
    transition: 'opacity 1.5s ease-in 3s',
    '&.on': {
      opacity: 1
    }
  }
})

export default function Trouble ({
  fadeIn = false,
  image,
  children
}: {
  fadeIn?: boolean
  image: 'dino'
  children: ReactNode
}) {
  const [visible, setVisible] = useState(!fadeIn)
  const classes = useStyles()

  useEffect(() => {
    !visible && setVisible(true)
  }, [visible])

  return (
    <Box
      display='flex'
      width='100%'
      height='100%'
      id='lol'
      flexDirection='column'
    >
      <Box flexGrow={1} />
      <Box display='flex' width='100%' textAlign='center'>
        <Box flexGrow={1} />
        <Box className={`${classes.content} ${visible ? 'on' : ''}`}>
          <img
            src={IMAGES[image]}
            alt='Troubles, trouble, troubles, troubles is all in the world I see'
            style={{ maxWidth: '100%', flex: 0 }}
          />
          <Box fontSize={23} marginTop={2}>
            {children}
          </Box>
        </Box>
        <Box flexGrow={1} />
      </Box>
      <Box flexGrow={1} />
    </Box>
  )
}
