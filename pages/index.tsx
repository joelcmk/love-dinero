import Head from 'next/head';
import Image from 'next/image';
import { Inter, Limelight } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Tokens } from '../.mirrorful/theme';

import Login from './components/Login/Login';
import Nav from './components/Nav/Nav';

export default function Home() {
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
      <div>
        <Nav />
        <Login />
      </div>
    </>
  );
}
