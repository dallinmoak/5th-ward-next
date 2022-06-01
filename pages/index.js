import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>El Paso 5th Ward</title>
        <meta name="description" content="El Paso 5th ward website" />
        <link rel="icon" href="/epfav.ico" />
      </Head>

      <main>
        <h1>
          Hello world
        </h1>
      </main>

      <footer>
          footer
      </footer>
    </div>
  )
}
