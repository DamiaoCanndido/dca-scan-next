import Image from 'next/image';
import {
  LuMoreHorizontal,
  LuChevronLeft,
  LuChevronsLeft,
  LuChevronRight,
  LuChevronsRight,
} from 'react-icons/lu';

export const Teams = () => {
  return (
    <table className="border w-full border-green-600 rounded-lg mt-28 ml-48 max-lg:ml-0">
      <thead className="border-b border-green-600">
        <tr>
          <th style={{ width: 64 }} className="text-left pl-2 py-3">
            <input
              type="checkbox"
              className="size-4 rounded border border-green-600"
            />
          </th>
          <th className="text-left">Escudo</th>
          <th className="text-left">Nome</th>
          <th className="text-left">Código</th>
          <th className="text-left"></th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: 30 }).map((_, i) => {
          return (
            <tr
              key={i}
              className="border-b border-green-600 hover:bg-green-100"
            >
              <td style={{ width: 64 }} className="pl-2 py-2.5">
                <input
                  type="checkbox"
                  className="size-4 rounded border border-green-600"
                />
              </td>
              <td>
                <Image
                  src="https://seeklogo.com/images/B/Brazil-logo-FDA32A35FD-seeklogo.com.png"
                  width={30}
                  height={30}
                  alt=""
                />
              </td>
              <td>Brasil</td>
              <td>BRA</td>
              <td style={{ width: 64 }}>
                <button className="border bg-green-100 border-green-600 rounded-md p-1.5">
                  <LuMoreHorizontal color="green" size={20} />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr>
          <td className="pl-2 py-2.5" colSpan={2}>
            Mostrando 10 de 28 itens
          </td>

          <td className="pr-2 text-right" colSpan={3}>
            <div className="inline-flex items-center gap-8">
              <span>Página 1 de 2</span>
              <div className="flex gap-1">
                <button className="border bg-green-100 border-green-600 rounded-md p-1.5">
                  <LuChevronsLeft color="green" size={20} />
                </button>
                <button className="border bg-green-100 border-green-600 rounded-md p-1.5">
                  <LuChevronLeft color="green" size={20} />
                </button>
                <button className="border bg-green-100 border-green-600 rounded-md p-1.5">
                  <LuChevronRight color="green" size={20} />
                </button>
                <button className="border bg-green-100 border-green-600 rounded-md p-1.5">
                  <LuChevronsRight color="green" size={20} />
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};
