const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
let { ObjectId } = require('mongodb');

/* Create a user with given username */
async function createUser(name) {
    let user = {
        name: name,
        water: 0,
        fertilizer: 0,
    }
    const usersCollection = await users();
    const insertInfo = await usersCollection.insertOne(user);
    if (!insertInfo.acknowledged || !insertInfo.insertedId) {
        throw "Could not add user";
    }

    return insertInfo.insertedId.toString();

}

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



//Create user Account
// https://docs.mongodb.com/manual/tutorial/create-users/
// https://docs.mongodb.com/manual/reference/method/db.createUser/
//WIP
// db.createUser(
//     {	user: "Player 1",
//         pwd: passwordPrompt(),
//         roles:[
//             {role: "Player 1" , db:"users"}
//         ]
//     }
// )

//Create user Login
// https://docs.mongodb.com/manual/reference/method/db.auth/
//WIP
// db.auth( 
//     {   user: <usernam />,
//         pwd: passwordPrompt(),
//         mechanism: <authentication mechanism />,
//         digestPassword: <boolean />
//     } 
// )




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

async function updateWater(id, water_level) {
    id = ObjectId(id);
    const userCollection = await users();
    await userCollection.updateOne(
        { _id: id },
        { $set: { water: water_level } }
    )
}



module.exports ={
    createUser,
    updateName,
    checkWater,
    checkFertilizer,
    updateWater
}