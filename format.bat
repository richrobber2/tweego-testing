@echo off
tweego --list-formats
set /p fmt="Enter format to compile with: "
call npm config set tweego-setup:format %fmt%
ECHO Format changed. to %fmt%
exit 0