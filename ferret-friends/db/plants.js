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