@echo off
echo Starting Todo Full-Stack Web Application...

REM Start backend server in a new window
start "Backend Server" cmd /k "cd /d ""%~dp0\backend"" && python -m uvicorn main:app --host 0.0.0.0 --port 8000"

REM Wait a few seconds for backend to start
timeout /t 3 /nobreak >nul

REM Start frontend server in a new window
start "Frontend Server" cmd /k "cd /d ""%~dp0\frontend"" && npm run dev"

echo Both servers should now be starting in separate windows.
echo Backend: http://0.0.0.0:8000
echo Frontend: Usually http://localhost:3000