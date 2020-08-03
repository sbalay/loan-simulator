import React from "react";
import { useLocalStorage } from "react-use";
import styled from "styled-components/macro";

import "./App.css";
import { SimulationForm } from "./screens/simulation-form";
import { SimulationsPanel } from "./screens/simulations-panel";

const AppContainer = styled.div({
  backgroundColor: "#282c34",
  minHeight: "100vh",
  fontSize: "calc(10px + 2vmin)",
  color: "white",
});

export function App() {
  const [simulations, setSimulations] = useLocalStorage("simulations", []);

  function createSimulation(simulation) {
    setSimulations([...simulations, simulation]);
  }

  function editSimulation(simulation) {
    const index = simulations.indexOf(simulation);
    setSimulations([[...simulations.slice(0, index), simulation, ...simulations.slice(index + 1)]]);
  }

  return (
    <AppContainer>
      {simulations.length ? (
        <SimulationsPanel simulations={simulations} onEditSimulation={editSimulation} />
      ) : (
        <SimulationForm onCreateSimulation={createSimulation} />
      )}
    </AppContainer>
  );
}
