const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// 暫存資料：shortCode -> 原始網址
const db = {};

// 簡單貓咪對照表
const catEmojis = ["=^.^=", "(=^ω^=)", "(=^･ｪ･^=)", "ฅ^•ﻌ•^ฅ", "(=^･ω･^=)"];

// 產生短碼（ASCII 乾淨）
function genCode(){
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for(let i=0;i<5;i++){
    code += chars.charAt(Math.floor(Math.random()*chars.length));
  }
  return code;
}

// POST /short → 產生短網址
app.post("/short",(req,res)=>{
  const {url} = req.body;
  const code = genCode();
  const cat = catEmojis[Math.floor(Math.random()*catEmojis.length)];

  db[code] = url;

  res.json({
    short: `https://cat-url.onrender.com/${code}`,
    cat
  });
});

// GET /:code → 轉址
app.get("/:code",(req,res)=>{
  const url = db[req.params.code];
  if(!url) return res.send("找不到網址");
  res.redirect(url);
});

app.listen(3000,()=>console.log("Server running on port 3000"));
