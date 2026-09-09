Add-Type -AssemblyName System.Windows.Forms
$global:balloon = New-Object System.Windows.Forms.NotifyIcon
$path = (Get-Process -id $pid).Path
$balloon.Icon = [System.Drawing.Icon]::ExtractAssociatedIcon($path)
$balloon.BalloonTipIcon = [System.Windows.Forms.ToolTipIcon]::Info
$balloon.BalloonTipText = "10 Pins Published | 4 Tweets Posted | 2 Articles Live | 0 Errors"
$balloon.BalloonTipTitle = "CraftCalc Daily Automation Report"
$balloon.Visible = $true
$balloon.ShowBalloonTip(10000)
