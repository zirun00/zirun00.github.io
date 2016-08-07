<!--碰撞检测-->
function collTest(obj1,obj2){
    var L=obj1.offsetLeft;
    var R=obj1.offsetLeft+obj1.offsetWidth;
    var T=obj1.offsetTop;
    var B=obj1.offsetTop+obj1.offsetHeight;
    var L2=obj2.offsetLeft;
    var R2=obj2.offsetLeft+obj2.offsetWidth;
    var T2=obj2.offsetTop;
    var B2=obj2.offsetTop+obj2.offsetHeight;
    if(L<R2&&R>L2&&T<B2&&B>T2){
        return true;
    }else{
        return false;
    }
};

    var aLi=document.getElementsByTagName('li');
    var aInput=document.getElementsByTagName('input')[0];
    var arr=[];

    for(var i=0;i<aLi.length;i++){
        arr.push({left:aLi[i].offsetLeft,top:aLi[i].offsetTop})
    }
    for(var i=0;i<aLi.length;i++){
        aLi[i].style.position='absolute';
        aLi[i].style.left=arr[i].left+'px';
        aLi[i].style.top=arr[i].top+'px';
        aLi[i].style.margin=0;
    }
    aInput.onclick=function(){
        arr.sort(function(){
            return Math.random()-0.5;
        });
        for(var i=0;i<aLi.length;i++){
            aLi[i].style.position='absolute';
            aLi[i].style.left=arr[i].left+'px';
            aLi[i].style.top=arr[i].top+'px';
            aLi[i].style.margin=0;
        }
    }
    for(var i=0;i<aLi.length;i++){
        aLi[i].index=i;
        drage(aLi[i]);
    }
    function drage(obj){
        obj.onmousedown=function(ev){
            var oEvent=ev||event;
            var disx=oEvent.clientX-obj.offsetLeft;
            var disy=oEvent.clientY-obj.offsetTop;
            obj.style.zIndex=9;
            document.onmousemove=function(ev){
                var oEvent=ev||event;
                var l=oEvent.clientX-disx;
                var t=oEvent.clientY-disy;

                for(var i=0;i<aLi.length;i++){
                    aLi[i].className='';
                }
                var oNear=findNear(obj);
                if(oNear){
                    oNear.className='active';
                }
                obj.style.top=t+'px';
                obj.style.left=l+'px';

            };
            document.onmouseup=function(){
                var oNear=findNear(obj);
                if(oNear){
                    oNear.style.top=arr[obj.index].top+'px';
                    oNear.style.left=arr[obj.index].left+'px';
                    obj.style.top=arr[oNear.index].top+'px';
                    obj.style.left=arr[oNear.index].left+'px';
                    var cat=oNear.index;
                    oNear.index=obj.index;
                    obj.index=cat;
                }else{
                    obj.style.top=arr[obj.index].top+'px';
                    obj.style.left=arr[obj.index].left+'px';
                }
                obj.style.zIndex=1;
                oNear.className='';
                document.onmousemove=null;
                document.onmouseup=null;
                obj.releaseCapture&&obj.releaseCapture();
            }
            obj.setCapture&&obj.setCapture();
            return false;
        };
    }
    //        求距离
    function getDis(obj,obj2){
        var a=obj2.offsetLeft-obj.offsetLeft;
        var b=obj2.offsetTop-obj.offsetTop;
        return Math.sqrt(a*a+b*b);
    }
//        求最近的距离
    function findNear(obj){
        var iMin=999999;
        var iMinIndex=-1;
        for(var i=0;i<aLi.length;i++){
            if(obj==aLi[i])continue;
            if(collTest(obj,aLi[i])){
                var dis=getDis(obj,aLi[i]);
                if(dis<iMin){
                    iMin=dis;
                    iMinIndex=i;
                }
            };

        }
        if(iMinIndex==-1){
            return false;
        }else{
            return aLi[iMinIndex];
        }

    }

