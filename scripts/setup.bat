@echo off
echo Setting up Pragma Todo App...

echo.
echo 1. Updating package.json...
copy package-update.json package.json

echo.
echo 2. Installing dependencies...
call npm install

echo.
echo 3. Adding mobile platforms...
call ionic capacitor add android
call ionic capacitor add ios

echo.
echo Setup complete! You can now run:
echo ionic serve (for web development)
echo scripts\build-mobile.bat (for mobile build)

pause