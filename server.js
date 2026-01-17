const express = require("express");
const cors = require("cors");
const app = express();

// ✅ 允許所有來源，並允許 preflight 請求
app.use(cors({
  origin: "*",       // 允許所有來源
  methods: ["GET","POST","OPTIONS"], // 支援 GET/POST/OPTIONS
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

// 暫存資料
const db = {};

const cats = [
  "ฅ•ω•ฅ",
  "(=^･ω･^=)",
  "(≚ᄌ≚)",
  "(=①ω①=)",
  "(=ＴェＴ=)"
];

function genCode() {
  return Math.random().toString(36).slice(2,6);
}

function toCat(code) {
  return [...code].map(c=>{
    return cats[c.charCodeAt(0)%cats.length];
  }).join("");
}

/* 建立短網址 */
app.post("/short", (req,res)=>{
  const {url} = req.body;
  const code = genCode();
  const cat = toCat(code);

  db[cat] = url;

  res.json({
    short: `https://cat-url.onrender.com/${encodeURIComponent(cat)}`
  });
});

/* 轉址 */
app.get("/:cat", (req,res)=>{
  const cat = decodeURIComponent(req.params.cat);
  const url = db[cat];

  if(!url) return res.send("找不到貓咪");

  res.redirect(url);
});

app.listen(3000, ()=>console.log("Server running on port 3000"));
