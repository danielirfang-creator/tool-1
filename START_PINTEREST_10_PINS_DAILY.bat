@echo off
title Pinterest 10 Pins Daily Auto-Poster (CraftCalc)
cd /d "%~dp0"
echo ======================================================
echo    PINTEREST AUTO-POSTER: 10 PINS PER 24 HOURS
echo ======================================================
echo.
echo Interval: 1 Pin every 2.4 Hours (144 minutes)
echo Total: Exactly 10 Video & Infographic Pins Every Day!
echo.
python scripts\pinterest_auto_bot.py schedule --interval 2.4
pause
