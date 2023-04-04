import Head from 'next/head';
import Image from 'next/image';
import { Inter, Limelight } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Tokens } from '../.mirrorful/theme';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Nav from '../Components/Nav/Nav';

export default function Home() {
  const [isLogedIn, setIsLogedIn] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isLogedIn) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [isLogedIn, router]);

  return (
    <>
      <Head>
        <title>Love Dinero</title>
        <meta
          name="description"
          content="A web app to keeptrack of your expenses."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
