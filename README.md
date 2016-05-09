
# gulp-freemarker-demo
>基于gulp-freemarker基本配置,实现自动刷新预览

###原理
参考使用
```javascript
gulp.src(config.paths.mock)
        .pipe(changed(config.paths.output))
        .pipe(freemarker({
            viewRoot: config.paths.viewRoot,
            options: {}
        }))
        .pipe(gulp.dest(config.paths.output));
```

根据mock文件的json配置编译ftl文件

```javascript
{
  "file": "index.ftl", 
  "data": {            
    "name": "World"
  }
}
```
```file||ftl``` 记录```*.ftl```的文件目录 相对于 ```viewRoot```的相对路径:
data 是渲染file制定ftl文件的数据

###NOTE
>在viewRoot中的```/a/b/c/list.ftl```对应的json文件路径为 ```mock/a/b/c/list.json```
编译的结果才会和ftl模板文件路径一致。
###运行
```bash

 gulp
 
```