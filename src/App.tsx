import { useState } from 'react';
import './App.css';
import { Window } from './window';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Window>
        {[...Array(100000).keys()].map((idx) => (
          <div key={idx}>{idx}</div>
        ))}
      </Window>
    </div>
  );
}

export default App;
