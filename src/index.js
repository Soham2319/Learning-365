import "dotenv/config";
import { app, BASE_API } from "./app.js";
import connectDB from "./db/index.js";

const PORT = process.env.PORT;

connectDB()
    .then(() => {
        app.listen(PORT || 8080, () => {
            console.log(`Server running on: http://localhost:${PORT || 8081}${BASE_API}`);
        });
    })
    .catch((error) => {
        throw new Error(`MongoDB Connection faild: ${error.message}`);
    });
