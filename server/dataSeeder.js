const mongoose = require('mongoose');
const connectDb = require('./config/db');
const dummyUsers = require('./config/dummyUsers');
const colors = require('colors');
require('dotenv').config()
const User = require('./models/User');

connectDb();


const importData =async () => {
    try {
        await User.deleteMany({});
        await User.insertMany(dummyUsers);
        console.log('Data Imported Successfully'.green.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error:${error.message}`.red.inverse);
        process.exit(1)
    }
    
}

const destroyData = async()=>{
    try {
        await User.deleteMany({});
        console.log('Data destroyed...'.red.inverse)
        process.exit()
    } catch (error) {
        console.log(`Error:${error.message}`.red.inverse);
        process.exit(1)
    }
}

if(process.argv[2]==='-d'){
    destroyData();
}else{
    importData();
}

