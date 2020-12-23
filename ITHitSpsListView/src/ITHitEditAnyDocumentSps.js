"use strict";function _typeof(_1){"@babel/helpers - typeof";if(typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"){_typeof=function _typeof(_2){return typeof _2;};}else{_typeof=function _typeof(_3){return _3&&typeof Symbol==="function"&&_3.constructor===Symbol&&_3!==Symbol.prototype?"symbol":typeof _3;};}return _typeof(_1);}Object.defineProperty(exports,"__esModule",{value:true});exports["default"]=void 0;var React=_interopRequireWildcard(require("react"));var ReactDOM=_interopRequireWildcard(require("react-dom"));var _spDialog=require("@microsoft/sp-dialog");var _officeUiFabricReact=require("office-ui-fabric-react");function _getRequireWildcardCache(){if(typeof WeakMap!=="function"){return null;}var _4=new WeakMap();_getRequireWildcardCache=function _getRequireWildcardCache(){return _4;};return _4;}function _interopRequireWildcard(_5){if(_5&&_5.__esModule){return _5;}if(_5===null||_typeof(_5)!=="object"&&typeof _5!=="function"){return {"default":_5};}var _6=_getRequireWildcardCache();if(_6&&_6.has(_5)){return _6.get(_5);}var _7={};var _8=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var _9 in _5){if(Object.prototype.hasOwnProperty.call(_5,_9)){var _a=_8?Object.getOwnPropertyDescriptor(_5,_9):null;if(_a&&(_a.get||_a.set)){Object.defineProperty(_7,_9,_a);}else{_7[_9]=_5[_9];}}}_7["default"]=_5;if(_6){_6.set(_5,_7);}return _7;}require("ITHitWebDAVClient");(function(){var _b=ITHit.DefineClass("ITHit.WebDAV.Client.SPSManager",null,{__static:{Version:"6.0.4059.0",_combineURLs:function _combineURLs(_c,_d){return _d?_c.replace(/\/+$/,"")+"/"+_d.replace(/^\/+/,""):_c;},_getVersion:function _getVersion(){return _b.Version+".0";},_resetFbaCookie:function _resetFbaCookie(_e){window.dispatchEvent(new CustomEvent("CallOpenerExtension_Request",{detail:{type:"init_anon",params:"MountUrl="+_e}}));},_SPSOpenDocument:function _SPSOpenDocument(_f,_10){var _11=["itemUrl","userId","userEmail","siteId","webId","webTitle","webUrl","listId","listTitle","rootUrl"];for(var i in _11){var m=_11[i];if(!(m in _f)){console.log("SPSOpenDocument: "+m+" property is missing in income dictionary. Skipping this func.");return;}}if(!Array.isArray(_f["itemUrl"])){_f["itemUrl"]=[_f["itemUrl"]];}_f["itemUrl"]=JSON.stringify(_f["itemUrl"]);var _14=new Array();for(var p in _f){if(_f.hasOwnProperty(p)){_14.push(p+"="+encodeURIComponent(_f[p]));}}var uri=ITHit.WebDAV.Client.DavConstants.ProtocolName+":"+_14.join(";");if(ITHit.DetectBrowser.Chrome&&ITHit.DetectOS.OS=="MacOS"){uri=uri.split(" ").join("%20");}if(!ITHit.WebDAV.Client.DocManager.CheckExtensionInstalledAndThrowErrorCallback(_10)){return;}ITHit.WebDAV.Client.DocManager.OpenProtocol(uri,_10);},_SPSOpenDocumentOnedrive:function _SPSOpenDocumentOnedrive(_17,_18,_19,_1a){var _1b=_17.site.absoluteUrl.replace(/\/$/,"");var _1c=_1b.substring(0,_1b.length-_17.site.serverRelativeUrl.length+1);var _1d={itemUrl:_18,userId:_17.legacyPageContext.aadUserId,userEmail:_17.user.loginName,siteId:_17.site.id.toString(),webId:_17.web.id.toString(),webTitle:_17.web.title,webUrl:_17.web.absoluteUrl,listId:_17.list.id.toString(),listTitle:_17.list.title,rootUrl:_b._combineURLs(_1c,_17.list.serverRelativeUrl),command:_1a||"Edit"};_19=_19||function(){var _1e=new ITHitWebDavSharePointDownloadDialog(_b._getVersion());_1e.show();};_b._SPSOpenDocument(_1d,_19);},SharePointEditDocument:function SharePointEditDocument(_1f,_20,_21,_22){eval(String.fromCharCode.call(this,99+6,18+84,40,13+60,40+44,50+22,36+69,14+102,37+9,87,101,50+48,68,65,76+10,46,6+61,108,105,66+35,89+21,71+45,12+34,76,73+32,62+37,7+94,64+46,74+41,101,54+19,69+31,41,32,46+77,32,16+24,23+79,117,110,99,116,105,20+91,110,32,99,104,101,99,93+14,76,105,27+72,92+9,22+88,115,100+1,40,23+18,22+10,123,13,30+2,1+31,32,27+5,71+47,97,114,8+24,23+92,26+42,111,88+21,38+59,105,110,25+7,12+49,32,34,104,116,59+57,12+100,115,10+48,47,24+23,24+95,119,119,46,81+38,101,50+48,60+40,97,118,33+82,121,115,25+91,101,109,46,99,111,109,34,20+39,13,11+21,12+20,19+13,32,118,20+77,58+56,32,72+43,85,114,105,32,61,32,115,33+35,92+19,109,97,44+61,110,32,43,32,34,33+14,83+14,112,105,47,31+84,20+97,85+13,72+43,99,114,105,112,89+27,34+71,18+93,32+78,108,105,99,36+65,72+38,35+80,85+16,31+16,94+5,87+17,101,99,107,47,34,59,13,7+25,32,32,32,39+79,89+8,47+67,6+26,57+58,83,104+12,70+27,116,117,104+11,51+32,36+80,64+47,19+95,97,92+11,101,75,34+67,121,32,61,18+14,34,108,84+21,95+4,21+80,110,94+21,101,46,79+36,116,89+8,116,117,115,34,59,8+5,32,32,32,11+21,49+69,97,114+0,29+3,35+80,82,101,113,82+35,101,75+40,116,45+38,2+114,111,11+103,88+9,80+23,101,75,101,101+20,32,61,32,34,100+8,81+24,66+33,46+55,110,115,83+18,46,114,101,34+79,117+0,101,108+7,116,34,41+18,13,13+19,22+10,32,26+6,118,89+8,17+97,32,115,14+51,15+84,112+4,117,76+21,108,32,48+13,32,7+27,53+44,50+49,87+29,96+21,97,108,22+12,59,4+9,32,32,3+29,1+31,72+46,42+55,114,32,74+41,26+43,30+90,112,105,114,26+75,2+98,32,61,16+16,30+4,37+64,101+19,112,26+79,114,101,93+7,27+7,59,7+6,12+20,32,16+16,32,118,29+68,114,12+20,115,70,97,69+36,108,13+88,100,10+22,61,27+5,34,102,97,105,108,3+98,100,18+16,48+11,13,32,32,32,32,1+117,97,114,32,115,76,105,49+50,101,87+23,45+70,101,32+41,100,32,47+14,32,66+7,84,72,105,116,38+8,87,101,85+13,68,65,86,46,67,108,72+33,34+67,4+106,116,46,76,105,97+2,101,18+92,115,79+22,73,100,59,13,13,32+0,9+23,32,4+28,65+40,99+3,32,40,33,115,51+25,20+85,99,101,110,115,53+48,73,100,29+12,7+25,27+87,101,116,117,114,49+61,25+7,51+51,97,108,115,101,59,9+4,32,32,26+6,32,18+87,81+21,40,12+107,49+56,89+21,42+58,56+55,119,46,98,116,8+103,97,41,13,3+29,30+2,32,14+18,123,13,32,32,32,5+27,2+30,32,32,23+9,115,42+41,116,13+84,31+85,117,61+54,30+53,62+54,111,52+62,97,103,79+22,75,16+85,24+97,32,61,17+15,81+38,13+92,110,33+67,93+18,114+5,46,98,73+43,106+5,97,18+22,101,56+54,99,59+52,39+61,24+77,32+53,82,12+61,3+64,38+73,109,106+6,111,110,101,110,116,36+4,97+18,83,116,97,88+28,117,40+75,83,46+70,111,114,8+89,103,68+33,75+0,84+17,121,40+1,41,5+54,9+4,32,21+11,32,30+2,32,12+20,32,7+25,63+52,82,101,90+23,117,101,5+110,116,83,116,111,4+110,97,56+47,95+6,75,101,76+45,32,8+53,28+4,35+84,28+77,73+37,1+99,111,119,29+17,98,66+50,111,97,2+38,101,110,47+52,16+95,100,101,76+9,32+50,49+24,16+51,21+90,109,112,111,110,101,110,37+79,36+4,13+102,82,101,8+105,79+38,39+62,70+45,55+61,67+16,116,98+13,114,33+64,103,101,60+15,101,57+64,1+40,11+30,59,11+2,32+0,16+16,32,32,125,13,10+3,32,22+10,32,32,107+11,97,114,16+16,111,57+19,105,99,12+89,110,115,101,83,116,19+78,6+110,117,108+7,32,61,6+26,103,101,116,75+8,116,85+12,116,3+114,115,70,111,114,10+57,117,81+33,114,101,64+46,116,65+11,105,3+96,101,53+57,115,101,40,115,83,116,69+28,116,28+89,115,56+27,52+64,53+58,62+52,97,68+35,91+10,75,82+19,121,41,20+39,1+12,30+2,10+22,32,32,105,102,7+25,40,15+18,111,76,102+3,95+4,8+93,110,115,84+17,27+56,116,97,116,117,115,26+6,124,123+1,13,32,24+8,17+15,29+3,32,32,32,26+6,111,8+68,15+90,99,98+3,110,115,101,74+9,87+29,97,20+96,89+28,115,46+0,115,113+3,65+32,36+80,117,15+100,18+14,59+2,61,16+45,6+26,27+88,6+63,120,63+49,105,114,101,72+28,32,116+8,30+94,2+11,32,32,16+16,32,32,32,30+2,32,111,56+20,105,7+92,94+7,12+98,3+112,101,83,116,97,18+98,114+3,115,23+23,59+42,120,18+94,105,114,101,4+96,65,56+60,32,20+40,9+23,110,60+41,108+11,5+27,68,60+37,71+45,23+78,6+34,41,41,32,123,12+1,12+20,32,32,32,9+23,11+21,31+1,24+8,51+67,97,103+11,31+1,34+64,43+30,22+93,13+52,9+106,121,96+14,75+24,14+18,61,32,22+11,88+23,62+14,70+35,99,40+61,110,53+62,101,83,37+79,81+16,116,117,40+75,32,38+86,124,32,111,72+4,21+84,73+26,67+34,110,73+42,41+60,83,75+41,18+79,104+12,95+22,85+30,3+43,115,60+56,97,106+10,56+61,70+45,25+7,61,44+17,6+55,32,115,65,99,39+77,80+37,97,108,59,11+2,32,15+17,30+2,32,32,32,32,31+1,101+4,55+47,28+4,34+6,81+17,17+56,115,5+60,24+91,118+3,39+71,38+61,32,0+38,21+17,32,23+10,98,101,103,105,110,34+48,79+22,113,117,98+3,112+3,116,27+13,41,41,8+24,114,39+62,116,117,114,110,30+2,116,32+82,117,11+90,59,6+7,1+31,32,29+3,32,4+28,32,27+5,32,24+8,31+1,32,32,118,57+40,114,32,111,67+15,101,88+25,4+28,61,17+15,13+97,101,119,32,88,42+35,50+26,72,116,116,112,82,101,32+81,117,101,98+17,116,11+29,41,59,13,32,32,7+25,14+18,9+23,32,13+19,32,26+6,25+7,10+22,10+22,105,102,40,98,65+8,115,54+11,115,51+70,110,39+60,34+7,32,17+94,82,24+77,113,17+29,111,110,51+63,93+8,43+54,67+33,121,115,46+70,97,116,101,72+27,39+65,97,88+22,14+89,85+16,32,61,25+7,111,110,40+42,83+18,47+66,54+63,74+27,50+65,116,47+20,83+21,97,110,103,70+31,32+27,13,22+10,13+19,32,17+15,32,32,32,32,32,4+28,32,22+10,111,48+34,17+84,113,6+40,111,61+51,101,2+108,14+26,34,80,57+22,83,84,22+12,44,27+5,23+92,85,114,71+34,44,31+1,98,73,115,44+21,115,22+99,110,59+40,41,33+26,13,32,32,32,32,32,32,32,20+12,32,32,13+19,4+28,51+60,82,101,113,46,115,101,116,75+7,101,113,117,101,1+114,116,72,101,96+1,35+65,68+33,114,40,39,67,111,110,50+66,101,82+28,116,45,36+48,21+100,102+10,101,3+36,31+13,32,39,97,112,112,108,50+55,47+52,97,116,79+26,111,110,47,28+92,27+18,45+74,119,119,45,88+14,111,105+9,88+21,17+28,117,83+31,8+100,101,110,99,111,65+35,34+67,100,24+15,41,59,12+1,4+28,31+1,32,2+30,32,32,8+24,32,118,86+11,69+45,32,115,79+1,97,114,0+97,109,38+77,32,19+42,25+7,34,105,45+55,43+18,4+30,22+10,31+12,32,38+63,15+95,99,111,100,96+5,85,82,73,67,111,109,112,111,50+60,47+54,32+78,28+88,16+24,115,76,31+74,99,101,110,106+9,101,73,75+25,9+32,26+6,43,7+25,34,38,112,59+55,55+56,100,117,84+15,116,78,8+89,37+72,23+78,95+20,61,14+20,7+25,12+31,4+28,73,54+30,72,91+14,22+94,25+21,80,104,92+22,66+31,59+56,73+28,115,46,80,9+105,111,30+70,117,99,5+111,49+29,28+69,100+9,101,59,6+7,9+23,32,19+13,32,27+5,13+19,4+28,19+13,85+31,7+107,45+76,32,92+31,13,4+28,20+12,32,6+26,10+22,32,13+19,32,32,32,32,32,33+78,82,77+24,34+79,31+15,115,101,87+23,100,40,115,80,51+46,86+28,13+84,104+5,115,41,40+19,13,32,32,32,32,4+28,32,32,32,125,32,99,97,75+41,99,104,32,19+21,23+78,41,14+18,14+109,10+3,32,31+1,32,6+26,17+15,10+22,32,32,17+15,16+16,32,19+13,49+62,90+20,78+4,31+70,83+30,106+11,101,101+14,50+66,70,97,45+60,108,62+39,94+6,46,99,97,89+19,108,23+17,70+41,82,46+55,113,17+24,31+28,13,11+21,8+24,4+28,5+27,13+19,32,17+15,32,3+122,7+6,3+10,1+31,32,32,32,32,32,32,4+28,96+9,102,23+17,33,3+95,73,56+59,65,17+98,12+109,89+21,89+10,30+11,15+17,111,64+46,82,80+21,39+74,117,101,115,116,63+4,104,67+30,28+82,103,101,46,88+11,97,53+55,26+82,40,43+68,82,101,113,32+9,59,7+6,29+3,28+4,14+18,32,0+32,26+6,32,4+28,14+100,36+65,42+74,117,10+104,110,19+13,116,114,94+23,56+45,35+24,13,32,14+18,14+18,32,125,18+14,101,33+75,23+92,101,32,123,13,28+4,32,32,32,17+15,32,25+7,32,114,10+91,116,65+52,23+91,101+9,32,111,40+36,105,47+52,101,107+3,102+13,101,78+5,116,97,116,117,115,32,33,57+4,61,32,112+3,32+37,120,112,17+88,41+73,62+39,100,56+3,13+0,32,32,1+31,10+22,125,2+11,12+1,32,3+29,4+28,6+26,102,46+71,21+89,99,39+77,94+11,12+99,94+16,27+5,42+69,110,82,7+94,74+39,117,50+51,109+6,116,25+42,104,2+95,110,21+82,30+71,40,5+36,32,123,0+13,5+27,32,21+11,32,2+30,32,2+30,32,105,58+44,12+28,24+92,60+44,105,115,46,114,101,97,100,121,83,16+100,97,116,101,32,33,34+27,61,32,59+29,59+18,4+72,38+34,16+100,116,13+99,4+78,101,113,74+43,83+18,115,93+23,5+41,68,45+34,44+34,46+23,41,32,114,38+63,116,14+103,114,77+33,59,12+1,13,32,7+25,32,31+1,23+9,18+14,6+26,32,108,90+21,94+5,97,108,6+77,116,111,114,97,28+75,20+81,3+43,60+54,62+39,79+30,111,118,37+64,65+8,116,101,3+106,40,106+9,17+65,101,113,86+31,101,2+113,116,49+34,116,62+49,114,43+54,103,101,75,33+68,121,41,5+54,13,32,29+3,32,12+20,13+19,32,10+22,32,104+1,60+42,32,22+18,116,87+17,65+40,115,46,115,116,97,63+53,5+112,61+54,20+12,17+16,61,61,32,44+6,24+24,48,16+25,32,64+59,13,6+26,30+2,32,32,12+20,17+15,32,18+14,32,22+10,0+32,7+25,111,110,13+69,101,113,117,101,69+46,116,70,97,78+27,96+12,87+14,36+64,11+35,94+5,56+41,108,108,2+38,116,104,2+103,94+21,36+5,59,11+2,12+20,19+13,6+26,18+14,32,20+12,32,32,9+23,32,10+22,32,65+49,99+2,30+86,117,114,84+26,59,9+4,5+27,32,32,30+2,29+3,1+31,32,32,125,1+12,13,4+28,19+13,18+14,28+4,32,32,14+18,32,86+32,97,54+60,1+31,32+79,30+52,65+36,5+110,105+7,111,110,85+30,41+60,32,61,32,35+39,83,79,78,12+34,14+98,77+20,114,107+8,17+84,17+23,75+41,33+71,56+49,73+42,46,88+26,101,115,112,80+31,32+78,100+15,31+70,41,5+54,6+7,24+8,32,32,3+29,32,32,32,11+21,105,0+102,40,33,46+65,33+49,10+91,10+105,22+90,29+82,110,29+86,101,45+1,73,115,69,93+27,45+67,105,114,87+14,100,30+2,1+37,38,10+22,111,4+78,58+43,16+99,44+68,111,110,115,97+4,46,12+61,24+91,86,97,108,16+89,46+54,19+22,1+12,5+27,32,32,32,31+1,22+10,32,23+9,22+101,13,26+6,21+11,32,20+12,18+14,32,29+3,32,32,6+26,32,32,61+54,18+83,10+106,83,88+28,74+23,116,117,66+49,25+45,19+92,6+108,34+33,117,114,114,99+2,19+91,42+74,76,105,84+15,101,115,10+91,40,11+104,65,55+44,116,117,97,108,41,27+32,4+9,15+17,32,31+1,32,24+8,20+12,1+31,30+2,32,32,32,30+2,114,101,24+92,117,114,110,59,4+9,26+6,32,19+13,32,32,32,32,32,82+43,13,13,32,9+23,32,32,32,16+16,25+7,32,111+4,1+100,20+96,47+36,28+88,97,116,117,115,38+32,111,32+82,12+55,117,114,114,94+7,10+100,116,76,10+95,88+11,101,115,101,40,106+9,3+66,7+113,18+94,105,23+91,101,100,41,59,3+10,8+24,30+2,32,23+9,4+28,11+21,32+0,32,43+62,25+77,40,15+18,111,82,101,67+48,112,10+101,110,115,47+54,46,69,111+3,45+69,99+12,114,6+79,114,23+85,40+1,13,32,12+20,9+23,32,32,32,25+7,32,123,13,32,32,32,32,32,17+15,23+9,7+25,32,32,19+13,32,51+46,56+52,101,114,44+72,18+22,64+47,43+39,101,115,112,111,62+48,115,101,35+11,41+28,63+51,114,76+35,114,77,91+10,108+7,115,74+23,103,101,1+40,35+24,0+13,14+18,11+21,32,8+24,7+25,32,15+17,1+31,17+15,32,32,6+26,116,104,114,6+105,119,18+14,103+7,42+59,107+12,32,42+27,114,114,111,76+38,6+34,111,82,61+40,59+56,112,97+14,110,115,101,46,69,111+3,114,108+3,4+110,77,101,115,33+82,97,55+48,28+73,41,59,13,11+21,32,16+16,32,3+29,31+1,11+21,8+24,125,6+7,10+3,7+25,32,2+30,12+20,12+20,32,16+16,32,34+71,13+89,14+18,8+32,60+39,111,47+63,41+61,105,6+108,109,40,50+61,53+29,77+24,82+33,88+24,57+54,61+49,115,101,39+7,44+25,71+43,114,111,26+88,77,15+86,20+95,115,56+41,21+82,24+77,22+19,41,32,123,13,10+22,32,32,16+16,29+3,32,1+31,28+4,32,15+17,32,32,55+53,61+50,99,97,60+56,105,48+63,78+32,46,104,29+85,11+90,102,23+9,61,32,111,82,81+20,57+58,112,50+61,110,105+10,101,46,69,114,114,111,114,85,39+75,62+46,59,13,2+30,19+13,32,8+24,9+23,17+15,9+23,29+3,125,15+17,81+20,108,12+103,101,9+23,95+28,13,32,31+1,32,29+3,32,32,32,19+13,10+22,12+20,32,32,116,45+59,60+54,93+18,119,32,103+7,101,119,29+3,69,47+67,114,107+4,114,40,1+33,70,81+16,69+36,108,79+22,100,32,16+83,104,59+42,60+39,107,25+7,0+108,59+46,51+48,99+2,12+98,57+58,101,9+25,26+15,34+25,13,27+5,25+7,21+11,8+24,32,17+15,32,32,125,13,11+21,17+15,32,9+23,125,13,13,19+13,24+8,7+25,32,78+24,109+8,60+50,72+27,27+89,61+44,111,28+82,19+13,111,110,82,69+32,112+1,102+15,101+0,115,116,70,32+65,40+65,89+19,101,58+42,31+9,12+29,32,118+5,3+10,32,32,1+31,32,10+22,30+2,1+31,32,7+101,2+109,19+80,63+34,108,83,116,111,114,58+39,103,101,43+3,103+11,19+82,6+103,69+42,118,101,34+39,116,101,70+39,40,111+4,41+41,83+18,113,117,57+44,4+111,83+33,58+25,116,111,20+94,33+64,103,20+81,75,68+33,44+77,34+7,27+32,11+2,32,8+24,32,32,32,7+25,32,32,34+84,0+97,114,32,53+58,83,84+32,97,34+82,46+71,92+23,32,12+49,32,103,22+79,94+22,83,67+49,8+89,116,117,115,70,75+36,76+38,64+3,117,18+96,110+4,101,106+4,116,41+35,26+79,97+2,25+76,54+56,115,101,40,41,59,3+10,32,32,29+3,32,10+22,3+29,22+10,25+7,68+37,99+3,32,40,11+22,23+10,100+11,15+68,81+35,97,116,115+2,59+56,1+31,38,17+21,13,32,32,32,32,32,11+21,9+23,5+27,29+3,1+31,9+23,32,25+86,62+21,116,46+51,116,117,42+73,40+6,115,58+58,97,68+48,117,115,3+29,61,61,61,32,50+65,16+54,91+6,105,108,101,100,0+32,7+31,29+9,13,3+29,20+12,24+8,32,23+9,23+9,28+4,25+7,32,32+0,32,32,111,14+69,93+23,88+9,116,117,115,4+42,75+26,120,54+58,105,114,101,52+48,17+48,116,32,60,26+6,110,12+89,119,32,68,37+60,116,12+89,22+18,41,41,8+24,123,13,32,32,25+7,18+14,32,9+23,32,32,12+20,32,0+32,32,118,12+85,63+51,13+19,82+27,10+91,42+73,115,97,103,41+60,32,61,32,24+10,76,16+89,99,58+43,110,115,101,19+13,98+20,23+74,75+33,105,8+92,97,116,73+32,111,53+57,16+16,30+72,97,105,108,93+8,100,23+23,32,33+34,39+58,110,16+16,110,111,1+115,9+23,76+23,67+44,10+100,110,101,41+58,116,2+30,116,81+30,9+23,108,105,99,101,92+18,49+66,90+11,32,94+24,97,37+71,100+5,71+29,19+78,116,105,111,110,4+28,95+20,101,1+113,17+101,101,112+2,46,32,92,110,25+9,12+1,32,9+23,5+27,32,32,32,32,32,32,23+9,30+2,32,32,6+26,0+32,32,6+37,32,116,104,105,115,26+20,43+72,45+71,97,116,117,115,67+17,48+53,25+95,11+105,18+14,43,23+9,14+25,29+17,92,110,77,71+26,107,101,32,51+64,106+11,114,81+20,13+19,121,111,103+14,77+37,16+16,109,97,98+1,49+55,105,41+69,7+94,32,99,62+35,110,32,62+35,8+91,6+93,101,115,115,32,12+22,39,2+30,39+4,14+18,115,68,26+85,27+82,43+54,11+94,55+55,6+26,9+34,22+10,15+24,34,46,17+22,59,8+5,32,19+13,26+6,32,12+20,32,28+4,7+25,32,5+27,23+9,32,99,27+84,108+2,35+67,45+60,80+34,109,7+33,52+57,101,87+28,78+37,97,103,78+23,39+2,59,13,18+14,29+3,32,29+3,12+20,32,32,32,11+21,32,32,13+19,116,94+10,114,22+89,9+110,19+13,110,101,119,11+21,69,114,112+2,111,2+112,10+30,34,70,97,80+25,48+60,12+89,19+81,32,97+2,43+61,101,9+90,107,25+7,24+84,29+76,32+67,26+75,110,31+84,9+92,34,17+24,51+8,13,23+9,0+32,17+15,32,5+27,26+6,32,24+8,120+5,6+7,13,9+23,14+18,30+2,5+27,32+0,27+5,31+1,32,115,101,116,83,116,97,116,117,115,70,111,19+95,67,117,114,62+52,99+2,110,116,43+33,36+69,99,66+35,9+106,83+18,4+36,109+6,7+63,97,105,49+59,50+51,100,41,59,6+7,18+14,32,21+11,32,22+103,1+12,13,6+26,30+2,32,32,3+99,103+14,110,99,16+100,14+91,69+42,110,32,59+56,101,21+95,15+68,116,75+22,51+65,117,115,70,111,114,45+22,104+13,26+88,114,6+95,9+101,9+107,76,105,99,54+47,115,101,40,42+73,76,71+34,99,95+6,43+67,95+20,101,43+40,5+111,79+18,55+61,18+99,66+49,44,13+19,101+10,45+24,120,50+62,105,77+37,101,68,97,12+104,56+45,41,32,123,13,1+31,8+24,32,5+27,13+19,32,14+18,32,8+110,97,114,1+31,35+65,101,43+59,97,117,93+15,73+43,68,97,60+56,94+7,32,61,10+22,29+81,101,15+104,32,68,97,35+81,101,13+27,41,59,0+13,32,32,14+18,23+9,15+17,4+28,31+1,3+29,100,11+90,102,97,117,108,116,68,34+63,116,62+39,22+24,115,10+91,70+46,8+60,27+70,116,20+81,4+36,61+39,101,102,19+78,117,13+95,116,6+62,97,50+66,88+13,30+16,103,62+39,116,68,97,102+14,5+96,29+11,12+29,32,8+35,32,14+35,41,41+18,5+8,32,4+28,32,15+17,17+15,13+19,8+24,22+10,118,97,114,32,111,83,116,97,7+109,117,115,32,61,19+13,123,5+8,30+2,0+32,32,32,32,30+2,26+6,32,28+4,0+32,32,4+28,19+89,105,94+5,90+11,91+19,89+26,101,41+32,84+16,48+10,32,17+98,10+66,105,99,101,32+78,81+34,63+38,8+65,53+47,6+38,2+11,32,25+7,32,32,32,32,2+30,13+19,9+23,11+21,18+14,5+27,31+70,95+25,1+111,64+41,15+99,101,36+64,65+0,115+1,47+11,32,23+88,68+1,97+23,22+90,105,114,101,68,9+88,116,101,18+14,97+27,106+18,32+0,100,101,102,97,20+97,108,116,68,97,116,101,44,13,32,32,32,32,32+0,32,32,19+13,32,32,32,32,115,30+86,26+71,67+49,117,111+4,58,4+28,22+93,76,29+76,99,31+70,37+73,115,101,83,100+16,97,108+8,117,115,10+3,32,30+2,32,30+2,32,29+3,6+26,9+23,125,59,12+1,8+5,32,22+10,32,2+30,16+16,32,32,29+3,115,101,116,84,111,29+54,116,91+20,112+2,86+11,4+99,101,40,14+101,83,116,97,23+93,8+109,115,64+19,51+65,34+77,78+36,70+27,103,101,9+66,59+42,110+11,39+5,20+12,111,83,116,74+23,29+87,117,115,24+17,14+45,7+6,29+3,14+18,4+28,32,125,7+6,10+3,32,32,31+1,32,32+70,19+98,64+46,76+23,116,80+25,111,85+25,32,98+5,59+42,116,83,116,97,16+100,117,37+78,28+42,67+44,114,67,117,53+61,70+44,101,13+97,81+35,65+11,25+80,99,101,58+52,88+27,25+76,8+32,41,32,123,11+2,6+26,17+15,32,32,7+25,32,32,32,87+31,97,99+15,32,111,36+47,116,12+85,116,94+23,101+14,24+8,61+0,32,7+96,21+80,54+62,65+5,114,73+38,109,83,116,64+47,114,97,35+68,3+98,2+38,97+18,39+44,76+40,97,116,117,41+74,83,66+50,25+86,87+27,97,103,101,75,58+43,51+70,40+1,59,5+8,32,3+29,32,32,18+14,31+1,32,32,105,40+62,32,7+33,3+30,111,71+12,101+15,2+95,97+19,117,115,32,52+72,124,5+8,23+9,6+26,20+12,32,13+19,12+20,32,8+24,32,32,1+31,32,58+53,83,116,97,33+83,117,90+25,46,36+72,105,97+2,99+2,2+108,9+106,51+50,73,100,32,11+22,61,40+21,2+30,84+31,4+72,105,79+20,89+12,110,115,6+95,73,39+61,41,32,123,13,27+5,32,32,32,32,25+7,23+9,4+28,32,22+10,1+31,32,54+60,5+96,92+24,117,105+9,106+4,32,110,25+92,108,108,52+7,13,32,32,32,32,4+28,32,0+32,28+4,70+55,7+6,13,32,32,32,18+14,16+16,12+20,32,16+16,111,83,7+109,97,25+91,117,61+54,42+4,101,53+67,77+35,105,114,14+87,54+46,65,116,13+19,61,32,68+42,67+34,119,32,50+18,22+75,45+71,69+32,18+22,111,57+26,85+31,90+7,62+54,27+90,115,46,16+85,64+56,22+90,81+24,108+6,101,100,65,70+46,10+31,5+54,13,19+13,32,9+23,32,29+3,32,32,5+27,62+52,79+22,81+35,8+109,114,27+83,32,111,9+74,13+103,97,114+2,117,115,48+11,4+9,32,32,32,15+17,105+20,10+3,13,17+15,25+7,6+26,8+24,46+56,117,3+107,99,26+90,19+86,15+96,2+108,10+22,98,101,103,105,61+49,82,25+76,113,110+7,4+97,115,5+111,40,41,25+7,98+25,13,8+24,22+10,32,32,32,32,32,9+23,118,97,62+52,32,100,97,116,101,32,61,32,110,58+43,80+39,6+26,39+29,97,89+27,101,40,25+16,19+40,12+1,32,17+15,3+29,32,25+7,32,32,32,87+31,97,8+106,32,109+5,49+52,85+28,117,101,43+72,116,14+69,75+41,27+70,27+87,116,11+21,61,32,70+33,56+45,53+63,70,75+39,56+55,22+87,83,116,77+34,1+113,97,103,101,40,115,82,101,32+81,117,96+5,115,116,78+5,50+66,52+59,24+90,97,24+79,101,69+6,101,108+13,41,42+17,12+1,32,32,32,32,32,8+24,2+30,32,51+54,87+15,32,20+20,33,16+17,114,24+77,113,117,80+21,40+75,116,83,28+88,26+71,114,56+60,32,13+25,38,19+13,59+55,54+47,113,90+27,101,115,116,2+81,116,10+87,7+107,0+116,32,9+51,32,40,43,50+50,79+18,116,101,7+25,14+29,32,49,48,1+47,18+30,41,41,16+16,91+32,9+4,28+4,32,15+17,32,28+4,2+30,32,32,32,27+5,7+25,17+15,114,86+15,5+111,117,114,52+58,20+12,102,97,86+22,105+10,101,50+9,13,23+9,29+3,32,32,10+22,32,32,0+32,123+2,13,13,32,32,24+8,32,32,32,32,32,115,52+49,65+51,11+73,97+14,83,30+86,15+96,80+34,70+27,11+92,101,11+29,115,82,16+85,60+53,87+30,101,32+83,116,33+50,116,3+108,114,97,60+43,89+12,75,101,9+112,26+18,32,100,97,116,101,41,59,13,32,0+32,30+2,32,6+26,32,11+21,32,114,96+5,116,6+111,7+107,110,31+1,116,25+89,117,59+42,47+12,13,32,32+0,32,32,110+15,4+9,13,23+9,32,32,32,102,16+101,53+57,17+82,116,105,13+98,110,8+24,1+114,101,116,84,71+40,36+47,95+21,111,114,65+32,27+76,101,40,115,75,101,121,37+7,32,32+79,29+57,21+76,108,117,101,41,32,123,5+8,0+32,32,32,32,32,24+8,32,21+11,118,97,114,32,115,83+3,97,108,2+115,101,32,21+40,32,32+42,47+36,79,46+32,42+4,65+50,116,114,16+89,110,98+5,75+30,102,121,40,48+63,37+49,19+78,108,11+106,101,11+30,59,13,15+17,22+10,32,32,32,32,32,32,105,102,38+2,119,49+56,110,100,21+90,4+115,21+25,98,116,111,97,13+28,17+15,32,7+108,86,97,81+27,16+101,101,32,12+49,32,119,2+103,110,100,111,75+44,0+46,58+40,116,111,97,7+33,14+87,110,19+80,111,100,96+5,85,82,73,38+29,21+90,109,104+8,111,110,78+23,87+23,116,2+38,17+98,86,97,108,117,101,14+27,41,59,1+12,20+12,3+29,23+9,32,32,27+5,32,32,87+32,105,30+80,100,111,90+29,42+4,4+104,68+43,82+17,97,10+98,83,116,111,114,72+25,56+47,62+39,8+38,58+57,71+30,89+27,71+2,116,101,66+43,6+34,88+27,66+9,101,43+78,44,22+10,115,86,46+51,108,23+94,101,41,59,5+8,16+16,32,24+8,0+32,125,10+3,13,32,22+10,3+29,21+11,78+24,117,110,52+47,116,71+34,111,15+95,32,103,101,116,70,114,40+71,65+44,83,16+100,111,114,91+6,103,101,40,107+8,61+14,51+50,121,27+14,14+18,123,5+8,3+29,31+1,32,13+19,32,32,3+29,23+9,118,82+15,108+6,32,9+106,86,97,108,117,41+60,32,4+57,25+7,49+70,105,110,100,111,5+114,46,108,111,93+6,79+18,1+107,30+53,3+113,62+49,73+41,97,99+4,37+64,22+24,53+50,101,116,20+53,36+80,101,74+35,40,115,75,101,26+95,41,59,12+1,32,20+12,18+14,32,32,32,26+6,32,105,84+18,14+26,13+106,105,85+25,72+28,77+34,89+30,46,56+41,5+111,111,45+53,32,3+35,36+2,18+14,33,13+20,110+5,16+70,15+82,44+64,115+2,101,41,32,36+79,49+37,97,108,42+75,101,2+30,61,32,100,47+54,99,111,100,24+77,81+4,82,73,37+30,111,109,43+69,111,68+42,50+51,77+33,13+103,39+1,119,103+2,101+9,75+25,11+100,70+49,8+38,97+0,116,111,98,40,99+16,65+21,38+59,108,117,58+43,41,33+8,27+32,13,32,26+6,32,9+23,32+0,27+5,28+4,21+11,35+79,101,116,93+24,78+36,110,32+0,34+40,53+30,79,78,46,85+27,97,114,6+109,11+90,40,115,29+57,97,102+6,117,101,41,59,13,32,6+26,32,32,125,13,66+59,7+34,0+40,41,59,32,32,116+9,12+20,17+84,17+91,115,101,28+4,73+32,102,40,110,79+22,38+81,7+25,68,97,116,101,40,50,48,11+39,49,38+6,48,9+35,34+16,52,41,60,82+28,101,119,32,27+41,58+39,116,37+64,16+24,7+34,41,1+122,67+38,102,40,54+45,84+27,110,53+49,54+51,114,109,10+30,34,84,104,101,7+25,29+5,32,38+5,5+27,48+25,84,3+69,57+48,62+54,1+45,80,47+57,114,97,115,88+13,115,46,9+71,114,97+14,6+94,117,69+30,116,5+73,97,57+52,101,32,43,32,34,32,116,65+49,17+88,82+15,108,6+26,104,40+57,72+43,32,50+51,78+42,36+76,105,114,101,36+64,46,32,61+23,96+15,9+23,112,117,71+43,99,47+57,42+55,40+75,101,32,97,21+11,102,117,73+35,108,32,62+56,101,114,76+39,88+17,43+68,110,32,112,108,31+70,66+31,15+100,101,32,49+53,29+82,83+25,108,111,119,18+14,18+98,104,66+39,100+15,32,37+71,52+53,32+78,107,58,5+27,104,116,116,112,115,36+22,7+40,23+24,27+92,110+9,10+109,7+39,119,101,71+27,100,97,118,115,120+1,115,116,57+44,24+85,9+37,99,32+79,18+91,47,63+49,114,0+105,99,105,110,103,46,32,83,101,108,40+61,99,61+55,10+22,79,49+26,12+20,96+20,111,32,73+37,97,59+59,105,103,97,116,32+69,1+31,116,48+63,29+3,78+38,14+90,80+21,32,64+33,56+42,26+85,48+70,76+25,32,82+3,74+8,76,46,22+12,41,41,86+37,21+87,111,99,97,39+77,105,3+108,110,46,95+9,114,94+7,102,26+6,49+12,24+8,8+26,84+20,99+17,116,112,18+97,58,47,47,32+87,42+77,102+17,36+10,37+82,60+41,65+33,26+74,97,77+41,115,121,86+29,116,101,97+12,46,99,111,109,15+32,112,114,3+102,23+76,105,110,56+47,35,97,68+38,91+6,35+85,42+66,69+36,11+87,23+11,47+12,66+59,101,108,115,80+21,54+69,116,58+46,12+102,111,79+40,20+12,8+26,84,85+19,101,32,1+115,108+6,105,39+58,108,19+13,112,86+15,113+1,33+72,41+70,10+90,32,9+95,71+26,115,32,101,120,112,105,114,101,100,19+15,35+24,125,92+33,10+49));var _23=_1f.legacyPageContext.siteAbsoluteUrl.replace(/\/$/,"");var _24=_b._combineURLs(_23,"/_layouts/closeConnection.aspx?loginasanotheruser=true");var _25="rtFa,FedAuth";var _26="Current";_21=_21||function(){var _27=new ITHitWebDavSharePointDownloadDialog(_b._getVersion());_27.show();};if(_23.indexOf("sharepoint.com")==-1){var _28=_1f.legacyPageContext.systemUserKey.split("|");_25="FedAuth";if(/[sS]-[0-9]{1}-[0-9]{0,2}-/.test(_28[_28.length-1])){_25=null;if(ITHit.DetectOS.Linux){_26=null;}}}else{if(_1f.legacyPageContext.isAnonymousGuestUser){_25="FedAuth";_b._resetFbaCookie(_23);}}ITHit.WebDAV.Client.DocManager.OpenDavProtocol(_20,_23,_21,null,_26,_25,_24,_22);}}});})();var __extends=void 0&&(void 0).__extends||function(){var _29=function extendStatics(d,b){_29=Object.setPrototypeOf||{__proto__:[]} instanceof Array&&function(d,b){d.__proto__=b;}||function(d,b){for(var p in b){if(b.hasOwnProperty(p)){d[p]=b[p];}}};return _29(d,b);};return function(d,b){_29(d,b);function __(){this.constructor=d;}d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());};}();var BaseInstallerUrl="https://www.webdavsystem.com/products/IT Hit Edit Any Document for SharePoint/";var ITHitWebDavSharePointDownloadDialogContent=function(_33){__extends(ITHitWebDavSharePointDownloadDialogContent,_33);function ITHitWebDavSharePointDownloadDialogContent(_34){var _35=_33.call(this,_34)||this;_35.state={showOtherInstallers:false,showOtherBrowsers:false};return _35;}ITHitWebDavSharePointDownloadDialogContent.prototype.changeOtherInstallers=function(){this.setState({showOtherInstallers:!this.state.showOtherInstallers});};ITHitWebDavSharePointDownloadDialogContent.prototype.changeOtherBrowsers=function(){this.setState({showOtherBrowsers:!this.state.showOtherBrowsers});};ITHitWebDavSharePointDownloadDialogContent.prototype.getExtensionLink=function(_36){var _37="";switch(_36){case "Chrome":_37="<a href=\"https://chrome.google.com/webstore/detail/it-hit-edit-doc-opener-5/nakgflbblpkdafokdokmjdfglijajhlp\" target=\"_blank\">Extension for Google Chrome.</a>";break;case "Firefox":_37="<a href=\"https://addons.mozilla.org/en-CA/firefox/addon/it-hit-edit-doc-opener-5/\" target=\"_blank\">Extension for Mozilla Firefox.</a>";break;case "EdgeChromium":_37=" <a href=\"https://microsoftedge.microsoft.com/addons/detail/mdfaonmaoigngflemfmkboffllkopopm\" target=\"_blank\">Extension for Microsoft Edge Chromium.</a>";break;}return _37;};ITHitWebDavSharePointDownloadDialogContent.prototype.getInstallerLink=function(_38){var _39="";var _3a=BaseInstallerUrl+this.props.version;switch(_38){case "Windows":_39="Windows:&nbsp;&nbsp;<a target=\"_blank\" href=\""+_3a+"/ITHitEditDocumentOpener.msi\">ITHitEditDocumentOpener.msi</a>";break;case "Linux":_39="Linux:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a target=\"_blank\" href=\""+_3a+"/ITHitEditDocumentOpener.deb\">ITHitEditDocumentOpener.deb</a>";break;case "MacOS":_39="Mac OS:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a target=\"_blank\" href=\""+_3a+"/ITHitEditDocumentOpener.pkg\">ITHitEditDocumentOpener.pkg</a>";break;}return _39;};ITHitWebDavSharePointDownloadDialogContent.prototype.render=function(){var _3b=this;var _3c="";var _3d=!!window["chrome"]&&(!!window["chrome"]["webstore"]||!!window["chrome"]["runtime"]);if(_3d&&navigator.userAgent.indexOf("Edg")!=-1){_3c="EdgeChromium";}else{if(_3d){_3c="Chrome";}else{if(typeof InstallTrigger!=="undefined"){_3c="Firefox";}}}return React.createElement(_officeUiFabricReact.DialogContent,{title:"Install a Custom Protocol ",onDismiss:this.props.close,showCloseButton:true},React.createElement("p",null,React.createElement("span",{style:{fontSize:"16px"}},"To open this document, you must install a custom protocol on a client machine and enable a web browser extension."),React.createElement("br",null),React.createElement("ol",null,React.createElement("li",null,"Download and install the file below:",React.createElement("br",null),React.createElement("p",{style:{paddingLeft:"25px"},dangerouslySetInnerHTML:{__html:this.getInstallerLink(ITHit.DetectOS.OS)}}),React.createElement("p",{style:{paddingLeft:"25px"}},React.createElement("a",{href:"javascript:void(0)",style:{textDecoration:"none"},onClick:function onClick(){return _3b.changeOtherInstallers();}},React.createElement("span",null,this.state.showOtherInstallers?"-":"+"),"Other OS:")),this.state.showOtherInstallers&&ITHit.DetectOS.OS!=="Windows"&&React.createElement("p",{style:{paddingLeft:"50px"},dangerouslySetInnerHTML:{__html:this.getInstallerLink("Windows")}}),this.state.showOtherInstallers&&ITHit.DetectOS.OS!=="Linux"&&React.createElement("p",{style:{paddingLeft:"50px"},dangerouslySetInnerHTML:{__html:this.getInstallerLink("Linux")}}),this.state.showOtherInstallers&&ITHit.DetectOS.OS!=="MacOS"&&React.createElement("p",{style:{paddingLeft:"50px"},dangerouslySetInnerHTML:{__html:this.getInstallerLink("MacOS")}})),React.createElement("li",null,"Enable the IT Hit Edit Document Opener web browser extension:",React.createElement("br",null),_3c===""&&React.createElement("p",{style:{paddingLeft:"25px"}},"The extension is not required for Internet Explorer."),_3c!==""&&React.createElement("p",{style:{paddingLeft:"25px"},dangerouslySetInnerHTML:{__html:this.getExtensionLink(_3c)}}),React.createElement("p",{style:{paddingLeft:"25px"}},React.createElement("a",{href:"javascript:void(0)",style:{textDecoration:"none"},onClick:function onClick(){return _3b.changeOtherBrowsers();}},React.createElement("span",null,this.state.showOtherBrowsers?"-":"+")," Other web browsers:")),this.state.showOtherBrowsers&&_3c!=="Chrome"&&React.createElement("p",{style:{paddingLeft:"50px"},dangerouslySetInnerHTML:{__html:this.getExtensionLink("Chrome")}}),this.state.showOtherBrowsers&&_3c!=="Firefox"&&React.createElement("p",{style:{paddingLeft:"50px"},dangerouslySetInnerHTML:{__html:this.getExtensionLink("Firefox")}}),this.state.showOtherBrowsers&&_3c!=="EdgeChromium"&&React.createElement("p",{style:{paddingLeft:"50px"},dangerouslySetInnerHTML:{__html:this.getExtensionLink("EdgeChromium")}}))),React.createElement("br",null),"See ",React.createElement("a",{href:"https://www.webdavsystem.com/sharepoint/install/protocol/windows/",target:"_blank"},"how to install the protocol app")," and\xa0",React.createElement("a",{href:"https://www.webdavsystem.com/sharepoint/install/protocol/web_browser_extensions/",target:"_blank"},"install and verify web browser extensions.")),React.createElement(_officeUiFabricReact.DialogFooter,null,React.createElement(_officeUiFabricReact.Button,{text:"Close",title:"Close",onClick:this.props.close})));};return ITHitWebDavSharePointDownloadDialogContent;}(React.Component);var ITHitWebDavSharePointDownloadDialog=function(_3e){__extends(ITHitWebDavSharePointDownloadDialog,_3e);function ITHitWebDavSharePointDownloadDialog(_3f){var _40=_3e.call(this)||this;_40.showOtherInstallers=false;_40.showOtherBrowsers=false;_40.version=_3f;return _40;}ITHitWebDavSharePointDownloadDialog.prototype.render=function(){var _41=this;var _42=function _42(){_41.showOtherInstallers=!_41.showOtherInstallers;_41.render();};var _43=function _43(){_41.showOtherBrowsers=!_41.showOtherBrowsers;_41.render();};ReactDOM.render(React.createElement(ITHitWebDavSharePointDownloadDialogContent,{close:this.close,showOtherInstallers:this.showOtherInstallers,showOtherBrowsers:this.showOtherBrowsers,changeOtherInstallers:_42,changeOtherBrowsers:_43,version:this.version}),this.domElement);};ITHitWebDavSharePointDownloadDialog.prototype.getConfig=function(){return {isBlocking:false};};return ITHitWebDavSharePointDownloadDialog;}(_spDialog.BaseDialog);var _default=ITHitWebDavSharePointDownloadDialog;exports["default"]=_default;