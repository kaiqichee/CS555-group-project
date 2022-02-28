const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
let { ObjectId } = require('mongodb');

async function updateName(id, newName){
    id=ObjectId(id);
    const userCollection = await users();
    const specificPerson = await userCollection.findOne({_id:id});
    let changedPerson = specificPerson;
    changedPerson.name = newName;
    const updatedPerson = await userCollection.updateOne({_id:id}, {$set:changedPerson});
    if (updatedPerson === 0){
        throw 'Name could not be changed!';
    }
    changedPerson._id=changedPerson._id.toString();
    return changedPerson;

}

/* Returns the amount of water the player has */
async function checkWater(id) {
    id = ObjectId(id);
    const userCollection = await users();
    const person = await userCollection.findOne({_id:id});
    return person.water
}

async function checkFertilizer(id) {
    id = ObjectId(id);
    const userCollection = await users();
    const person = await userCollection.findOne({_id:id});
    return person.fertilizer
}




module.exports ={
    updateName,
    checkWater,
    checkFertilizer
}