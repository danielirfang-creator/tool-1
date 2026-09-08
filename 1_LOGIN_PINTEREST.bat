@echo off
title Pinterest 1-Time Login Setup
cd /d "%~dp0"
echo ======================================================
echo    PINTEREST 1-TIME LOGIN SETUP
echo ======================================================
echo.
python scripts\pinterest_auto_bot.py login
pause
