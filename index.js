import express from "express";
import ejs from "ejs";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
var posts = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs", {ppp: posts});
});

app.post("/post", (req, res) => {
    const {postTitle, postBody} = req.body;
    posts.push({id: Date.now(), postTitle, postBody});
    res.redirect("/");
});

app.get("/read/:id", (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find(rrr => rrr.id === id);
    res.render("posts.ejs", {qqq: post});
});

app.get("/edit/:id", (req, res) => {
    const id = Number(req.params.id);
    const post = posts.find(rrr => rrr.id === id);
    res.render("edit.ejs", {qqq: post});
});

app.post("/edit/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = posts.findIndex(rrr => rrr.id === id);
    const {postTitle, postBody} = req.body;
    posts[index] = {id, postTitle, postBody};
    res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = posts.findIndex(rrr => rrr.id === id);
    posts.splice(index,1);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is started on port ${port}`);
});
