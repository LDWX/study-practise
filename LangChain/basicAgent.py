from langchain_openai import ChatOpenAI


chat = ChatOpenAI(
    model="gpt-4",
    temperature=0.8,
    max_tokens=60,
)

from langchain_core.messages import HumanMessage, SystemMessage  # Updated import

messages = [
    SystemMessage(content="你是一个很棒的智能助手"),
    HumanMessage(content="请给我的花店起个名")
]
response = chat.invoke(messages)
print(response.content)





# def get_weather(city: str) -> str:
#     """Get weather for a given city."""
#     return f"It's always sunny in {city}!"


# agent = create_agent(
#     model="openai:gpt-5-mini",
#     tools=[get_weather],
#     # prompt="You are a helpful assistant.",
# )

# # Run the agent
# agent.invoke(
#     {"messages": [{"role": "user", "content": "What is the weather in San Francisco?"}]}
# )

