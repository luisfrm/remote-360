require("dotenv").config();
const express = require("express");
const { json } = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3000;

/**
 * Creates and configures an Express application.
 * 
 * The application is configured with the following middlewares:
 * - CORS: Allows requests from specified origins and supports credentials.
 * - JSON: Parses incoming requests with JSON payloads.
 * - Morgan: Logs HTTP requests in the 'dev' format.
 * - Cookie Parser: Parses cookies attached to the client request object.
 * 
 * The application has a single route:
 * - GET /: Responds with "Hello World!".
 * 
 * The application listens on the specified PORT and logs a message when it starts.
 * 
 * @returns {void}
 */
const createApp = () => {
	const app = express();

	const allowedOrigins = ['http://localhost:5173'];

	app.use(cors({
		origin: (origin, callback) => {
			if (allowedOrigins.includes(origin) || !origin) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true,
	}));
	app.use(json());
	app.use(morgan("dev"));
	app.use(cookieParser());


	app.get("/", (req, res) => {
		res.send("Hello World!");
	});

	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
};

module.exports = createApp;
