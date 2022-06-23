import Head from 'next/head';

export default function PageHead(props) {
  return(
  <Head>
    <title>EP 5th Ward | {props.nav.name}</title>
  </Head>
  );
}