const express=require("express");
const pool=require("../db");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {generateAccessToken,generateRefreshToken}=require("../utils/tokens");

// Signup controller

const signup = async(req,res) => {
    try {
        const {name, email, password}=req.body;

        if(!email || !password || !name) {
            return res.status(400).json({
                success: false,
                message: "All field required"
            });
        }

        const existing_user=await pool.query(
            `SELECT * FROM users WHERE email=$1`,[email]
        );

        if(existing_user.rowCount>0) {
            return res.status(409).json({
                success: false,
                message: "User already exists" 
            });
        }

        const hashed_password=await bcrypt.hash(password,10);
        await pool.query(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)`,
    [name, email, hashed_password]
);

        res.status(200).json({
            success: true,
            message: "User created Successfully"
        });
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Login controller 

const login = async(req,res) => {
    try {
        const {email,password}=req.body;
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All Fields required"
            });
        }

        const existing=await pool.query(
            `SELECT * FROM users WHERE email=$1`,[email]
        );
        const user=existing.rows[0];
        if(existing.rowCount===0) {
            return res.status(401).json({
                success: false,
                message: "User does not exists"
            });
        }
        const isMatch=await bcrypt.compare(password,user.password_hash);
        if(!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }

         const accessToken = generateAccessToken(user);
         const refreshToken = generateRefreshToken(user);

         const refreshTokenExpiry = new Date(
         Date.now() + 7 * 24 * 60 * 60 * 1000);

         await pool.query(
            `INSERT INTO refresh_tokens(user_id, token, expires_at) VALUES($1,$2,$3)`,[user.id,refreshToken, refreshTokenExpiry]
         );

        return res.status(200).json({
    success: true,
    message: "Login successful",
    accessToken,
    refreshToken,
    user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }
});
    }
    catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Generate new access token after expiry
const generateNewAccessToken=async(req,res) => {
    try {
        const {refreshToken}=req.body;

        if(!refreshToken) {
            return res.status(401).json({
                success: false,
                message: "Refresh token is required"
            });
        }

        const verified=jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        const present_token=await pool.query(
            `SELECT * FROM refresh_tokens WHERE token=$1`,[refreshToken]
        );

        if(present_token.rowCount===0) {
            return res.status(401).json({
                success: false,
                message: "No token present in DB"
            });
        }

       const tokenRecord=present_token.rows[0];

        if (new Date(tokenRecord.expires_at) < new Date()) {
            return res.status(401).json({
                success: false,
                message: "Refresh token expired"
            });
        }

        const userResult=await pool.query(
            `SELECT * FROM users WHERE id=$1`,[tokenRecord.user_id]
        );

        if(userResult.rowCount===0) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        const user=userResult.rows[0];

        const newAccessToken=generateAccessToken(user);
        return res.status(200).json({
            success: true,
            newAccessToken
        });
    }
    catch(error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
}

module.exports={signup,login,generateNewAccessToken};

