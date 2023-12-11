const express = require("express");
const userController = require("../controllers/userController");
const {sendEmailToUsers}=require("../controllers/userController")
const router = express.Router();

router.post("/create", userController.create);


router.post("/sendEmail",sendEmailToUsers);


module.exports = router;
