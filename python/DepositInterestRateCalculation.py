# 存款收益计算
def calculateDepositProfit(money, rate, year, period = 1):
  totalMoney = round(money * (1 + rate / 100)**(year // period), 2)
  print('到期本息总额::: ', totalMoney)
  
  profitMoney = round(totalMoney - money, 2)
  print('利息::: ', profitMoney)
  print('\n')

# 金额, 利率, 年份, 每期周期
# calculateDepositProfit(1000000, 3.4, 30, 2)
# calculateDepositProfit(10000, 3.23, 3, 1)



# 贷款利率计算
def cal_fd(rate, months, money, showDetail):
    import math
    yearRate = rate / 100  # 年利率
    monthRate = yearRate / 12  # 月利率
    mpa = (money * monthRate * math.pow(1 + monthRate, months)) / (math.pow(1 + monthRate, months) - 1)  # 等额本息月供，每月月供相等
    print(f"""
等额本息还款计算结果:
等额本息月供:{round(mpa, 2)}元
等额本息共还款:{round(mpa * months, 2)}元
利息总额:{round(mpa * months -money, 2)}元
""")
    print('***************************************\n')
    print('等额本金还款计算结果：')
    total = 0
    mpa1 = (money / months) + (money - 0 * money / months) * monthRate                       #计算首月月供
    print('等额本金第{}个月月供：{}元'.format( 1, round(mpa1, 2)))
    mpa2 = (money / months) + (money - 1 * money / months) * monthRate                       #计算第二月月供
    print('等额本金每月递减金额：{:.2f}元'.format(mpa1-mpa2))
    mpam = (money / months) + (money - (months-1) * money / months) * monthRate
    print('等额本金末月月供：{}元'.format(round(mpam, 2)))          #计算月供递减量

    # 计算总的本息
    for i in range(0, months):
        mpan = (money / months) + (money - i * money / months) * monthRate
        total += mpan
    print('等额本金本息共计还款:{}元'.format(round(total,2)))
    print('利息总额:{}元'.format(round(total - money, 2)))
    print('***************************************\n')

    if showDetail:
      print('等额本金每月月供详情：')
      for i in range(0, months):
          mpan = (money / months) + (money - i * money / months) * monthRate  # 等额本金月供，每月月供不相等
          print('等额本金第{}个月月供：{}元'.format(i+1, round(mpan, 2)))

# 利率, 月数, 金额
cal_fd(0.4, 30 * 12, 400000, False)
# cal_fd(2.85, 30 * 12, 400000, False)


# 定投存款利率计算
# 每年存1万，利率1.35%，持续存10年，一共能获得多少利息？转化为10年期单利是多少？
def cal_bond_profit(money, rate, year):
  ratePercent = rate / 100
  tmpMoney = money
  for i in range(0, year):
    tmpMoney = tmpMoney*(1+ ratePercent)
  
  totalProfit = tmpMoney - money
  simpleRate = totalProfit / (year * money)
  
  print(f"""本息总和：{round(tmpMoney, 2)}元
总利息:{round(totalProfit, 2)}元
年化单利:{round(simpleRate * 100, 2)}%
""")
  
# 金额, 利率, 存几年  
# cal_bond_profit(2000000, 3.1, 30)


# 通过总利息利息计算年化复利
# 1万，10年后到手1.5万。对应的复利年化是多少
import math
def cal_profit_multi_rate(money, profit, year, period):
  # 可以产生几次复利
  periodTimes = round(year / period, 0)
  totalMoney = money + profit
  
  num = math.pow(totalMoney / money, 1 / periodTimes) - 1
  
  rate = round(num * 100, 2)
  print(f"""复利年化利率为：{rate}%""")
  
# 本金, 利息, 年限, 定期周期
# cal_profit_multi_rate(10000, 1000, 3, 1)
  
  
  
  
