import "./App.css";
import { useState } from "react";
import { ReactComponent as EmptyWateringCan } from "./assets/empty_can.svg";
import { ReactComponent as FullWateringCan } from "./assets/full_can.svg";
import { ReactComponent as SeedImage } from "./assets/seed.png"
import ReactAudioPlayer from "react-audio-player";
import Sun from "./hhJq_B.gif";
const background = require("./background.mp3");

//temp user to test display username function
let tempUser =  {
  "_id": "1234567890",
  "username": "Bob Smith",
  "password": "password1234",
  "plants": [],
  "money": 0}

function App() {
  const [health, setHealth] = useState(1); // TODO: make sure plant can't be watered unless water_level >= 0
  const [seeds, setSeeds] = useState(0);
  const [water_level, setWater] = useState(0);
  const [fruit, setFruits] = useState(0);
  const [pfruit, setPFruits] = useState(0);
  const [bg_color, setBgColor] = useState(0);
  const [leaf_num, setLeaf] = useState(0);
  const [user, setUser] = useState(tempUser); //when login feature is fully implemented, set this to logged in user
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

  var welcome = () => {
    //if there is a logged in user, greet them by name
    if (user){
      return `Hello, ${user.username}! `
    }
    else {
      return "";
    }
  };

  // pruning the tree --> removing the leaves from the plant everytime 3 leaves are grown

  function pruneTree(leaf_num){
    if (leaf_num == 3){
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



  function waterPlant() {
    if (water_level <= 0) {
      alert("Collect More Water!");
    } else {
      setWater(water_level - 1);
      setHealth(health + 1);
    }
    /* for every multiple of 3 there is a leaf being grown on the place (i.e. 3 water level means 1 leaf grown; 
    6 water level means another leaf is grown, therefore there would be 2 leaves) */
    if(water_level % 3 == 0) {
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
        // backgroundRepeat: "space",
        flex: 1,
      }}
    >
      <ReactAudioPlayer src={background} autoPlay controls volume={0.15} />

      <a style = {{display: 'flex', justifyContent: 'left', color: 'white'}}
            href={`data:text/json;charset=utf-8,${encodeURIComponent(
              JSON.stringify({'Current Health': health,
                              'Number of Seeds': seeds,
                              'Water Level': water_level,
                              'Fruit Plants': fruit })
            )}`}
            download="log.json"
          >
            {`Download Log`}
          </a>
      <div>
        <button
          onClick={buttonHandle}
          style={{
            display: "flex",
            justifyContent: "left",
            height: 35,
            backgroundColor: bg_color,
            borderWidth: 7,
            borderRadius: 5,
            borderColor: "white",
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
        {/* <img src={Sun} height="200" width="200" /> */}
      </div>
      <div>
        <h1 style={{ color: "white" }}>{welcome()}Welcome to Garden Builder</h1>
        <br />
        <h2 style={{ color: "Red" }}>Total plant: {(health) / 10} </h2>
        {health >= value && (Math.floor(health / 10) > 1) ? (<h2> {Math.floor((health) / 10)} Fully Grown Plants</h2>) : (<h2> {Math.floor((health) / 10)} Fully Grown Plant</h2>)}
      </div>
      <div
        className="increment-screen"
        style={{
          backgroundImage: `url(${Sun})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <button
          style={{
            height: 50,
            backgroundColor: "teal",
            borderWidth: 7,
            borderRadius: 5,
            borderColor: "#E36959",
            //backgroundimage: URL("./assets/seed.png"),
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
          onClick={() => {
            setSeeds((seeds > 9) ? seeds - 10 : seeds + 1)
            if (isRainDay(seeds)) {
              setHealth(health + 15)
            }
          }}
        >
          {" "}
          Buy Seeds{" "}
        </button>
        <br />

        <br />

        <br />
        <h2 style={{ color: "white" }}>Current Health: {health}</h2>
        <br />
        <h2 style={{ color: "white" }}>Number of Seeds: {seeds}</h2>
        <br />
        <h2 style={{color: 'white'}}>Leaf Size: {leaf_num}</h2>
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

          <div style={{ paddingRight: "40%" }}>
            <h2 style={{ color: "white" }}>Water Level: {water_level}</h2>
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

          </div>
        </div>
        
        <br />
        <h2 style={{ color: "white", fontSize: 30, }}>Plant Size: {returnSize(health)}</h2>
        <h2 style={{ color: "white" }}>Fruit Plants: {fruit}</h2>
        {health > SmallSizeLimit && (
          <h2 style={{ color: "cherry" }}>
            Total plant: {(health - 1) / 10}{" "}
          </h2> /*Total plant size*/
        )}
        {
          leaf_num >= 4 && (
            <button
            style={{
              height: 50,
              backgroundColor: "#6eeb34",
              borderWidth: 7,
              borderRadius: 5,
              borderColor: "#E36959",
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
    </div >
  );
}

export default App;
