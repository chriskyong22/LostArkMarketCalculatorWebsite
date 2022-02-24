import React from 'react';

import './Stylesheets/Public/App.css';
import { Categories } from "./Components/Categories"

function App() {
  return (
    <div className="App">
      <header>
        <h1>
          Market Calculator
        </h1>
      </header>
      <Categories/>
    </div>
  );
}

export default App;
