@echo off
echo Building Pragma Todo App for Mobile...

echo.
echo 1. Building web assets...
call ionic build --prod

echo.
echo 2. Syncing with Capacitor...
call ionic capacitor sync

echo.
echo 3. Building Android...
call ionic capacitor build android

echo.
echo Build complete! You can now open the project in Android Studio:
echo ionic capacitor open android

pause