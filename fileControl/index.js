const XLSX = require('xlsx');
const fs = require('fs');
const axios = require('axios');


// 读取Excel文件
const workbook = XLSX.readFile('./result2.xlsx');

// 获取工作表的名字
const sheetNames = workbook.SheetNames;
const sheet = workbook.Sheets[sheetNames[0]];

// 将工作表转换为JSON
// {
//   fileName: '图层 92.png',
//   fileId: 'A*2sGeQLUCcysAAAAAAAAAAAAAAQAAAQ',
//   url: 'https://mdn.alipayobjects.com/portal_cjbfax/afts/img/A*2sGeQLUCcysAAAAAAAAAAAAAAQAAAQ/original',
//   format: 'png'
// },
const dataList = XLSX.utils.sheet_to_json(sheet);

// // fs.mkdirSync('images');

dataList.forEach(data => {
  // const {fileName, url, format} = data || {};
  axios.get(data['链接'], { responseType: 'arraybuffer' })
    .then(response => {
      const imageData = response.data;
      // 在这里保存图像文件
      fs.writeFile(`images/${data['素材名称']}`, imageData, 'binary', (error) => {
        if (error) {
          console.error('保存图像失败', error);
        } else {
          console.log('图像保存成功');
        }
      });
    })
    .catch(error => {
      console.error('获取图像失败', error);
   });
});


console.log(dataList);