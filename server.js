const express = require("express");
const app = express();
app.use(express.json());

const db = {}; // 免費先用記憶體

const cats = ["ฅ•ω•ฅ","(=^･ω･^=)","(≚ᄌ≚)","(=①ω①=)"];

function genCode(){
  return Math.random().toString(36).slice(2,6);
}

function toCat(code){
  return [...code].map(c=>{
    return cats[c.charCodeAt(0)%cats.length];
  }).join("");
}

app.post("/short",(req,res)=>{
  const {url} = req.body;
  const code = genCode();
  const cat = toCat(code);

  db[cat] = url;

  res.json({
    short:`https://cat-short.onrender.com/${encodeURIComponent(cat)}`
  });
});

app.get("/:cat",(req,res)=>{
  const cat = decodeURIComponent(req.params.cat);
  const url = db[cat];

  if(!url) return res.send("找不到貓");

  res.redirect(url);
});

app.listen(3000,()=>console.log("OK"));
