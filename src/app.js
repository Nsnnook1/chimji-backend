require("dotenv").config();
const express = require("express");
const cors = require("cors"); //lib ป้องกันความปลอดภัย ไม่อนุญาติอให้คนอื่นเข้าไป
const morgan = require("morgan");
const authRoute = require("./routes/auth-route");
const adminRoute = require("./routes/admin-route");
const userRoute = require("./routes/user-route");
const errorMiddleware = require("./middleware/error");
const notfoundMiddleware = require("./middleware/not-found");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));

app.use("/auth", authRoute);
app.use("/admin", adminRoute);
app.use("/user", userRoute);

app.use(errorMiddleware);
app.use(notfoundMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running in port : ${port}`));
