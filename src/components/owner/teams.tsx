import Image from 'next/image';

export const Teams = () => {
  return (
    <table className="mt-28 ml-48 max-lg:ml-0">
      <thead className="">
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>Escudo</th>
          <th>Nome</th>
          <th>Código</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <input type="checkbox" />
          </td>
          <td>
            <Image
              src="https://seeklogo.com/images/B/Brazil-logo-FDA32A35FD-seeklogo.com.png"
              width={20}
              height={20}
              alt=""
            />
          </td>
          <td>Brasil</td>
          <td>BRA</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};
