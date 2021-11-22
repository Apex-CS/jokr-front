import '../styles/globals.css'
import {GlobalProvider} from '@/components/ToolsContext'

export default function MyApp({ Component, pageProps }) {
  return (
    <>
    <GlobalProvider>
      <Component {...pageProps} />
    </GlobalProvider>
    </>
  )

}


