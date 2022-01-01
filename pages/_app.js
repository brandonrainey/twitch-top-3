import '../styles/globals.css'
import ErrorBoundary from '../components/ErrorBoundary'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
