'use client';
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronsLeft,
  LuChevronsRight,
  LuMoreHorizontal,
  LuPlus,
} from 'react-icons/lu';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { convertContract, convertRoutes } from '@/helpers/convert-routes';
import { ContractList } from '@/entities/api-data';
import { useToast } from '@/components/ui/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { api } from '@/lib/axios';
import { getCookie } from 'cookies-next';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clearCookies } from '@/helpers/cookies';
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
import { IconButton } from '@/components/owner/icon-button';
import { CreateContractDialog } from '@/components/owner/create-contract-dialog';
import { UpdateDeleteContractDialog } from '@/components/owner/update-delete-contract-dialog';

dayjs.extend(utc);

const contractType = ['publicinterest', 'bidding'];

export default function Page() {
  const { toast } = useToast();
  const router = useRouter();

  const [files, setFiles] = useState<ContractList[]>([]);
  const [call, setCall] = useState(false);
  const [isLoading, setIsloading] = useState(true);

  const [years, setYears] = useState<number[]>([]);
  const [type, setType] = useState<string>(contractType[0]);
  const [year, setYear] = useState(years[0]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);

  const totalPages = Math.ceil(count / 10);

  const firstPage = () => {
    setPage(1);
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const nextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const lastPage = () => {
    setPage(totalPages);
  };

  useEffect(() => {
    const token = getCookie('token');

    const getYears = async () => {
      try {
        const result = await api.get('contract/years', {
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
        const result = await api.get(
          `contract?year=${year}&p=${page}&type=${type}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFiles(result.data.docs);
        setCount(result.data.count);
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
  }, [call, page]);

  const create = async ({
    order,
    duration,
    hired,
    startsIn,
    type,
    value,
  }: ContractList) => {
    const token = getCookie('token');
    try {
      await api.post(
        '/contract',
        {
          order: Number(order),
          duration: Number(duration),
          hired,
          startsIn: startsIn + ':00.000Z',
          type,
          value: Number(value),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCall(!call);
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        toast({
          title: error.response?.data.message,
          variant: 'destructive',
          action: <ToastAction altText="fechar">fechar</ToastAction>,
        });
      }
    }
  };

  const update = async ({
    id,
    order,
    duration,
    hired,
    startsIn,
    value,
    type,
  }: ContractList) => {
    const token = getCookie('token');

    try {
      await api.put(
        `/contract/${id}`,
        {
          order: Number(order),
          duration: Number(duration),
          hired,
          startsIn: startsIn + ':00.000Z',
          type,
          value: Number(value),
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

  const exclude = async ({ id }: ContractList) => {
    const token = getCookie('token');
    try {
      await api.delete(`/contract/${id!}`, {
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
      <div className="lg:flex lg:h-16 items-center w-full rounded-t-lg bg-green-100">
        <p className="px-2 font-bold">ANO:</p>
        <Select
          onValueChange={(e) => {
            setYear(Number(e));
            setPage(1);
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
                return (
                  <SelectItem key={e} value={e.toString()}>
                    {e}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
        <p className="px-2 font-bold">TIPO:</p>
        <Select
          onValueChange={(e) => {
            setType(String(e));
            setPage(1);
            setCall(!call);
          }}
          defaultValue={type}
        >
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Escolha um tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tipo</SelectLabel>
              {contractType.map((e) => {
                return (
                  <SelectItem key={e} value={e.toString()}>
                    {convertContract(e)}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center w-full rounded-b-lg h-16 bg-green-100">
        <h2 className="ml-4 font-bold">
          {files[0]
            ? `${convertRoutes('/contract').toUpperCase()} DE ${convertContract(
                type
              )} ATUAL: ${files[0].order}`
            : `NÃO EXISTE ${convertRoutes(
                '/contract'
              ).toUpperCase()}S DE ${convertContract(type)}`}
        </h2>
      </div>
      <table className="w-full">
        <thead className="border-b border-green-600">
          <tr>
            <th className="text-left pl-2 h-16 tracking-wider w-[10%]">
              Ordem
            </th>
            <th className="text-left h-16 tracking-wider w-[20%]">
              Contratado
            </th>
            <th className="text-left h-16 tracking-wider w-[20%]">Início</th>
            <th className="text-left h-16 tracking-wider w-[20%]">Duração</th>
            <th className="text-left h-16 tracking-wider w-[20%]">Valor</th>
            <th className="text-left h-16 tracking-wider w-[10%]">
              <CreateContractDialog
                myDiv={
                  <div className="flex max-lg:hidden items-center justify-center w-20 h-9 bg-green-600 hover:bg-green-300 rounded-md cursor-pointer mr-2">
                    <LuPlus color="white" size={20} />
                    <span className="text-white">Add</span>
                  </div>
                }
                title={`Crie ${convertRoutes('/contract')}`}
                description="Informe os items."
                action="Criar"
                data={{}}
                func={create}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {files.map((k, i) => {
            return (
              <tr
                key={k.id}
                className="border-t border-green-600 hover:bg-green-100"
              >
                <td className="pl-1 h-16 text-2xl font-bold">{k.order}</td>
                <td>
                  <div className="flex max-w-full">
                    <span className="text-xs line-clamp-3 lg:text-base">
                      {k.hired}
                    </span>
                  </div>
                </td>
                <td>
                  <span className="text-xs">
                    {dayjs(k.startsIn).utc().format('DD/MM/YY hh:mm A')}
                  </span>
                </td>
                <td>
                  <span className="text-xs">{`${k.duration} meses`}</span>
                </td>
                <td>
                  <span className="text-xs">{`R$ ${Number(k.value!).toFixed(
                    2
                  )}`}</span>
                </td>
                <td className="pr-1">
                  <UpdateDeleteContractDialog
                    myDiv={
                      <div className="flex items-center justify-center size-9 bg-green-200 hover:bg-green-600 rounded-md">
                        <LuMoreHorizontal color="green" size={20} />
                      </div>
                    }
                    data={{
                      id: k.id,
                      order: k.order?.toString(),
                      hired: k.hired,
                      type: k.type as 'bidding' | 'publicinterest',
                      duration: k.duration,
                      value: k.value,
                      startsIn: k.startsIn,
                    }}
                    edit={update}
                    del={exclude}
                    description="Escreva uma descrição."
                    title={`${convertRoutes('/contract')} ${k.order}`}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>

        <tfoot className="w-full border-t border-green-600">
          <tr className="h-16">
            <td className="max-lg:hidden pl-2 py-2.5 text-left" colSpan={2}>
              {`Mostrando ${
                count === 0
                  ? 0
                  : count < 10 || totalPages === page
                  ? count
                  : 10 * page
              } de ${count} itens`}
            </td>

            <td className="lg:hidden pl-2 py-2.5 text-left" colSpan={2}>
              {`${
                count === 0
                  ? 0
                  : count < 10 || totalPages === page
                  ? count
                  : 10 * page
              }/${count}`}
            </td>

            <td className="pr-2 py-2.5 text-right items-end" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span className="max-lg:hidden">{`Mostrando página ${
                  count === 0 ? 0 : page
                } de ${totalPages}`}</span>
                <div className="flex gap-1">
                  <IconButton onClick={firstPage} disabled={page === 1}>
                    <LuChevronsLeft color="green" size={20} />
                  </IconButton>
                  <IconButton onClick={previousPage} disabled={page === 1}>
                    <LuChevronLeft color="green" size={20} />
                  </IconButton>
                  <IconButton
                    onClick={nextPage}
                    disabled={page === totalPages || totalPages === 0}
                  >
                    <LuChevronRight color="green" size={20} />
                  </IconButton>
                  <IconButton
                    onClick={lastPage}
                    disabled={page === totalPages || totalPages === 0}
                  >
                    <LuChevronsRight color="green" size={20} />
                  </IconButton>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
      <CreateContractDialog
        myDiv={
          <div className="flex justify-center items-center fixed lg:hidden bottom-4 left-[50%] -translate-x-1/2 bg-green-600 size-16 rounded-full">
            <LuPlus color="white" size={20} />
          </div>
        }
        title={`Crie ${convertRoutes('/contract')}`}
        description="Informe os items."
        action="Criar"
        data={{}}
        func={create}
      />
    </div>
  );
}
