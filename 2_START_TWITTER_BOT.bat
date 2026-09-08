@echo off
title CraftCalc Twitter / X Auto-Poster Bot
cd /d "%~dp0"
echo ======================================================
echo    CRAFTCALC TWITTER / X AUTO-POSTER BOT
echo ======================================================
echo.
echo [1] Start Auto-Poster (Posts 1 Tweet every 6 hours continuously)
echo [2] Post 1 Tweet Right Now (Quick Test)
echo.
set /p choice="Choose option (1 or 2) and press Enter: "

if "%choice%"=="1" (
    echo Starting continuous Twitter scheduler (1 tweet every 6 hours)...
    python scripts\twitter_auto_bot.py schedule --interval 6
)
if "%choice%"=="2" (
    echo Posting 1 tweet right now...
    python scripts\twitter_auto_bot.py post_one
)

pause
