(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{304:function(e,t,a){"use strict";a.r(t);var n=a(24),r=a(3),i=a(2),o=a(26),c=a(94),g=a(5),s=a(23),w=a(64),d=a(10),h=a(11),u=a(95);function m(e,t){return new h.c({image:new u.a({anchor:[.5,.96],crossOrigin:"anonymous",src:e,img:t,imgSize:t?[t.width,t.height]:void 0})})}var l=new n.a(new o.a([0,0]));l.set("style",m("data/icon.png",void 0));var v=new r.a({layers:[new g.a({source:new w.a({layer:"watercolor"})}),new s.a({style:function(e){return e.get("style")},source:new d.a({features:[l]})})],target:document.getElementById("map"),view:new i.a({center:[0,0],zoom:3})}),p={},y=new c.a({style:function(e){var t=e.get("style").getImage().getImage();if(!p[t.src]){var a=document.createElement("canvas"),n=a.getContext("2d");a.width=t.width,a.height=t.height,n.drawImage(t,0,0,t.width,t.height);for(var r=n.getImageData(0,0,a.width,a.height),i=r.data,o=0,c=i.length;o<c;o+=o%4==2?2:1)i[o]=255-i[o];n.putImageData(r,0,0),p[t.src]=m(void 0,a)}return p[t.src]}});v.addInteraction(y),v.on("pointermove",function(e){v.getTargetElement().style.cursor=v.hasFeatureAtPixel(e.pixel)?"pointer":""})}},[[304,0]]]);
//# sourceMappingURL=icon-negative.js.map