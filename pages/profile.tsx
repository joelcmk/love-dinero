import Nav from '../Components/Nav/Nav';
import Button from '../Components/Button/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { supabase } from './supabase';

import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

function Profile() {
  const user = useUser();
  const supabase = useSupabaseClient();
  const router = useRouter();
  console.log(user);

  useEffect(() => {
    if (user) {
      router.push('/');
    } else {
      router.push('/profile');
    }
  }, [user, router]);
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
