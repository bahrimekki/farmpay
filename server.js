const express = require("express");
const app = express();
const path = require("path");

const connectDB = require("./config/connectDB");
const userRouter = require("./routes/userroute");
const loanRouter = require("./routes/loanroute");

app.use(express.json());
connectDB();
app.use("/api/users", userRouter);
app.use("/api/loans", loanRouter);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server raning on port ${port}`);
});
