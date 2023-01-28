const express = require("express")
const router = express.Router()
const { createUser, userLogin , getuser ,followUser ,unfollowUser ,getfollowers,getfollowing} = require("../controllers/userController")

const {authentication, authorisation }= require("../middlewares/auth")

router.get("/test-me", (req, res) => {
    res.send("first api")
})

router.post("/register", createUser)

router.post("/login", userLogin)

router.post("/users/:username/follow" ,authentication ,authorisation ,followUser)

router.get("/users/:username" ,authentication ,authorisation ,getuser)

router.post("/users/:username/follow" ,authentication ,authorisation ,followUser);

router.delete("/users/:username/follow" , authentication ,authorisation, unfollowUser);

router.get("/users/:username/followers" ,authentication ,authorisation ,getfollowers)

router.get("/users/:username/following" ,authentication ,authorisation ,getfollowing)

module.exports = router;