const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const pool=require("./db");
const authRoutes=require("./routes/authRoutes");
const otherRoutes=require("./routes/otherRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api",otherRoutes);

// app.get("/", async (req, res) => {
//     try {
//         const result = await pool.query("SELECT NOW()");

//         res.json({
//             message: "API is working",
//             databaseTime: result.rows[0]
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             message: "Database connection failed"
//         });
//     }
// });

// app.get("/test-insert", async (req, res) => {
//     try {
//         const result = await pool.query(
//             `INSERT INTO users (name, email, password_hash)
//              VALUES ($1, $2, $3)
//              RETURNING *`,
//             ["Test User", "test@gmail.com", "dummy-hash"]
//         );

//         res.json(result.rows[0]);
//     } catch (error) {
//         console.error(error);

//         res.status(500).json({
//             message: "Insert failed"
//         });
//     }
// });


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});