'use client';
import { Dashboard } from '@/components/owner/dashboard';
import { clearCookies } from '@/helpers/cookies';
import { api } from '@/lib/axios';
import { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [ordinance, setOrdinance] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie('token');
        const result = await api.get('/ordinance', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrdinance(result.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          clearCookies(['user', 'token']);
          router.replace('/login');
        }
      }
    };
    fetchData();
  }, []);
  return <Dashboard data={ordinance} slug="/ordinance" />;
}
