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
