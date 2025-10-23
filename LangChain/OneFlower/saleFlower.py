
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from langchain.output_parsers import StructuredOutputParser, ResponseSchema

import pandas as pd

template = """您是一位专业的鲜花店文案撰写员。对于售价为 {price} 元的 {flower_name} ，您能提供一个吸引人的简短描述吗？{format_instructions}"""

# 设置结构化输出解析器
response_schemas = [
    ResponseSchema(name="flower_name", description="鲜花的名字"),
    ResponseSchema(name="price", description="鲜花的价格"),
    ResponseSchema(name="description", description="鲜花的描述"),
    ResponseSchema(name="reason", description="为什么这样进行描述，有什么优势"),
]
output_parser = StructuredOutputParser.from_response_schemas(response_schemas)
format_instructions = output_parser.get_format_instructions()

prompt = PromptTemplate(
    template=template,
    input_variables=["price", "flower_name"],
    partial_variables={"format_instructions": format_instructions}
)
print("""prompt: {}""".format(prompt))


flowers = ["玫瑰", "百合", "康乃馨"]
prices = ["50", "30", "20"]

df = pd.DataFrame(columns=["flower", "price", "description", "reason"])

llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0.8)
for flower, price in zip(flowers, prices):
    input_prompt = prompt.format(flower_name=flower, price=price)
    
    # 通过大模型获取输出，输出结果对观看不友好，需要parse一下才方便查看
    output = llm.invoke(input_prompt)
    
    parsed_output = output_parser.parse(output.content)
    # print("""parsed_output: {}""".format(parsed_output))
    
    # 文件中的栏目与模版中的变量名不一致的话，可以通过字典的方式来添加
    parsed_output['flower'] = flower
    
    df.loc[len(df)] = parsed_output
    
# 打印生成的字典数据
print(df.to_dict(orient='records'))

df.to_csv('output.csv', index=False)
    
    