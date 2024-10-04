const mongoose = require('mongoose')

const connectDB = async () =>  {
    await mongoose.connect('mongodb://localhost:27017/HOTEL_DB',{

      // useNewUrlParser: true, // Optional, but recommended for newer versions
      // useUnifiedTopology: true, // Optional, but recommended for newer versions
    })
    .then(()=>{
      console.log("DATABASE CONNECTED SUCESSFULLY");
    })
    .catch((error)=>{
      console.log("DATABASE CONNECTION FAILED",error);
    })
}
module.exports = connectDB;

//comment added for test purpose


///////=================ALTERNATIVE WAY====================///////


// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017/HOTEL_DB', {
//       useNewUrlParser: true,   // Optional, but recommended
//       useUnifiedTopology: true // Optional, but recommended
//     });
//     console.log("DATABASE CONNECTED SUCCESSFULLY");
//   } catch (error) {
//     console.log("DATABASE CONNECTION FAILED", error);
//   }
// }

// module.exports = connectDB;
