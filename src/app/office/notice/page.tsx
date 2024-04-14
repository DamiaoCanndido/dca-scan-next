'use client';
import { Dashboard } from '@/components/owner/dashboard';
import { clearCookies } from '@/helpers/cookies';
import { api } from '@/lib/axios';
import { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [notices, setNotices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie('token');
        const result = await api.get('/notice', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setNotices(result.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          clearCookies(['user', 'token']);
          router.replace('/login');
        }
      }
    };
    fetchData();
  }, []);
  return <Dashboard data={notices} />;
}
