import { TodoList } from '@/entities/api-data';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useState } from 'react';

interface HTMLProps {
  myDiv?: JSX.Element;
  title: string;
  description: string;
  data: {
    description?: string;
    slug: string;
    id?: string;
    order?: string;
    createdAt?: string;
  };
  edit: (todo: TodoList) => void;
  del: (todo: TodoList) => void;
}

export const UpdateDeleteDialog = (props: HTMLProps) => {
  const [description, setDescription] = useState('');
  const [order, setOrder] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  const [action, setAction] = useState('');

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
      <DropdownMenu>
        <DropdownMenuTrigger>{props.myDiv}</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onClick={() => {
                setAction('Editar');
              }}
            >
              <span>Editar</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DialogTrigger asChild>
            <DropdownMenuItem
              onClick={() => {
                setAction('Deletar');
              }}
            >
              <span>Deletar</span>
            </DropdownMenuItem>
          </DialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        {props.data.slug === '/law' && action !== 'Deletar' ? (
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
        {action !== 'Deletar' ? (
          <div className="flex pb-4">
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
        {props.data.slug === '/law' && action !== 'Deletar' ? (
          <div className="flex pb-4">
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
          <DialogClose className="bg-green-600 m-2 w-20 h-8 rounded-sm">
            <div
              onClick={
                action === 'Editar'
                  ? () =>
                      props.edit({
                        description,
                        order,
                        createdAt,
                        id: props.data.id,
                      })
                  : () => props.del({ id: props.data.id })
              }
            >
              <p className="text-white">{action}</p>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
