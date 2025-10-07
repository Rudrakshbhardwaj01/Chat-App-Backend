import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt //.jwt as we named the cookie jwt

        if (!token) {
            return res.status(400).json({
                message: "Unauthorized- No token provided"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(400).json({
                message: "Unauthorized- Invalid token"
            })
        }

        const user = await User.findById(decoded.userId).select("-password") //fetches everything but the password.

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        req.user=user

        next()
    }
    catch (e) {
        console.log("Error in protectRoute middleware", e.message);
        return res.status(500).json({
                message:"Internal sever error"
            })
    }
}