function _0x4f04(_0x3f7b9f,_0x21a6b0){const _0x446741=_0x4467();return _0x4f04=function(_0x4f04b6,_0x4a8803){_0x4f04b6=_0x4f04b6-0x1c5;let _0xefbacd=_0x446741[_0x4f04b6];return _0xefbacd;},_0x4f04(_0x3f7b9f,_0x21a6b0);}const _0x147328=_0x4f04;(function(_0x259a73,_0x11bcdf){const _0x5e4212=_0x4f04,_0x4e3d31=_0x259a73();while(!![]){try{const _0x3e5260=parseInt(_0x5e4212(0x1d2))/0x1+-parseInt(_0x5e4212(0x1e7))/0x2+-parseInt(_0x5e4212(0x1e4))/0x3+-parseInt(_0x5e4212(0x1dd))/0x4+parseInt(_0x5e4212(0x1d6))/0x5+-parseInt(_0x5e4212(0x1c5))/0x6*(-parseInt(_0x5e4212(0x1d3))/0x7)+parseInt(_0x5e4212(0x1e8))/0x8*(parseInt(_0x5e4212(0x1c9))/0x9);if(_0x3e5260===_0x11bcdf)break;else _0x4e3d31['push'](_0x4e3d31['shift']());}catch(_0x121ca1){_0x4e3d31['push'](_0x4e3d31['shift']());}}}(_0x4467,0x4035c));const loginForm=document[_0x147328(0x1ca)](_0x147328(0x1d4)),passwordInput=document[_0x147328(0x1ca)](_0x147328(0x1cd)),errorLabel=document['querySelector'](_0x147328(0x1e6)),submitBtn=document[_0x147328(0x1ca)](_0x147328(0x1d9));function _0x4467(){const _0x24dcbd=['setTime','replace','1228998vYXMMW','hidden','label#message','497392eOcwmB','32frNpff','6tROZLu','opacity-0','getTime','token','2177937DHCvtO','querySelector','location','toUTCString','input#password','toggle','cookie','disabled','error','148079quVcSj','236278xgcvZl','form#login-form','opacity-100','1340280yRPxZs','classList','Post','button#submitBtn','stringify','/dashboard','opacity-10','1985980qEqXPs','childNodes','textContent','addEventListener','preventDefault'];_0x4467=function(){return _0x24dcbd;};return _0x4467();}loginForm[_0x147328(0x1e0)]('submit',async _0x31f799=>{const _0x5b8c30=_0x147328;_0x31f799[_0x5b8c30(0x1e1)](),submitBtn[_0x5b8c30(0x1d0)]=!![];if(passwordInput['value']==''){errorLabel[_0x5b8c30(0x1df)]='password\x20cannot\x20be\x20empty.',setTimeout(()=>{const _0x263b62=_0x5b8c30;errorLabel[_0x263b62(0x1df)]='',submitBtn[_0x263b62(0x1d0)]=![];},0x5dc);return;}submitBtn[_0x5b8c30(0x1de)][0x1][_0x5b8c30(0x1d7)][_0x5b8c30(0x1e3)](_0x5b8c30(0x1c6),_0x5b8c30(0x1d5)),submitBtn[_0x5b8c30(0x1de)][0x1][_0x5b8c30(0x1d7)][_0x5b8c30(0x1ce)](_0x5b8c30(0x1e5));const _0x5b36f9=await fetch('/dashboard/login',{'method':_0x5b8c30(0x1d8),'headers':{'content-type':'application/json'},'body':JSON[_0x5b8c30(0x1da)]({'password':passwordInput['value']})}),_0x58abb6=await _0x5b36f9['json']();submitBtn[_0x5b8c30(0x1de)][0x1][_0x5b8c30(0x1d7)][_0x5b8c30(0x1e3)](_0x5b8c30(0x1d5),_0x5b8c30(0x1dc)),submitBtn[_0x5b8c30(0x1de)][0x1]['classList']['toggle']('hidden');if(_0x58abb6[_0x5b8c30(0x1d1)]){errorLabel['textContent']=_0x58abb6[_0x5b8c30(0x1d1)],setTimeout(()=>{const _0x1b5eb4=_0x5b8c30;errorLabel[_0x1b5eb4(0x1df)]='',submitBtn['disabled']=![];},0x5dc);return;}const _0x2c10e4=new Date(),_0x2d3cff=_0x2c10e4[_0x5b8c30(0x1c7)]()+0x3e8*0x8ca0;_0x2c10e4[_0x5b8c30(0x1e2)](_0x2d3cff),document[_0x5b8c30(0x1cf)]=btoa('token')+'='+_0x58abb6[_0x5b8c30(0x1c8)]+';\x20expires='+_0x2c10e4[_0x5b8c30(0x1cc)](),window[_0x5b8c30(0x1cb)]=_0x5b8c30(0x1db);});