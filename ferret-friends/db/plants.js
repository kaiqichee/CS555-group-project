const mongoCollections = require('../config/mongoCollections');
const plants = mongoCollections.plants;
let { ObjectId } = require('mongodb');

// user should have fields:
// {_id: ObjectId,
// pid: String,
// owner: ObjectId,
// water: Int (1-5),
// alive: Bool}
//

async function getOrCreatePlant() {
    const plantCollection = await plants();
    const plant = await plantCollection.findOne();
    if (!plant) {
      let newPlant = { name: "Tree", water: 0, health: 0 };
      const insertInfo = await plantCollection.insertOne(newPlant);
      newPlant._id = insertInfo.insertedId;
      return newPlant;
    } else {
      return plant;
    }
}

//updates the amount of water the plant with given id has
async function updatePlant(id, water, health){
    //error check?
    id=ObjectId(id);
    const plantCollection = await plants();
    const specificPlant = await plantCollection.findOne({_id:id});
    let changedPlant = specificPlant;
    changedPlant.water = changedPlant.water + water;
    changedPlant.health = health;

    const updatedPlant = await plantCollection.updateOne({_id:id}, {$set:changedPlant});
    if (updatedPlant === 0) {
        throw 'Plant could not be changed';
    }
    console.log(updatedPlant);
    changedPlant._id=changedPlant._id.toString();
    return updatedPlant;
}

async function addPlant(pid, owner){
    const plantCollection = await plants();
    let newPlant = {
        pid: pid,
        owner: ObjectId(owner),
        water: 5,
        alive: true
    }
    const insertedPlant = await plantCollection.insertOne(newPlant);
    if (insertedPlant === 0){
        throw 'Could not add plant';
    }
    //const newId = insertedPlant.insertedId;
    //const plant=await this.getById(newId.toString());
    //plant._id=plant._id.toString();
    return "Successfully added plant";
}

//plant dies if there is not enough care. 
async function deadPlant(amount) {
    const plantCollection = await plants()
    if(deadPlant === 0)  {
        throw 'Not enough care for the plant';
    }
}


//pack fertilizer in dirt  
const dirt = mongoCollections.dirt;
async function fertilizer (id,amount) {
    const plantCollection = await plants()
    const specificPlant = await plantCollection.findOne({_id:id});
    let fertilizedPlant = specificPlant; 
    fertilizedPlant._id = specificPlant.dirt; 

}

//kill insects 
const insect = mongoCollections.insects;
async function killInsects(id, amount) {
    const plantCollection = await plants();
    if(killInsects == 0) {
        throw 'Insects are dead'; 
    }
    //work in progress
}




//Buy fertilizer
//WIP

function buyFertilizer(nameOfFertilizer, priceOfFertilizer) {
    // List the fertilizer details
    let fertilizer = {
        name: nameOfFertilizer,
        price: Float32Array(),
    }
    return fertilizer;
}




module.exports = {
    updatePlant
}