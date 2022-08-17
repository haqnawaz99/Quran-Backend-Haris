const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const Surah = require('./models/Surah');
const Ayah = require('./models/Ayah');
const User = require('./models/User');


const surahData = require("./utils/surah");
const quranData = require("./utils/quran");

const connectDB = require('./config/db');
dotenv.config({ path: './config/config.env' });

connectDB();
const importData = async() => {
    try {
        await Surah.insertMany(surahData);
        await Ayah.insertMany(quranData);
        const salt = await bcrypt.genSalt(10);
        let password = await bcrypt.hash(process.env.CODE_PASSWORD, salt);
        let user = await User.create({
            first_name: 'super',
            last_name: 'admin',
            email: 'admin@quran.com',
            password: password,
            user_type:"super-admin",
            dob: '00/00/0000',
            phone: '03xx-xxxxxxx',
            verified: true,
            access_portal: true
        });
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