const express = require('express')
const { loginContoller, registerController } = require('../controllers/userController')

//router object
const router = express.Router()

//routers

//POST || login
router.post('/login',loginContoller)

//POST || register
router.post('/register',registerController)

//export
module.exports = router