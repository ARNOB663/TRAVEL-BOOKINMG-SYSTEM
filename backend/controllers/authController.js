import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


//user registration
export const register = async (req, res) => {
    try {

        //hashing password
const salt = bcrypt.genSaltSync(10)
const hash = bcrypt.hashSync(req.body.password, salt)


        const newUser = new User ({
            username : req.body.username ,
            email: req.body.email,
            password : hash,
            photo : req.body.photo
        })
        
        await newUser.save()
        res.status(200).json({success:true, message : 'Successfully created'})
        
    } catch (error) {
        res.status(500).json({success:false, message : 'Failed to create. Try again'})
        
    }
}
//user login
// export const login = async (req, res) => {
//         const email = req.body.email

//     try {
//         const user = await User.findOne({email})
//         // if user doesn't exist
//         if(!user){
//             return res.status(404).json({success:false, message:'User not found'})
//         }


//         //if user is exist then check the password or compare the password
//         const checkCorrectPassword =await bcrypt.compare(req.body.password, user.password)

//         // if password is incorrect

//         if(!checkCorrectPassword) {
//             return res.status(401).json({success:false, message:'Incorrect email or password'})
//         }
//         const {password, role, ...rest} = user._doc

//           //create jwt token 
//         const token = jwt.sign({id:user._id, role:user.role},process.env.JWT_SECRET_KEY, { expiresIn : "15d"})

//         res.cookie('accessToken',token, {
//             httpOnly: true,
//             expires : token.expiresIn}).status(200).json({ token, data: {...rest}, role,})
        
//     } catch (error) {
        
//         res.status(500).json({success:false, message:'Failed to login'})
//     }
// }





export const login = async (req, res) => {
    const { email, password } = req.body;

    // Check if email and password match the admin credentials
    if (email === 'admin@gmail.com' && password === '12345') {
        // Create a mock admin user response
        const admin = {
            _id: 'admin_id', // You can use a fixed ID or generate one
            username: 'admin',
            email: 'admin@gmail.com',
            role: 'admin'
        };

        // Generate JWT token for admin
        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET_KEY, { expiresIn: '15d' });

        // Send the token and admin data
        return res.cookie('accessToken', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days expiry
            secure: process.env.NODE_ENV === 'production', // Only use secure cookies in production
        }).status(200).json({
            success: true,
            message: 'Admin login successful',
            data: { username: admin.username, email: admin.email, role: admin.role },
            token
        });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if password is correct
        const checkCorrectPassword = await bcrypt.compare(password, user.password);
        if (!checkCorrectPassword) {
            return res.status(401).json({ success: false, message: 'Incorrect email or password' });
        }

        // Remove password and role from user object before sending response
        const { password: userPassword, role, ...rest } = user._doc;

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" });

        // Set the token as a cookie and send response
        res.cookie('accessToken', token, {
            httpOnly: true,
            expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days expiry
            secure: process.env.NODE_ENV === 'production', // Only secure cookies in production
        }).status(200).json({
            success: true,
            message: 'Login successful',
            data: { ...rest },
            role,
            token
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to login', error: error.message });
    }
};
