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
async function deadPlant(id, amount) {
    id=ObjectId(id); 
    const plantCollection = await plants()
    const specificPlant = await plantCollection.findOne({_id:id}, {$set:changedPlant});
    changedPlant = specificPlant; 
    if(deadPlant === 0)  {
        throw 'Not enough care for the plant';
    }
    console.log(deadPlant); 
    changedPlant._id=changedPlant._id.toString();
    return deadPlant; 
}


//pack fertilizer in dirt  
async function fertilizer (id,amount) {
    id=ObjectId(id); 
    const plantCollection = await plants()
    const specificPlant = await plantCollection.findOne({_id:id});
    changedPlant = specificPlant; 

    if(fertilizer == 0) {
        throw 'Need to pack fertilizer in dirt' ; 
    }
    console.log(fertilizer); 
    changedPlant._id=changedPlant._id.toString();
    return(fertilizer); 
    

}

//kill insects 
const insect = mongoCollections.insects;
async function killInsects(id, amount) {
    id=ObjectId(id); 
    const plantCollection = await plants()
    const specificPlant = await plantCollection.findOne({_id:id}, {$set:changedPlant});
    changedPlant = specificPlant; 
    if(killInsects == 0) {
        throw 'Insects are dead'; 
    }
    console.log(killInsects); 
    changedPlant._id=changedPlant._id.toString();
    return killInsects; 
}


module.exports = {
    waterPlant,
    killInsects, 
    fertilizer,
    deadPlant

}