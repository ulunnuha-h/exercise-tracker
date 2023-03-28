const express = require("express")
const router = express.Router()
const Exercise = require("../models/exercise.model")
const passport = require("passport")
require("../config/passport")(passport)

router.use(passport.authenticate("jwt", { session: false }))

router.get("/", async (req, res) => {
    const {username} = req.user
    try {
        const exercises = await Exercise.find({username})
        res.json(exercises)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.post("/add", async (req, res) => {
    const {username} = req.user

    const newExcercise = new Exercise({
        username,
        title: req.body.title,
        description: req.body.description,
        duration: Number(req.body.duration),
        date: Date.parse(req.body.date),
    })

    try {
        await newExcercise.save()
        res.json({ message: "Exercise addedd succesfully!" })
    } catch (error) {
        res.status(400).json(error)
    }
})

router
    .route("/:id")
    .get(async (req, res) => {
        const {id} = req.params

        try {
            const exercise = await Exercise.findById(id)
            res.json(exercise)
        } catch (error) {
            res.status(400).json(error)
        }
    })
    .delete(async (req, res) => {
        try {
            await Exercise.findByIdAndDelete(req.params.id)
            res.json({
                message: `Exercise with id ${req.params.id} deleted successfully`,
            })
        } catch (error) {
            res.status(400).json(error)
        }
    })
    .put(async (req, res) => {
        try {
            const exercise = await Exercise.findById(req.params.id)
            exercise.username = req.body.username
            exercise.title = req.body.title
            exercise.description = req.body.description
            exercise.duration = Number(req.body.duration)
            exercise.date = Date.parse(req.body.date)
            exercise.save()
            res.json({ message: "Exercise updated succesfully" })
        } catch (error) {
            res.status(400).json(error)
        }
    })

module.exports = router
