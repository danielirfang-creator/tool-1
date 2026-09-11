@echo off
title Post Next Image / Infographic Pin (CraftCalc)
cd /d "%~dp0"
echo ======================================================
echo    POSTING NEXT UNIQUE IMAGE PIN NOW
echo ======================================================
echo.
python scripts\pinterest_auto_bot.py post_one --type image
echo.
echo Pin published!
pause
