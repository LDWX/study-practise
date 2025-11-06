# 导入所需要的库
from langchain_openai import OpenAI
from langchain.prompts import PromptTemplate

# 初始化LLM
llm = OpenAI(temperature=.7)

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
introduction_chain = prompt_template1 | llm 

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
review_chain = prompt_template2 | llm

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
social_post_chain = prompt_template3 | llm

# 组合整个链
def run_overall_chain(inputs):
    # 第一步：生成介绍
    introduction = introduction_chain.invoke(inputs)
    print(f"\n=== 介绍 ===\n{introduction}\n")
    
    # 第二步：生成评论
    review = review_chain.invoke({"introduction": introduction})
    print(f"\n=== 评论 ===\n{review}\n")
    
    # 第三步：生成社交媒体帖子
    social_post = social_post_chain.invoke({
        "introduction": introduction,
        "review": review
    })
    print(f"\n=== 社交媒体帖子 ===\n{social_post}\n")
    
    return {
        "introduction": introduction,
        "review": review,
        "social_post_text": social_post
    }

# 运行链并打印结果
result = run_overall_chain({
    "name": "玫瑰",
    "color": "黑色"
})
print("\n=== 最终结果 ===")
print(result)
