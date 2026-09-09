@echo off
title Post Next Unique Pinterest Pin (CraftCalc)
cd /d "%~dp0"
echo ======================================================
echo    POSTING NEXT UNIQUE PINTEREST PIN NOW
echo ======================================================
echo.
python scripts\pinterest_auto_bot.py post_one
echo.
echo Pin published successfully!
pause
