# 执行导入模块
from pyModules.fibo import fib2 as myfib
num = myfib(3)
print(num)


import pyModules.fibo
pyModules.fibo.fib(50)