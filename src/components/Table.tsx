import React from "react";
import { useTable, useSortBy, Column } from "react-table";
import "../css/Table.css";

interface Props {
  filteredInventoryDb: InventoryItem[];
}

type InventoryItem = {
  charName: string;
  itemSlot: number;
  itemName: string;
  itemId: number;
  itemCount: number;
  itemSlots: number;
};

export const Table = ({ filteredInventoryDb }: Props) => {
  const columns: Column<InventoryItem>[] = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "charName",
      },
      {
        Header: "Slot",
        accessor: "itemSlot",
      },
      {
        Header: "Item",
        accessor: "itemName",
      },
      {
        Header: "Item Id",
        accessor: "itemId",
      },
      {
        Header: "Count",
        accessor: "itemCount",
      },
    ],
    []
  );

  const table = useTable({ columns, data: filteredInventoryDb }, useSortBy);

  return (
    <div className="table-main">
      <table {...table.getTableProps()} className="table-background">
        <thead className="table-header">
          {table.headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="table-body" {...table.getTableBodyProps()}>
          {table.rows.map((row) => {
            table.prepareRow(row);
            return (
              <tr
                className="whitespace-nowrap text-center hyperlink"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
