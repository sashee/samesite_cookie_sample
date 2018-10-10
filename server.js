const express = require('express')
const cookieParser = require('cookie-parser')

const doAndGo = (script, url) => {
	if (!script) {
		return `<html><head><meta http-equiv="refresh" content="0;URL='${url}'" /></head></html>`
	}else {
		return `<html><head><script>const nextUrl="${url}";</script><script>window.addEventListener("DOMContentLoaded", () => {${script}})</script></head><body></body></html>`
	}
}

const logs = [];

const logCookies = (req) => {
	logs.push(`normalCookie is ${req.cookies.normalCookie ? "SET" : "not set"}`);
	logs.push(`strictCookie is ${req.cookies.strictCookie ? "SET" : "not set"}`);
	logs.push(`laxCookie is ${req.cookies.laxCookie ? "SET" : "not set"}`);
}

{
	const app = express()

	app.use(cookieParser());

	app.get('/step1', (req, res) => {
		logs.push("=======127.0.0.1========")
		logs.push("doing a POST, a GET, and a redirect to the localhost domain");
		res.send(doAndGo(`
			(async () => {
				await fetch("//localhost:3000/get", {method: "GET", mode: "no-cors"});

				window.location = nextUrl;
			})()
		`,
		"//localhost:3000/step2"));
	});
	app.get("/get", (req, res) => {
		logs.push("=======localhost========")
		logs.push("GET request from 127.0.0.1 to localhost");
		logCookies(req);
		res.send("OK")
	});
	app.get('/step2', (req, res) => {
		logs.push("=======localhost========")
		logs.push("redirect from 127.0.0.1 to localhost");
		logCookies(req);
		res.send(doAndGo(null, "//localhost:3000/step3"));
	});
	app.get('/step3', (req, res) => {
		logs.push("=======localhost========")
		logs.push("redirect from localhost");
		logCookies(req);
		res.send(logs.join("<br/>"));
	});
	app.get('/', (req, res) => {
		logs.splice(0, logs.length);
		logs.push("=======localhost========")
		logs.push("Setting normalCookie, strictCooke, laxCookie for localhost");
		res.cookie("normalCookie", "normalCookieVal", {maxAge: 10000});
		res.cookie("strictCookie", "strictCookieVal", {maxAge: 10000, sameSite: "strict"});
		res.cookie("laxCookie", "laxCookieVal", {maxAge: 10000, sameSite: "lax"});
		logs.push("redirecting to 127.0.0.1");
		res.send(doAndGo(null, "//127.0.0.1:3000/step1"));
	});

	app.listen(3000);
}