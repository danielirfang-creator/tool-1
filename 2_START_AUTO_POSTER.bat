@echo off
title CraftCalc Pinterest Auto-Poster Bot
cd /d "%~dp0"
echo ======================================================
echo    CRAFTCALC PINTEREST AUTO-POSTER BOT
echo ======================================================
echo.
echo [1] Start Auto-Poster (Runs in background, posts 1 Pin every 4 hours)
echo [2] Post 1 Pin Right Now (Quick Test)
echo [3] Post 5 Pins Immediately (Batch)
echo.
set /p choice="Choose option (1, 2, or 3) and press Enter: "

if "%choice%"=="1" (
    echo Starting continuous scheduler (1 pin every 4 hours)...
    python scripts\pinterest_auto_bot.py schedule --interval 4
)
if "%choice%"=="2" (
    echo Posting 1 pin right now...
    python scripts\pinterest_auto_bot.py post_one
)
if "%choice%"=="3" (
    echo Posting 5 pins batch...
    python scripts\pinterest_auto_bot.py batch --count 5
)

pause
