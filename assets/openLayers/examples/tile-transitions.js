(window.webpackJsonp=window.webpackJsonp||[]).push([[136],{382:function(e,t,n){"use strict";n.r(t);var a=n(3),i=n(2),o=n(5),s=n(49),c="https://{a-c}.tiles.mapbox.com/v4/mapbox.world-bright/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoidHNjaGF1YiIsImEiOiJjaW5zYW5lNHkxMTNmdWttM3JyOHZtMmNtIn0.CDIBD8H-G2Gf-cPkIuWtRg",r=new o.a({source:new s.a({url:c})}),w=new o.a({source:new s.a({url:c,transition:0}),visible:!1});new a.a({layers:[r,w],target:"map",view:new i.a({center:[0,0],zoom:2,maxZoom:11})});document.getElementById("transition").addEventListener("change",function(e){var t=e.target.checked;r.setVisible(t),w.setVisible(!t)})}},[[382,0]]]);
//# sourceMappingURL=tile-transitions.js.map