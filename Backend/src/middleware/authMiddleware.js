import User from "../models/User.js";
import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
        if (!token) { return res.status(401).json({ success: false, message: "Unauthorized: No token provided" }); }
        
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) { return res.status(401).json({ success: false, message: "Invalid Access Token" }); }
        
        req.user = user;
        next();
    } catch (error) {
        let message = error.name === 'TokenExpiredError' ? "Access token expired" : "Invalid access token";
        return res.status(401).json({ success: false, message });
    }
};
export default verifyJWT;