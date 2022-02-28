import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {

  const [health, setHealth] = useState(1)

  return (
    <div className="App" style={{ height: '100%', position: 'absolute', left: '0px', width: '100%', overflow: 'hidden' }}>
      <h1 style={{ color: "white" }}>Welcome to Garden Builder</h1>
      <br />
      <div className="increment-screen">
        <button style={{ height: 50, backgroundColor: "#6eeb34", borderWidth: 7, borderRadius: 5, borderColor: "#E36959" }} className="water-plant"
          onClick={() => setHealth(health + 1)}> Water Plant </button>
        <br />
        <h2 style={{ color: "white" }}>Current Health: {health}</h2>

        <button style={{ height: 50, backgroundColor: "red" }} className="deprive-plant"
          onClick={() => setHealth(health - 1)}> lower health (not for production/for testing) </button>
      </div>
    </div>
  );
}




export default App;
