const userRoute =(req,res) => {
    return res.status(200).json({
        success: true,
        message: "Welcome User",
        user: req.user
    });
}

module.exports=userRoute;