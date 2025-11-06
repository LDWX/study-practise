

# 创建模型实例
from langchain_openai.llms import OpenAI
# from langchain.chat_models import ChatOpenAI
model = OpenAI(model_name='gpt-3.5-turbo-instruct')
# model = ChatOpenAI(model_name='gpt-4')

# ------Part 2
# 创建一个空的DataFrame用于存储结果
import pandas as pd
df = pd.DataFrame(columns=["flower_type", "price", "description", "reason"])

# 数据准备
flowers = ["玫瑰", "百合", "康乃馨"]
prices = ["50", "30", "20"]

# 定义我们想要接收的数据格式
from pydantic import BaseModel, Field
class FlowerDescription(BaseModel):
    flower_type: str = Field(description="鲜花的种类")
    price: int = Field(description="鲜花的价格")
    description: str = Field(description="鲜花的描述文案")
    reason: str = Field(description="为什么要这样写这个文案")

# ------Part 3
# 创建输出解析器
from langchain.output_parsers import PydanticOutputParser
output_parser = PydanticOutputParser(pydantic_object=FlowerDescription)

# 获取输出格式指示
format_instructions = output_parser.get_format_instructions()
# 打印提示
# print("输出格式：",format_instructions)
# 输出格式： The output should be formatted as a JSON instance that conforms to the JSON schema below.

# As an example, for the schema {"properties": {"foo": {"title": "Foo", "description": "a list of strings", "type": "array", "items": {"type": "string"}}}, "required": ["foo"]}
# the object {"foo": ["bar", "baz"]} is a well-formatted instance of the schema. The object {"properties": {"foo": ["bar", "baz"]}} is not well-formatted.

# Here is the output schema:
# ```
# {"properties": {"flower_type": {"description": "鲜花的种类", "title": "Flower Type", "type": "string"}, "price": {"description": "鲜花的价格", "title": "Price", "type": "integer"}, "description": {"description": "鲜花的描述文案", "title": "Description", "type": "string"}, "reason": {"description": "为什么要这样写这个文案", "title": "Reason", "type": "string"}}, "required": ["flower_type", "price", "description", "reason"]}
# ```


# ------Part 4
# 创建提示模板
from langchain.prompts import PromptTemplate
prompt_template = """您是一位专业的鲜花店文案撰写员。
对于售价为 {price} 元的 {flower} ，您能提供一个吸引人的简短中文描述吗？
{format_instructions}"""

# 根据模板创建提示，同时在提示中加入输出解析器的说明
prompt = PromptTemplate.from_template(prompt_template, 
       partial_variables={"format_instructions": format_instructions}) 

# 打印提示
# print("prompt: ", prompt)
# prompt:  
# input_variables=['flower', 'price'] 
# input_types={} 
# partial_variables={'format_instructions': 'The output should be formatted as a JSON instance that conforms to the JSON schema below.\n\nAs an example, for the schema {"properties": {"foo": {"title": "Foo", "description": "a list of strings", "type": "array", "items": {"type": "string"}}}, "required": ["foo"]}\nthe object {"foo": ["bar", "baz"]} is a well-formatted instance of the schema. The object {"properties": {"foo": ["bar", "baz"]}} is not well-formatted.\n\nHere is the output schema:\n```\n{"properties": {"flower_type": {"description": "鲜花的种类", "title": "Flower Type", "type": "string"}, "price": {"description": "鲜花的价格", "title": "Price", "type": "integer"}, "description": {"description": "鲜花的描述文案", "title": "Description", "type": "string"}, "reason": {"description": "为什么要这样写这个文案", "title": "Reason", "type": "string"}}, "required": ["flower_type", "price", "description", "reason"]}\n```'} 
# template='您是一位专业的鲜花店文案撰写员。\n对于售价为 {price} 元的 {flower} ，您能提供一个吸引人的简短中文描述吗？\n{format_instructions}'

# ------Part 5
for flower, price in zip(flowers, prices):
    # 根据提示准备模型的输入
    input = prompt.format(flower=flower, price=price)
    # 打印提示
    # print("input: ", input)
    # input:  您是一位专业的鲜花店文案撰写员。
    # 对于售价为 20 元的 康乃馨 ，您能提供一个吸引人的简短中文描述吗？
    # The output should be formatted as a JSON instance that conforms to the JSON schema below.

    # As an example, for the schema {"properties": {"foo": {"title": "Foo", "description": "a list of strings", "type": "array", "items": {"type": "string"}}}, "required": ["foo"]}
    # the object {"foo": ["bar", "baz"]} is a well-formatted instance of the schema. The object {"properties": {"foo": ["bar", "baz"]}} is not well-formatted.

    # Here is the output schema:
    # ```
    # {"properties": {"flower_type": {"description": "鲜花的种类", "title": "Flower Type", "type": "string"}, "price": {"description": "鲜花的价格", "title": "Price", "type": "integer"}, "description": {"description": "鲜花的描述文案", "title": "Description", "type": "string"}, "reason": {"description": "为什么要这样写这个文案", "title": "Reason", "type": "string"}}, "required": ["flower_type", "price", "description", "reason"]}
    # ```

    # 获取模型的输出
    output = model(input)

    # 解析模型的输出
    parsed_output = output_parser.parse(output)
    parsed_output_dict = parsed_output.model_dump()  # 将Pydantic格式转换为字典

    # 将解析后的输出添加到DataFrame中
    df.loc[len(df)] = parsed_output.model_dump()

# 打印字典
print("输出的数据：", df.to_dict(orient='records'))
# 输出的数据： [{'flower_type': '玫瑰', 'price': 50, 'description': '这朵玫瑰散发着迷人的芳香，花瓣饱满鲜艳，是表达爱意的完美选择。', 'reason': '玫瑰是最具代表性的爱情象征，价格适中，适合表达日常的爱意。'}, {'flower_type': '百合', 'price': 30, 'description': '百合花朵娇嫩迷人，芳香四溢，是表达爱意的最佳选择。它的花瓣洁白如玉，象征着纯洁和美好的爱情。将这束百合送给心爱的人，让爱情在花香中绽放。', 'reason': '百合作为鲜花店中的热门产品，价格实惠，花朵美丽，能够吸引顾客的眼球，为鲜花店带来更多的销售收入。'}, {'flower_type': '康乃馨', 'price': 20, 'description': '这束美丽的康乃馨，花瓣细腻，颜色鲜艳，散发着淡淡的清香，是表达爱意、感激之情的完美选择。', 'reason': '康乃馨是一种充满爱意和感激之花，它的美丽和芬芳能够打动人心，让人感受到真挚的情感。这样的描述能够帮助顾客更容易地理解和欣赏这束鲜花，从而增加销量。'}]

