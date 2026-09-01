const express = require("express"); const cors = require("cors"); const helmet = require("helmet"); const morgan = require("morgan"); require("dotenv").config({ path: "../.env" }); const db = require("../config/db");
const app = express(); const PORT = process.env.PORT || 5000;
app.use(helmet()); app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173", credentials: true })); app.use(express.json()); app.use(morgan("dev"));
db.connect((err) => { if (err) { console.error("DB connection failed:", err.stack); return; } console.log("Connected to PostgreSQL"); });
app.get("/api/health", (req, res) => res.json({ status: "ok", timestamp: new Date().toISOString() }));
app.use("/api/foods", require("./routes/foods")); app.use("/api/orders", require("./routes/orders")); app.use("/api/auth", require("./routes/auth")); app.use("/api/surveys", require("./routes/surveys"));
app.use((err, req, res, next) => { console.error(err.stack); res.status(err.status || 500).json({ error: err.message || "Internal server error" }); });
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
