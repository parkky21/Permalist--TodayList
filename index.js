import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "Parthk@1e",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items=[];

async function todoList() {
  const result = await db.query("SELECT * FROM items;");
  let item=result.rows;
  return item;
}

app.get("/", async (req, res) => {
  items= await todoList();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  if(req.body.newItem){
  try{
      await db.query("INSERT INTO items(title) VALUES($1);",[
        req.body.newItem,
      ]);
      res.redirect("/");
    }catch(err){
      console.log(err);
    }
  }else{
    res.redirect("/");
  }
});

app.post("/edit", async (req, res) => {
  try{
    await db.query("UPDATE items SET title = $1 WHERE id=$2;",[
      req.body.updatedItemTitle,
      req.body.updatedItemId,
    ]);
    res.redirect("/");
  }catch(err){
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  try{
    await db.query("DELETE FROM items WHERE id=$1;",[
      req.body.deleteItemId,
    ]);
    res.redirect("/");
  }catch(err){
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
