# 导入LangChain中的提示模板
from langchain.prompts import PromptTemplate
# 创建原始模板
template = """You are a flower shop assitiant。\n
For {price} of {flower_name} ，can you write something for me？
"""

prompt = PromptTemplate.from_template(template)
print(prompt)

from langchain_community.llms import HuggingFaceHub
model = HuggingFaceHub(repo_id="google/flan-t5-large")

input = prompt.format(flower_name=["rose"], price=50)

output = model(input)
print(output)
