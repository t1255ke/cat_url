import qrcode
from PIL import Image

# 你的網址
url = "https://google.com"

# 生成 QR Code，容錯率高方便放圖
qr = qrcode.QRCode(
    error_correction=qrcode.constants.ERROR_CORRECT_H
)
qr.add_data(url)
qr.make(fit=True)

# 生成 QR Code 圖片
img_qr = qr.make_image(fill_color="black", back_color="white").convert('RGB')

# 打開貓咪圖片，建議透明 PNG
logo = Image.open("./assets/icon.png")
logo = logo.resize((100, 100))  # 調整大小

# 計算置中位置
pos = ((img_qr.size[0] - logo.size[0]) // 2, (img_qr.size[1] - logo.size[1]) // 2)
img_qr.paste(logo, pos, mask=logo)

# 存檔
img_qr.save("cat_qrcode.png")
print("QR Code 生成完成！")
