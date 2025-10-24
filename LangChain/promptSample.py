# 1. 创建一些示例
samples = [
  {
    "flower_type": "玫瑰",
    "occasion": "爱情",
    "ad_copy": "玫瑰，浪漫的象征，是你向心爱的人表达爱意的最佳选择。"
  },
  {
    "flower_type": "康乃馨",
    "occasion": "母亲节",
    "ad_copy": "康乃馨代表着母爱的纯洁与伟大，是母亲节赠送给母亲的完美礼物。"
  },
  {
    "flower_type": "百合",
    "occasion": "庆祝",
    "ad_copy": "百合象征着纯洁与高雅，是你庆祝特殊时刻的理想选择。"
  },
  {
    "flower_type": "向日葵",
    "occasion": "鼓励",
    "ad_copy": "向日葵象征着坚韧和乐观，是你鼓励亲朋好友的最好方式。"
  }
]

from langchain.prompts import PromptTemplate
template="鲜花类型: {flower_type}\n场合: {occasion}\n文案: {ad_copy}"
prompt_sample = PromptTemplate(input_variables=["flower_type", "occasion", "ad_copy"], template=template)

# print(prompt_sample.format(**samples[0]))

from langchain.prompts import FewShotPromptTemplate
# 将全量的sample传递给大模型
# prompt = FewShotPromptTemplate(
#     examples=samples,
#     example_prompt=prompt_sample,
#     # prefix="请为以下鲜花店文案撰写一个吸引人的短文案：",
#     suffix="鲜花类型: {flower_type}\n场合: {occasion}\n",
#     input_variables=["flower_type", "occasion"],
#     example_separator="\n\n"
# )

# print(prompt.format(flower_type="水仙花", occasion="友谊"))

# 1.** 适配的模型类型不同 -OpenAI**：
# 主要适配 OpenAI 的文本补全模型（Completion API），例如 text-davinci-003、text-curie-001 等。这类模型是早期的生成式模型，输入是纯文本提示（prompt），输出是基于提示的续写文本，没有 “对话” 的概念（不区分用户 / 助手角色）。
# -ChatOpenAI：专门适配 OpenAI 的对话模型（Chat Completion API），例如 gpt-3.5-turbo、gpt-4 等。这类模型是为对话场景设计的，输入是消息列表（包含角色和内容，如 system、user、assistant），输出是符合对话逻辑的响应，更适合多轮对话场景。

# 2.** 输入输出格式不同 
# -OpenAI**：
# 输入是单一的字符串 prompt（例如 prompt="请解释什么是人工智能"）。
# 输出是模型续写的文本字符串（直接基于 prompt 生成内容）。
# -ChatOpenAI：
# 输入是消息列表（messages），每个消息包含 role（角色：system/user/assistant）和 content（内容）。
# 输出是对话格式的响应，需要通过 .content 提取具体内容。

from langchain_openai import OpenAI
model = OpenAI(model_name='gpt-3.5-turbo-instruct')

# result = model.invoke(prompt.format(flower_type="水仙花", occasion="友谊"))
# print(result)


# 使用示例选择器
from langchain.prompts.example_selector import SemanticSimilarityExampleSelector
from langchain_chroma import Chroma
from langchain_openai import OpenAIEmbeddings

# ***会从我们的sample中选出与prompt中最相似的例子送给大模型，从而节约了token***
example_selector = SemanticSimilarityExampleSelector.from_examples(
  examples=samples,
  embeddings=OpenAIEmbeddings(),
  vectorstore_cls=Chroma(),
  k=1
)

prompt = FewShotPromptTemplate(
    example_selector=example_selector,
    example_prompt=prompt_sample,
    suffix="鲜花类型: {flower_type}\n场合: {occasion}\n",
    input_variables=["flower_type", "occasion"],
    example_separator="\n\n"
)

print(prompt.format(flower_type="水仙花", occasion="友谊"))
result = model.invoke(prompt.format(flower_type="水仙花", occasion="友谊"))
print(result)
