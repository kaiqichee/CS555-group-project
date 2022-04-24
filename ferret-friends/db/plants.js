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
    waterPlant,
    killInsects, 
    fertilizer,
    deadPlant

}