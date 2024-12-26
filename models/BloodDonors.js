import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define the Blood Donor Schema
const bloodDonorSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
        },
        bloodGroup: {
            type: String,
            required: [true, 'Blood group is required'],
            enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], // Blood group validation
        },
        age: {
            type: Number,
            required: [true, 'Age is required'],
            min: [18, 'Age must be at least 18'],
        },
        diseases: {
            type: [String], // Array of strings
            default: [],
        },
        lastDonated: {
            type: Date,
            default: null,
        },
        weight: {
            type: Number,
            required: [true, 'Weight is required'],
            min: [45, 'Weight must be at least 45 kg'], // Minimum weight validation
        },
        medicines: {
            type: [String], // Array of strings for medicines
            default: [],
        },
        takingAntibiotic: {
            type: Boolean,
            required: true, // Explicitly required to track antibiotic usage
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true, // Ensures email uniqueness
            match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'], // Email validation regex
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Create the model from the schema
const BloodDonor = model('BloodDonor', bloodDonorSchema);

export default BloodDonor;
