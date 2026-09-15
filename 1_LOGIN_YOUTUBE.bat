@echo off
title CraftCalc - 1-Time YouTube Studio Login
cd /d "%~dp0"
echo ======================================================
echo    CRAFTCALC 1-TIME YOUTUBE STUDIO LOGIN SETUP
echo ======================================================
echo.
echo Browser open hoga, apna Google / YouTube channel login karein.
echo.
python scripts\youtube_shorts_bot.py login
pause
