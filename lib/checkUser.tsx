/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from 'react';
import Router from 'next/router';
import useSWR from 'swr';
import {
  useSession,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react';

export default function CheckUser() {
  const user = useUser();
  const session = useSession();
  const supabase = useSupabaseClient();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user && isLoading) {
      return console.log('no session');
    }
    if (user) {
      return console.log('user');
    }
  }, [user, session]);
}
