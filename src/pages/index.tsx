import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { trpc } from '../utils/trpc';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const stations = trpc.tubeStations.useQuery({ search: inputValue });

  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    setInputValue(event.currentTarget.value);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <form>
          <label htmlFor="stations">Station name</label>{' '}
          <input list="stations" name="stations" onChange={handleChange} value={inputValue} />
          <h2>Results</h2>
          <p>
            <output>{stations.data?.numberOfEntries}</output> entries found.
          </p>
          {Boolean(stations.data?.results.length) && (
            <ul>
              {stations.data.results.map(([key, value]) => (
                <li value={key} key={key}>
                  {value}
                </li>
              ))}
            </ul>
          )}
        </form>
      </main>
    </>
  );
}
