import React, { useEffect, useState } from 'react'

import { ReExtProvider } from '@gusmano/reext'
import { useAppStore } from './AppStore'

import ReExtData from '../config/ReExtData.json'

const REEXT_KEY = 'cGR1Zi5qeHZwZHFyQHZocWZrZC5mcnB8c3VyZ3wxNzEzNDYzMTM0OTk0'

export default function ExtProvider(props) {
  const [isReady, setReady] = useState(false)

  const { state } = useAppStore()
 
  const extDataConfig = {
    ...ReExtData,
    theme: state.theme,
    toolkit: state.toolkit,
    locale: state.locale,
  }


  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <ReExtProvider ReExtData={extDataConfig} reextkey={REEXT_KEY}>
      {isReady ? props.children : <>Loading ...</>}
    </ReExtProvider>
  )
}
