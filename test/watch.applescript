set user to "foo"
set theHost to "host.domain"

activate application "Terminal"

tell application "System Events"
 tell process "Terminal"
 keystroke "t" using command down
 end tell
end tell

delay 1 -- it seems we need this

tell application "Terminal"
  do script "cd ~/Code/core && make watch-mocha" in the last tab of window 1
end tell

tell application "System Events"
 tell process "Terminal"
 keystroke "t" using command down
 end tell
end tell

delay 1 -- it seems we need this

tell application "Terminal"
  do script "cd ~/Code/core && make watch-mocha-phantomjs" in the last tab of window 1
end tell