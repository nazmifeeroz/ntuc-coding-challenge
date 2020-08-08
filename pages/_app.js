import React from 'react'
import Head from 'next/head'
import { createGlobalStyle } from 'styled-components'

const App = ({ Component, ...pageProps }) => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyles />
      <Component {...pageProps} />
    </>
  )
}

const GlobalStyles = createGlobalStyle`
  body {
    font-family: 'Open Sans';
    margin: 0;
  }
`

export default App
