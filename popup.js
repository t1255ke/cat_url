const cats = [
  "(=^･ω･^=)",
  "(ฅ•ω•ฅ)",
  "(≚ᄌ≚)",
  "(=①ω①=)",
  "(=ＴェＴ=)"
];

function makeShortCode(url){
  return btoa(url).slice(0,6); // base64取前6碼
}

function toCat(shortCode){
  let result = "";
  for(let c of shortCode){
    let index = c.charCodeAt(0) % cats.length;
    result += cats[index];
  }
  return result;
}

document.getElementById("shorten").onclick = () => {
  let url = document.getElementById("url").value;
  let code = makeShortCode(url);
  let catUrl = toCat(code);
  document.getElementById("result").innerText = catUrl;
};