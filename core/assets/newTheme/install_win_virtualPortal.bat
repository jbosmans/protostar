"{{wsadmin}}" -user "{{wasUser}}" -password "{{wasPwd}}" -c "$AdminApp install {{targetEar}} {-appname {{earAppName}} -nodeployejb}"

"{{wsadmin}}" -user "{{wasUser}}" -password "{{wasPwd}}" -c "$AdminControl invoke [$AdminControl queryNames type=ApplicationManager,*] startApplication {{earAppName}}"

"{{xmlaccess}}" -user "{{portalUser}}" -password "{{portalPwd}}" -url "http://{{portalHost}}:{{portalPort}}/wps/config/{{vpContext}}" -in "{{xmlThemesSkins}}" -out "{{tempDir}}/result_themesSkins_{{vpContext}}.xml"

