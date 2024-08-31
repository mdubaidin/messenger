import mongoose, { connect, disconnect } from 'mongoose';

mongoose.set('runValidators', true);

async function connectDB() {
    try {
        const connectionString = process.env.MONGODB_CONNECTION_STRING;

        if (!connectionString)
            return console.log('Connection Failed: Connection string must be provided');

        await connect(connectionString);

        console.log('MongoDB Connected');
    } catch (e) {
        console.log('something went wrong in database');
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
