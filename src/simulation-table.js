import React, { useMemo } from "react";
import { useTable } from "react-table";
import styled from "styled-components/macro";

const Table = styled.table({
  background: "#373d48",
});

export function SimulationTable({ amount, interest, monthlyAmortization, repayments }) {
  const data = useMemo(
    () =>
      new Array(36).fill().map((_, month) => {
        const alreadyAmortized = monthlyAmortization * month;
        const alreadyRepayed = repayments.slice(0, month).reduce((total, val) => total + val, 0);

        const toRepay = amount - alreadyAmortized - alreadyRepayed;
        const monthlyInterest = (toRepay / 12) * (interest / 100);
        return { toRepay, monthlyInterest, alreadyAmortized, alreadyRepayed };
      }),
    [amount, interest, monthlyAmortization, repayments]
  );

  const columns = React.useMemo(
    () => [
      { Header: "Month", accessor: (_, i) => i },
      { Header: "Total", accessor: () => amount },
      { Header: "Amortized", accessor: "alreadyAmortized" },
      { Header: "Repayed", accessor: "alreadyRepayed" },
      { Header: "Remaining", accessor: "toRepay" },
      { Header: "Interest", accessor: "monthlyInterest" },
      { Header: "Amortization", accessor: () => monthlyAmortization },
      { Header: "Cost", accessor: (settings) => settings.monthlyInterest + monthlyAmortization },
    ],
    [amount, monthlyAmortization]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <Table {...getTableProps()}>
      {" "}
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
