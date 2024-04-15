import { LuMoreHorizontal, LuPlus } from 'react-icons/lu';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ApiData } from '@/entities/api-data';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MyDialog } from './dialog';

dayjs.extend(relativeTime);
dayjs.locale('pt-br');
dayjs.extend(utc);

export const Dashboard = ({ data }: ApiData) => {
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
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((k) => {
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
                  <DropdownMenuTrigger>
                    <div className="flex items-center justify-center size-9 bg-green-200 hover:bg-green-600 rounded-md">
                      <LuMoreHorizontal color="green" size={20} />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <MyDialog
                      myDiv={
                        <div className="flex justify-center hover:bg-green-200 cursor-pointer">
                          Editar
                        </div>
                      }
                      title="Editar documento"
                      description="Escreva uma descrição."
                      action="Editar"
                    />
                    <DropdownMenuItem>Deletar</DropdownMenuItem>
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
