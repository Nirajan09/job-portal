const { default: mongoose } = require("mongoose");

const connectToDB=async()=>{
    const connectionURL=process.env.MONGODB_URI
    mongoose.connect(connectionURL).then(()=>console.log("Connection is Successful")).catch((e)=>console.log("Something went wrong"));
}
export default connectToDB