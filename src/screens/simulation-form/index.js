import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/macro";
import { useCounter } from "react-use";

export function SimulationForm({ onCreateSimulation }) {
  const { register, watch } = useForm();
  const [periodsCount, { dec: removePeriod, inc: addPeriod }] = useCounter(0);

  const formValues = watch();
  const numericalFormValues = Object.fromEntries(
    Object.entries(formValues).map(([key, value]) => [key, parseFloat(value)])
  );

  const { amount, interest, repayPeriod, repayAmount, amortization } = numericalFormValues;
  const ready = Boolean(amount && interest && repayPeriod && repayAmount && amortization);

  const periodIterator = useMemo(() => new Array(periodsCount).fill(), [periodsCount]);
  const periodSettings = periodIterator.map((_, periodIndex) => {
    const alreadyAmortized = (amount / 12) * (amortization / 100) * repayPeriod * periodIndex;
    const alreadyRepayed = repayAmount * periodIndex;

    const toRepay = amount - alreadyAmortized - alreadyRepayed;
    const monthlyInterest = (toRepay / 12) * (interest / 100);
    const periodInterest = monthlyInterest * repayPeriod;
    return { toRepay, monthlyInterest, periodInterest };
  });

  return (
    <div>
      <form>
        <div>
          <label htmlFor="amount">Total amount to repay</label>
          <input name="amount" defaultValue="2635000" ref={register} />
        </div>
        <div>
          <label htmlFor="amortization">Yearly amortization</label>
          <input name="amortization" defaultValue="2" ref={register} />
        </div>
        <div>
          <label htmlFor="interest">Interest rate</label>
          <input name="interest" defaultValue="1.82" ref={register} />
        </div>
        <div>
          <label htmlFor="repayPeriod">Period length (in months)</label>
          <input name="repayPeriod" defaultValue="3" ref={register} />
        </div>
        <div>
          <label htmlFor="repayAmount">Amount repayed each period</label>
          <input name="repayAmount" defaultValue="100000" ref={register} />
        </div>
      </form>
      <div css={{ display: "flex", margin: 16 }}>
        <button onClick={() => removePeriod()}>Remove period</button>
        <button onClick={() => addPeriod()}>Add period</button>
      </div>
      {ready &&
        periodSettings.map(({ toRepay, monthlyInterest, periodInterest }, i) => {
          const acumInterest = periodSettings
            .slice(0, i + 1)
            .reduce((acum, { periodInterest }) => acum + periodInterest, 0);
          return (
            <div key={i}>
              <p>Period {i}</p>
              <p>
                To repay: <code>{toRepay}</code>
              </p>
              <p>
                Monthly interest: <code>{monthlyInterest}</code>
              </p>
              <p>
                Period interest: <code>{periodInterest}</code>
              </p>
              <p>
                Accumulated interest: <code>{acumInterest}</code>
              </p>
            </div>
          );
        })}
    </div>
  );
}
