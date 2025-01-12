'use client';
import { ContractList } from '@/entities/api-data';
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface HTMLProps {
  myDiv?: JSX.Element;
  title: string;
  description: string;
  data: {
    id?: string;
    hired?: string;
    value?: string;
    type: string;
    duration?: string;
    order?: string;
    ownerId?: string;
    startsIn?: string;
  };
  edit: (todo: ContractList) => void;
  del: (todo: ContractList) => void;
}

export const UpdateDeleteContractDialog = (props: HTMLProps) => {
  const formSchema = z.object({
    hired: z
      .string()
      .min(3, {
        message: 'O nome do contratado deve conter no mínimo 6 caracteres.',
      })
      .max(50, {
        message: 'O nome do contratado não pode exceder 50 caracteres.',
      }),
    order: z.optional(z.string()),
    startsIn: z.string().min(10, { message: 'Início incorreto' }),
    value: z.optional(z.string()),
    duration: z.optional(z.string()),
    type: z.enum(['bidding', 'publicinterest']),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hired: props.data.hired,
      value: String(props.data.value),
      order: props.data.order,
      duration: String(props.data.duration),
      startsIn: props.data.startsIn!.slice(0, 16),
      type: props.data.type as 'bidding' | 'publicinterest' | undefined,
    },
  });

  async function onSubmit({
    order,
    hired,
    duration,
    startsIn,
    type,
    value,
  }: z.infer<typeof formSchema>) {
    action === 'Editar'
      ? props.edit({
          hired,
          order,
          value,
          duration,
          type,
          startsIn,
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
                name="hired"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*Contratado (Obrigatório)</FormLabel>
                    <FormControl>
                      <Input placeholder="Contratado" {...field} />
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
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*Tipo (Obrigatório)</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={(e) => {
                          field.onChange(e);
                        }}
                        defaultValue="bidding"
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Escolha um ano" />
                        </SelectTrigger>
                        <SelectContent className="flex w-max">
                          <SelectGroup>
                            <SelectItem value={'bidding'}>LICITAÇÃO</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectItem value={'publicinterest'}>
                              INTERESSE PÚBLICO
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
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
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*Duração em meses (Obrigatório)</FormLabel>
                    <FormControl>
                      <Input placeholder="Duração" type="number" {...field} />
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
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*Valor (Obrigatório)</FormLabel>
                    <FormControl>
                      <Input placeholder="Valor" type="number" {...field} />
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
                name="startsIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Início</FormLabel>
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
