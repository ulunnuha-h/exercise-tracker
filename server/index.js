require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const mongoose = require("mongoose")

const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(cors())

const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    autoIndex: true,
})
const connection = mongoose.connection
connection.once("open", () => {
    console.log("MongoDB is connected succesfully")
})

app.use(express.static(path.resolve(__dirname, "../client/dist")))

const users = require("./routes/user")
const exercises = require("./routes/exercise")
app.use("/api", users)
app.use("/api/exercise", exercises)

app.listen(port, () => {
    console.log("Server is running")
})
