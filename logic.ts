import dotenv from "dotenv";
import dotenvConversion from "dotenv-conversion";

let myEnv;
if (process.env.NODE_ENV === "dev") {
	myEnv = dotenv.config({
		path: `${__dirname}/.env.dev`,
	});
} else {
	myEnv = dotenv.config();
}

const env = dotenvConversion.make(myEnv);

console.log(env);
