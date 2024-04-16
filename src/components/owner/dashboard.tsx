import { LuMoreHorizontal, LuPlus } from 'react-icons/lu';
import dayjs from 'dayjs';
import { convertRoutes } from '@/helpers/convert-routes';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ApiData } from '@/entities/api-data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { MyDialog } from './dialog';
import { api } from '@/lib/axios';
import { getCookie } from 'cookies-next';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clearCookies } from '@/helpers/cookies';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');
dayjs.extend(utc);

interface TodoList {
  id?: string;
  description?: string;
  order?: string;
  createdAt?: string;
}

export const Dashboard = ({ slug }: ApiData) => {
  const { toast } = useToast();
  const router = useRouter();

  const [files, setFiles] = useState<ApiData[]>([]);
  const [call, setCall] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCookie('token');
        const result = await api.get(slug, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFiles(result.data);
      } catch (error) {
        if (error instanceof AxiosError) {
          clearCookies(['user', 'token']);
          router.replace('/login');
        }
      }
    };
    fetchData();
  }, [call]);

  const create = async ({ order, createdAt, description }: TodoList) => {
    const token = getCookie('token');
    if (slug === '/law') {
      try {
        await api.post(
          slug,
          {
            order: Number(order),
            description,
            createdAt,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCall(!call);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({
            title: error.response?.data.message,
            variant: 'destructive',
            action: <ToastAction altText="fechar">fechar</ToastAction>,
          });
        }
      }
    } else {
      try {
        await api.post(
          slug,
          {
            description,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCall(!call);
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
  };

  const update = async ({ id, order, createdAt, description }: TodoList) => {
    const token = getCookie('token');
    if (slug === '/law') {
      try {
        await api.put(
          `${slug}/${id}`,
          {
            order: Number(order),
            description,
            createdAt,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCall(!call);
      } catch (error) {
        if (error instanceof AxiosError) {
          toast({
            title: error.response?.data.message,
            variant: 'destructive',
            action: <ToastAction altText="fechar">fechar</ToastAction>,
          });
        }
      }
    } else {
      try {
        await api.put(
          `${slug}/${id}`,
          {
            description,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCall(!call);
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
  };

  const exclude = async ({ id }: TodoList) => {
    const token = getCookie('token');
    try {
      await api.delete(`${slug}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCall(!call);
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

  return (
    <table className="border w-full border-green-600 rounded-lg mt-16 ml-48 max-lg:ml-0">
      <thead className="border-b border-green-600">
        <tr>
          <th style={{ width: 64 }} className="text-left pl-2 py-3">
            <input
              type="checkbox"
              className="size-4 rounded border border-green-600"
            />
          </th>
          <th className="text-left self-end">Ordem</th>
          <th className="text-left">Descrição</th>
          <th className="text-left">data</th>
          <th className="text-left">
            <MyDialog
              myDiv={
                <div className="flex items-center justify-center w-20 h-9 bg-green-600 hover:bg-green-300 rounded-md cursor-pointer">
                  <LuPlus color="white" size={20} />
                  <span className="text-white">Add</span>
                </div>
              }
              title="Novo documento"
              description="Escreva uma descrição."
              action="Criar"
              data={{ slug }}
              func={create}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {files.map((k) => {
          return (
            <tr
              key={k.id}
              className="border-b border-green-600 hover:bg-green-100"
            >
              <td style={{ width: 64 }} className="pl-2 py-2.5">
                <input
                  type="checkbox"
                  className="size-4 rounded border border-green-600"
                />
              </td>
              <td>{k.order}</td>
              <td>{k.description}</td>
              <td>{dayjs().to(k.createdAt)}</td>
              <td style={{ width: 64 }}>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center justify-center size-9 bg-green-200 hover:bg-green-600 rounded-md">
                      <LuMoreHorizontal color="green" size={20} />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <MyDialog
                      myDiv={
                        <div className="flex hover:bg-green-200 cursor-pointer">
                          Editar
                        </div>
                      }
                      title={`Edite ${convertRoutes(slug)} ${k.order}`}
                      description="Escreva uma descrição."
                      action="Editar"
                      data={{ slug, id: k.id }}
                      func={update}
                    />
                    <MyDialog
                      myDiv={
                        <div className="flex hover:bg-green-200 cursor-pointer">
                          Deletar
                        </div>
                      }
                      title={`Deletando ${convertRoutes(slug)} ${k.order}`}
                      description="Tem certeza que quer fazer isso?"
                      action="Deletar"
                      data={{ slug, id: k.id }}
                      func={exclude}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          );
        })}
      </tbody>
      {/* <tfoot>
        <tr>
          <td className="pl-2 py-2.5" colSpan={2}>
            Mostrando 10 de 28 itens
          </td>

          <td className="pr-2 text-right" colSpan={3}>
            <div className="inline-flex items-center gap-8">
              <span>Página 1 de 2</span>
              <div className="flex gap-1">
                <IconButton>
                  <LuChevronsLeft color="green" size={20} />
                </IconButton>
                <IconButton>
                  <LuChevronLeft color="green" size={20} />
                </IconButton>
                <IconButton>
                  <LuChevronRight color="green" size={20} />
                </IconButton>
                <IconButton>
                  <LuChevronsRight color="green" size={20} />
                </IconButton>
              </div>
            </div>
          </td>
        </tr>
      </tfoot> */}
    </table>
  );
};
