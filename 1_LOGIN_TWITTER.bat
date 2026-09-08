@echo off
title Twitter / X 1-Time Login Setup
cd /d "%~dp0"
echo ======================================================
echo    TWITTER / X 1-TIME LOGIN SETUP
echo ======================================================
echo.
python scripts\twitter_auto_bot.py login
pause
