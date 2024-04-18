import User from "../models/UserSchema.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                message: "User already exists",
                success: false,
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashPassword });
        await newUser.save();

        res.status(201).json({
            message: "User created successfully!",
            success: true,
            user: newUser,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message,
        });
    }
};
export const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existUser = await User.findOne({ email });
        if (!existUser) {
            res.status(404).json({
                message: "user not exist",
                success: false,
            })
        } else {
            const comparePassword = await bcrypt.compare(password, existUser.password);

            if (!comparePassword) {
                res.status(400).json({
                    message: "password not match",
                    success: false
                })
            } else {

                const token = jwt.sign({ id: existUser._id,  }, process.env.JWT_SECRET, { expiresIn: "1d" });
                //* res.cookie("cookie name ""cookie  value",  { give a condition})
                res.cookie(String(existUser._id), token, {
                    path: "/",
                    expires: new Date(Date.now() +  3* 24 * 60 * 60 * 1000), //3 days
                    httpOnly: true,

                })
                res.status(200).json({
                    message: "login user successfully",
                    success: true,
                    user: existUser,
                    token,
                })
            }
        }

    } catch (error) {
        res.status(500).json({
            message: "Login user failed",
            success: false,
            error: error.message
        })

    }

}

// export const VerifyToken = async (req,res,next) => {
//     const cookies=req.headers.cookie;
//     if(!cookies){
//         return res.status(401).json({
//             message: "Unauthorized",
//             success: false
//         })
//     }
//     const token = cookies?.split("=")[1];
//     if(!token){
//         return res.status(401).json({
//             message: "Unauthorized",
//             success: false
//         })
//     }
//     const user = jwt.verify(token, process.env.JWT_SECRET);
//     if(!user){
//         return res.status(401).json({
//             message: "Unauthorized",
//             success: false
//         })
//     }
//     req.user = user;
//     next();

// }

export const VerifyToken = async (req, res, next) => {
    const cookies = req.headers.cookie;
    console.log("🚀 ~ file: UserController.js:116 ~ cookies:", cookies);
    const token = cookies?.split("=")[1];
    console.log("🚀 ~ file: UserController.js:118 ~ token:", token);

    // const header = req.headers['authorization'];
    // const token = header.split(" ")[1];
    if (!token) {
        return res.status(404).json({
            message: "token not found !",
            success: false,
        })
    }
    jwt.verify(String(token), process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(404).json({
                message: "Invalid token",
                success: false,
            })
        }
        console.log(user);
        req.id = user.id;
    })
    next();

}
export const getUser = async (req, res, next) => {
    const userId = req.id;
    let user;
    try {
        user = await User.findById(userId, "-password");
    } catch (error) {
        return new Error(error);
    }
    if (!user) {
        return res.status(404).json({
            message: "User not found",
            success: false,
        })
    }
    return res.status(200).json({ user });
}


export const Logout = async (req,res,next) => {

    const cookies = req.headers.cookie;
    const token = cookies?.split("=")[1];
    if(!token){
        return res.status(401).json({
            message: "Token not found !",
            success: false
        })
    }

    jwt.verify(String(token), process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(404).json({
                message: "Invalid token",
                success: false,
            })
        }

        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = " ";


        return res.status(200).json({
            message: "Logout successfully",
            success: true
        })
    })



}