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
import { useState } from 'react';
import { TodoList } from '@/entities/api-data';

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
  func: (todo: TodoList) => void;
}

export const MyDialog = (props: HTMLProps) => {
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
            <div
              onClick={() =>
                props.func({ description, order, createdAt, id: props.data.id })
              }
            >
              <p className="text-white">{props.action}</p>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
