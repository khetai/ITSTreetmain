import React from 'react'
import BuildPcSection from '../../components/BuildPcComponents/BuildPcSection'
import { Helmet } from 'react-helmet-async'

function BuildPc() {
  return (
    <>
    <Helmet>
      <title>Build Your PC</title>
    </Helmet>
    <main className="container">
    <BuildPcSection/>
    </main></>
  )
}

export default BuildPc