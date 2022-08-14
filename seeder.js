const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Surah = require('./models/Surah');
const Ayah = require('./models/Ayah');

const surahData = require("./utils/surah");
const quranData = require("./utils/quran");




const connectDB = require('./config/db');
dotenv.config({ path: './config/config.env' });

connectDB();

const importData = async() => {
    try {
        await Surah.insertMany(surahData);
        await Ayah.insertMany(quranData);

        console.log('Data imported successfully...');
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

const deleteData = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI, async() => {
            await mongoose.connection.db.dropDatabase();
            console.log('Database cleared successfully...');
            process.exit()
        })
    } catch (error) {
        console.log(error);
    }
}

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}