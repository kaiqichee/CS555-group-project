import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
// For testing  if the plant is fully grown and seeing a positive quote we check if curren thealth is more than 10 .
// And also total plants will apper and be upgraded

function App() {
  const [health, setHealth] = useState(1); // TODO: make sure plant can't be watered unless water_level >= 0
  const [seeds, setSeeds] = useState(0);
  const [water_level, setWater] = useState(0);
  const value = 10;

  function waterPlant() {
    if (water_level <= 0) {
      alert("Not enough water!")
    }
    else {
      setWater(water_level - 1)
      setHealth(health + 1)
    }
  }

  return (
    <div
      className="App"
      style={{
        height: "100%",
        position: "absolute",
        left: "0px",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <h1 style={{ color: "white" }}>Welcome to Garden Builder</h1>
      <br />

      {health > value && (
        <h2 style={{ color: "Red" }}>Total plant: {(health - 1) / 10} </h2>
      )}
      {health >= value && <h2>Plant is fully grown</h2>}
      {health >= value && (
        <h2>
          {" "}
          It’s not the events of our lives that shape us, but our beliefs as to
          what those events mean{" "}
        </h2>
      )}

      <div className="increment-screen">
        <button
          style={{
            height: 50,
            backgroundColor: "#6eeb34",
            borderWidth: 7,
            borderRadius: 5,
            borderColor: "#E36959",
          }}
          className="water-plant"
          onClick={waterPlant}
        >
          {" "}
          Water Plant{" "}
        </button>
        <br />
        <button
          style={{ height: 50, backgroundColor: "red" }}
          className="deprive-plant"
          onClick={() => setHealth(health - 1)}
        >
          {" "}
          lower health (not for production/for testing){" "}
        </button>
        <br />
        <button
          style={{
            height: 50,
            backgroundColor: "#63db34",
            borderWidth: 7,
            borderRadius: 5,
            borderColor: "#E36851",
          }}
          className="buy-seeds"
          onClick={() => setSeeds(seeds + 1)}
        >
          {" "}
          Buy Seeds{" "}
        </button>
        <br />
        <button
          style={{
            height: 50,
            backgroundColor: "#6eeb34",
            borderWidth: 7,
            borderRadius: 5,
            borderColor: "#E36959",
          }}
          className="collect-water"
          onClick={() => setWater(water_level + 1)}
        >
          {" "}
          Collect Water{" "}
        </button>

        <br />
        <h2 style={{ color: "white" }}>Current Health: {health}</h2>
        <br />
        <h2 style={{ color: "white" }}>Number of Seeds: {seeds}</h2>
        <br />
        <h2 style={{ color: "white" }}>Water Level: {water_level}</h2>
      </div>
    </div>
  );
}

export default App;
