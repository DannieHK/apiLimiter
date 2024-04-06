import express from 'express';
import dotenv from 'dotenv/config';
import rateLimit from 'express-rate-limit';
const app = express();

app.use(express.json())
    .use(express.static('../client/public'))
    .use(express.urlencoded({ extended: true }))

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min.
    max: 1000, // Limit each IP to 100 requests per `window`, per 15 minutes because of the windowMs.
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(apiLimiter);

const PORT = process.env.PORT;
app.listen(PORT, async (error) => {
    if (error) {
        console.log("Error: ", error)
        return;
    }
    console.log("Server is running on port: ", PORT)
});
