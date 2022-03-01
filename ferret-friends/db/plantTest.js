const mongoCollections = require('../config/mongoCollections');
const plants = mongoCollections.plants;
let { ObjectId } = require('mongodb');
const plantFunctions = require('./plants');

async function waterplantDBTest(){
    //let x = await create(); -> dependent on the create plant function
    let newAmount = 3;
    plantFunctions.waterPlant(x._id, newAmount);
    const plantCollection = await plants();
    const plant = await plantCollection.findOne({_id:x.id});
    if(plant.water == newAmount){
        console.log("Test Passed: Plant water amount changed");
        return true;
    }
    else{
        console.log("Test Failed: Plant water amount not changed");
        return false;
    }

}

