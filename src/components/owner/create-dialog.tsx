'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { TodoList } from '@/entities/api-data';
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

export const CreateDialog = (props: HTMLProps) => {
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
      description: '',
      order: '',
      createdAt: '',
    },
  });

  async function onSubmit({
    order,
    description,
    createdAt,
  }: z.infer<typeof formSchema>) {
    props.func({ order, description, createdAt });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{props.myDiv}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {props.data.slug === '/law' && props.action !== 'Deletar' ? (
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
            {props.action !== 'Deletar' ? (
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
            {props.data.slug === '/law' && props.action !== 'Deletar' ? (
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
              className="bg-green-600 h-8 rounded-sm w-full"
            >
              <p className="text-white">Criar</p>
            </DialogClose>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
