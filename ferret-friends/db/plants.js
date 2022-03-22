const mongoCollections = require('../config/mongoCollections');
const plants = mongoCollections.plants;
let { ObjectId } = require('mongodb');


//updates the amount of water the plant with given id has
async function waterPlant(id, amount){
    //error check?
    id=ObjectId(id);
    const plantCollection = await plants();
    const specificPlant = await plantCollection.findOne({_id:id});
    changedPlant = specificPlant;
    //if too much water for plant -- case
    changedPlant.water = changedPlant.water+amount;

    const updatedPlant = await plantCollection.updateOne({_id:id}, {$set:changedPlant});
    if (updatedPlant === 0){
        throw 'Plant could not be watered';
    }
    console.log(updatedPlant);
    changedPlant._id=changedPlant._id.toString();
    return updatedPlant;
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
    fertilizedPlant = specificPlant; 
    fertilizedPlant._id = specificPlant.dirt; 
    //work in progress  

}

//kill insects 
const insect = mongoCollections.insects;
async function killInsects(id, amount) {
    const plantCollection = await plants();
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
async function buyFertilizer(amount){
    id =  
}




//plant dies if there is not enough care. 
async function deadPlant(amount) {
    const plantCollection = await plants()
    //still need to work on this. 
}


//pack fertilizer in dirt 
//fix this 
const dirt = mongoCollections.dirt;
async function fertilizer (amount) {
    const plantCollection = await plants()
    let dirt = await empty()
    

}




module.exports = {
    waterPlant
}