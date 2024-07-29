

# *rest 是一个元组
# **keys 是一个键值对对象
# def test(a,b,*rest,**keys):
#   print('*rest: ', rest)
#   print('**keys: ', keys)
# test(1,2,3,4, name="shen", age=23)


# 数组的访问
# arr = [1,2,3,4,5,6]
# print(arr[2:])
# print(arr[2:3])
# print(arr[:3])
# print(arr[:])  # 输入整个数组


# 声明一个数组
# test= map(lambda x: x**2, [2,4,6])
# arr = list(test)
# print(arr)
# squares = [x**2 for x in range(10)]
# print(squares)
# vec = [[1,2,3], [4,5,6], [7,8,9]]
# numList = [num for elem in vec for num in elem]
# print(numList)


# 元组解包
# tuples = 123, 456, 789
# x, *rest = tuples
# print(*rest)
# tuples = 123,
# print(tuples)


# 集合
# sets = set({"123", "345"})
# print(sets)
# strA = set("123")
# strB = set("345")
# print("letters in a but not in b: ", strA - strB)
# print("letters in a or b or both: ", strA | strB)
# print("letters in both a and b: ", strA & strB)
# print("letters in a or b but not both: ", strA ^ strB)



# 字典
# info = { 'name': 'shen', 'age': 32, 'age': 23 } # 重复的key会覆盖前面的值
# print(info['name']) # 只能通过索引的方式读取，不能通过对象的方式读取
# print(info['age'])
# info['name'] = 'wangya' # 可以对字典进行重新赋值
# print(info['name'])
# del info['age'] # 删除字典
# print(info)
# print('name' in info)
# print('name' not in info)
# # 其他创建字典的方式
# dict1 = {x: x**2 for x in (2, 4, 6)}
# dict2 = dict(sape=4139, guido=4127, jack=4098)
# dict3 = dict([('sape', 4139), ('guido', 4127), ('jack', 4098)])


# table = {'Sjoerd': '4127', 'Jack': '4098', 'Dcab': 8637678}
# print('Jack: {Jack}; Sjoerd: {Sjoerd}; Dcab: {Dcab:d}'.format(**table))
