from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnableWithMessageHistory
from langchain_core.output_parsers import StrOutputParser
from langchain_community.chat_message_histories import ChatMessageHistory
from typing import Dict
from langchain_core.chat_history import BaseChatMessageHistory

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

# 使用字典存储每个会话的历史（支持多会话）
store: Dict[str, BaseChatMessageHistory] = {}

def get_session_history(session_id: str) -> BaseChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]

conversation_chain = RunnableWithMessageHistory(
  base_chain,
  get_session_history,
  input_messages_key="input",
  history_messages_key="history"
)

# 自定义修剪函数：限定为最近1个会话（1对 human + ai，即2条消息）
def trim_history(history: BaseChatMessageHistory, k=1):
    # 保留最近 2*k 条消息（每对 human + ai）
    if len(history.messages) > 2 * k:
        history.messages = history.messages[-2 * k:]
    return history

# 修改调用逻辑：在调用前修剪历史
def invoke_with_trim(input_dict: Dict, config: Dict) -> str:
    session_id = config["configurable"]["session_id"]
    history = get_session_history(session_id)
    
    # 修剪历史
    trim_history(history, k=1)
    
    # 调用链
    return conversation_chain.invoke(input_dict, config=config)

# 测试调用（使用 invoke_with_trim 代替直接 invoke）

# 第一次调用 (session_id: user_123)
response1 = invoke_with_trim(
    {"input": "我姐姐明天要过生日，我需要一束生日花束。"},
    config={"configurable": {"session_id": "user_123"}}
)
print("AI 回复:", response1)
print("\n第一次对话后的记忆:")
history = get_session_history("user_123")
for msg in history.messages:
    print(f"{msg.type}: {msg.content}")

# 第二次调用 (session_id: user_123)
response2 = invoke_with_trim(
    {"input": "她喜欢粉色玫瑰，颜色是粉色的。"},
    config={"configurable": {"session_id": "user_123"}}
)
print("\n\nAI 回复:", response2)
print("\n第二次对话后的记忆:")
for msg in history.messages:
    print(f"{msg.type}: {msg.content}")

# 第三次调用 (session_id: user_123)
response3 = invoke_with_trim(
    {"input": "还记得我为什么要买花吗？"},
    config={"configurable": {"session_id": "user_123"}}
)
print("\n\nAI 回复:", response3)
print("\n第三次对话后的记忆:")
for msg in history.messages:
    print(f"{msg.type}: {msg.content}")