@echo off
title CraftCalc Pinterest Multi-Format Auto-Poster
cd /d "%~dp0"
echo ======================================================
echo    CRAFTCALC PINTEREST AUTO-POSTER (IMAGES & VIDEOS)
echo ======================================================
echo.
echo [1] Start Auto-Poster (Alternating: 1 Video, 1 Image every 2.4 hours)
echo [2] Post 1 NEXT IMAGE Pin Right Now
echo [3] Post 1 NEXT VIDEO Pin Right Now
echo [4] Start Image-Only Auto-Poster
echo [5] Start Video-Only Auto-Poster
echo.
set /p choice="Choose option (1, 2, 3, 4, or 5) and press Enter: "

if "%choice%"=="1" (
    echo Starting continuous scheduler (Mixed: 1 pin every 2.4 hours)...
    python scripts\pinterest_auto_bot.py schedule --interval 2.4 --type all
)
if "%choice%"=="2" (
    echo Posting 1 Image Pin right now...
    python scripts\pinterest_auto_bot.py post_one --type image
)
if "%choice%"=="3" (
    echo Posting 1 Video Pin right now...
    python scripts\pinterest_auto_bot.py post_one --type video
)
if "%choice%"=="4" (
    echo Starting Image-Only scheduler...
    python scripts\pinterest_auto_bot.py schedule --interval 2.4 --type image
)
if "%choice%"=="5" (
    echo Starting Video-Only scheduler...
    python scripts\pinterest_auto_bot.py schedule --interval 2.4 --type video
)

pause
