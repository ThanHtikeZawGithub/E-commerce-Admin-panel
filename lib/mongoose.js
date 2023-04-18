import mongoose from 'mongoose';


const mongooseConfig = () => {
    //check whether connection is already on or not 
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();  
    } else {
        const uri = process.env.MONGODB_URI;
        return mongoose.connect(uri);
    }
}

export default mongooseConfig;