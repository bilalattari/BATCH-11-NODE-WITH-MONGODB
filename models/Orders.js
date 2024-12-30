import mongoose from 'mongoose';

// Define the schema for the order document
const orderSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        default: mongoose.Types.ObjectId,
    },
    name: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    }
});

// Create the model using the schema
const Order = mongoose.model('Orders', orderSchema);

// Export the model for use in other parts of the application
export default Order;
