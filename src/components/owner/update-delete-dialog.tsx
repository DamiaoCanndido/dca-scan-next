import { TodoList } from '@/entities/api-data';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

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
  const formSchema = z.object({
    description: z
      .string()
      .min(3, { message: 'A descrição deve conter no mínimo 6 caracteres.' })
      .max(50, { message: 'A descrição não pode exceder 50 caracteres.' }),
    order:
      props.data.slug === '/law'
        ? z.string().min(1, { message: 'A ordem está faltando.' })
        : z.optional(z.string()),
    createdAt: z.optional(z.string()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: props.data.description,
      order: props.data.order,
      createdAt: props.data.createdAt!.slice(0, 16),
    },
  });

  async function onSubmit({
    order,
    description,
    createdAt,
  }: z.infer<typeof formSchema>) {
    action === 'Editar'
      ? props.edit({
          description,
          order,
          createdAt,
          id: props.data.id,
        })
      : props.del({ id: props.data.id });
  }

  const [action, setAction] = useState('');

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
          <DialogDescription>
            {action === 'Deletar'
              ? 'Você realmente deseja excluir?'
              : props.description}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {action !== 'Deletar' ? (
              <FormField
                control={form.control}
                name="order"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*Ordem (Obrigatório)</FormLabel>
                    <FormControl>
                      <Input placeholder="Ordem" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <></>
            )}
            {action !== 'Deletar' ? (
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*Descrição (Obrigatório)</FormLabel>
                    <FormControl>
                      <Input placeholder="Descrição" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <></>
            )}
            {action !== 'Deletar' ? (
              <FormField
                control={form.control}
                name="createdAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        placeholder="Data"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <></>
            )}

            <DialogClose
              type="submit"
              className={
                action === 'Editar'
                  ? 'bg-green-600 h-8 rounded-sm w-full'
                  : 'bg-red-600 h-8 rounded-sm w-full'
              }
            >
              <p className="text-white">{action}</p>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
