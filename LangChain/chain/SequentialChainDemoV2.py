# 导入所需要的库
from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

# 初始化LLM
llm = OpenAI(temperature=.7)
output_parser = StrOutputParser()

# 第一个链：生成鲜花的介绍
template1 = """
你是一个植物学家。给定花的名称和类型,你需要为这种花写一个200字左右的介绍。
花名: {name}
颜色: {color}
植物学家: 这是关于上述花的介绍:"""
prompt_template1 = PromptTemplate(
    input_variables=["name", "color"],
    template=template1
)
introduction_chain = prompt_template1 | llm | output_parser

# 第二个链：根据鲜花的介绍写出鲜花的评论
template2 = """
你是一位鲜花评论家。给定一种花的介绍,你需要为这种花写一篇200字左右的评论。
鲜花介绍:
{introduction}
花评人对上述花的评论:"""
prompt_template2 = PromptTemplate(
    input_variables=["introduction"],
    template=template2
)
review_chain = prompt_template2 | llm | output_parser

# 第三个链：根据鲜花的介绍和评论写出一篇自媒体的文案
template3 = """
你是一家花店的社交媒体经理。给定一种花的介绍和评论,你需要为这种花写一篇社交媒体的帖子,300字左右。
鲜花介绍:
{introduction}
花评人对上述花的评论:
{review}
社交媒体帖子:
"""
prompt_template3 = PromptTemplate(
    input_variables=["introduction", "review"],
    template=template3
)
social_post_chain = prompt_template3 | llm | output_parser

# 使用 RunnablePassthrough.assign() 组合整个链
overall_chain = (
    RunnablePassthrough.assign(
        introduction=introduction_chain
    )
    | RunnablePassthrough.assign(
        review=review_chain
    )
    | RunnablePassthrough.assign(
        social_post_text=social_post_chain
    )
)

# 运行链并打印结果
result = overall_chain.invoke({
    "name": "玫瑰",
    "color": "黑色"
})

print("\n=== 最终结果 ===")
print(f"介绍: {result['introduction']}\n")
print(f"评论: {result['review']}\n")
print(f"社交媒体帖子: {result['social_post_text']}\n")