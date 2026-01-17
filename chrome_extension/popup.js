const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const cat = document.getElementById("cat");
const result = document.getElementById("result");

generateBtn.onclick = async () => {
  try {
    // 抓當前分頁網址
    chrome.tabs.query({active:true, currentWindow:true}, async (tabs) => {
      const url = tabs[0].url;
      if(!url) return alert("無法取得當前頁面網址");

      // 呼叫短網址 API
      const res = await fetch("https://cat-url.onrender.com/short", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({url})
      });

      const data = await res.json();

      // 顯示結果
      result.innerText = data.short;
      cat.innerText = data.cat;

      // 生成完成後顯示複製按鈕
      copyBtn.style.display = "block";
    });

  } catch(err) {
    console.error(err);
    alert("生成短網址失敗");
  }
};

// 複製短網址
copyBtn.onclick = () => {
  const text = result.innerText;
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.src = "assets/copy.png"; // 可換成已複製圖示
  }).catch(err => {
    console.error(err);
    alert("複製失敗");
  });
};
