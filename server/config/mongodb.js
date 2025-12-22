import moongose from 'mongoose';

const connectDB = async () => {
    moongose.connection.on('connected', () => {
        console.log('MongoDB connected');
    });

    // MONGODB_URI đã bao gồm database name và authSource
    await moongose.connect(process.env.MONGODB_URI);
};

export default connectDB;