import React from 'react';

import './Stylesheets/Public/App.css';
import { Table } from "./Components/Table"

function App() {
  return (
    <div className="App">
      <header>
        <h1>
          Market Calculator
        </h1>
      </header>
      <Table
      />
    </div>
  );
}

export default App;
