import React, { useMemo, useState, useCallback, useEffect } from "react";
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

export function SimulationTable({ settings, setTotalInterest }) {
  const [repayments, setRepayments] = useState(new Array(36).fill(0));

  const handleRepayment = useCallback(
    (month, value) => {
      setRepayments([...repayments.slice(0, month), parseFloat(value), ...repayments.slice(month + 1)]);
    },
    [repayments]
  );

  useEffect(() => {
    setRepayments(new Array(36).fill(0));
  }, [settings.repayPeriod]);

  const { amount, interest, amortization, repayPeriod } = settings;
  const monthlyAmortization = (amount / 12) * (amortization / 100);

  const data = useMemo(() => {
    let totalInterest = 0;

    const rows = new Array(36).fill().map((_, month) => {
      const alreadyAmortized = monthlyAmortization * month;
      const alreadyRepayed = repayments.slice(0, month).reduce((total, val) => total + val, 0);

      const toRepay = amount - alreadyAmortized - alreadyRepayed;
      const monthlyInterest = (toRepay / 12) * (interest / 100);
      totalInterest += monthlyInterest;
      return {
        toRepay: toRepay.toFixed(2),
        monthlyInterest: monthlyInterest.toFixed(2),
        alreadyAmortized: alreadyAmortized.toFixed(2),
        alreadyRepayed: alreadyRepayed.toFixed(2),
        cost: (monthlyAmortization + monthlyInterest).toFixed(2),
      };
    });

    setTotalInterest(totalInterest.toFixed(2));
    return rows;
  }, [amount, interest, monthlyAmortization, repayments, setTotalInterest]);

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
