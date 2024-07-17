import { parse, build } from '@ali/schema';


const url = "http://localhost:3001/toolbarMore.html"
// const url = "alipays://platformapi/startapp?appId=68687906&url=http%3A%2F%2F30.177.64.109%3A3001%2FtoolbarMore.html%3FenableWK%3DYES"



// const url =  "alipays://platformapi/startapp?appId=68687406&url=%2Fwww%2Findex_home.html%3FenableWK%3DYES&allowsBounceVertical=NO&appClearTop=false&nbupdate=syncforce&nbversion=0.4.2209221732.31&pd=NO&pullRefresh=NO&startMultApp=YES&ttb=auto";



const insertParamsToSchema = (url, paramObj = {}) => {
  const parsedSchemaRes = parse(url);
  const { result } = parsedSchemaRes || {};
  const { urlParams = {}, webviewOptions = {} } = result || {};

  console.log('parsedSchemaRes::: ', parsedSchemaRes)

  const urlParamsArr = Object.keys(urlParams).map(key => {
    return {
      key,
      value: urlParams[key],
    };
  });

  const webviewOptionsArr = Object.keys(webviewOptions).map(key => {
    return {
      key,
      value: webviewOptions[key],
    }
  });

  const customParamArr = Object.keys(paramObj).map(key => {
    return {
      key,
      value: paramObj[key]
    }
  });

  const totalParamsArr = [...urlParamsArr, ...webviewOptionsArr, ...customParamArr];

  const newSchema = build({
    ...result,
    params: totalParamsArr,
  });

  return newSchema?.result || '';
}

const tmp = insertParamsToSchema(url, {
  diliverInfo: 'test'
})



console.log('newSchema::: ', tmp);