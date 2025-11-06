# LLMChain围绕着语言模型推理功能又添加了一些功能，整合了PromptTemplate、语言模型（LLM或聊天模型）和 Output Parser，相当于把Model I/O放在一个链中整体操作。它使用提示模板格式化输入，将格式化的字符串传递给 LLM，并返回 LLM 输出。

from langchain.prompts import PromptTemplate

# 原始字符串模板
template = "{flower}的花语是?"
prompt_template = PromptTemplate.from_template(template)

from langchain_openai.llms import OpenAI
llm = OpenAI(temperature=0)

# 手动调用模型
prompt = prompt_template.format(flower="玫瑰")
resultV1 = llm.invoke(prompt)
print('resultV1: ', resultV1)
# 爱情、美丽、浪漫、温柔、热情、欢乐、尊敬、感激、祝福、纯洁、永恒。


# 使用最新的LLMChain写法简化流程。同时指定模版 | 模型 | 输出解析器
llm_chain = prompt_template | llm
resultV2 = llm_chain.invoke({"flower": "百合花"})
print('resultV2: ', resultV2)
# 百合花的花语有很多种，常见的有：

# 1. 纯洁无暇：百合花代表纯洁无暇的爱情，象征着纯洁的心灵和美好的品质。

# 2. 爱的誓言：百合花也代表着爱的誓言，象征着永恒的爱情和忠诚的承诺。

# 3. 美好的祝福：百合花也是一种美好的祝福，代表着幸福、健康和平安。

# 4. 神圣的爱：百合花也被称为“圣洁之花”，代表着神圣的爱情和纯洁的心灵。

# 5. 美丽的心灵：百合花也象征着美丽的心灵和高贵的
