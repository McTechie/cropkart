// type imports
import type { AppProps } from 'next/app'

// named imports
import { Nunito_Sans } from 'next/font/google'
import { Provider } from 'react-redux'
import { store } from '../redux/store'

// style imports
import '../styles/globals.css'

// font style for the dashboard
const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--nunito-font',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className={`${nunito.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </Provider>
  )
}

export default MyApp
