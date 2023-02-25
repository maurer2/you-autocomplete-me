import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { trpc } from '../utils/trpc';

export default function Home() {
  const hello = trpc.hello.useQuery({ text: 'client' });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        {!hello.data ? (
          <div>Loading</div>
        ) : (
          <div>
            <code>
              <pre>{JSON.stringify(hello.data)}</pre>
            </code>
          </div>
        )}
      </main>
    </>
  );
}
