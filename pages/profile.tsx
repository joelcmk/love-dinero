import Nav from '../Components/Nav/Nav';
import Button from '../Components/Button/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { supabase } from './supabase';

import {
  useUser,
  useSupabaseClient,
  useSession,
} from '@supabase/auth-helpers-react';

function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const supabase = useSupabaseClient();
  const user = useUser();
  const session = useSession();

  const router = useRouter();

  useEffect(() => {
    if (isLoading && !user) {
      router.push('/');
    } else {
      setIsLoading(true);
      return;
    }
  }, [user, isLoading]);

  return (
    <>
      <Nav />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Image
          alt="Profile picture"
          width="100"
          height="100"
          src={user?.user_metadata.picture}
          style={{ borderRadius: '50%' }}
        />
      </div>
      <Button
        onClick={() => supabase.auth.signOut()}
        style={{ width: '100px' }}
        variant={undefined}
      >
        Log out
      </Button>
    </>
  );
}

export default Profile;
