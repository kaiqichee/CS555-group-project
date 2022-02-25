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

module.exports ={
    updateName
}