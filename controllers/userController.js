const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')

// login callback
const loginContoller = async (req,res) => {
    try {
        const {email,password} = req.body
        const user = await userModel.findOne({email})

        if (!user) {
            return res.status(404).send('User not found!')
        }


        const isMatch = await bcrypt.compare(password,user.password)
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
        res.status(200).json({
            success:true,
            user : {
                id : user._id,
                name:user.name,
                email:user.email
            }
        })
    } catch (error) {
        console.error('Error in loginController:', error); // Log error for debugging
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again.',
        });
    }
}

//register callback
const registerController = async (req,res) => {
    try {
        const {name,email,password} = req.body

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success : false,
                message : 'Already have an account!'
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = userModel({
            name,
            email,
            password:hashedPassword
        })
        await newUser.save()
        res.status(201).json({
            success:true,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            }
        })
    } catch (error) {
        console.error('Error in registerController:', error); // Log error for debugging
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again.',
        });
    }
}

module.exports = {loginContoller,registerController}