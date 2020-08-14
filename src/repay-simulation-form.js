import React from "react";
import { useForm } from "react-hook-form";
import { SimulationTable } from "./simulation-table";
import styled from "styled-components/macro";

const InputGroup = styled.div({
  display: "flex",
  alignItems: "center",
});

const InputLabel = styled.label({
  width: 390,
});

const Input = styled.input({
  height: 32,
  textAlign: "right",
});

export function RepaySimulationForm() {
  const { register, watch } = useForm({
    defaultValues: { amount: 2635000, amortization: 2, interest: 1.82, repayPeriod: 3 },
  });

  const formValues = watch();
  const numericalFormValues = Object.fromEntries(
    Object.entries(formValues).map(([key, value]) => [key, parseFloat(value)])
  );
  const { amount, interest, repayPeriod, amortization } = numericalFormValues;
  const ready = Boolean(amount && interest && repayPeriod && amortization);

  const monthlyAmortization = (amount / 12) * (amortization / 100);

  return (
    <div>
      <form style={{ padding: 32 }}>
        <InputGroup>
          <InputLabel htmlFor="amount">Total amount to repaay</InputLabel>
          <Input name="amount" ref={register} />
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="amortization">Yearly amortization</InputLabel>
          <Input name="amortization" ref={register} />
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="interest">Interest rate</InputLabel>
          <Input name="interest" ref={register} />
        </InputGroup>
        <InputGroup>
          <InputLabel htmlFor="repayPeriod">Period length (in months)</InputLabel>
          <Input name="repayPeriod" ref={register} />
        </InputGroup>
      </form>

      {ready && (
        <SimulationTable
          amount={amount}
          interest={interest}
          monthlyAmortization={monthlyAmortization}
          repayPeriod={repayPeriod}
        />
      )}
    </div>
  );
}
