# Windows Boot Persistence — Run in PowerShell (Admin)
# This creates a Windows scheduled task that starts OpenClaw gateway on login

$action = New-ScheduledTaskAction -Execute 'C:\Windows\System32\wsl.exe' -Argument '-d Ubuntu-24.04 -- systemctl --user start openclaw-gateway.service'
$trigger = New-ScheduledTaskTrigger -AtLogOn
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable
$principal = New-ScheduledTaskPrincipal -UserId (Get-CimInstance -ClassName Win32_ComputerSystem).UserName -RunLevel Limited
Register-ScheduledTask -TaskName "OpenClaw Gateway Starter" -Action $action -Trigger $trigger -Settings $settings -Principal $principal -Force
