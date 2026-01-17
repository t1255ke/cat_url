const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = {};

// ASCII 貓咪
const catEmojis = [
"ฅ^. ˬ .^ฅⳊ",
"( ^ฅ>////<ฅ^)",
"₍^.̫.^₎ฅ⋆⭒˚｡⋆",
"ฅ(＾・ω・＾ฅ)",
"ฅ^> ᴗ <^₎",
"ฅ(͡°ᴥ͡°)ฅ",
"ฅ₍ᓀ‸ᓂマ ੭♪",
"ฅ^ ◞ ﻌ ◟ ^ฅ",
"ⓛⰙⓛฅ",
"ฅ(=චᆽච=ฅ)",
"ฅ^•ꈊ•^ฅو",
"ฅ^ >ꞈ < ^ฅ ࿔",
"ฅ^ ◞ ع ◟ ^ฅ",
"=^.^=",
"(=^ω^=)",
"(=^･ｪ･^=)",
"ฅ^•ﻌ•^ฅ",
"(=^･ω･^=)"
];

// 貓咪單字
const catWords = ["meow","nyan","purr","kitty","mew","catnip","feline","whisker"];

// 產生短碼
function genCode(){
  const word = catWords[Math.floor(Math.random()*catWords.length)];
  const num = Math.floor(Math.random()*100);
  return word + num; // meow42
}

// POST /short
app.post("/short",(req,res)=>{
  const {url} = req.body;
  const code = genCode();
  const cat = 'catEmojis[Math.floor(Math.random()*catEmojis.length)];'

  db[code] = url;

  res.json({
    short: `https://cat-url.onrender.com/${code}`,
    cat
  });
});

// GET /:code 轉址
app.get("/:code",(req,res)=>{
  const url = db[req.params.code];
  if(!url) return res.send("找不到網址");
  res.redirect(url);
});

app.listen(3000,()=>console.log("Server running on port 3000"));
