@echo off
setlocal enabledelayedexpansion

cd /d "%~dp0"

echo.
echo =========================================
echo     Image Person Filter Script
echo =========================================
echo.
echo This script keeps single-person images, deletes images with no person,
echo and crops multi-person images to the main person.
echo.

python rename_images.py

pause
