# zylazyload
用法： 首先引入Zlazy.js文件。在img标签中添加 class = 'zylazy' 类，并且在data-src属性中设置图片地址

例如：
```
<img src="http://placehold.it/200x200" alt="" class="zylazy" data-src = 'http://placehold.it/400x400'>
```

用js代码启动懒加载:
```
 <script>
    ZYLazy.init();
 </script>
```

init可以传入一个对象对懒加载模块进行配置：
```
ZYLazy.init({
    time: 200
});
```
目前只有time一个属性（单位是ms，默认300），日后会根据需求扩展
