@echo off
title Multi-Platform Auto-Blogger
cd /d "%~dp0"
echo ======================================================
echo    MULTI-PLATFORM AUTO-BLOGGER (DEV.TO + MEDIUM)
echo ======================================================
echo.
echo [1] Publish Next Article to All Platforms (1-Click)
echo [2] View Ready Articles List
echo [3] Medium 1-Time Login Setup
echo.
set /p choice="Choose option (1, 2, or 3) and press Enter: "

if "%choice%"=="1" (
    python scripts\blog_auto_publisher.py publish_next
)
if "%choice%"=="2" (
    python scripts\blog_auto_publisher.py list_articles
)
if "%choice%"=="3" (
    python scripts\blog_auto_publisher.py login_medium
)

pause
