import Nav from '../Components/Nav/Nav';
import Button from '../Components/Button/Button';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

function Profile() {
  const [isLoading, setIsLoading] = useState(false);

  const user = useUser();
  const router = useRouter();
  const supabase = useSupabaseClient();

  useEffect(() => {
    if (isLoading && !user) {
      router.push('/');
    } else {
      return setIsLoading(true);
    }
  }, [user, isLoading, router]);

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
