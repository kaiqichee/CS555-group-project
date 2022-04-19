const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
let { ObjectId } = require('mongodb');

// user should have fields:
// {_id: ObjectId,
// username: String,
// password: String
// plants: array of plant ObjectId's,
// money: Int}
//

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
    //parse id to make sure it is a valid ObjectId, if not return -1
    try {
        id=ObjectId(id);
    }
    catch (e) {
        return -1;
    }
    //get the user collection and specific user, return -1 if person doesn't exist
    const userCollection = await users();
    const specificPerson = await userCollection.findOne({_id:id});
    if (specificPerson == undefined){
        return -1;
    }
    //set new data to old data and change name
    let changedPerson = specificPerson;
    changedPerson.name = newName;
    //update user in db, error if update doesn't work
    const updatedPerson = await userCollection.updateOne({_id:id}, {$set:changedPerson});
    if (updatedPerson === 0){
        throw 'Name could not be changed!';
    }
    //stringify the id and return the object with new data
    changedPerson._id=changedPerson._id.toString();
    return changedPerson;
}

async function getUserByUsername(name){
    //get the user collection and specific user, return -1 if person doesn't exist
    const userCollection = await users();
    const specificPerson = await userCollection.findOne({username:name});
    if (specificPerson == undefined){
        return -1;
    }
    //stringify the id and return the user object
    specificPerson._id=specificPerson._id.toString();
    return specificPerson;
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
    updateWater,
    getUserByUsername
}