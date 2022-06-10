import '../styles/styles.scss'
import Layout from '../components/layout'
import Head from 'next/head';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  return(
    <Layout>
      <Head>
        <title>EP 5th Ward | {router.pathname.replace("/","")}</title>
        <meta name="description" content="El Paso 5th ward website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
