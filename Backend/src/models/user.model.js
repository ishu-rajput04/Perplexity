import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "username is required."]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "email is required."]
    },
    password: {
        type: String,
        select: false,
        required: [true, "password is required."]
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})


// pre 
userSchema.pre("save", async function () {
    if (!this.isModified("password")) {
        return;
    }
    this.password = await bcrypt.hash(this.password, 10);
})

// custom method
userSchema.methods.comparePassword = async function (enterPswd) {
    return await bcrypt.compare(enterPswd, this.password)
}

const userModel = mongoose.model("Users", userSchema);

export default userModel