@echo off
title CraftCalc - 1-Time Reddit Login
cd /d "%~dp0"
echo ======================================================
echo    CRAFTCALC 1-TIME REDDIT LOGIN SETUP
echo ======================================================
echo.
echo Browser open hoga, apna account login karein.
echo.
python scripts\reddit_community_bot.py login
pause
