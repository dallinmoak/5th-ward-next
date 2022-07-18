import '../styles/styles.scss'
import Layout from '../components/layout'
import Head from 'next/head';

import { useState } from 'react';

import manageIncludeList from '../components/cal/manage-include-list';

function MyApp({ Component, pageProps }) {
  const [ includeList,  updateIncludeList ] = useState(manageIncludeList.initialIncludeList());
  const [ modal, setModal ] = useState(false);
  return(
    <Layout
      includeList={includeList}
      updateIncludeList={updateIncludeList}
      modal={modal}
    >
      <Head>
        <meta name="description" content="El Paso 5th ward website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps}
        includeList={includeList}
        setModal={setModal}
      />
    </Layout>
  )
}

export default MyApp