jQuery.jqtab=function(tabtt,tabcont,even){$(tabcont).find(">li").hide();$(tabcont).find(">li:first").show();$(tabtt).find(">li").bind(even,function(){$(this).addClass("cur").siblings("li").removeClass("cur");var curIndex=$(tabtt).find(">li").index(this);$(tabcont).children().eq(curIndex).show("slow").siblings().hide()})};
jQuery.jqtab2=function(tabtt,tabcont,even){$(tabcont).find(">li").hide();$(tabcont).find(">li:first").show();$(tabtt).find(">li").bind(even,function(){$(this).addClass("cur").siblings("li").removeClass("cur");var curIndex=$(tabtt).find(">li").index(this);$(tabcont).children().eq(curIndex).show().siblings().hide()})};