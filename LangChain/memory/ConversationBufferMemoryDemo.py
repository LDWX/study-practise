from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnableWithMessageHistory
from langchain_core.output_parsers import StrOutputParser
from langchain_community.chat_message_histories import ChatMessageHistory

# 初始化大语言模型
llm = ChatOpenAI(
    temperature=0.5,
    model_name="gpt-3.5-turbo"
)

human_prompt = HumanMessagePromptTemplate.from_template("{input}")

role_template="你是一个友好的助手，会根据对话历史提供连贯回复。"
system_prompt = SystemMessagePromptTemplate.from_template(role_template)

# 2. 定义带记忆的提示模板
# 包含系统消息、对话历史占位符、用户输入
prompt = ChatPromptTemplate.from_messages([
  system_prompt,
  MessagesPlaceholder(variable_name="history"),  # 存储对话历史
  human_prompt,
])

base_chain = prompt | llm | StrOutputParser()

history = ChatMessageHistory()

conversation_chain = RunnableWithMessageHistory(
  base_chain,
  get_session_history=lambda session_id: history,
  input_messages_key="input",
  history_messages_key="history"
)

# 调用链时需传入 session_id（单会话场景可固定）
response = conversation_chain.invoke(
    {"input": "我姐姐明天要过生日，我需要一束生日花束。"},
    config={"configurable": {"session_id": "user_123"}}  # 会话ID，用于区分不同用户
)

# 打印回复和记忆中的对话历史
print("AI 回复:", response)
# AI 回复: 那太棒了！送花是个很贴心的选择。你知道你姐姐喜欢什么样的花吗？或者你想让花束有什么特别的主题或颜色吗？我可以帮你推荐一些花店或者花束设计。
print("\n第一次对话后的记忆:")
for msg in history.messages:
    print(f"{msg.type}: {msg.content}")  # msg.type 为 "human" 或 "ai"
# 第一次对话后的记忆:
# human: 我姐姐明天要过生日，我需要一束生日花束。
# ai: 那太棒了！送花是个很贴心的选择。你知道你姐姐喜欢什么样的花吗？或者你想让花束有什么特别的主题或颜色吗？我可以帮你推荐一些花店或者花束设计。

response = conversation_chain.invoke(
    {"input": "她喜欢粉色玫瑰，颜色是粉色的。"},
    config={"configurable": {"session_id": "user_123"}}  # 会话ID，用于区分不同用户
)
print("\n\nAI 回复:", response)
# AI 回复: 那么你姐姐一定会喜欢粉色玫瑰的生日花束！你可以考虑在附近的花店或者在线花店订购粉色玫瑰花束。你也可以选择搭配一些绿叶或其他粉色花卉来增加花束的层次感和美感。祝你姐姐生日快乐！
print("\n第二次对话后的记忆:")
for msg in history.messages:
    print(f"{msg.type}: {msg.content}")  # msg.type 为 "human" 或 "ai"
# 第二次对话后的记忆:
# human: 我姐姐明天要过生日，我需要一束生日花束。
# ai: 那太棒了！送花是个很贴心的选择。你知道你姐姐喜欢什么样的花吗？或者你想让花束有什么特别的主题或颜色吗？我可以帮你推荐一些花店或者花束设计。
# human: 她喜欢粉色玫瑰，颜色是粉色的。
# ai: 那么你姐姐一定会喜欢粉色玫瑰的生日花束！你可以考虑在附近的花店或者在线花店订购粉色玫瑰花束。你也可以选择搭配一些绿叶或其他粉色花卉来增加花束的层次感和美感。祝你姐姐生日快乐！


response = conversation_chain.invoke(
    {"input": "还记得我刚才为什么要买花吗？"},
    config={
        "configurable": {"session_id": "user_321"},
        "recursion_limit": 1
    }  # 会话ID，用于区分不同用户
)
print("\n\nAI 回复:", response)
# AI 回复: 那么你姐姐一定会喜欢粉色玫瑰的生日花束！你可以考虑在附近的花店或者在线花店订购粉色玫瑰花束。你也可以选择搭配一些绿叶或其他粉色花卉来增加花束的层次感和美感。祝你姐姐生日快乐！
print("\n第三次对话后的记忆:")
for msg in history.messages:
    print(f"{msg.type}: {msg.content}")  # msg.type 为 "human" 或 "ai"