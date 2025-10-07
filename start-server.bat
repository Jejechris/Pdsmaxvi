@echo off
echo ========================================
echo   PDSMAXVI Quiz - Local Web Server
echo ========================================
echo.
echo Starting server on http://localhost:8000
echo.
echo BUKA DI BROWSER: http://localhost:8000/quiz.html
echo.
echo Tekan Ctrl+C untuk stop server
echo ========================================
echo.

python -m http.server 8000

