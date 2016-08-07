function getStyle(obj,name){
    if(obj.currentStyle){
        return obj.currentStyle[name];
    }else{
        return getComputedStyle(obj,false)[name];
    }
}
function move(obj,json,options){
    options = options || {};
    options.duration = options.duration || 3000;
    options.easing = options.easing || 'ease-out';
    var count = Math.floor(options.duration/30);
    var start = {};
    var dis = {};
    for(var name in json){
        start[name] = parseFloat(getStyle(obj,name));
        dis[name] = json[name] - start[name];
    }
    var n = 0;
    clearInterval(obj.timer);
    obj.timer = setInterval(function(){
        n++;
        for(var name in json){
            switch(options.easing){
                case 'linear' :
                    var a = n/count;
                    var cur = start[name] + dis[name]*a;
                    break;
                case 'ease-in' :
                    var a = n/count;
                    var cur = start[name] + dis[name]*a*a*a;
                    break;
                case 'ease-out' :
                    var a = 1-n/count;
                    var cur = start[name] + dis[name]*(1-a*a*a);
                    break;
            }
            if(name == 'opacity'){
                obj.style[name] = cur;
                obj.style.filter = 'alpha(opacity:'+cur*100+')';
            }else{
                obj.style[name] = cur + 'px';
            }
        }
        if(n >= count){
            clearInterval(obj.timer);
            options.complete && options.complete();
        }
    },30)
}