const authRoute = require("./routes/auth-route");
const express = require("express");
const app = express();

app.use(express.json());
app.use("/auth", authRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running in port : ${port}`));
