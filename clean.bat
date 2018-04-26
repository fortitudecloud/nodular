@echo off
echo Deleting Node Modules
FOR /d /r . %%d IN (node_modules) DO @IF EXIST %%d rd /s /q %%d
