'use client';
import { Progress } from '@/components/ui/progress';
import { getCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const token = getCookie('token');

  const router = useRouter();

  useEffect(() => {
    const increaseProgress = () => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearTimeout(timer);
          return 100;
        } else {
          return prevProgress + 10;
        }
      });
    };
    const timer = setTimeout(increaseProgress, 100);
    if (token && progress === 100) {
      router.replace('/decree');
    } else if (!token && progress === 100) {
      router.replace('/login');
    }
    return () => clearTimeout(timer);
  }, [progress]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <Image
        className="mx-auto mb-4"
        src="/logo.png"
        alt="DCA Scan"
        width={80}
        height={80}
      />
      <Progress value={progress} className="w-[33%]" />
    </div>
  );
}
