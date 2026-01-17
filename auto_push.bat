@echo off
cd /d "D:\t1255\Document\Other\chrome_extension\cat_url"  REM 改成你的專案路徑
git add .
git commit -m "Auto commit %date% %time%"
git push origin main
pause
