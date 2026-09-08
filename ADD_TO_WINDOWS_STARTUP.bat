@echo off
title Add Pinterest Bot to Windows Startup
cd /d "%~dp0"

echo ======================================================
echo    ADDING PINTEREST BOT TO WINDOWS STARTUP
echo ======================================================
echo.

set "STARTUP_FOLDER=%APPDATA%\Microsoft\Windows\Start Menu\Programs\Startup"
set "TARGET_SCRIPT=%~dp0START_SILENT_BOT.vbs"
set "SHORTCUT_PATH=%STARTUP_FOLDER%\CraftCalcPinterestBot.lnk"

powershell "$s=(New-Object -COM WScript.Shell).CreateShortcut('%SHORTCUT_PATH%');$s.TargetPath='%TARGET_SCRIPT%';$s.WorkingDirectory='%~dp0';$s.Save()"

echo [SUCCESS] Pinterest Bot has been added to Windows Startup!
echo.
echo Whenever you turn on your laptop, the bot will silently
echo run in the background and post 1 Pin every 4 hours.
echo.
pause
