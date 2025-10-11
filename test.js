
const cunjinGoldEntityHead = {
    "0": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/fmvDTo4IodUAAAAARKAAAAgAehsSAQFr/original",
    "1": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/ANz0SJgOS9cAAAAASoAAAAgAehsSAQFr/original",
    "2": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/o4HtSr2IrQkAAAAAUCAAAAgAehsSAQFr/original",
    "3": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/UsfUQ77BxsIAAAAATiAAAAgAehsSAQFr/original",
    "4": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/8mfiQovmfSQAAAAAT_AAAAgAehsSAQFr/original",
    "5": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/XX_LQpsxqkwAAAAATcAAAAgAehsSAQFr/original",
    "6": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/Cy8RQK7U1ukAAAAATmAAAAgAehsSAQFr/original",
    "7": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/96ZHSK9c5o4AAAAATxAAAAgAehsSAQFr/original",
    "8": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/ZiZXQbMcfScAAAAAUxAAAAgAehsSAQFr/original",
    "9": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/bAw0SJ1pYccAAAAAU_AAAAgAehsSAQFr/original",
    "10": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/iuuTQb8dJp8AAAAATjAAAAgAehsSAQFr/original",
    "20": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/W8RQTriligIAAAAATmAAAAgAehsSAQFr/original",
    "30": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/81sZQY5QYMkAAAAASyAAAAgAehsSAQFr/original",
    "40": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/vIsyRLaqSDYAAAAATCAAAAgAehsSAQFr/original",
    "50": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/K1RQRLRuzTwAAAAATHAAAAgAehsSAQFr/original",
    "60": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/yV3cTIOSEi0AAAAATZAAAAgAehsSAQFr/original",
    "70": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/96ZHSK9c5o4AAAAATxAAAAgAehsSAQFr/original",
    "80": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/rFo3R56xa9cAAAAAUaAAAAgAehsSAQFr/original",
    "90": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/2mtNRryJexIAAAAAUyAAAAgAehsSAQFr/original",
    
    "150": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/83UjR6NlPfoAAAAAU8AAAAgAehsSAQFr/original",
    "200": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/uSN5RqP3ztoAAAAAVhAAAAgAehsSAQFr/original",
    "300": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/xyKGQ5vsc7AAAAAAVxAAAAgAehsSAQFr/original",
    "400": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/4BPgS6vu2noAAAAAWcAAAAgAehsSAQFr/original",
    "500": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/YAO_SYewghEAAAAAViAAAAgAehsSAQFr/original",
    "600": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/gxK1T5d4eLMAAAAAWYAAAAgAehsSAQFr/original",
    "700": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/J6GuR4qcEE0AAAAAXAAAAAgAehsSAQFr/original",
    "800": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/-bELR54COGQAAAAAWDAAAAgAehsSAQFr/original",
    "900": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/uHh_R4oeUT8AAAAAWfAAAAgAehsSAQFr/original",
    "1000": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/8_JpR62agHQAAAAAWdAAAAgAehsSAQFr/original",
    "100": "https://mdn.alipayobjects.com/huamei_asqyc4/afts/img/Bx-rQKkGwcEAAAAATkAAAAgAehsSAQFr/original",
  }


function isNumber(num) {
  if (num == null) {
    return false;
  }
  return /^[+-]?\d+(?:\.\d+)?$/.test(num);
};

function handleGramRange(gram, imgObjConfig = {}) {
  const gramNum = Number(gram);
  // 确保输入是有效的数字
  if (!isNumber(gramNum)) {
    console.log('not number:', gramNum);
    return '';
  }

  
  const numList = Object.keys(imgObjConfig)
    .filter(num => isNumber(num))  
    .map(key => {
      const num = Number(key);
      return num;
    });

  let prevValue = 0;
  for (let i = 0; i < numList.length; i++) {
    const num = numList[i];
    // 若用户持有的克数比当前的克数配置大，且当前保存的目标克重比当前的克重小
    // 则更新更大的目标克重
    if (gramNum >= num) {
      prevValue = num;
    }
  }
  console.log('prevValue:', prevValue);
  return imgObjConfig[prevValue];
  
}



handleGramRange('103.12', cunjinGoldEntityHead)

// console.log(isNumber('103.12'));