import React, { useState } from "react";
import styled from "styled-components/macro";

import "./App.css";
import { RepaySimulationForm } from "./repay-simulation-form";
import { SimulationTable } from "./simulation-table";

const Header = styled.div({
  display: "flex",
  alignItems: "center",
});

function App() {
  const [settings, setSettings] = useState({
    amount: 2635000,
    amortization: 2,
    interest: 1.82,
    repayPeriod: 3,
  });
  const [totalInterest, setTotalInterest] = useState();

  const { amount, interest, amortization, repayPeriod } = settings;
  const ready = Boolean(amount && interest && repayPeriod && amortization);

  return (
    <div className="App">
      <Header>
        <RepaySimulationForm settings={settings} setSettings={setSettings} />
        <div>
          <span>Total interest: {totalInterest}</span>
        </div>
      </Header>
      {ready && <SimulationTable settings={settings} setTotalInterest={setTotalInterest} />}
    </div>
  );
}

export default App;
