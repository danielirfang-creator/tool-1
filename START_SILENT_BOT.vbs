Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "c:\tool site 1"
WshShell.Run "python scripts\pinterest_auto_bot.py schedule --interval 4 --headless", 0, False
WshShell.Run "python scripts\twitter_auto_bot.py schedule --interval 6 --headless", 0, False

