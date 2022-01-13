import express from 'express';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {createRouter} from '@/router';

const app = express();
app.use(express.static("dist"))
app.get('*',function(req,res){
  const context = {};
  const content = renderToString(<div>
    {createRouter('server')({
        location:req.url,
        context
    })}
  </div>);
  //当Redirect被使用时，context.url将包含重新向的地址
  if(context.url){
    //302
    res.redirect(context.url);
  }else{
    if(context.NOT_FOUND) res.status(404);//判断是否设置状态码为404
    res.send(`
        <!doctype html>
        <html>
            <title>ssr</title>
            <body>
                <div id="root">${content}</div>
                <script src="/client/index.js"></script>
            </body>
        </html>
    `);
  }
});
app.listen(3000);