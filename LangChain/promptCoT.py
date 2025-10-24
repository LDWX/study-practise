from langchain_openai import ChatOpenAI
llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)

# 设定 AI 的角色和目标
role_template = "你是一个为花店电商公司工作的AI助手, 你的目标是帮助客户根据他们的喜好做出明智的决定"

# CoT 的关键部分，AI 解释推理过程，并加入一些先前的对话示例（Few-Shot Learning）
cot_template = """
作为一个为花店电商公司工作的AI助手，我的目标是帮助客户根据他们的喜好做出明智的决定。 

我会按部就班的思考，先理解客户的需求，然后考虑各种鲜花的涵义，最后根据这个需求，给出我的推荐。
同时，我也会向客户解释我这样推荐的原因。

<示例1>
  人类：我想找一种象征爱情的花。
  AI：首先，我理解你正在寻找一种可以象征爱情的花。在许多文化中，红玫瑰被视为爱情的象征，这是因为它们的红色通常与热情和浓烈的感情联系在一起。因此，考虑到这一点，我会推荐红玫瑰。红玫瑰不仅能够象征爱情，同时也可以传达出强烈的感情，这是你在寻找的。
</<示例1>

<示例2>
  人类：我想要一些独特和奇特的花。
  AI：从你的需求中，我理解你想要的是独一无二和引人注目的花朵。兰花是一种非常独特并且颜色鲜艳的花，它们在世界上的许多地方都被视为奢侈品和美的象征。因此，我建议你考虑兰花。选择兰花可以满足你对独特和奇特的要求，而且，兰花的美丽和它们所代表的力量和奢侈也可能会吸引你。
</示例2>
"""

# ToT 思维树模版
tot_template = """
假设一个顾客在鲜花网站上询问：“我想为我的妻子购买一束鲜花，但我不确定应该选择哪种鲜花。她喜欢淡雅的颜色和花香。”

AI（使用ToT框架）：

思维步骤1：理解顾客的需求。
顾客想为妻子购买鲜花。
顾客的妻子喜欢淡雅的颜色和花香。

思维步骤2：考虑可能的鲜花选择。
候选1：百合，因为它有淡雅的颜色和花香。
候选2：玫瑰，选择淡粉色或白色，它们通常有花香。
候选3：紫罗兰，它有淡雅的颜色和花香。
候选4：桔梗，它的颜色淡雅但不一定有花香。
候选5：康乃馨，选择淡色系列，它们有淡雅的花香。

思维步骤3：根据顾客的需求筛选最佳选择。
百合和紫罗兰都符合顾客的需求，因为它们都有淡雅的颜色和花香。
淡粉色或白色的玫瑰也是一个不错的选择。
桔梗可能不是最佳选择，因为它可能没有花香。
康乃馨是一个可考虑的选择。

思维步骤4：给出建议。
“考虑到您妻子喜欢淡雅的颜色和花香，我建议您可以选择百合或紫罗兰。淡粉色或白色的玫瑰也是一个很好的选择。希望这些建议能帮助您做出决策！”
"""



from langchain.prompts import ChatPromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate
system_prompt_role = SystemMessagePromptTemplate.from_template(role_template)
# system_prompt_cot = SystemMessagePromptTemplate.from_template(cot_template)
system_prompt_cot = SystemMessagePromptTemplate.from_template(tot_template)

# 用户的咨询
human_template = "{human_input}"
human_prompt = HumanMessagePromptTemplate.from_template(human_template)

chat_prompt = ChatPromptTemplate.from_messages([system_prompt_role, system_prompt_cot, human_prompt])

result = llm.invoke(chat_prompt.format_prompt(human_input="我想找一种象征爱情和热情的花。他喜欢紫色，你有什么建议吗？").to_messages())

print(result.content)
