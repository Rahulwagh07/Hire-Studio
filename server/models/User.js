const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            trim:true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            //required: true,
        },
        accountType: {
            type: String,
            enum: ["JobSeeker", "Creator", "Student"],
            required: true,
        },
        additionalDetails: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Profile",
        },
        jobs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Job",
            },
        ],

        token: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
        image: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema)