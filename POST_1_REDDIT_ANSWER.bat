@echo off
title CraftCalc - Reddit Answer Helper (Warmup Mode)
cd /d "%~dp0"
echo ======================================================
echo    CRAFTCALC REDDIT COMMUNITY HELPER
echo    Mode: WARMUP (100%% Value Answers - ZERO Links)
echo ======================================================
echo.
python scripts\reddit_community_bot.py post_next
pause
