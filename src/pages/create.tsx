import Head from 'next/head';
import type { FormEvent, ChangeEvent } from 'react';
import { useState } from 'react';

import styles from '@/styles/Home.module.css';
import { trpc } from '../utils/trpc';

export default function Create() {
  const [inputValue, setInputValue] = useState('');
  const { isError, isLoading, isSuccess, failureReason, mutate, data } =
    trpc.tubeStationsCreate.useMutation();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.currentTarget.value);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    mutate({ name: inputValue });
  };

  return (
    <>
      <Head>
        <title>Create</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <form onSubmit={handleSubmit}>
          <h1>Create</h1>
          <label htmlFor="stations">Station name</label>{' '}
          <input name="stations" onChange={handleChange} value={inputValue} />
          <div>
            {isLoading && <p>Loading</p>}
            {isError && <p>Error: {failureReason?.message ?? 'Error'}</p>}
            {isSuccess && (
              <p>
                <code>{JSON.stringify(data)}</code>
              </p>
            )}
          </div>
          <button type="submit">Add station</button>
        </form>
      </main>
    </>
  );
}
