import { axiosInstance } from '@/lib/axios';
import { useAuth } from '@clerk/clerk-react';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';

const updateApiToken = (token: string | null) => {
  if (token) axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common['Authorization'];
};

const AuthProvider = ({children}: {children: React.ReactNode}) => {
  const { getToken } = useAuth();
  const [loading, setLoading ] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
      } catch (error: any) {
        console.error('Error in auth provider', error);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [getToken]);

  if (loading) {
	return <div className='h-screen w-full flex items-center justify-center gap-2'>
		<Loader className='size-8 animate-spin text-emerald-500' />
		<span className='ml-2'>Loading...</span>
	</div>;
  }

  return (
    <div>
      {children}
    </div>
  );
};

export default AuthProvider;
