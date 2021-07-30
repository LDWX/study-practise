### 安装sass
> npm install -g sass

### 编译
> sass --watch SASS:CSS

### 压缩编译
> sass --watch SASS:CSS --style compressed

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