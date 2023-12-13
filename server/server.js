const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
require('dotenv').config()
const fs = require("fs")


// const url = require('url')
// const https = require('https')

const port = 8080

var Schema = mongoose.Schema

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log(`LOCKED N LOADED: db ${process.env.MONGO_URI} at port ${port}`))



const URL = mongoose.model("TinyUrl", new Schema({
    ogUrl: String,
    shortUrl: String,
    created: Date,
    accessed: Date,
    userId: { type: Schema.Types.ObjectId, ref: 'USERS' },
    pageViews: Number,
    logs: [{
        visitor: String,
        accessed: Date,
    }]
}))

const USERS = mongoose.model("users", new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    password: String,
    admin: Boolean,
    created: Date
}))





app.use(bodyParser())
app.use(cors())


//////////////////////    Handles URL Create     ////////////////////


app.post("/api/create", (req, res) => {
    // console.log("/create.", req.body)
    let date = new Date()


    URL.findOne({ shortUrl: req.body.shortUrl })

        .then(doc => doc

            ?

            (
                res.json({ error: "Short Url already in use" })
            )

            :

            (
                URL.create(new URL({
                    ogUrl: req.body.ogUrl,
                    shortUrl: req.body.shortUrl,
                    created: new Date(),
                    accessed: new Date(),
                    userId: req.body.userId
                })
                )
                    .then(success =>
                        //  console.log("success", success.shortUrl))

                        res.json({ success }))

            )
        )


        .catch(err => console.log("err", err))
})



//////////////////////    Handles URL Delete    ////////////////////


app.post("/api/delete", (req, res) => {
    // console.log("delete", req.body.id)
    // URL.find()
    //     .where("shortUrl")
    //     .equals(req.body.shortUrl)
    URL.findOneAndDelete(req.body.id)
        // .then(res => console.log(">>", res))
        .then(deleted => res.json({ deleted }))


})

//////////////////////    Handles URL Redirect     ////////////////////

app.post("/url", (req, res) => {
    // console.log("req.body", req.body.short)
    URL.findOneAndUpdate({ shortUrl: req.body.short }, 
        { accessed: new Date(), "$inc": {"pageViews" : 1}, "$push" : {"logs" : {'visitor' : req.ip, "accessed" : new Date()}}})

        .then(doc => {
            // console.log("doc", doc)
            if (doc) {
                console.log("doc hit", doc.logs)
                // doc.pageViews
                // doc.logs.push({
                //     visitor: req.ip,
                //     accessed: new Date()
                // })
                // doc.save()
                res.json(doc)
                // console.log(doc)
            } else if (doc == null) {
                // console.log("no doc")
                res.json({ msg: "no addy at the path of :" })
            }
        })

})



//////////////////////    Handles User Registration    ////////////////////


app.post("/api/register/user", (req, res) => {
    // console.log("/regis/GET", req.body)
    USERS.findOne({ username: req.body.username })
        .then(user => user
            ?
            (
                res.json({ message: "User name already exsists" })
            )
            : (res.json({ message: "valid username" }))
        )
})


//////////////////////    Handles User Creation    ////////////////////



app.post("/api/register", (req, res) => {
    // console.log("/register.", req.body)

    USERS.findOne({ username: req.body.username })

        .then(user => user
            ?
            (
                res.json({ message: "User name already exsists" })
            )
            :
            (
                USERS.create(new USERS({
                    username: req.body.username,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: req.body.password,
                    admin: false,
                    created: new Date()
                }))
            )
        )
    // res.redirect('http://127.0.0.1:3000/')


})
//////////////////////    Handles User LOGIN    ////////////////////

app.post("/api/login", (req, res) => {
    // console.log("/login", req.body)
    USERS.findOne({ username: req.body.username })
        /////WHAT IF USER NO EXSIST

        // .then(user => console.log("useer", user))
        .then(user => user.password === req.body.password
            ?
            (
                // res.json({ message: "HIAZH"})
                res.json({
                    message: "Authed",
                    username: user.username,
                    fullname: user.firstName + " " + user.lastName,
                    id: user._id,
                    created: user.created
                })
            )
            : (
                res.json({ message: "Password Invalid" })
            )
        )
})

//////////////////////    Handles User Validation    ////////////////////

app.post("/api/userCheck", (req, res) => {
    USERS.findOne({ username: req.body.username })
        .then(user => user
            ?
            (
                res.json({ message: "Please enter your password" })
            )
            : (res.json({ message: "UserName does not exsist" }))
        )
})


//////////////////////    Search for User Docs  ////////////////////

app.post("/api/search", (req, res) => {
    console.log("search/req.body", req.body)
    URL.find()
        .where("userId")
        .equals(req.body.id)
        .exec()
        .then(found => res.json(found))
        .catch(err => console.log("err", err))
    ////switch to findby ID and serve up the logs? no search urls by id and serve up


})

//////////////////////   PlayGround... not for project   ////////////////////



app.get("/redirect", (req, res) => {
    res.redirect("https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes")
})

// app.post("/api/file", (req, res) => {
//     console.log("file", req.body)
// .then(response => res.json(response))
// fs.createReadStream(req.body).pipe(fs.createWriteStream("test.js"))
// fs.writeFile("test.js", req.body, (error) => {
//     if(error){
//         console.log("err", error)
//     }
//     console.log("write comnplete")
// })
// })




//////////////////////    Boiler Plate    ////////////////////

app.use(bodyParser.urlencoded({ extendended: true }))


app.listen(port, () => {
    console.log(`Server is running on ${port} port`)
})