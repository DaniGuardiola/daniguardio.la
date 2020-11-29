import Layout from 'components/layout/Layout'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function BlogRedirection () {
  const { replace } = useRouter()
  useEffect(() => {
    replace('/')
  })
  return null
}

BlogRedirection.Layout = Layout
