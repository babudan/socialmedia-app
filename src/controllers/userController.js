const userModel = require("../models/userModel")
const check = require("../utils/validator")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


const createUser = async function (req, res) {
    try {
        let data = req.body
        if (!check.isValidRequestBody(data)) { return res.status(400).send({ status: false, message: "Please enter data to create user" }) }
        let { fullname, username, email, password } = data

        if (!fullname) { return res.status(400).send({ status: false, message: "fullname is mandatory" }) }
        if (!check.isValidname(fullname)) { return res.status(400).send({ status: false, message: "fullname should be in Alphabets" }) };
        let checkfullname = await userModel.findOne({ fullname });
        if (checkfullname) return res.status(400).send({ status: false, message: "This fullname is already present" });

        if (!username) { return res.status(400).send({ status: false, message: "usernamename is mandatory" }) }
        if (!check.isValidUserName(username)) { return res.status(400).send({ status: false, message: "usernamename should be valid" }) };
        let checkusername = await userModel.findOne({ username });
        if (checkusername) return res.status(400).send({ status: false, message: "This username is already present" });


        if (!email) { return res.status(400).send({ status: false, message: "email is mandatory" }) };
        if (!check.isVAlidEmail(email)) { return res.status(400).send({ status: false, message: "Email should be valid" }) };
        let checkEmail = await userModel.findOne({ email });
        if (checkEmail) return res.status(400).send({ status: false, message: "This email is already registered" });

        if (!password) { return res.status(400).send({ status: false, message: "Password is mandatory" }) };
        if (!check.isValidPassword(password)) { return res.status(400).send({ status: false, message: "Password should be valid" }) };
        const encryptedPassword = await bcrypt.hash(password, 10)     //salt round is used to make password more secured and by adding a string of 32 or more characters and then hashing them

        const userDetails = { fullname, username, email, password: encryptedPassword }
        const newUser = await userModel.create(userDetails);
        return res.status(201).send({ status: true, message: "User created successfully", data: newUser });

    } catch (error) {
        console.log(error);
        return res.status(500).send({ status: false, message: error.message })
    }

}
// ============================================= user login -------------------------------------------------------------------


const userLogin = async function (req, res) {

    try {
        let data = req.body
        const { email, password } = data

       if (!check.isValidRequestBody(data)) { return res.status(400).send({ status: false, message: "Please enter data to create user" }) }

        if (!check.isVAlidEmail(email)) { return res.status(400).send({ status: false, message: "Email should be valid" }) };
        
        if (!check.isValidPassword(password)) { return res.status(400).send({ status: false, message: "Password should be valid" }) };

        let user = await userModel.findOne({email})
        if (!user) return res.status(400).send({ status: false, message: "credentials is wrong" })

        let hashedPassword = await bcrypt.compare(password, user.password)
        if (!hashedPassword) return res.status(400).send({ status: false, message: "password is incorrect" })

        let token = jwt.sign({
            userId: user._id,
        }, 'om,arsh,suraj',
            { expiresIn: "24hr" })

        return res.status(200).send({ status: true, message: 'logged in successfully', data: token })

    }
    catch (error) {
        res.status(500).send({ status: false, Error: error.message })
    }
}


//----------------------------------------- get user -------------------------------------------------

const getuser = async function (req,res) {
    try{
        let data = req.params.username;
        
        if (!check.isValidUserName(data)) { return res.status(400).send({ status: false, message: "usernamename should be valid" }) };

        let finduser = await userModel.findOne({username : data});
        if(!finduser) return res.status(400).send({ status: false, message: "This username is not exist" });

        return res.status(200).send({status :true , data : finduser  ,message : "get the user data succesfully"})

    }
    catch (error) {
        res.status(500).send({ status: false, Error: error.message })
    }
}




//---------------------------  follow user-------------------------------------

const followUser = async function (req, res) {
    try {

        let selfId = req.decodedToken.userId
        let persontofollow = req.params.username;
        
        let user = await userModel.findOne({username : persontofollow});
        if(!user) return res.status(400).send({status : false ,message : "the user you wants to follow is not exist"});
        let curruser = await userModel.findById(selfId);
        
        console.log(user.username === curruser.username);
        if (user.username === curruser.username) {
            return res.status(400).send({ status: false, message: "you cant follow yourself" })
        }

        if(user.followers.includes(curruser.username)) return res.status(400).send({status:false ,message : "you already follow this user"})
          console.log(curruser.username);
        let followuser = await user.updateOne({ $push : {followers : curruser.username}} , { new: true });
        console.log(followUser);
        let followinguser = await curruser.updateOne( {$push : {followings : persontofollow}} , { new: true });

        return res.status(200).send({ status : true ,message : `you are now following ${persontofollow}`})

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

 //---------------------------  unfollow  user-------------------------------------

const unfollowUser = async function (req, res) {
    try {
        let selfId = req.decodedToken.userId
        let persontounfollow = req.params.username;
        
        let user = await userModel.findOne({username : persontounfollow});
        if(!user) return res.status(400).send({status : false ,message : "the user you wants to unfollow is not exist"});
        let curruser = await userModel.findById(selfId);
        
        if (user.username === curruser.username) {
            return res.status(400).send({ status: false, message: "you cant unfollow yourself" })
        }

        if(!user.followers.includes(curruser.username)) return res.status(400).send({status:false ,message : "you already unfollow this user"})
          
        let unfollowuser = await user.updateOne({ $pull : {followers : curruser.username}} , { new: true });
        let unfollowinguser = await curruser.updateOne( {$pull : {followings : persontounfollow}} , { new: true });

        return res.status(200).send({ status : true ,message : `you are now unfollowing ${persontounfollow}`})


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//------------------------------- followerlist -------------------------------------------------------
const getfollowers = async function (req,res){
    try {
        let data = req.params.username;
        
        if (!check.isValidUserName(data)) { return res.status(400).send({ status: false, message: "usernamename should be valid" }) };

        let finduser = await userModel.findOne({username : data});
        if(!finduser) return res.status(400).send({ status: false, message: "This username is not exist" });

        let listoffollowers = finduser.followers;
        
        return res.status(200).send({ status : true ,followers: listoffollowers ,message : "you got the list of followers"})

    }
    catch (error){
        return res.status(500).send({ status: false, message: error.message })
    }
}

//---------------------------------- followinglist----------------------------------------------------------------------
const getfollowing = async function (req,res){
    try {
        let data = req.params.username;
        
        if (!check.isValidUserName(data)) { return res.status(400).send({ status: false, message: "usernamename should be valid" }) };

        let finduser = await userModel.findOne({username : data});
        if(!finduser) return res.status(400).send({ status: false, message: "This username is not exist" });

        let listoffollowings = finduser.followings;
        
        return res.status(200).send({ status : true ,followings : listoffollowings ,message : "you got the list of followings"})

    }
    catch (error){
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createUser, userLogin ,getuser ,followUser,unfollowUser,getfollowers,getfollowing }