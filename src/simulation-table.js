import React, { useMemo, useState, useCallback } from "react";
import { useTable } from "react-table";
import styled from "styled-components/macro";

const Table = styled.table({
  background: "#373d48",
  width: "100%",
});

const Input = styled.input({
  height: 32,
  textAlign: "right",
});

export function SimulationTable({ amount, interest, monthlyAmortization, repayPeriod }) {
  const [repayments, setRepayments] = useState(new Array(36).fill(0));

  const handleRepayment = useCallback(
    (month, value) => {
      setRepayments([...repayments.slice(0, month), parseFloat(value), ...repayments.slice(month + 1)]);
    },
    [repayments]
  );

  const data = useMemo(() => {
    const settings = new Array(36).fill().map((_, month) => {
      const alreadyAmortized = monthlyAmortization * month;
      const alreadyRepayed = repayments.slice(0, month).reduce((total, val) => total + val, 0);

      const toRepay = amount - alreadyAmortized - alreadyRepayed;
      const monthlyInterest = (toRepay / 12) * (interest / 100);
      return { toRepay, monthlyInterest, alreadyAmortized, alreadyRepayed };
    });

    const totalsRow = settings.reduce(
      (totals, { monthlyInterest }) => ({
        ...totals,
        monthlyInterest: monthlyInterest + totals.monthlyInterest,
      }),
      { toRepay: 0, monthlyInterest: 0, alreadyAmortized: 0, alreadyRepayed: 0 }
    );

    return [...settings, totalsRow].map((val) => ({
      toRepay: val.toRepay.toFixed(2),
      monthlyInterest: val.monthlyInterest.toFixed(2),
      alreadyAmortized: val.alreadyAmortized.toFixed(2),
      alreadyRepayed: val.alreadyRepayed.toFixed(2),
      cost: (val.monthlyInterest + monthlyAmortization).toFixed(2),
    }));
  }, [amount, interest, monthlyAmortization, repayments]);

  const monthlyAmortizationStr = monthlyAmortization.toFixed(2);

  const columns = React.useMemo(
    () => [
      { Header: "Month", accessor: (_, i) => i },
      { Header: "Total", accessor: () => amount },
      { Header: "Amortized", accessor: "alreadyAmortized" },
      {
        Header: "Repayed",
        accessor: (_, i) => (
          <Input
            disabled={i % repayPeriod !== 0 || i === 0}
            value={repayments[i]}
            onChange={(ev) => handleRepayment(i, ev.target.value)}
          />
        ),
      },
      { Header: "Remaining", accessor: "toRepay" },
      { Header: "Interest", accessor: "monthlyInterest" },
      { Header: "Amortization", accessor: () => monthlyAmortizationStr },
      { Header: "Cost", accessor: "cost" },
    ],
    [amount, handleRepayment, monthlyAmortizationStr, repayPeriod, repayments]
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
