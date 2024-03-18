import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";

dotenv.config();

const myApp = express();

myApp.use("/public", express.static(`${import.meta.dirname}/public`));
myApp.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
myApp.use(bodyParser.urlencoded({ extended: false }));
myApp.use(bodyParser.json());

myApp.get("/", (req, res) => res.sendFile(`${import.meta.dirname}/views/index.html`));
myApp.get("/json", (req, res) => {
  const message = "Hello json";
  res.json({ message: process.env.MESSAGE_STYLE === "uppercase" ? message.toUpperCase() : message });
});
myApp.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => res.json({ time: req.time })
);
myApp.get("/:word/echo", (req, res) => res.json({ echo: req.params.word }));
myApp.get("/name", (req, res) => res.json({ name: `${req.query.first} ${req.query.last}` }));
myApp.post("/name", (req, res) => res.json({ name: `${req.body.first} ${req.body.last}` }));

export default myApp;
