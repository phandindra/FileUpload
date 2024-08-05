const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    },
    email:{
        type:String
    }
})

fileSchema.post("save", async function(doc){
    try{
        console.log("doc",doc);
        let transpoter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            }
        })
        let info = await transpoter.sendMail({

            from:`Perfect`,
            to:doc.email,
            subject:"New file Uploaded to cloudinary",
            html:`<h2>Hello JEE</h2><>File Uploaded VIEW HERE: <a href="${doc.imageUrl}">Image URL</a></p>`
        })
        console.log("INFO",info);

    }
    catch(error){
        console.log(error);
    }
})


 const File = mongoose.model("File",fileSchema);
 module.exports = File;
 