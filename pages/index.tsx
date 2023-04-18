/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head';
import Login from './login';
import Dashboard from './dashboard';
import Profile from './profile';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import {
  useUser,
  useSession,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';

export default function Home() {
  const router = useRouter();
  const user = useUser();
  const session = useSession();
  const supabase = useSupabaseClient();

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

      {!session ? (
        <Login supabase={supabase} />
      ) : (
        <Dashboard session={session} />
      )}
    </>
  );
}
