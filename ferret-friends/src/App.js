import "./App.css";
import { useState } from "react";
import { ReactComponent as EmptyWateringCan } from "./assets/empty_can.svg";
import { ReactComponent as FullWateringCan } from "./assets/full_can.svg";
import ReactAudioPlayer from 'react-audio-player';
const background = require('./background.mp3');


function App() {
  const [health, setHealth] = useState(1); // TODO: make sure plant can't be watered unless water_level >= 0
  const [seeds, setSeeds] = useState(0);

  const [water_level, setWater] = useState(0);
  const [fruit, setFruits] = useState(0);
  const [pfruit, setPFruits] = useState(0);
  const [bg_color, setBgColor] = useState(0);
  const SmallSizeLimit = 50;
  const MediumSizeLimit = 200;
  const value = 10;
  
  var colors = [
    {
      value: 1,
      label: "teal",
    },
    {
      value: 2,
      label: "green",
    },
    {
      value: 3,
      label: "gray",
    },
    {
      value: 4,
      label: "#51ABF0",
    },
  ];
  var [inputValue, setInputValue] = useState(colors[0].label);
  var [bgcolor, setbgColor] = useState(colors[0].label);

  var ddlhandle = (e) => {
    setInputValue(e.target.value);
  };

  var buttonHandle = () => {
    setBgColor(inputValue);
  };

  function returnSize(health) {
    //Returns the current size of the plant
    if (health <= SmallSizeLimit && health > 0) {
      return "Small";
    } else if (health <= MediumSizeLimit) {
      return "Medium";
    } else {
      return "Big";
    }
  }

  function waterPlant() {
    if (water_level <= 0) {
      alert("Not enough water!");
    } else {
      setWater(water_level - 1);
      setHealth(health + 1);
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
        backgroundColor: bg_color,
      }}
    >
      <ReactAudioPlayer src={background} autoPlay controls volume={0.15} />
      <div>
        <button
          onClick={buttonHandle}
          style={{
            display: "flex",
            justifyContent: "left",
            height: 35,
            backGroundcolor: "teal",
            borderWidth: 7,
            borderRadius: 5,
            borderColor: "#E36959",
          }}
        >
          {" "}
          Change Background Color{" "}
        </button>
        <select
          style={{ display: "flex", justifyContent: "left" }}
          onChange={ddlhandle}
        >
          {colors.map((color) => (
            <option value={color.label}>{color.label}</option>
          ))}
        </select>
      </div>
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
            backgroundColor: "teal",
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {water_level > 0 ? (
            <FullWateringCan style={{ height: "100px" }} />
          ) : (
            <EmptyWateringCan style={{ height: "100px" }} />
          )}
          <h2 style={{ color: "white" }}>Water Level: {water_level}</h2>
        </div>
        <br />
        <h2 style={{ color: "p" }}>Plant Size: {returnSize(health)}</h2>
        <h2 style={{ color: "black" }}>Fruit Plants: {fruit}</h2>
        {health > SmallSizeLimit && (
          <h2 style={{ color: "cherry" }}>
            Total plant: {(health - 1) / 10}{" "}
          </h2> /*Total plant size*/
        )}
        {(health - 1) / 10 >= 5 && (
          <button
            style={{
              height: 50,
              backgroundColor: "#6eeb34",
              borderWidth: 7,
              borderRadius: 5,
              borderColor: "#E36959",
            }}
            className="grow-fruit"
            onClick={() => setFruits(fruit + 1)}
          >
            {" "}
            Grow fruit tree{" "}
          </button>
        )}
        {fruit > 10 && (
          <button
            style={{
              height: 50,
              backgroundColor: "#6eeb34",
              borderWidth: 7,
              borderRadius: 5,
              borderColor: "#E36959",
            }}
            className="grow-fruit"
            onClick={() => setFruits(fruit - 1)}
          >
            {" "}
            Pick the grown fruit{" "}
          </button>
        )}

        <br />
        <br />
        <br />
        {health >= SmallSizeLimit && (
          <h2 style={{ color: "cherry" }}>Plant is fully grown</h2>
        )}
        <br />
        <br />
        {health >= SmallSizeLimit && (
          <h2 style={{ color: "gold" }}>
            {" "}
            "It’s not the events of our lives that shape us, but our beliefs as
            to what those events mean"{" "}
          </h2>
        )}
        {seeds >= 100 && (
          <h2 style={{ color: "blue" }}>
            {" "}
            "Its your lucky day! It's Raining"{" "}
          </h2>
        )}
      </div>
    </div>
  );
}

export default App;
