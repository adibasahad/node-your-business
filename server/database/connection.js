//mongodb+srv://adibasahad4:<db_password>@cluster0.5acef.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

const mongoose = require('mongoose')

function RunServer () {
    try{
        mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB")
        }
        catch (error) {
            console.log(error.messege)
            }
    }

    module.exports = RunServer