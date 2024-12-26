"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2325],{843:function(t,e,n){n.d(e,{Z:function(){return o}});var i=n(2265),r={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.367.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let s=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),o=(t,e)=>{let n=(0,i.forwardRef)(({color:n="currentColor",size:o=24,strokeWidth:u=2,absoluteStrokeWidth:a,className:c="",children:h,...l},f)=>(0,i.createElement)("svg",{ref:f,...r,width:o,height:o,stroke:n,strokeWidth:a?24*Number(u)/Number(o):u,className:["lucide",`lucide-${s(t)}`,c].join(" "),...l},[...e.map(([t,e])=>(0,i.createElement)(t,e)),...Array.isArray(h)?h:[h]]));return n.displayName=`${t}`,n}},9555:function(t,e,n){n.d(e,{j:function(){return s}});var i=n(4614),r=n(6063),s=new class extends i.l{#t;#e;#n;constructor(){super(),this.#n=t=>{if(!r.sk&&window.addEventListener){let e=()=>t();return window.addEventListener("visibilitychange",e,!1),()=>{window.removeEventListener("visibilitychange",e)}}}}onSubscribe(){this.#e||this.setEventListener(this.#n)}onUnsubscribe(){this.hasListeners()||(this.#e?.(),this.#e=void 0)}setEventListener(t){this.#n=t,this.#e?.(),this.#e=t(t=>{"boolean"==typeof t?this.setFocused(t):this.onFocus()})}setFocused(t){this.#t!==t&&(this.#t=t,this.onFocus())}onFocus(){let t=this.isFocused();this.listeners.forEach(e=>{e(t)})}isFocused(){return"boolean"==typeof this.#t?this.#t:globalThis.document?.visibilityState!=="hidden"}}},1793:function(t,e,n){n.d(e,{R:function(){return u},m:function(){return o}});var i=n(5139),r=n(2041),s=n(326),o=class extends r.F{#i;#r;#s;constructor(t){super(),this.mutationId=t.mutationId,this.#r=t.mutationCache,this.#i=[],this.state=t.state||u(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){this.#i.includes(t)||(this.#i.push(t),this.clearGcTimeout(),this.#r.notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){this.#i=this.#i.filter(e=>e!==t),this.scheduleGc(),this.#r.notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){this.#i.length||("pending"===this.state.status?this.scheduleGc():this.#r.remove(this))}continue(){return this.#s?.continue()??this.execute(this.state.variables)}async execute(t){this.#s=(0,s.Mz)({fn:()=>this.options.mutationFn?this.options.mutationFn(t):Promise.reject(Error("No mutationFn found")),onFail:(t,e)=>{this.#o({type:"failed",failureCount:t,error:e})},onPause:()=>{this.#o({type:"pause"})},onContinue:()=>{this.#o({type:"continue"})},retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>this.#r.canRun(this)});let e="pending"===this.state.status,n=!this.#s.canStart();try{if(!e){this.#o({type:"pending",variables:t,isPaused:n}),await this.#r.config.onMutate?.(t,this);let e=await this.options.onMutate?.(t);e!==this.state.context&&this.#o({type:"pending",context:e,variables:t,isPaused:n})}let i=await this.#s.start();return await this.#r.config.onSuccess?.(i,t,this.state.context,this),await this.options.onSuccess?.(i,t,this.state.context),await this.#r.config.onSettled?.(i,null,this.state.variables,this.state.context,this),await this.options.onSettled?.(i,null,t,this.state.context),this.#o({type:"success",data:i}),i}catch(e){try{throw await this.#r.config.onError?.(e,t,this.state.context,this),await this.options.onError?.(e,t,this.state.context),await this.#r.config.onSettled?.(void 0,e,this.state.variables,this.state.context,this),await this.options.onSettled?.(void 0,e,t,this.state.context),e}finally{this.#o({type:"error",error:e})}}finally{this.#r.runNext(this)}}#o(t){this.state=(e=>{switch(t.type){case"failed":return{...e,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...e,isPaused:!0};case"continue":return{...e,isPaused:!1};case"pending":return{...e,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...e,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...e,data:void 0,error:t.error,failureCount:e.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}})(this.state),i.V.batch(()=>{this.#i.forEach(e=>{e.onMutationUpdate(t)}),this.#r.notify({mutation:this,type:"updated",action:t})})}};function u(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}},5139:function(t,e,n){n.d(e,{V:function(){return i}});var i=function(){let t=[],e=0,n=t=>{t()},i=t=>{t()},r=t=>setTimeout(t,0),s=i=>{e?t.push(i):r(()=>{n(i)})},o=()=>{let e=t;t=[],e.length&&r(()=>{i(()=>{e.forEach(t=>{n(t)})})})};return{batch:t=>{let n;e++;try{n=t()}finally{--e||o()}return n},batchCalls:t=>(...e)=>{s(()=>{t(...e)})},schedule:s,setNotifyFunction:t=>{n=t},setBatchNotifyFunction:t=>{i=t},setScheduler:t=>{r=t}}}()},7211:function(t,e,n){n.d(e,{N:function(){return s}});var i=n(4614),r=n(6063),s=new class extends i.l{#u=!0;#e;#n;constructor(){super(),this.#n=t=>{if(!r.sk&&window.addEventListener){let e=()=>t(!0),n=()=>t(!1);return window.addEventListener("online",e,!1),window.addEventListener("offline",n,!1),()=>{window.removeEventListener("online",e),window.removeEventListener("offline",n)}}}}onSubscribe(){this.#e||this.setEventListener(this.#n)}onUnsubscribe(){this.hasListeners()||(this.#e?.(),this.#e=void 0)}setEventListener(t){this.#n=t,this.#e?.(),this.#e=t(this.setOnline.bind(this))}setOnline(t){this.#u!==t&&(this.#u=t,this.listeners.forEach(e=>{e(t)}))}isOnline(){return this.#u}}},2041:function(t,e,n){n.d(e,{F:function(){return r}});var i=n(6063),r=class{#a;destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),(0,i.PN)(this.gcTime)&&(this.#a=setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(t){this.gcTime=Math.max(this.gcTime||0,t??(i.sk?1/0:3e5))}clearGcTimeout(){this.#a&&(clearTimeout(this.#a),this.#a=void 0)}}},326:function(t,e,n){n.d(e,{DV:function(){return c},Kw:function(){return u},Mz:function(){return h}});var i=n(9555),r=n(7211),s=n(6063);function o(t){return Math.min(1e3*2**t,3e4)}function u(t){return(t??"online")!=="online"||r.N.isOnline()}var a=class{constructor(t){this.revert=t?.revert,this.silent=t?.silent}};function c(t){return t instanceof a}function h(t){let e,n,c,h=!1,l=0,f=!1,d=new Promise((t,e)=>{n=t,c=e}),p=()=>i.j.isFocused()&&("always"===t.networkMode||r.N.isOnline())&&t.canRun(),y=()=>u(t.networkMode)&&t.canRun(),m=i=>{f||(f=!0,t.onSuccess?.(i),e?.(),n(i))},v=n=>{f||(f=!0,t.onError?.(n),e?.(),c(n))},b=()=>new Promise(n=>{e=t=>{(f||p())&&n(t)},t.onPause?.()}).then(()=>{e=void 0,f||t.onContinue?.()}),w=()=>{let e;if(f)return;let n=0===l?t.initialPromise:void 0;try{e=n??t.fn()}catch(t){e=Promise.reject(t)}Promise.resolve(e).then(m).catch(e=>{if(f)return;let n=t.retry??(s.sk?0:3),i=t.retryDelay??o,r="function"==typeof i?i(l,e):i,u=!0===n||"number"==typeof n&&l<n||"function"==typeof n&&n(l,e);if(h||!u){v(e);return}l++,t.onFail?.(l,e),(0,s._v)(r).then(()=>p()?void 0:b()).then(()=>{h?v(e):w()})})};return{promise:d,cancel:e=>{f||(v(new a(e)),t.abort?.())},continue:()=>(e?.(),d),cancelRetry:()=>{h=!0},continueRetry:()=>{h=!1},canStart:y,start:()=>(y()?w():b().then(w),d)}}},4614:function(t,e,n){n.d(e,{l:function(){return i}});var i=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(t){return this.listeners.add(t),this.onSubscribe(),()=>{this.listeners.delete(t),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}}},6063:function(t,e,n){n.d(e,{CN:function(){return x},Ht:function(){return k},KC:function(){return a},Kp:function(){return u},Nc:function(){return c},PN:function(){return o},Rm:function(){return f},SE:function(){return s},VS:function(){return y},VX:function(){return E},Wk:function(){return C},X7:function(){return l},Ym:function(){return d},ZT:function(){return r},_v:function(){return w},_x:function(){return h},cG:function(){return P},oE:function(){return g},sk:function(){return i},to:function(){return p}});var i="undefined"==typeof window||"Deno"in globalThis;function r(){}function s(t,e){return"function"==typeof t?t(e):t}function o(t){return"number"==typeof t&&t>=0&&t!==1/0}function u(t,e){return Math.max(t+(e||0)-Date.now(),0)}function a(t,e){return"function"==typeof t?t(e):t}function c(t,e){return"function"==typeof t?t(e):t}function h(t,e){let{type:n="all",exact:i,fetchStatus:r,predicate:s,queryKey:o,stale:u}=t;if(o){if(i){if(e.queryHash!==f(o,e.options))return!1}else if(!p(e.queryKey,o))return!1}if("all"!==n){let t=e.isActive();if("active"===n&&!t||"inactive"===n&&t)return!1}return("boolean"!=typeof u||e.isStale()===u)&&(!r||r===e.state.fetchStatus)&&(!s||!!s(e))}function l(t,e){let{exact:n,status:i,predicate:r,mutationKey:s}=t;if(s){if(!e.options.mutationKey)return!1;if(n){if(d(e.options.mutationKey)!==d(s))return!1}else if(!p(e.options.mutationKey,s))return!1}return(!i||e.state.status===i)&&(!r||!!r(e))}function f(t,e){return(e?.queryKeyHashFn||d)(t)}function d(t){return JSON.stringify(t,(t,e)=>v(e)?Object.keys(e).sort().reduce((t,n)=>(t[n]=e[n],t),{}):e)}function p(t,e){return t===e||typeof t==typeof e&&!!t&&!!e&&"object"==typeof t&&"object"==typeof e&&!Object.keys(e).some(n=>!p(t[n],e[n]))}function y(t,e){if(!e||Object.keys(t).length!==Object.keys(e).length)return!1;for(let n in t)if(t[n]!==e[n])return!1;return!0}function m(t){return Array.isArray(t)&&t.length===Object.keys(t).length}function v(t){if(!b(t))return!1;let e=t.constructor;if(void 0===e)return!0;let n=e.prototype;return!!(b(n)&&n.hasOwnProperty("isPrototypeOf"))&&Object.getPrototypeOf(t)===Object.prototype}function b(t){return"[object Object]"===Object.prototype.toString.call(t)}function w(t){return new Promise(e=>{setTimeout(e,t)})}function g(t,e,n){return"function"==typeof n.structuralSharing?n.structuralSharing(t,e):!1!==n.structuralSharing?function t(e,n){if(e===n)return e;let i=m(e)&&m(n);if(i||v(e)&&v(n)){let r=i?e:Object.keys(e),s=r.length,o=i?n:Object.keys(n),u=o.length,a=i?[]:{},c=0;for(let s=0;s<u;s++){let u=i?s:o[s];(!i&&r.includes(u)||i)&&void 0===e[u]&&void 0===n[u]?(a[u]=void 0,c++):(a[u]=t(e[u],n[u]),a[u]===e[u]&&void 0!==e[u]&&c++)}return s===u&&c===s?e:a}return n}(t,e):e}function C(t){return t}function E(t,e,n=0){let i=[...t,e];return n&&i.length>n?i.slice(1):i}function k(t,e,n=0){let i=[e,...t];return n&&i.length>n?i.slice(0,-1):i}var x=Symbol(),P=(t,e)=>!t.queryFn&&e?.initialPromise?()=>e.initialPromise:t.queryFn&&t.queryFn!==x?t.queryFn:()=>Promise.reject(Error(`Missing queryFn: '${t.queryHash}'`))},7082:function(t,e,n){n.d(e,{NL:function(){return o},aH:function(){return u}});var i=n(2265),r=n(7437),s=i.createContext(void 0),o=t=>{let e=i.useContext(s);if(t)return t;if(!e)throw Error("No QueryClient set, use QueryClientProvider to set one");return e},u=t=>{let{client:e,children:n}=t;return i.useEffect(()=>(e.mount(),()=>{e.unmount()}),[e]),(0,r.jsx)(s.Provider,{value:e,children:n})}}}]);