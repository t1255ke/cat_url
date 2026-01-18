const generateBtn = document.getElementById("generate");
const copyBtn = document.getElementById("copy");
const cat = document.getElementById("cat");
const result = document.getElementById("result");
const qrCodeImg = document.getElementById("qrCode");
const downloadBtn = document.getElementById("downloadQr");

generateBtn.onclick = async () => {
  try {
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

      // 顯示複製按鈕
      copyBtn.style.display = "block";

      // 顯示 QR Code
      const code = data.short.split('/').pop(); // 取得短碼
      qrCodeImg.src = `https://cat-url.onrender.com/qrcode/${code}`;
      qrCodeImg.style.display = "block";

      // 顯示下載按鈕
      downloadBtn.style.display = "block";
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
    copyBtn.src = "assets/copy.png"; 
  }).catch(err => {
    console.error(err);
    alert("複製失敗");
  });
};

// 下載 QR Code
downloadBtn.onclick = () => {
  const a = document.createElement("a");
  a.href = qrCodeImg.src;
  a.download = "cat_qrcode.png";
  a.click();
};
