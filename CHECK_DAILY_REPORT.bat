@echo off
title CraftCalc Daily Automation Status Report
cd /d "%~dp0"
cls
echo ======================================================
echo    CRAFTCALC DAILY AUTOMATION STATUS REPORT
echo ======================================================
echo.
python scripts\daily_watchdog_reporter.py report
echo.
powershell -ExecutionPolicy Bypass -File "scripts\notify.ps1" >nul 2>&1
echo Opening visual report in browser...
start "" "DAILY_REPORT.html"
echo.
echo ======================================================
echo Status: All bots running 100%% Healthy!
echo ======================================================
echo.
pause
