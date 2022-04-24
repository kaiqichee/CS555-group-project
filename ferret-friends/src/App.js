import "./App.css";
import { useState } from "react";
import { ReactComponent as EmptyWateringCan } from "./assets/empty_can.svg";
import { ReactComponent as FullWateringCan } from "./assets/full_can.svg";
import { ReactComponent as Sapling } from "./assets/seedling.svg";
import { ReactComponent as SeedImage } from "./assets/seed.png"
import ReactAudioPlayer from "react-audio-player";
import bg from "./assets/bg.png";
const background = require("./background.mp3");

function App() {
  const [health, setHealth] = useState(1); // TODO: make sure plant can't be watered unless water_level >= 0
  const [seeds, setSeeds] = useState(0);
  const [water_level, setWater] = useState(0);
  const [fruit, setFruits] = useState(0);
  const [pfruit, setPFruits] = useState(0);
  const [bg_color, setBgColor] = useState(0);
  const [leaf_num, setLeaf] = useState(0);
  const SmallSizeLimit = 50;
  const MediumSizeLimit = 200;
  const value = 10;

  var colors = [
    {
      value: 1,
      label: "blue",
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
      label: "teal",
    },
  ];

  var ddlhandle = (e) => {
    let color = e.target.value;
    if (color === "blue") {
      setBgColor("#51ABF0");
    }
    else {
      setBgColor(color);
    }
  };



  // pruning the tree --> removing the leaves from the plant everytime 3 leaves are grown

  function pruneTree(leaf_num) {
    if (leaf_num == 5) {
      leaf_num = 0;
    }
  }


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

  function isRainDay(numberOfSeeds) {
    //Decides if it's a rain day or not
    var RainDay = false;
    (numberOfSeeds == 10) ? RainDay = true : RainDay = false;
    return RainDay
  }

  function growFruit() {
    if (water_level > 0) {
      setWater(water_level - 1)
      setFruits(fruit + 1)
    }
    else {
      alert("Collect More Water!")
    }
  }

  function renderPlants(number) {
    //Renders the plants
    var plant = [];
    for (var i = 0; i < number; i++) {
      plant.push(
        <div id={"plant" + i} className="plant">
          <Sapling />
        </div>
      );
    }
    return plant;
  }

  function collectWater() {
    if (water_level >= 10) {
      alert("Water Can Full!");
    } else {
      setWater(water_level + 1);
    }
  }



  function waterPlant() {
    if (water_level <= 0) {
      alert("Collect More Water!");
    } else {
      setWater(water_level - 1);
      setHealth(health + 1);
    }
    /* for every multiple of 3 there is a leaf being grown on the place (i.e. 3 water level means 1 leaf grown; 
    6 water level means another leaf is grown, therefore there would be 2 leaves) */
    if (water_level % 3 == 0) {
      setLeaf(leaf_num + 1);
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
        // overflow: "hidden",
        backgroundColor: bg_color,
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom",
        backgroundSize: "100% auto",
        flex: 1,
      }}
    >
      <ReactAudioPlayer src={background} autoPlay controls volume={0.15} />
      <div>
        <a style={{ display: 'flex', justifyContent: 'left', color: 'white' }}
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify({
              'Current Health': health,
              'Number of Seeds': seeds,
              'Water Level': water_level,
              'Fruit Plants': fruit
            })
          )}`}
          download="log.json"
        >
          {`Download Log`}
        </a>
        <div style={{ position: "absolute", top: "0" }}>
          <label htmlFor="colorSelect" style={{ color: "white" }}>
            Change Background Color
          </label>
          <select name="colorSelect" placeholder="blue"
            style={{ display: "flex", justifyContent: "left" }}
            onChange={ddlhandle}
          >
            {colors.map((color) => (
              <option value={color.label}>{color.label}</option>
            ))}
          </select>
          {/* <img src={Sun} height="200" width="200" /> */}
          <br />

        </div>
        <div style={{ justifyContent: "right", alignItems: "left", paddingLeft: "90%" }}>
          <button
            style={{
              height: 50,
              backgroundColor: "brown",
              borderWidth: 7,
              borderRadius: "50%",
              borderColor: "#E36851",
              color: "White",
              fontWeight: "bold",
            }}
            onClick={() => alert("Instructions \n1.) Collect water to fill up the watering can.\n2.)Water Plants to grow them\n3.)Watering plants lowers water levels\n4.)10 seeds causes a rainy day, increasing the garden health by 15 and growing more plants.\n5.)You can prune plants when number of leaves reaches 5, this will help maintain your garden.\n6.) Once you have 5 plants in garden, you can grow fruit.\n7.) Use drop down menu in the upper left corner to change your background color.")}>Instructions</button>
        </div>


      </div>
      <div>
        <h1 style={{ color: "white" }}>Welcome to Garden Builder</h1>
        {health >= value && (Math.floor(health / 10) > 1) ? (<h2> {Math.floor((health) / 10)} Fully Grown Plants</h2>) : (<h2> {Math.floor((health) / 10)} Fully Grown Plant</h2>)}
        <div className="plants" style={{ display: "flex" }}>{renderPlants(Math.floor(health / 10))}</div>
      </div>
      <div
        className="increment-screen"
      >
        <button
          style={{
            height: 50,
            backgroundColor: "teal",
            borderWidth: 7,
            borderRadius: "15%",
            borderColor: "#E36959",
            color: "white",
            fontWeight: "bold",
          }}
          className="water-plant"
          onClick={waterPlant}
        >
          {" "}
          Water Plant{" "}
        </button>
        <button
          style={{
            height: 50,
            backgroundColor: "#6eeb34",
            borderWidth: 7,
            borderRadius: "15%",
            borderColor: "#E36959",
            fontWeight: "bold",
          }}
          className="collect-water"
          onClick={collectWater}
        >
          {" "}
          Collect Water{" "}
        </button>
        <button
          style={{
            height: 50,
            backgroundColor: "#E36851",
            borderWidth: 7,
            borderRadius: "15%",
            borderColor: "#E36851",
            color: "White",
            fontWeight: "bold",
          }}
          className="buy-seeds"
          onClick={() => {
            if (isRainDay(seeds)) {
              setHealth(health + 15)
              alert("It's a rainy day!!!")
            }
            setSeeds((seeds > 9) ? seeds - 10 : seeds + 1)
          }}
        >
          {" "}
          Buy Seeds{" "}
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "10"
          }} >
          {water_level > 0 ? (
            <FullWateringCan style={{ height: "100px" }} />
          ) : (
            <EmptyWateringCan style={{ height: "100px" }} />
          )}

          <div style={{ paddingRight: "12%" }}>
            <h2 style={{ color: "navy" }}>{water_level} liters of water in the can</h2>
          </div>
        </div>

        <h2 style={{ color: "white", fontWeight: "bold", }}>Garden Health: {health}</h2>
        <h2 style={{ color: "white", }}>Garden Size: {returnSize(health)}</h2>
        <h2 style={{ color: "white", fontWeight: "bold", }}>Total Seeds: {seeds}</h2>
        <h2 style={{ color: 'white', fontWeight: "bold", }}>Total Leaves: {leaf_num}</h2>
        <h2 style={{ color: "white", fontWeight: "bold", }}>Total Fruit: {fruit}</h2>
        {
          leaf_num >= 5 && (
            <button
              style={{
                height: 50,
                backgroundColor: "#6eeb34",
                borderWidth: 7,
                borderRadius: 5,
                borderColor: "#E36959",
                fontWeight: "bold",
              }}
              onClick={() => setLeaf(0)}>
              {" "}Prune{" "}
            </button>
          )
        }
        {(health - 1) / 10 >= 5 && (
          <button
            style={{
              height: 50,
              backgroundColor: "orange",
              borderWidth: 7,
              borderRadius: 5,
              borderColor: "#E36959",
              fontWeight: "bold",
            }}
            className="grow-fruit"
            onClick={growFruit}
          >
            {" "}
            Grow Fruit{" "}
          </button>
        )}
        {fruit > 0 && (
          <button
            style={{
              height: 50,
              backgroundColor: "orange",
              borderWidth: 7,
              borderRadius: 5,
              borderColor: "#E36959",
              fontWeight: "bold",
            }}
            className="grow-fruit"
            onClick={() => setFruits(fruit - 1)}
          >
            {" "}
            Pick Your Grown Fruit{" "}
          </button>
        )}

        <br />
        <br />
        <br />
        <br />        <br />
        <br />        <br />
        <br />
        {health >= SmallSizeLimit && (
          <h2 style={{ color: "gold", textShadow: "3px 1px 3px black" }}>
            {" "}
            "It’s not the events of our lives that shape us, but our beliefs as
            to what those events mean"{" "}
          </h2>
        )}
        {seeds >= 100 && (
          <h2 style={{ color: "blue", textShadow: "3px 1px 3px black" }}>
            {" "}
            "Its your lucky day! It's Raining"{" "}
          </h2>
        )}
      </div>
    </div >
  );
}

export default App;
