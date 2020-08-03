import React, { useState } from "react";

import { InputFormStep } from "../../components/input-form-step";
import { RenderFirstChildOnly } from "../../components/render-first-child-only";

export function SimulationForm({
  onCreateSimulation,
}: {
  onCreateSimulation: (sim: LoanSimulation) => void;
}) {
  const [simulation, setSimulation] = useState<Partial<LoanSimulation>>({});
  function handleStepSubmit(attr: keyof LoanSimulation, value: string) {
    setSimulation({ ...simulation, [attr]: parseFloat(value) });
  }

  return (
    <RenderFirstChildOnly>
      {!simulation.amount && (
        <InputFormStep
          label="Specify the amount you want to borrow"
          onSubmit={(val) => handleStepSubmit("amount", val)}
        />
      )}
      {!simulation.interest && (
        <InputFormStep
          label="Specify the interest rate"
          onSubmit={(val) => handleStepSubmit("interest", val)}
        />
      )}
      {!simulation.interestBindingTime && (
        <InputFormStep
          label="Specify the interest binding time"
          onSubmit={(val) => handleStepSubmit("interestBindingTime", val)}
        />
      )}
      {!simulation.amortization && (
        <InputFormStep
          defaultValue="2"
          label="Specify the amortization rate"
          onSubmit={(val) => handleStepSubmit("amortization", val)}
        />
      )}
    </RenderFirstChildOnly>
  );
}
