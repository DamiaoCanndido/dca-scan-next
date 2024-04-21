import { LuMoreHorizontal, LuPlus } from 'react-icons/lu';
import dayjs from 'dayjs';
import { convertRoutes } from '@/helpers/convert-routes';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ApiData } from '@/entities/api-data';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { CreateDialog } from './create-dialog';
import { api } from '@/lib/axios';
import { getCookie } from 'cookies-next';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clearCookies } from '@/helpers/cookies';
import { UpdateDeleteDialog } from '@/components/owner/update-delete-dialog';

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
    <>
      <table className="border w-full border-green-600 rounded-lg mt-[72px] ml-52 max-lg:ml-4 mr-4">
        <thead className="border-b border-green-600">
          <tr>
            <th className="text-left pl-2 h-16 tracking-wider">Ordem</th>
            <th className="text-left h-16 tracking-wider">Descrição</th>
            <th className="text-left h-16 tracking-wider">Data</th>
            <th className="text-left h-16 tracking-wider">
              <CreateDialog
                myDiv={
                  <div className="flex max-lg:hidden items-center justify-center w-20 h-9 bg-green-600 hover:bg-green-300 rounded-md cursor-pointer mr-2">
                    <LuPlus color="white" size={20} />
                    <span className="text-white">Add</span>
                  </div>
                }
                title={`Crie ${convertRoutes(slug)}`}
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
                <td
                  style={{ width: 80 }}
                  className="pl-2 h-16 text-2xl font-bold"
                >
                  {k.order}
                </td>
                <td>
                  <div className="flex max-w-[200px]">
                    <span className="text-base truncate">{k.description}</span>
                  </div>
                </td>
                <td>
                  <span className="text-xs">
                    {dayjs(k.createdAt).format('DD/MM/YY hh:mm A')}
                  </span>
                </td>
                <td style={{ width: 64 }}>
                  <UpdateDeleteDialog
                    myDiv={
                      <div className="flex items-center justify-center size-9 bg-green-200 hover:bg-green-600 rounded-md">
                        <LuMoreHorizontal color="green" size={20} />
                      </div>
                    }
                    data={{
                      slug,
                      id: k.id,
                      order: k.order?.toString(),
                      description: k.description,
                      createdAt: k.createdAt,
                    }}
                    edit={update}
                    del={exclude}
                    description="Escreva uma descrição."
                    title={`${convertRoutes(slug)} ${k.order}`}
                  />
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
      <CreateDialog
        myDiv={
          <div className="flex justify-center items-center fixed lg:hidden bottom-4 left-[50%] -translate-x-1/2 bg-green-600 size-16 rounded-full">
            <LuPlus color="white" size={28} />
          </div>
        }
        title={`Crie ${convertRoutes(slug)}`}
        description="Escreva uma descrição."
        action="Criar"
        data={{ slug }}
        func={create}
      />
    </>
  );
};
