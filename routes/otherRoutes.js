const express=require("express");
const router=express.Router();

const userRoute=require("../controllers/userController");
const adminRoute=require("../controllers/adminController");
const protect=require("../middleware/authMiddleware");
const authorized=require("../middleware/roleMiddleware");

router.get("/profile",protect,authorized("USER"),userRoute);
router.get("/dashboard",protect,authorized("ADMIN"),adminRoute);

module.exports=router;