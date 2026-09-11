@echo off
title Post Next Video Pin (CraftCalc)
cd /d "%~dp0"
echo ======================================================
echo    POSTING NEXT UNIQUE VIDEO PIN NOW
echo ======================================================
echo.
python scripts\pinterest_auto_bot.py post_one --type video
echo.
echo Pin published!
pause
