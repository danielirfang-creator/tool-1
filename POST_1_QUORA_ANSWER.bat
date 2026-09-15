@echo off
title CraftCalc - Quora Answer Helper (Warmup Mode)
cd /d "%~dp0"
echo ======================================================
echo    CRAFTCALC QUORA COMMUNITY HELPER
echo    Mode: WARMUP (100%% Value Answers - ZERO Links)
echo ======================================================
echo.
python scripts\quora_community_bot.py post_next
pause
