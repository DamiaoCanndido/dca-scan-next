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
import { ContractList } from '@/entities/api-data';
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
  action: string;
  data: {
    id?: string;
    hired?: string;
    value?: string;
    type?: string;
    duration?: string;
    order?: string;
    ownerId?: string;
    startsIn?: string;
  };
  func: (todo: ContractList) => void;
}

export const CreateContractDialog = (props: HTMLProps) => {
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
    value: z.string().min(1, { message: 'Valor inválido.' }),
    duration: z.string().min(1, { message: 'Duração inválida.' }),
    type: z.enum(['publicinterest', 'bidding']),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hired: '',
      order: '',
      startsIn: '',
      value: '',
      duration: '',
      type: 'publicinterest',
    },
  });

  async function onSubmit({
    order,
    duration,
    hired,
    startsIn,
    type,
    value,
  }: z.infer<typeof formSchema>) {
    props.func({
      order,
      hired,
      type,
      duration,
      value,
      startsIn,
    });
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
            {props.action !== 'Deletar' ? (
              <FormField
                control={form.control}
                name="hired"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*Contratado (Obrigatório)</FormLabel>
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
            {props.action !== 'Deletar' ? (
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
                        defaultValue="publicinterest"
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Escolha um ano" />
                        </SelectTrigger>
                        <SelectContent className="flex w-max">
                          <SelectGroup>
                            <SelectItem value={'publicinterest'}>
                              INTERESSE PÚBLICO
                            </SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectItem value={'bidding'}>LICITAÇÃO</SelectItem>
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
            {props.action !== 'Deletar' ? (
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
            {props.action !== 'Deletar' ? (
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
            {props.action !== 'Deletar' ? (
              <FormField
                control={form.control}
                name="startsIn"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>*Início (Obrigatório)</FormLabel>
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
