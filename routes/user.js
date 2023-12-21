const express = require("express");
const userController = require("../controllers/userController");
const {sendEmailToUsers,sendEmailToUsersSpecificOnes}=require("../controllers/userController")
const router = express.Router();

router.post("/create", userController.create);


router.post("/sendEmail",sendEmailToUsers);


router.post("/sendToSpcificUser/:id",sendEmailToUsersSpecificOnes)



module.exports = router;
