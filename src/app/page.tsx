'use client';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import { api } from '@/lib/axios';
import { AxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { createCookies } from '@/helpers/cookies';

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [typePW, setTypePW] = useState('password');
  const [showPassword, setShowPassword] = useState(false);

  const { toast } = useToast();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const Login = async () => {
    try {
      const res = await api.post('/login', {
        email,
        password,
      });
      createCookies('user', res.data.username);
      createCookies('token', res.data.token);
      router.replace('/decree');
    } catch (error) {
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data.message,
          variant: 'destructive',
          action: <ToastAction altText="fechar">fechar</ToastAction>,
        });
      }
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
    if (!showPassword) {
      setTypePW('text');
    } else {
      setTypePW('password');
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Image
          className="mx-auto"
          src="/logo.png"
          alt="DCA Scan"
          width={80}
          height={80}
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Entre na sua conta
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST">
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="E-mail"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-dark sm:text-sm sm:leading-6"
            />
          </div>

          <div className="relative mt-2">
            <input
              id="password"
              name="password"
              type={typePW}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Senha"
              autoComplete="current-password"
              required
              className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-dark sm:text-sm sm:leading-6"
            />
            <button
              onClick={toggleShowPassword}
              type="button"
              className="absolute top-1/2 right-3 -translate-y-1/2"
            >
              {showPassword ? <LuEye /> : <LuEyeOff />}
            </button>
          </div>

          <div>
            <button
              onClick={Login}
              type="button"
              className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
