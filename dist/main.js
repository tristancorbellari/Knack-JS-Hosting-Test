(()=>{var e={188:(e,r,n)=>{"use strict";n.r(r),n.d(r,{makeRequest:()=>o,postImage:()=>a,runTask:()=>s});var t=n(521);function o(e,r,n,o,a={},s,c){let i=`https://api.knack.com/v1/pages/${r}/views/${n}/records${o=void 0===o||""===o?"":"/"+o}${s=void 0===s?"":"?filters="+encodeURIComponent(JSON.stringify(s))}${c=void 0===c?"":"?"+c.url+"_id="+c.parentRecordId}`,l=0;for(;l<maxTries;)try{return new Promise((function(r,n){var o=function(){$.ajax({url:i,type:`${e}`,headers:{Authorization:Knack.getUserToken(),"X-Knack-Application-Id":t.API_ID,"Content-Type":"application/json"},data:JSON.stringify(a),success:function(e){r(e)},error:function(e){429==e.status?o():n(e)}})};o()}))}catch(e){console.error(`Attempt ${l+1} failed: ${e.message}`),l++}l===maxTries&&console.error("Max retries reached. Request failed.")}function a(e){var r=new FormData;r.append("files",e);let n=`https://api.knack.com/v1/applications/${t.API_ID}/assets/image/upload`,o=0;for(;o<maxTries;)try{return new Promise((function(e,o){$.ajax({url:n,type:"POST",headers:{Authorization:Knack.getUserToken(),"X-Knack-Application-ID":t.API_ID,"X-Knack-REST-API-Key":"knack"},processData:!1,contentType:!1,mimeType:"multipart/form-data",data:r,success:function(r){e(r)},error:function(e){o(e)}})}))}catch(e){console.error(`Attempt ${o+1} failed: ${e.message}`),o++}o===maxTries&&console.error("Max retries reached. Request failed.")}function s(e,r){let n=`https://us-east-1-renderer-read.knack.com/v1/applications/${e}/tasks/${r}/runtaskjob`,t=0;for(;t<maxTries;)try{return new Promise((function(r,t){$.ajax({url:n,type:"GET",headers:{Authorization:Knack.getUserToken(),"X-Knack-Application-ID":e,"X-Knack-REST-API-Key":"knack"},success:function(e){r(e)},error:function(e){t(e)}})}))}catch(e){console.error(`Attempt ${t+1} failed: ${e.message}`),t++}t===maxTries&&console.error("Max retries reached. Request failed.")}},641:(e,r,n)=>{"use strict";n.r(r),n.d(r,{enableTextFieldImageAttachments:()=>a});var t=n(188);function o(e){for(var r=e.indexOf(";base64,"),n=e.substring(5,r),t=e.substr(r+8),o=atob(t),a=new ArrayBuffer(o.length),s=new Uint8Array(a),c=0;c<o.length;c++)s[c]=o.charCodeAt(c);return new Blob([a],{type:n})}function a(e,r,n,a,s,c,i,l){var d=r.id,u=r[s],f=document.getElementsByClassName("redactor-editor")[0].getElementsByTagName("img");if(f.length>0){let m=void 0===a?f.length:Math.min(f.length,a);async function p(){for(let v=0;v<m;++v){var r=f[v].src;console.log(r);var a=o(r);console.log(a);var p=Knack.getUserAttributes().name+" - "+e.key+"-img "+Date.now()+".png",g=new File([a],p,{type:"image/png"});async function k(){try{var e=await new Promise((function(e,r){e((0,t.postImage)(g))}));console.log("fetched data"),console.log(e);var r=JSON.parse(e).id,o=JSON.parse(e).public_url;console.log(u),console.log(u),u=void 0===n?u.replace(/<img(?!( src="https:\/\/s3.amazonaws.com)).*?>/,`<img src="${o}">`):u.replaceAll(/<img(.*?)>/g,""),console.log(u);let a={};if(a[s]=u,void 0!==n&&(a[n[v]]=r),console.log(u),console.log(a),await(0,t.makeRequest)("PUT",c,i,d,a),void 0!==l)for(let e=0;e<l.length;++e)Knack.views[l[e]].model.fetch()}catch(e){console.error("Error: ",e)}}console.log(p),console.log(g),k()}}p()}}},715:()=>{$(document).on("knack-scene-render.any",(function(e,r){console.log("Scene rendered!")}))},887:(e,r,n)=>{"use strict";n.r(r);var t=n(641);$(document).on("knack-view-render.any",(function(e,r){console.log("View rendered!")})),$(document).on("knack-record-create.view_2673",(function(e,r,n){console.log("1"),(0,t.enableTextFieldImageAttachments)(r,n,void 0,void 0,"field_1624","scene_1109","view_2674",void 0)}))},521:()=>{},44:(e,r,n)=>{var t;(t=n(698)).keys().forEach(t)},698:(e,r,n)=>{var t={"./HelperFunctions/ajax_calls.js":188,"./HelperFunctions/rtf_image_attachments.js":641,"./SceneRenders/scene_render.js":715,"./ViewRenders/view_render.js":887,"./constants.js":521,"./index.js":44};function o(e){var r=a(e);return n(r)}function a(e){if(!n.o(t,e)){var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}return t[e]}o.keys=function(){return Object.keys(t)},o.resolve=a,e.exports=o,o.id=698}},r={};function n(t){var o=r[t];if(void 0!==o)return o.exports;var a=r[t]={exports:{}};return e[t](a,a.exports,n),a.exports}n.n=e=>{var r=e&&e.__esModule?()=>e.default:()=>e;return n.d(r,{a:r}),r},n.d=(e,r)=>{for(var t in r)n.o(r,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:r[t]})},n.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n(44)})();