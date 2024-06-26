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
import { Skeleton } from '@/components/ui/skeleton';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  const [isLoading, setIsloading] = useState(true);

  const [years, setYears] = useState<number[]>([]);
  const [year, setYear] = useState(years[0]);

  useEffect(() => {
    const token = getCookie('token');

    const getYears = async () => {
      try {
        const result = await api.get(`${slug}/years`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setYears(result.data.years);
      } catch (error) {
        if (error instanceof AxiosError) {
          clearCookies(['user', 'token']);
          router.replace('/login');
        }
      }
    };
    const fetchData = async () => {
      try {
        const result = await api.get(`${slug}?year=${year}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFiles(result.data);
        setIsloading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          clearCookies(['user', 'token']);
          router.replace('/login');
        }
      }
    };

    getYears();
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

  return isLoading ? (
    <div className="w-full mt-[72px] ml-52 max-lg:ml-4 mr-4">
      {Array.from({ length: 15 }).map((_, i) => {
        return <Skeleton key={i} className="h-16 mb-2" />;
      })}
    </div>
  ) : (
    <div className="w-full border rounded-lg ml-52 max-lg:ml-4 mr-4 border-green-600 mt-[72px]">
      <div className="flex items-center w-full rounded-t-lg h-16 bg-green-100">
        <p className="px-2 font-bold">ANO:</p>
        <Select
          onValueChange={(e) => {
            setYear(Number(e));
            setCall(!call);
          }}
          defaultValue={years.length > 0 ? years[0].toString() : ''}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Escolha um ano" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Anos</SelectLabel>
              {years.map((e) => {
                return <SelectItem value={e.toString()}>{e}</SelectItem>;
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center w-full rounded-b-lg h-16 bg-green-100">
        <h2 className="ml-4 font-bold">
          {files[0]
            ? `${convertRoutes(slug).toUpperCase()} ATUAL: ${files[0].order}`
            : `NÃO EXISTE ${convertRoutes(slug).toUpperCase()}S`}
        </h2>
      </div>
      <table className="w-full">
        <thead className="border-b border-green-600">
          <tr>
            <th className="text-left pl-2 h-16 tracking-wider w-[12.5%]">
              Ordem
            </th>
            <th className="text-left h-16 tracking-wider w-[40.5%]">
              Descrição
            </th>
            <th className="text-left h-16 tracking-wider w-[40.5%]">Data</th>
            <th className="text-left h-16 tracking-wider w-[6.5%]">
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
                className="border-t border-green-600 hover:bg-green-100"
              >
                <td className="pl-1 h-16 text-2xl font-bold">{k.order}</td>
                <td>
                  <div className="flex max-w-full">
                    <span className="text-xs line-clamp-3 lg:text-base">
                      {k.description}
                    </span>
                  </div>
                </td>
                <td>
                  <span className="text-xs">
                    {dayjs(k.createdAt).format('DD/MM/YY hh:mm A')}
                  </span>
                </td>
                <td className="pr-1">
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
    </div>
  );
};
