from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnableLambda, RunnableBranch
import json
import re

# 初始化语言模型
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

# 构建两个场景的模版
flower_care_template = """你是一个经验丰富的园丁,擅长解答关于养花育花的问题。
下面是需要你来回答的问题:
{input}"""

flower_deco_template = """你是一位网红插花大师,擅长解答关于鲜花装饰的问题。
下面是需要你来回答的问题:
{input}"""

# 构建提示信息
prompt_infos = [
    {
        "key": "flower_care",
        "description": "适合回答关于鲜花护理的问题",
        "template": flower_care_template,
    },
    {
        "key": "flower_deco",
        "description": "适合回答关于鲜花装饰的问题",
        "template": flower_deco_template,
    }
]

# 构建目标链
chain_map = {}
for info in prompt_infos:
    prompt = PromptTemplate(
        template=info["template"], 
        input_variables=["input"]
    )
    chain = prompt | llm | StrOutputParser()
    chain_map[info["key"]] = chain

# 构建路由提示模板
# 1. 构建 destinations 字符串（保持不变）
destinations = [f"{p['key']}: {p['description']}" for p in prompt_infos]
destinations_str = "\n".join(destinations)
print('destinations_str::: ', destinations_str)

# 2. 使用自定义的路由提示模板（替代 MULTI_PROMPT_ROUTER_TEMPLATE）
router_template = """你是一个专家路由器，负责将用户的问题路由到最合适的专家。

可用专家：
{destinations}

请严格按照以下 JSON 格式输出，不要有任何多余内容：
```json
{{
    "destination": "目标专家的 key（如 flower_care, flower_deco），如果都不合适填 DEFAULT",
    "next_inputs": "原始问题或优化后的输入"
}}

用户问题：{input}
"""

# print("路由模板:\n", router_template)

router_prompt = PromptTemplate(
    template=router_template,
    input_variables=["input"],
    partial_variables={"destinations": destinations_str}
)

# print("路由提示:\n", router_prompt)

# 构建路由链
router_chain = router_prompt | llm | StrOutputParser()


# 解析路由结果的函数
def parse_route(route_output: str) -> str:
    # route_output:::  ```json
    # {
    #     "destination": "flower_care",
    #     "next_inputs": "如何为玫瑰浇水？"
    # }
    # ```
    print('route_output::: ', route_output)
    """从路由输出中提取 destination"""
    try:
        # 尝试解析JSON
        data = json.loads(route_output)
        return data.get("destination", "DEFAULT")
    except:
        # 如果JSON解析失败,尝试正则提取
        match = re.search(r'"destination":\s*"(\w+)"', route_output)
        if match:
            return match.group(1)
        return "DEFAULT"


# 构建默认链 - 修复:需要使用 PromptTemplate
default_prompt = PromptTemplate(
  template="""你是一个友好的智能助手,可以回答各种问题。

  用户问题: {input}

  请提供有帮助的回答:""",
  input_variables=["input"]
)
default_chain = default_prompt | llm | StrOutputParser()

# 构建完整的路由链
from langchain_core.runnables import RunnablePassthrough

chain = (
    RunnablePassthrough.assign(
      route=router_chain | RunnableLambda(parse_route)
    )
    | RunnableBranch(
      (lambda x: x["route"] == "flower_care", lambda x: chain_map["flower_care"].invoke(x)),
      (lambda x: x["route"] == "flower_deco", lambda x: chain_map["flower_deco"].invoke(x)),
      lambda x: default_chain.invoke(x),
    )
)


# 测试
print("\n" + "#"*70)
print("# 测试 1: 关于鲜花护理的问题")
print("#"*70)
result1 = chain.invoke({"input": "如何为玫瑰浇水？"})
print("结果1:\n", result1)

# print("\n" + "#"*70)
# print("# 测试 2: 关于鲜花装饰的问题")
# print("#"*70)
# result2 = chain.invoke({"input": "如何搭配玫瑰和百合？"})
# print("结果2:\n", result2)

# print("\n" + "#"*70)
# print("# 测试 3: 其他问题(使用默认链)")
# print("#"*70)
# result3 = chain.invoke({"input": "今天天气怎么样？"})
# print("结果3:\n", result3)