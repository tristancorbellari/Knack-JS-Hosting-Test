(()=>{var e={188:(e,n,o)=>{"use strict";o.r(n),o.d(n,{makeRequest:()=>t,postImage:()=>a,runTask:()=>s});var r=o(521);function t(e,n,o,t,a={},s,c){let i=`https://api.knack.com/v1/pages/${n}/views/${o}/records${t=void 0===t||""===t?"":"/"+t}${s=void 0===s?"":"?filters="+encodeURIComponent(JSON.stringify(s))}${c=void 0===c?"":"?"+c.url+"_id="+c.parentRecordId}`,l=0;for(;l<window.MAX_TRIES;)try{return new Promise((function(n,o){var t=function(){$.ajax({url:i,type:`${e}`,headers:{Authorization:Knack.getUserToken(),"X-Knack-Application-Id":r.API_ID,"Content-Type":"application/json"},data:JSON.stringify(a),success:function(e){n(e)},error:function(e){429==e.status?t():o(e)}})};t()}))}catch(e){console.error(`Attempt ${l+1} failed: ${e.message}`),l++}l===window.MAX_TRIES&&console.error("Max retries reached. Request failed.")}function a(e){var n=new FormData;n.append("files",e);let o=`https://api.knack.com/v1/applications/${r.API_ID}/assets/image/upload`,t=0;for(;t<window.MAX_TRIES;)try{return new Promise((function(e,t){$.ajax({url:o,type:"POST",headers:{Authorization:Knack.getUserToken(),"X-Knack-Application-ID":r.API_ID,"X-Knack-REST-API-Key":"knack"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:n,success:function(n){e(n)},error:function(e){t(e)}})}))}catch(e){console.error(`Attempt ${t+1} failed: ${e.message}`),t++}t===window.MAX_TRIES&&console.error("Max retries reached. Request failed.")}function s(e,n){let o=`https://us-east-1-renderer-read.knack.com/v1/applications/${e}/tasks/${n}/runtaskjob`,r=0;for(;r<window.MAX_TRIES;)try{return new Promise((function(n,r){$.ajax({url:o,type:"GET",headers:{Authorization:Knack.getUserToken(),"X-Knack-Application-ID":e,"X-Knack-REST-API-Key":"knack"},success:function(e){n(e)},error:function(e){r(e)}})}))}catch(e){console.error(`Attempt ${r+1} failed: ${e.message}`),r++}r===window.MAX_TRIES&&console.error("Max retries reached. Request failed.")}},641:(e,n,o)=>{"use strict";o.r(n),o.d(n,{enableTextFieldImageAttachments:()=>a});var r=o(188);function t(e){for(var n=e.indexOf(";base64,"),o=e.substring(5,n),r=e.substr(n+8),t=atob(r),a=new ArrayBuffer(t.length),s=new Uint8Array(a),c=0;c<t.length;c++)s[c]=t.charCodeAt(c);return new Blob([a],{type:o})}function a(e,n,o,a,s,c,i,l){var d=n.id,u=n[s],f=document.getElementsByClassName("redactor-editor")[0].getElementsByTagName("img");if(f.length>0){let p=void 0===a?f.length:Math.min(f.length,a);async function g(){for(let v=0;v<p;++v){var n=f[v].src;console.log(n);var a=t(n);console.log(a);var g=Knack.getUserAttributes().name+" - "+e.key+"-img "+Date.now()+".png",m=new File([a],g,{type:"image/png"});async function w(){try{var e=await new Promise((function(e,n){e((0,r.postImage)(m))}));console.log("fetched data"),console.log(e);var n=JSON.parse(e).id,t=JSON.parse(e).public_url;console.log(u),console.log(u),u=void 0===o?u.replace(/<img(?!( src="https:\/\/s3.amazonaws.com)).*?>/,`<img src="${t}">`):u.replaceAll(/<img(.*?)>/g,""),console.log(u);let a={};if(a[s]=u,void 0!==o&&(a[o[v]]=n),console.log(u),console.log(a),await(0,r.makeRequest)("PUT",c,i,d,a),void 0!==l)for(let e=0;e<l.length;++e)Knack.views[l[e]].model.fetch()}catch(e){console.error("Error: ",e)}}console.log(g),console.log(m),w()}}g()}}},715:()=>{$(document).on("knack-scene-render.any",(function(e,n){console.log("Scene rendered!")}))},887:(e,n,o)=>{"use strict";o.r(n);var r=o(641);o(44),$(document).on("knack-view-render.any",(function(e,n){console.log("View rendered!"),console.log(window.MAX_TRIES)})),$(document).on("knack-record-create.view_2673",(function(e,n,o){console.log("1"),(0,r.enableTextFieldImageAttachments)(n,o,void 0,void 0,"field_1624","scene_1109","view_2674",void 0)}))},521:()=>{},44:(e,n,o)=>{var r;(r=o(698)).keys().forEach(r),window.MAX_TRIES=1},698:(e,n,o)=>{var r={"./HelperFunctions/ajax_calls.js":188,"./HelperFunctions/rtf_image_attachments.js":641,"./SceneRenders/scene_render.js":715,"./ViewRenders/view_render.js":887,"./constants.js":521,"./index.js":44};function t(e){var n=a(e);return o(n)}function a(e){if(!o.o(r,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return r[e]}t.keys=function(){return Object.keys(r)},t.resolve=a,e.exports=t,t.id=698}},n={};function o(r){var t=n[r];if(void 0!==t)return t.exports;var a=n[r]={exports:{}};return e[r](a,a.exports,o),a.exports}o.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return o.d(n,{a:n}),n},o.d=(e,n)=>{for(var r in n)o.o(n,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},o.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o(44)})();