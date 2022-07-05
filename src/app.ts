import cors from "cors";
import { getCurrentInvoke } from "@vendia/serverless-express";
import express, { Request, Response } from "express";
import compression from "compression";
import dotenv from "dotenv";
import dotenvConversion from "dotenv-conversion";
import { runDev } from "./helpers/helper";
const MODE = process.env.MODE || "dev";

let myEnv;
if (MODE === "prod") {
	myEnv = dotenv.config();
} else {
	myEnv = dotenv.config({
		path: `${__dirname}/../.env.dev`,
	});
}

// handle environment variables
const env = dotenvConversion.make(myEnv).parsed;
const app = express();

// setting cors + express json parser
app.use(compression());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb" }));
dotenv.config();

// middleware to handle invalid json body
app.use((err, req, res, next) => {
	if (err) {
		console.log("Invalid Request data");
		return res.status(400).json({
			msg: "Invalid Request data",
			status: "failed",
			error: {
				exists: true,
			},
		});
	} else {
		return next();
	}
});

app.get("/", (req: Request, res: Response) => {
	const { event, context } = getCurrentInvoke();
	return res.json(event);
});

app.set("json spaces", 2);

// basic 200 response on index page
app.get("/", (req, res) => {
	return res.send({
		message: "Welcome to the Testapp",
		status: "success",
	});
});

// basic 200 response on index page
app.get("/ping", (req, res) => {
	return res.send({
		message: "pong",
		status: "success",
	});
});

// start server only in dev mode (prod mode is Lambda)
if (MODE === "prod") {
	console.log({
		message: `connected to serverless | mode:${MODE}`,
	});
	process.exit(0);
} else {
	app.listen(env.PORT, async () => {
		console.log({
			message: `connected to server ${env.PORT} | mode:${MODE}`,
		});
	});
}

export default app;
