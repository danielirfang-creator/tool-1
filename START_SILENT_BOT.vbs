Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "c:\tool site 1"
WshShell.Run """C:\Users\Gondal traders\AppData\Local\Python\pythoncore-3.14-64\python.exe"" scripts\pinterest_auto_bot.py schedule --interval 2.4 --headless", 0, False
WshShell.Run """C:\Users\Gondal traders\AppData\Local\Python\pythoncore-3.14-64\python.exe"" scripts\twitter_auto_bot.py schedule --interval 6 --headless", 0, False
WshShell.Run """C:\Users\Gondal traders\AppData\Local\Python\pythoncore-3.14-64\python.exe"" scripts\blog_auto_publisher.py schedule --interval 24", 0, False
WshShell.Run """C:\Users\Gondal traders\AppData\Local\Python\pythoncore-3.14-64\python.exe"" scripts\auto_backlink_engine.py schedule --interval 12", 0, False
WshShell.Run """C:\Users\Gondal traders\AppData\Local\Python\pythoncore-3.14-64\python.exe"" scripts\daily_watchdog_reporter.py watch", 0, False
