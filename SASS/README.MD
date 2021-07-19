这个项目是为了学习 `SASS` 语法，可以自己将 `scss` 文件转换为 `css` 文件

### 编译
> sass --watch SASS:CSS

### 压缩编译
> sass --watch SASS:CSS --style compressed
添加 `--no-source-map` 则生成的 `css` 文件没有 `map` 文件:
> sass --watch SASS:CSS --style compressed --no-source-map

### 编译output style

> nested (default)

```css
#main {
  color: #fff;
  background-color: #000; }
  #main p {
    width: 10em; }
```

> expanded

```css
#main {
  color: #fff;
  background-color: #000;
}
#main p {
  width: 10em;
}
```

> compressed

```css
#main{color:#fff;background-color:#000}#main p{width:10em}.huge{font-size:10em;font-weight:bold;text-decoration:underline}
```

> compact

```css
#main { color: #fff; background-color: #000; }
#main p { width: 10em; }
```