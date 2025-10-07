import jwt from "jsonwebtoken"

export const genToken=(userId,res)=>{
    const token=jwt.sign({
        userId
    },process.env.JWT_SECRET,{
        expiresIn:"7d" //token expires in 7days
    })

   res.cookie("jwt",token,{
    maxAge:7*24*60*60*1000, // in miliseconds
    httpOnly:true, //makes it strict
    sameSite:"strict", //makes it secure
    secure:process.env.NODE_ENV!=="development" //http or https
    }) 
    return token;
}