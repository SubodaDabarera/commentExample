const User = require('../models/userModel')


const userControl = {

    //get all users
    getUsers : async(req, res) => {
        try{
            const users = await User.find()

            res.json({users})
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    },

    //sign in part
    signIn: async(req,res) => {
        try{
            const {email, password} = req.body
            
            const user = await User.findOne({email})
            
            if(user){
                if(password == user.password){
                    res.json({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        isAdmin: user.isAdmin,
                    })   
                }
                else{
                    console.log("incorrect password")
                    return res.status(500).json({msg: "invalid password"})
                }
            }
            else{
                console.log("incorrect email")
                return res.status(500).json({msg: "invalid Email"})
            }
            
        }catch(err){
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = userControl