import React, { useState } from "react";

import "./App.css";
import { RepaySimulationForm } from "./repay-simulation-form";
import { SimulationTable } from "./simulation-table";

function App() {
  const [settings, setSettings] = useState({
    amount: 2635000,
    amortization: 2,
    interest: 1.82,
    repayPeriod: 3,
  });

  const { amount, interest, amortization, repayPeriod } = settings;
  const ready = Boolean(amount && interest && repayPeriod && amortization);

  return (
    <div className="App">
      <RepaySimulationForm settings={settings} setSettings={setSettings} />
      {ready && <SimulationTable settings={settings} />}
    </div>
  );
}

export default App;
