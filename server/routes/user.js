const express = require("express")
const passport = require("passport")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user.model")

require("../config/passport")(passport)

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body

    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            throw new Error("Email is already used")
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            email,
            username,
            password: hashedPassword,
        })
        res.status(201).json({
            user,
            message: "New account registered succesfulyy",
        })
    } catch (error) {
        res.status(400).json({ message: error.toString() })
    }
})

router.post(
    "/login",
    passport.authenticate("local", { session: false }),
    (req, res) => {
        const { _id, username } = req.user

        jwt.sign(
            { _id, username },
            "tes",
            { expiresIn: "1h" },
            (err, token) => {
                if (err) {
                    return res.json({
                        message: "Failed to Login",
                        token: null,
                    })
                }

                res.json({
                    message: "Success to Login",
                    token,
                })
            }
        )
    }
)

router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const { _id } = req.user
        try {
            const user = await User.findById(_id)
            const { id, username } = user
            res.json({
                message: "Get profile succesfully",
                user: { id, username },
            })
        } catch (error) {
            res.status(401).message({ error })
        }
    }
)

module.exports = router
