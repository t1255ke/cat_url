document.getElementById("shorten").onclick = async ()=>{
  let url = document.getElementById("url").value;

  let res = await fetch(
    "https://cat-url.onrender.com/short",
    {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({url})
    }
  );

  let data = await res.json();
  document.getElementById("result").innerText = data.short;
};
