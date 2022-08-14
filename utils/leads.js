
const Form = require("../models/LeadForm");
const Surah=require("../models/Surah");

const surahData = require("./surah");

module.exports = async () => {
  let data = surahData;
  await data.map(async (surah) => {
    let checkForm = await Surah.findOneAndUpdate(
        { SurahID: surah.SurahID },
        {
            SurahIntro: SurahIntro,
            SurahID: surah.SurahID,
            SurahNameE: surah.SurahNameE,
            SurahNameU: surah.SurahNameU,
            Nazool: surah.Nazool,
        },
        {
          new: true,
          upsert: true,
        }
      );
  });
};
