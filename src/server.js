require("express-async-errors");
require("dotenv/config");

const express = require("express");
const cors = require("cors");

const AppError = require("./utils/AppError");
const routes = require("./routes");

(async () => {

    const app = express();
    const cors = require("cors");

    const corsOptions = {
        origin: ["https://gp7.netlify.app", "http://localhost:5173"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true
    };
    
    app.use(cors(corsOptions));
    
    app.use(express.json());
    app.use(routes);

    app.use((error, request, response, next) => {
        if(error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: "Erro",
                message: error.message
            });
        }

        console.error(error);

        return response.status(500).json({
            status: "Erro",
            message: "Erro interno do servidor"
        });
    });

    const PORT = process.env.PORT || 3333;
    app.listen(PORT, () => console.log(`Server is running ${PORT}`));
})();