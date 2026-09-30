const jwt=require("jsonwebtoken");

const authorized=(requiredRole) => {
    return (req,res,next) => {
        const userRole=req.user.role;
        if(userRole!==requiredRole) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to access this route"
            });
        }
        next();
    }
}

module.exports=authorized;