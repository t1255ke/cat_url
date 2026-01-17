const shortenBtn = document.getElementById("shorten");
const copyBtn = document.getElementById("copy");
const urlInput = document.getElementById("url");
const result = document.getElementById("result");
const cat = document.getElementById("cat");

shortenBtn.onclick = async ()=>{
  const url = urlInput.value.trim();
  if(!url) return alert("請輸入網址");

  try{
    const res = await fetch("https://cat-url.onrender.com/short",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({url})
    });

    const data = await res.json();
    result.innerText = data.short;
    cat.innerText = data.cat;
    copyBtn.style.display = "block"; // 顯示複製按鈕

  }catch(err){
    console.error(err);
    alert("生成短網址失敗");
  }
};

// 複製按鈕
copyBtn.onclick = ()=>{
  const text = result.innerText;
  navigator.clipboard.writeText(text).then(()=>{
    copyBtn.innerText = "已複製!";
    setTimeout(()=>copyBtn.innerText="複製短網址",1000);
  }).catch(err=>{
    console.error(err);
    alert("複製失敗");
  });
};
