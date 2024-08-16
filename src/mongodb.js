const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/ORIGINAL")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connect");
})

    
const LogInSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    mobno:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    adress:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }

})

const collection = new mongoose.model("Collection",LogInSchema)


const VendorSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    lname:{
        type:String,
        required:true
    },
    mobno:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    adress:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    image:{
        type:Buffer,
        required:true
    }
})

const vendorCollection = new mongoose.model("vendorCollection",VendorSchema)



module.exports={collection, vendorCollection }