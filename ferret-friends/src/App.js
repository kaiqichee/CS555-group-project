import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App" style={{ height: '100%', position: 'absolute', left: '0px', width: '100%', overflow: 'hidden' }}>
      <h1 style={{ color: "white" }}>Welcome to Garden Builder</h1>
      <br />
      <div className="increment-screen">
        <button style={{ height: 50, backgroundColor: "#6eeb34", borderWidth: 7, borderRadius: 5 }} className="water-plant"> Water Plant </button>
        <br />
        <text></text>
      </div>
    </div>
  );
}

export default App;
