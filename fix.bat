@echo off
chcp 65001 >nul
echo.
echo ================================================
echo   🦀 BASECRAB - FIX & UPDATE
echo ================================================
echo.
cd /d "%~dp0"
echo [1] Pulling latest from GitHub...
git pull origin master
echo.
echo [2] Updating npm packages...
npm install
echo.
echo [3] Restarting BASECRAB...
npm run dev
