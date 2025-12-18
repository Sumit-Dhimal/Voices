import 'dotenv/config'; // IMP use this or otherwise there will be problem with passport.js
//dotenv.config();
import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";
import passport from 'passport';
import './config/passport.js';

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

// body parsing middleware
app.use(express.json());
app.use(urlencoded({extended: true}));
app.use(cookieParser());
app.use(passport.initialize());

// standard routes
app.get('/', (req, res) => {
    res.send("Connected successfully");
})

// routes
app.use('/api/users', userRoutes);

// error handling middlware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})