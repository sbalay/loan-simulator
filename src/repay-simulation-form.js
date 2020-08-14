import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { SimulationTable } from "./simulation-table";
import styled from "styled-components/macro";
import { mapObject } from "./utils";

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

export function RepaySimulationForm({ settings, setSettings }) {
  const { register, watch } = useForm({ defaultValues: settings });

  const { amount, interest, amortization, repayPeriod } = watch();
  useEffect(() => {
    const newSettings = mapObject({ amount, interest, amortization, repayPeriod }, parseFloat);
    setSettings(newSettings);
  }, [amortization, amount, interest, repayPeriod, setSettings]);

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
    </div>
  );
}
