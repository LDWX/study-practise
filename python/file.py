

# 读写文件
# open(filename, mode, encoding=None)
# mode 的值包括 
#   'r' 表示文件只能读取；
#   'r+' 表示打开文件进行读写。
#   'w' 表示只能写入（现有同名文件会被覆盖）；
#   'a' 表示打开文件并追加内容，任何写入的数据会自动添加到文件末尾。
#   mode 实参是可选的，省略时的默认值为 'r'。
# 在模式后面加上一个 'b' ，可以用 binary mode 打开文件

# f.tell() 返回整数，给出文件对象在文件中的当前位置，表示为二进制模式下时从文件开始的字节数，以及文本模式下的意义不明的数字。
# f.seek(offset, whence) 可以改变文件对象的位置。通过向参考点添加 offset 计算位置；参考点由 whence 参数指定。 
# whence 值为 0 时，表示从文件开头计算，1 表示使用当前文件位置，2 表示使用文件末尾作为参考点。省略 whence 时，其默认值为 0，即使用文件开头作为参考点。


# 在处理文件对象时，最好使用 with 关键字
# 调用 f.write() 时，未使用 with 关键字，或未调用 f.close()，即使程序正常退出，也可能导致 f.write() 的参数没有完全写入磁盘。


# 往文件里写数据
with open('workfile.txt', 'w', encoding='utf-8') as f:
  f.write('第一行数据\n')

# 在文件中追加数据
with open('workfile.txt', 'r+', encoding='utf-8') as f:
  read_data = f.read() # 要先读再写，否则第二次写的内容会把第一次的内容覆盖
  f.write('第二行数据\n')
  value = ('name', '沈鑫')
  f.write(str(value))
  
# 每次读取一行数据
with open('workfile.txt', 'r', encoding='utf-8') as f:
  print('#######每次读取一行数据#########')
  firstline = f.readline() # 要先读再写，否则第二次写的内容会把第一次的内容覆盖
  print(firstline)
  secondline = f.readline()
  print(secondline)

# 遍历所有行
with open('workfile.txt', 'r', encoding='utf-8') as f:
  print('#######遍历所有行#########')
  for line in f:
    print(line, end='')
  
  
  
  
  




