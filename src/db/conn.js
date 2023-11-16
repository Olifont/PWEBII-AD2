const mongoose = require("mongoose");

async function main(){
    try{

        mongoose.set("strictQuery", true)

        await mongoose.connect("mongodb+srv://luciane:itfBBaJn0mIK9XrT@cluster0.lg5top1.mongodb.net/?retryWrites=true&w=majority");

        console.log("conectado ao banco");
    }catch (error){
        console.log(`Error: ${error}`);
    }
}

module.exports = main