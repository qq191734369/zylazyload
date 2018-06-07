
var ZYLazy = (function(window){
    var _ImgArr = [];
    return {
        //扩展对象方法
        extend:function(){
            var i = 1,
            len =  arguments.length,
            target = arguments[0],
            j;
            //如果没有目标对象，那么扩展函数库自身
            if(i==len){
                target = this;
                i--;
            }
            //外层遍历对象，内层遍历对象的属性，并复制到target上
            for(;i<len;i++){
                for(j in arguments[i]){
                    target[j] = arguments[i][j];
                }
            }
            return target;
        },
        // 节流器,如果第一个参数传入true，那么清除动作。如果传入的第一个参数是一个函数名称、第二个参数是一个配置对象，那么延迟执行该函数
        /*
        * 配置对象格式: {
        *   context:null,  执行上下文
            args:[],  传入函数的输入参数
            time:300  延迟执行的时间
        * }
        */
        throttle:function(){
            var isClear = arguments[0],fn,params;
            if(typeof isClear === 'boolean'){
                fn = arguments[1];
                fn._throttleID && clearTimeout(fn._throttleID);
            }else{
                fn = arguments[0];
                params = arguments[1];
                var p = this.extend({
                    context:null,
                    args:[],
                    time:300
                },params)
                arguments.callee(true,fn);
                fn._throttleID = setTimeout(() => {
                    fn.apply(p.context,p.args)
                }, p.time);
            }
        },
        init:function(){
            var t = this;
            var p = {context:t};
            if(typeof arguments[0] == 'object'){
                this.extend(p,arguments[0])
            }
            this.getImag();
            this.update();
            this.on(window,'resize',function(){
                t.throttle(t.update,p)
            });
            this.on(window,'scroll',function(){
                t.throttle(t.update,p)
            })
        },
        getImag:function(){
            var imgs = document.querySelectorAll('img.zylazy');
            for(var i=0;i<imgs.length;i++){
                _ImgArr.push(imgs[i])
            }
            return _ImgArr;
        },
        update:function(){
            if(!_ImgArr.length) return;
            var i = _ImgArr.length;
            for(--i;i>=0;i--){
                if(this.shouldShow(_ImgArr[i])){
                    var a = _ImgArr[i].getAttribute('data-src');
                    _ImgArr[i].src = a;
                    _ImgArr.splice(i,1);
                }
            }
            
            console.log('update')
        },
        getPageY:function(ele){
            if(ele.offsetParent){
                return this.getPageY(ele.offsetParent) + ele.offsetTop;
            }else{
                return ele.offsetTop;
            }
        },
        shouldShow:function(img){
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var scrollBottom = scrollTop + document.documentElement.clientHeight;
            var imgTop = this.getPageY(img);
            var imgBottom = imgTop + img.offsetHeight;
            //判断图片是否在视口区域
            if(imgTop<scrollBottom && imgBottom > scrollTop){
                return true;
            }
        },
        on:function(ele,type,fn){
            if(ele.addEventListener){
                addEventListener(type,fn,false)
            }else{
                ele.attachEvent('on'+type,fn,false)
            }
        }
    }
})(window)