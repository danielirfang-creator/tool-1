@echo off
title CraftCalc - YouTube Shorts Auto-Poster (2 Shorts Daily)
cd /d "%~dp0"
echo ======================================================
echo    CRAFTCALC YOUTUBE SHORTS CONTINUOUS AUTO-POSTER
echo    Schedule: 1 Short every 12 hours (2 Daily)
echo ======================================================
echo.
python scripts\youtube_shorts_bot.py schedule --interval 12
pause
