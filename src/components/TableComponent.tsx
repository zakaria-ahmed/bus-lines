// TableComponent.tsx
import React from 'react';
import {useTable, Column} from 'react-table';

interface BusData {
  no: number;
  line: string;
  count: number;
  stops: string[];
}

interface TableProps {
  data: BusData[];
}

const TableComponent: React.FC<TableProps> = ({data}) => {
  const columns: Column<BusData>[] = React.useMemo(
    () => [
      {
        Header: 'No:',
        accessor: 'no',
      },
      {
        Header: 'Bus Line:',
        accessor: 'line',
      },
      {
        Header: 'Stops:',
        accessor: 'count',
      },
      {
        Header: 'Stop names:',
        accessor: 'stops',
        Cell: ({value}: any) => value.join(', '),
      },
    ],
    [],
  );

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    useTable({columns, data});

  return (
    <table
      {...getTableProps()}
      style={{width: '100%', borderCollapse: 'collapse'}}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{borderBottom: '1px solid black'}}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td
                  {...cell.getCellProps()}
                  style={{padding: '10px', border: '1px solid gray'}}>
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;
