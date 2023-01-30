const express = require('express')

const router = express.Router()


router.get('/' ,(req,res) =>{
    res.status(200).send({msg : "all ok"})
})

module.exports = router