import {
  LuMoreHorizontal,
  LuChevronLeft,
  LuChevronsLeft,
  LuChevronRight,
  LuChevronsRight,
} from 'react-icons/lu';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import { IconButton } from './icon-button';
import { ApiData } from '@/entities/api-data';

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
          <th className="text-left">Ordem</th>
          <th className="text-left">Descrição</th>
          <th className="text-left">data</th>
          <th className="text-left"></th>
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
                <IconButton>
                  <LuMoreHorizontal color="green" size={20} />
                </IconButton>
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
