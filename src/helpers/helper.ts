export const MODE = process.env.MODE || "dev";

export const withMode = (dev: any, prod: any) => {
	if (MODE === "prod") {
		return prod;
	}
	return dev;
};

export const withModeObject = (object: any) => {
	if (MODE === "prod") {
		return object.prod;
	}
	return object.dev;
};

export const timeNow = () => Date.now();

export const devError = (Error: Error) => {
	const errr = {
		exists: true,
		error: {
			message: Error.message,
			error: Error,
			trace: runDev(Error.stack),
		},
	};
	return errr;
};

export const getToday = () => {
	const [date, month, year] = new Date()
		.toLocaleDateString("en-GB")
		.split("/");
	return `${year}-${month}-${date}`;
};

export const io = {
	company: "pasterock",
};

export const lenCheck = (variable, min, max) => {
	if (variable.length >= min && variable.length <= max) {
		return true;
	}
	return false;
};

export const isEmpty = (arg) => {
	try {
		if (arg == null) {
			return true;
		} else if (typeof arg === "undefined") {
			return true;
		} else if (arg.length === 0) {
			return true;
		} else if (typeof arg === "object" && Object.keys(arg).length === 0) {
			return true;
		}
		return false;
	} catch (error) {
		return false;
	}
};

export const hasOwn = (obj: unknown, prop: string) => {
	return Object.prototype.hasOwnProperty.call(obj, prop);
};

export const minMaxCheck = (object: any, min?: number, max?: number) => {
	let isValid = true;
	// min length check
	if (min && typeof min === "number") {
		// check if variable has property length
		if (!hasOwn(object, "length")) {
			if (!(object.length >= min)) {
				isValid = false;
			}
		}
	}

	// max length check
	if (max && typeof max === "number") {
		// check if variable has property length
		if (!hasOwn(object, "length")) {
			if (!(object.length <= max)) {
				isValid = false;
			}
		}
	}

	return isValid;
};

export const typeAuto = (variable: any, expected?: string) => {
	return typeMatch(variable, expected) && !isEmpty(variable);
};

export const isEmptyType = (variable, expected = "string") => {
	return isEmpty(variable) && typeMatch(variable, expected);
};

//  check if elem in array
export const keyCheck = (array, key) => {
	return Object.keys(array).includes(key);
};

export const isNumeric = (string: any) => {
	if (typeof string == "number") return true;
	if (typeof string != "string") return false;
	return !isNaN(parseFloat(string));
};

// if argument is not empty
export const isNotEmpty = (arg) => {
	return !isEmpty(arg);
};

export const isMode = (dev = "DEV", prod = "PROD") => {
	if (isDev()) {
		return dev;
	} else {
		return prod;
	}
};

export const range = (start, stop) => {
	const output = [];
	for (let x = start; x < stop; x++) {
		output.push(x);
	}
	return output;
};

// callback with args
export const runDev = (callback) => {
	const cbType = typeof callback;

	if (cbType === "function" && isDev()) {
		return callback();
	}

	if (isDev()) {
		return callback;
	}
};

// callback with args
export const runProd = (callback) => {
	const cbType = typeof callback;

	if (cbType === "function" && isProd()) {
		return callback();
	}

	if (isProd()) {
		return callback;
	}
};

export const razorPayAuth =
	"Basic " +
	Buffer.from(
		process.env.RAZORPAY_KEY + ":" + process.env.RAZORPAY_SECRET
	).toString("base64");

export const verifiedEmails = [
	"gmail.com",
	"yahoo.com",
	"hotmail.com",
	"aol.com",
	"msn.com",
	"rediffmail.com",
];

export const preMailer = (object) => {
	return `<pre>${JSON.stringify(object, null, 2)} </pre>`;
};

// if types are equal
export const typeMatch = (value, expected = "string") => {
	// is variable an array ?
	// is variable an array ?

	if (
		typeof value === "object" &&
		value.constructor.name === "Array" &&
		expected === "array"
	) {
		return true;
	}

	if (typeof value === expected) {
		return true;
	}
	return false;
};

export const isProd = (): boolean => {
	return ["Prod", "prod", "PROD"].includes(MODE);
};

export const isDev = (): boolean => {
	return ["Dev", "dev", "DEV"].includes(MODE);
};

export const isAlphaNumeric = (string) => {
	const CHARS = new Set(
		"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
	);
	function isAlphanumeric(char) {
		return CHARS.has(char);
	}

	for (let i = 0; i < string.length; i++) {
		if (!isAlphanumeric(string[i])) {
			return false;
		}
	}
	return true;
};

export const isObject = (customObject: unknown) => {
	return typeof customObject === "object" && !Array.isArray(customObject);
};

export const isArray = (
	object: unknown,
	options?: {
		maxLength?: number;
		minLength?: number;
		expected?: unknown;
		callback?: (i: number) => void;
	}
) => {
	let isValid = true;
	if (Array.isArray(object)) {
		if (options?.maxLength) {
			if (object.length > options.maxLength) {
				isValid = false;
			}
		}
		if (options?.minLength) {
			if (object.length < options.minLength) {
				isValid = false;
			}
		}

		if (options?.expected) {
			// iterate over array
			for (let i = 0; i < object.length; i++) {
				if (typeof options?.callback === "function") {
					options.callback(object[i]);
				}
				if (typeof object[i] !== options.expected) {
					isValid = false;
					return isValid;
				}
			}
		}

		return isValid;
	} else {
		isValid = false;
	}

	return isValid;
};

export const isKeyNumeric = (value) => {
	try {
		if (Number.isNaN(Number(value))) {
			return false;
		}
		return true;
	} catch (error) {
		return false;
	}
};

export const arraySum = (array: number[]) => {
	let total = 0;
	for (let x = 0; x < array.length; x++) {
		total += array[x];
	}
	return total;
};
