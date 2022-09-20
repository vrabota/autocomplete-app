import React from 'react';

import Autocomplete from './components/Autocomplete';

function App() {
  return (
    <div className="App">
      <Autocomplete />
      <ul className="features">
        <li>Fetch all countries async with debounce</li>
        <li>Loading state</li>
        <li>No Items state</li>
        <li>Keyboard navigation</li>
        <li>Outside click handler</li>
        <li>Highlight matching text</li>
      </ul>
    </div>
  );
}

export default App;
