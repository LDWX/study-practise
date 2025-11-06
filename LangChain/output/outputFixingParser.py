from langchain.output_parsers import PydanticOutputParser, OutputFixingParser
from pydantic import BaseModel, Field
from typing import List

class Flower(BaseModel):
  name: str = Field(description="name of the flower")
  colors: List[str] = Field(description="colors of the flower")

# 定义一个用于获取某种花的颜色列表的恶查询
flower_query = "Gnerate a flower name and colors for a random flower"

# 定义一个格式不正确的输出
misformatted = "{'name': '康乃馨', 'colors': ['粉红色','白色','红色','紫色','黄色']}"


# 创建一个用于解析输出的Pydantic解析器，此处希望解析为Flower格式
parser = PydanticOutputParser(pydantic_object=Flower)

from langchain_community.chat_models import ChatOpenAI

# 这里的秘密在于，在OutputFixingParser内部，调用了原有的PydanticOutputParser，如果成功，就返回；如果失败，它会将格式错误的输出以及格式化的指令传递给大模型，并要求LLM进行相关的修复。
# OutputFixingParser不错，但它只能做简单的格式修复。如果出错的不只是格式，比如，输出根本不完整，有缺失内容，那么仅仅根据输出和格式本身，是无法修复它的。
new_parser = OutputFixingParser.from_llm(parser=parser, llm=ChatOpenAI())
result = new_parser.parse(misformatted)
print('result: ', result)
# result:  name='Rose' colors=['red', 'white', 'pink']