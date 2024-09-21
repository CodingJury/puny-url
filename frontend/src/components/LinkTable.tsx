import { ReactNode } from "react";

export type TableColumn = {
  id: string;
  label: string;
  align: "left" | "center" | "right";
  width: string;
};

export type TableRow = {
  [key: string]: string | ReactNode;
};

type TableProps = {
  columns: TableColumn[],
  rows: TableRow[]
}

const LinkTable = ({columns, rows}:TableProps) => {
  
  return (
    <table className="w-full shadow-black shadow-lg">
      <thead className="h-12 bg-custom-bg-header">
        <tr className="p-2 border-b-[2px] border-custom-text">
          {columns.map((column) => (
            <th key={column.id} align={column.align} className="px-2">{column.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="h-12 border-b-[1px] border-custom-text">
            {columns.map((column) => (
              <td key={column.id} align={column.align} width={column.width} className="px-2 break-all">{row[column.id]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LinkTable;
