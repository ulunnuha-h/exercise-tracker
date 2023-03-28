const moongose = require("mongoose")

const userSchema = new moongose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
    }
)

const User = moongose.model("User", userSchema)

module.exports = User
