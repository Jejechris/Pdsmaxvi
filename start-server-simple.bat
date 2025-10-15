@echo off
echo Starting HTTP Server...
echo.
echo Server akan berjalan di: http://localhost:8000
echo Tekan Ctrl+C untuk menghentikan server
echo.
python -m http.server 8000
pause



