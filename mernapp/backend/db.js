const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://simranrajput:bPaHtxfZtteNJQIP@cluster0.casgexj.mongodb.net/FoodApp?retryWrites=true&w=majority&appName=Cluster0";
async function mongoDB() {
  try {
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 10000 });
    console.log("Connected to MongoDB");

    const fetched_data = await mongoose.connection.db.collection("food_items");

    fetched_data.find({}).toArray(async function (err, data) {
      const foodCategory=await mongoose.connection.db.collection("foodCategory");
      foodCategory.find({}).toArray(function(err,catData){
        if (err) {
           console.log(err);
         } else {
           global.food_items = data;
           global.foodCategory=catData;
       }
      })
      //if (err) {
       // console.log(err);
     // } else {
       // global.food_items = data;
        //console.log(global.food_items);
    //  }
    });
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
}

module.exports = mongoDB;
