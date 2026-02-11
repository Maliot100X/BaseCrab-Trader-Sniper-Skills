@echo off
cd /d "%~dp0"
echo Killing port 3000...
npx kill-port 3000
echo Starting BASECRAB Trading Bot...
npm run dev
pause
