@echo off
title CraftCalc - 1-Time Quora Login
cd /d "%~dp0"
echo ======================================================
echo    CRAFTCALC 1-TIME QUORA LOGIN SETUP
echo ======================================================
echo.
echo Browser open hoga, apna account login karein.
echo.
python scripts\quora_community_bot.py login
pause
