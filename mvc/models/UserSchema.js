import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provider the name"],
        minLength: [5, "name minimum 5 characters"],
        maxLength: [40, "name maximum 40 characters"],
    },
    email: {
        type: String,
        required:true,
        unique: true,
        // match: [
        //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        //     "Please provide a valid email",
        // ],
    },
    password: {
        type: String,
        required: [true, "Please provide the password"],
        minLength: [5, "Password must be at least 5 characters long"],
    },
}, {
    timestamps: true,
})

// UserSchema.pre('save', function (next) {
//     this.email = this.email.toLowerCase().includes('@');
//     next();
// });
const User = mongoose.model("User", UserSchema);
export default User;