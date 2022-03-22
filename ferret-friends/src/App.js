import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
// For testing  if the plant is fully grown and seeing a positive quote we check if curren thealth is more than 10 .
// And also total plants will apper and be upgraded

function App() {
  const [health, setHealth] = useState(1); // TODO: make sure plant can't be watered unless water_level >= 0
  const [seeds, setSeeds] = useState(0);
  const [water_level, collectWater] = useState(0);


  const SmallSizeLimit = 50;
  const MediumSizeLimit = 200;

  function returnSize(health) {
    //Returns the current size of the plant
    if (health <= SmallSizeLimit && health > 0) {
      return "Small"
    } else if (health <= MediumSizeLimit) {
      return "Medium"
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

      <div className="increment-screen">
        <button
          style={{
            height: 50,
            backgroundColor: "teal",
            borderWidth: 7,
            borderRadius: 5,
            borderColor: "#E36959",
          }}
          className="water-plant"
          onClick={() => setHealth(health + 1)}
        >
          {" "}
          Water Plant{" "}
        </button>

        <br />
        <br />

        <button
          style={{
            height: 50,
            backgroundColor: "brown",
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
          onClick={() => collectWater(water_level + 1)}
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
        <br />
        <h2 style={{ color: "p" }}>Plant Size: {returnSize(health)}</h2>


        {health > SmallSizeLimit && (
          <h2 style={{ color: "cherry" }}>Total plant: {(health - 1) / 10} </h2> /*Total plant size*/
        )}

        <br />
        <br />


        {health >= SmallSizeLimit && <h2 style={{ color: "cherry" }}>Plant is fully grown</h2>}
        <br />
        <br />
        {health >= SmallSizeLimit && (
          <h2 style={{ color: "gold" }}>
            {" "}
            "It’s not the events of our lives that shape us, but our beliefs as to
            what those events mean"{" "}
          </h2>
        )}

        {seeds >= 100 && (
          <h2 style={{ color: "blue" }}>
            {" "}"Its your lucky day! It's Raining"
            {" "}
          </h2>
        )}


      </div>
    </div>
  );
}

export default App;
