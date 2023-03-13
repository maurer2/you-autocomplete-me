import Head from 'next/head';
import type { MouseEvent } from 'react';

import styles from '@/styles/Home.module.css';
import ResultsTable from '@/components/ResultsTable';
import { trpc } from '../utils/trpc';

export default function Read() {
  const { isError, isLoading, isSuccess, failureReason, refetch, data } =
    trpc.tubeStationsRead.useQuery();

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    refetch().catch(() => {});
  };

  return (
    <>
      <Head>
        <title>Delete</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Read</h1>
        <div>
          {isLoading && <p>Loading</p>}
          {isError && <p>Error: {failureReason?.message ?? 'Error'}</p>}
          {isSuccess && <ResultsTable data={data} />}
        </div>
        <button type="button" onClick={handleClick}>
          List values
        </button>
      </main>
    </>
  );
}
