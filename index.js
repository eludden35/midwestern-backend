const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
app.use(cors({ origin: "*" }));
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "midwesterndb",
});

app.post("/contact_form", (req, res) => {
    const { first_name, last_name, title, email, message } = req.body;
    let insertQuery =
        "INSERT INTO contact_form (first_name,last_name,title,email,message) VALUES (?,?,?,?,?)";
    let query = mysql.format(insertQuery, [
        first_name,
        last_name,
        title,
        email,
        message,
    ]);
    pool.query(query, (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        // rows added
        console.log(response.insertId);
    });
});

app.get("/allContent", (req, res) => {
    pool.query("SELECT * from content", (err, response) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(response);
        return res.json(response);
    });
});

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});
