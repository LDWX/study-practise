如果希望使用 esm module 的方式导入文件，则需要在package.json 的 type 指定为 module:
```json
{
  "type": "module"
}
```

如果希望使用 cjs 的方式导入文件，则将package.json 文件的 type 指定为 commonjs:
```json
{
  "type": "commonjs"
}
```