import Head from 'next/head';
import Image from 'next/image';
import { Inter, Limelight } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { Tokens } from '../.mirrorful/theme';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import {
  useSession,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';
import Account from './account';

import Nav from '../Components/Nav/Nav';

export default function Home() {
  const [isLogedIn, setIsLogedIn] = useState(false);

  const router = useRouter();

  const user = useUser();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [user]);

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
