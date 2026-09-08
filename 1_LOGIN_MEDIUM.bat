@echo off
title Medium 1-Time Login Setup
cd /d "%~dp0"
echo ======================================================
echo    MEDIUM.COM 1-TIME LOGIN SETUP
echo ======================================================
echo.
python scripts\blog_auto_publisher.py login_medium
pause
