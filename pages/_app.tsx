import '../styles/globals.less'
import type { AppProps } from 'next/app'
import '../styles/main.less'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
