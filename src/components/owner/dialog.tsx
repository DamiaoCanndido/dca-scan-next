'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/axios';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { getCookie } from 'cookies-next';

interface HTMLProps {
  myDiv?: JSX.Element;
  title: string;
  description: string;
  action: string;
  data: {
    description?: string;
    slug: string;
    id?: string;
    order?: string;
    createdAt?: string;
  };
}

export const MyDialog = (props: HTMLProps) => {
  const router = useRouter();

  const { toast } = useToast();

  const [description, setDescription] = useState('');
  const [order, setOrder] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleOrderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrder(event.target.value);
  };

  const handleCreatedAtChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCreatedAt(event.target.value);
  };

  const HandleMethod = async () => {
    const token = getCookie('token');
    if (props.action === 'Criar' && props.data.slug !== '/law') {
      try {
        await api.post(
          props.data.slug,
          {
            description,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({
            title: error.response?.data.message,
            variant: 'destructive',
            action: <ToastAction altText="fechar">fechar</ToastAction>,
          });
        }
      }
    } else if (props.action === 'Criar') {
      try {
        await api.post(
          props.data.slug,
          {
            order: Number(order),
            description,
            createdAt,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({
            title: error.response?.data.message,
            variant: 'destructive',
            action: <ToastAction altText="fechar">fechar</ToastAction>,
          });
        }
      }
    } else if (props.action === 'Deletar') {
      try {
        await api.delete(`${props.data.slug}/${props.data.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({
            title: error.response?.data.message,
            variant: 'destructive',
            action: <ToastAction altText="fechar">fechar</ToastAction>,
          });
        }
      }
    }

    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{props.myDiv}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        {props.data.slug === '/law' && props.action !== 'Deletar' ? (
          <div className="flex py-4">
            <input
              id="order"
              value={order}
              onChange={handleOrderChange}
              placeholder="ordem"
              className="flex w-max"
            />
          </div>
        ) : (
          <></>
        )}
        {props.action !== 'Deletar' ? (
          <div className="flex py-4">
            <input
              id="description"
              placeholder="descrição"
              value={description}
              className="flex w-max"
              onChange={handleDescriptionChange}
            />
          </div>
        ) : (
          <></>
        )}
        {props.data.slug === '/law' && props.action !== 'Deletar' ? (
          <div className="flex py-4">
            <input
              id="data"
              value={createdAt}
              type="datetime-local"
              placeholder="data"
              className="flex w-max"
              onChange={handleCreatedAtChange}
            />
          </div>
        ) : (
          <></>
        )}
        <DialogFooter>
          <DialogClose
            className={
              props.action === 'Deletar'
                ? 'bg-red-600 m-2 w-20 h-8 rounded-sm'
                : 'bg-green-600 m-2 w-20 h-8 rounded-sm'
            }
          >
            <div onClick={HandleMethod}>
              <p className="text-white">{props.action}</p>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
