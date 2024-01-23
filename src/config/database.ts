import mongoose, { connect, disconnect } from 'mongoose';

mongoose.set('runValidators', true);

async function connectDB() {
    try {
        await connect(process.env.MONGODB_CONNECTION_STRING!);

        console.log('MongoDB Connected to Database');
    } catch (e) {
        console.log('something went wrong with the database');

        console.error(e);
    }
}

async function clearDB() {
    try {
        const collections = mongoose.connection.collections;
        for (const collectionName in collections) {
            const collection = collections[collectionName];
            await collection.deleteMany({});
        }
    } catch (e) {
        console.log('Database is cleared');
    }
}

async function disconnectDB() {
    try {
        await disconnect();
    } catch (e) {
        console.error(e);
    }
}

export { connectDB, disconnectDB, clearDB };
