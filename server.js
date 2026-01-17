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
    const codeLength = 8; //隨機數字需要幾位填幾位
    const code = randomString(codeLength);
    return word + code; // kittya3Fz
}

//產生隨機英數字
function randomString(length){
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for(let i=0;i<length;i++){
        result += chars[Math.floor(Math.random()*chars.length)];
    }
    return result;
}

// POST /short
app.post("/short",(req,res)=>{
  const {url} = req.body;
  let code;//若重複即重新生成
  do {
      code = genCode();
  } while(db[code]);

  const cat = catEmojis[Math.floor(Math.random()*catEmojis.length)];

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
