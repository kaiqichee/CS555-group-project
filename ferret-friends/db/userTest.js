const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
let { ObjectId } = require('mongodb');
const userFunctions = require('./users');

async function changeUsernameTest(){
    //let x = await create(); -> dependent on the create username function
    let newName = "amanda";
    userFunctions.updateName(x._id, newName);
    const userCollection = await users();
    const person = await userCollection.findOne({_id:x.id});
    if(person.name == newName){
        console.log("Test Passed: Username changed");
        return true;
    }
    else{
        console.log("Test Failed: Username not changed");
        return false;
    }

}

