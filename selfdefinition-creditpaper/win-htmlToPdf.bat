@echo off
set YEAR=%date:~0,4%
set MONTH=%date:~5,2%
set DAY=%date:~8,2%

set HOUR=%time:~0,2%
set MINUTE=%time:~3,2%
set SECOND=%time:~6,2%
set MILLIS=%time:~9,2%
set CURRENT_TIME=%YEAR%%MONTH%%DAY%%HOUR%%MINUTE%%SECOND%%MILLIS%
echo %YEAR%-%MONTH%-%DAY% %HOUR%:%MINUTE%:%SECOND%:%MILLIS%
start /max "" "d:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe " --footer-right [page]/[topage]  customTemplate.html  pdf-%CURRENT_TIME%.pdf 