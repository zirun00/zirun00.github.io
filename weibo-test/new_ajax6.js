function toStr(data){
    var arr=[];
    data.t=Math.random();
    for(var name in data){
        arr.push(name+'='+data[name]);
    };
    return arr.join('&');
}
function ajax(json){
    json=json || {};
    if(!json.url)return;
    json.time=json.time || 3000;
    json.type=json.type || 'GET';
    json.data=json.data || {};

    var timer=null;
    if(window.XMLHttpRequest){
        var oAjax=new XMLHttpRequest();
    }else{
        var oAjax=new ActiveXObject('Microsoft.XMLHTTP');
    }
    switch(json.type.toLowerCase()){
        case 'get':
            oAjax.open('GET',json.url+'?'+toStr(json.data),true);

            oAjax.send();
            break;
        case 'post':
            //post 提交方式
            oAjax.open('POST',json.url,true);
            //设置请求头
            oAjax.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
            //发送数据
            oAjax.send(toStr(json.data));
            //oAjax.open('GET',url+'?'+toStr(data),true);
            //oAjax.send();
            break;
    }

    oAjax.onreadystatechange=function(){
        if(oAjax.readyState==4){
            if(oAjax.status>=200 && oAjax.status<300 || oAjax.status==304){
                json.fnSucc && json.fnSucc(oAjax.responseText);
            }else{
                json.fnFail && json.fnFail(oAjax.status);
            }
            clearTimeout(timer);
        }
    };

    timer=setTimeout(function(){
        alert('网络超时！');
        oAjax.onreadystatechange=null;
    },json.time);
}
