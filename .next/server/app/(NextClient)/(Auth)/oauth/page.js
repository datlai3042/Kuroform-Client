(()=>{var e={};e.id=7267,e.ids=[7267],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},6005:e=>{"use strict";e.exports=require("node:crypto")},16694:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>l.a,__next_app__:()=>h,originalPathname:()=>d,pages:()=>u,routeModule:()=>m,tree:()=>c});var s=r(50482),a=r(69108),n=r(62563),l=r.n(n),i=r(68300),o={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(o[e]=()=>i[e]);r.d(t,o);let c=["",{children:["(NextClient)",{children:["(Auth)",{children:["oauth",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,63178)),"C:\\Users\\datla\\OneDrive\\M\xe1y t\xednh\\2024\\Thang_4\\03_04_2024\\kuroform-client\\src\\app\\(NextClient)\\(Auth)\\oauth\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,96799)),"C:\\Users\\datla\\OneDrive\\M\xe1y t\xednh\\2024\\Thang_4\\03_04_2024\\kuroform-client\\src\\app\\(NextClient)\\(Auth)\\layout.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,4899)),"C:\\Users\\datla\\OneDrive\\M\xe1y t\xednh\\2024\\Thang_4\\03_04_2024\\kuroform-client\\src\\app\\layout.tsx"],loading:[()=>Promise.resolve().then(r.bind(r,13929)),"C:\\Users\\datla\\OneDrive\\M\xe1y t\xednh\\2024\\Thang_4\\03_04_2024\\kuroform-client\\src\\app\\loading.tsx"],"not-found":[()=>Promise.resolve().then(r.bind(r,48206)),"C:\\Users\\datla\\OneDrive\\M\xe1y t\xednh\\2024\\Thang_4\\03_04_2024\\kuroform-client\\src\\app\\not-found.tsx"]}],u=["C:\\Users\\datla\\OneDrive\\M\xe1y t\xednh\\2024\\Thang_4\\03_04_2024\\kuroform-client\\src\\app\\(NextClient)\\(Auth)\\oauth\\page.tsx"],d="/(NextClient)/(Auth)/oauth/page",h={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/(NextClient)/(Auth)/oauth/page",pathname:"/oauth",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},28020:(e,t,r)=>{Promise.resolve().then(r.bind(r,84600))},66140:(e,t,r)=>{Promise.resolve().then(r.bind(r,27140))},7892:(e,t,r)=>{"use strict";r.d(t,{Z:()=>c});var s=r(6005),a=r.n(s);let n={randomUUID:a().randomUUID},l=new Uint8Array(256),i=l.length,o=[];for(let e=0;e<256;++e)o.push((e+256).toString(16).slice(1));let c=function(e,t,r){if(n.randomUUID&&!t&&!e)return n.randomUUID();let s=(e=e||{}).random||(e.rng||function(){return i>l.length-16&&(a().randomFillSync(l),i=0),l.slice(i,i+=16)})();if(s[6]=15&s[6]|64,s[8]=63&s[8]|128,t){r=r||0;for(let e=0;e<16;++e)t[r+e]=s[e];return t}return function(e,t=0){return(o[e[t+0]]+o[e[t+1]]+o[e[t+2]]+o[e[t+3]]+"-"+o[e[t+4]]+o[e[t+5]]+"-"+o[e[t+6]]+o[e[t+7]]+"-"+o[e[t+8]]+o[e[t+9]]+"-"+o[e[t+10]]+o[e[t+11]]+o[e[t+12]]+o[e[t+13]]+o[e[t+14]]+o[e[t+15]]).toLowerCase()}(s)}},84600:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>c});var s=r(95344),a=r(3729),n=r(53603),l=r(93298),i=r(70574),o=r(63142);let c=({children:e})=>{let[t,r]=(0,a.useState)(!1);return((0,a.useEffect)(()=>{r(!0)},[]),t)?s.jsx(n.Z,{children:(0,s.jsxs)("div",{className:"relative z-[500] top-0 xl:top-0 left-0 w-full min-h-screen h-max  xl:pt-0  px-[20px] flex justify-center items-center bg-color-section-theme  ",children:[(0,s.jsxs)("header",{className:"absolute top-[0rem] left-[2rem] right-[2rem] z-[301] flex   justify-between items-center ",children:[s.jsx(l.Z,{}),s.jsx(i.default,{})]}),s.jsx("div",{className:"pt-[12rem] xl:pt-[6rem] w-full text-text-theme",children:e}),s.jsx(o.default,{})]})}):null}},27140:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>m});var s=r(95344),a=r(62020),n=r(6092),l=r(8428),i=r(3729),o=r(36013),c=r(7892),u=r(38242),d=r(89410);let h=e=>{let{message:t="Nội dung truy cập kh\xf4ng được ph\xe9p"}=e;return(0,s.jsxs)("div",{className:"relative inset-0 max-w-screen h-screen  flex flex-col gap-[2rem] justify-center items-center ",children:[s.jsx(d.default,{src:"/assets/images/icon/errors/403.png",width:181,height:12,className:"hidden xl:inline",alt:"highlight-text"}),s.jsx("p",{className:"font-bold text-[3rem] text-[#0bceb2]",children:t})]})},m=()=>{let e=(0,l.useRouter)(),t=(0,l.useSearchParams)(),r=t.get("client_id")||"",d=t.get("expireToken")||"",m=t.get("access_token")||"",x=t.get("refresh_token")||"",f=t.get("code_verify_token")||"",g=t.get("expireCookie")||"",p=(0,o.I0)();return((0,i.useEffect)(()=>{let t={access_token:m,code_verify_token:f,refresh_token:x,client_id:r,expireToken:d,expireCookie:g};if(console.log({params:t}),!r&&!d&&!m&&!x&&!f&&!g){console.log({scope:"Lỗi oauth"}),p((0,a.DT)({toast_item:{_id:(0,c.Z)(),type:"ERROR",toast_title:"X\xe1c thực người d\xf9ng",core:{message:"Request kh\xf4ng hợp lệ"}}}));return}console.log({scope:"Chuyển về dashboard"}),n.Z.syncNextToken(t).then(()=>e.push("/dashboard"))},[]),r&&d&&m&&x&&f&&g)?s.jsx(u.Z,{message:"Service đang xử l\xed c\xe1c th\xf4ng tin xin vui l\xf2ng đợi..."}):s.jsx(h,{})}},38242:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});var s=r(95344);r(3729);var a=r(44178);let n=e=>{let{message:t}=e;return(0,s.jsxs)("div",{className:"relative inset-0 max-w-screen h-screen  flex justify-center items-center gap-[4rem]",children:[s.jsx(a.Z,{color:"#0bceb2"}),s.jsx("p",{className:"font-bold text-[3rem] text-[#0bceb2]",children:t})]})}},10142:(e,t,r)=>{"use strict";r.d(t,{Z:()=>n});var s=r(95344),a=r(3729);let n=e=>{let{children:t,width:r,height:n,setOpenModel:l}=e,i=(0,a.useRef)(null),o=(0,a.useCallback)(e=>{i.current&&!i.current.contains(e.target)&&l(!1)},[l]);return(0,a.useEffect)(()=>(document.addEventListener("click",o),()=>{document.removeEventListener("click",o),i.current=null}),[o]),s.jsx("div",{ref:i,className:`${r||""} ${n||""}`,children:t})}},53603:(e,t,r)=>{"use strict";r.d(t,{Z:()=>s}),r(3729),r(81202);let s=e=>{let{children:t}=e;return null}},63142:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var s=r(95344),a=r(89410),n=r(3729),l=r(10142);let i=e=>{let{color:t,backgroundColor:r}=e,[i,o]=(0,n.useState)(!1),c=i?"animate-btt":"animate-ttb",u=i?" shadow-lg":" ";return s.jsx("button",{onClick:()=>o(e=>!e),className:` ${u} bg-[#fff] text-[#000] fixed z-[2] bottom-[4rem] right-[2rem]  transition-[width] duration-1000 min-w-[4rem]  rounded-full p-[.4rem]`,children:s.jsx(l.Z,{setOpenModel:o,children:(0,s.jsxs)("div",{className:"flex items-center justify-center gap-[1rem]",children:[i&&s.jsx("span",{className:"pl-[.6rem]",children:"Được ph\xe1t triển bởi Kuro Đạt"}),(0,s.jsxs)("div",{className:" w-[4rem] h-[4rem] relative flex rounded-full",children:[s.jsx(a.default,{width:70,height:70,src:"/assets/images/home/avatar_author.png",alt:"Ảnh t\xe1c giả",className:"w-full h-full rounded-full"}),(0,s.jsxs)("div",{className:`${c} bg-[#fff] text-[#000] absolute z-[1] bottom-[450%] right-[3rem] min-w-[11rem] p-[1rem_.8rem] min-h-[8rem]  flex flex-col gap-[2rem] rounded-lg shadow-2xl `,children:[(0,s.jsxs)("a",{onClick:e=>{e.stopPropagation()},href:"https://www.facebook.com/datlai304",target:"_blank",className:"flex items-center gap-[1rem]",children:[s.jsx(a.default,{width:70,height:70,src:"/assets/images/social/facebook.png",alt:"Li\xean hệ",className:"w-[2rem] h-[2rem] rounded-full"}),"Facebook"]}),(0,s.jsxs)("a",{onClick:e=>e.stopPropagation(),href:"https://github.com/datlai3042",target:"_blank",className:"flex items-center gap-[1rem]",children:[s.jsx(a.default,{width:70,height:70,src:"/assets/images/social/github.png",alt:"Li\xean hệ",className:"w-[2rem] h-[2rem] rounded-full"}),"Github"]}),(0,s.jsxs)("a",{onClick:e=>e.stopPropagation(),href:"/assets/pdf/myCv/LaiHuynhPhatDat_FresherFrontEnd.pdf",download:"LaiHuynhPhatDat_FresherFrontEnd.pdf",target:"_blank",className:"flex items-center gap-[1rem]",children:[s.jsx(a.default,{width:70,height:70,src:"/assets/images/social/pdf.png",alt:"Li\xean hệ",className:"w-[2rem] h-[2rem] rounded-full"}),"CV của m\xecnh"]})]})]})]})})})}},93298:(e,t,r)=>{"use strict";r.d(t,{Z:()=>l});var s=r(95344),a=r(89410),n=r(56506);r(3729);let l=()=>s.jsx(n.default,{href:"/",children:s.jsx(a.default,{src:"/assets/images/icon/logo/logo_home.png",width:70,height:70,quality:100,alt:"logo",className:"w-[15rem] h-[12rem] object-contain",unoptimized:!0,priority:!0})})},70574:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>i});var s=r(95344),a=r(3729),n=r(80751),l=r(89410);let i=()=>{let{theme:e,setTheme:t}=(0,a.useContext)(n.ThemeContext);return(0,s.jsxs)("button",{onClick:()=>{t(e=>"dark"===e?"light":"dark")},className:"relative text-text-theme min-w-[4rem] bg-[#fff] w-[6rem] h-[3rem] rounded-full",children:[s.jsx("div",{className:`${"light"===e?"animate-rtl bg-[#fff]":" animate-ltr bg-[#fff]"} w-[2.2rem] h-[2.2rem] rounded-full absolute top-[50%] translate-y-[-50%]  `}),"light"===e?s.jsx(l.default,{src:"/assets/images/icon/theme/bg_dark.jpg",width:18,height:18,alt:"icon",className:"w-full h-full rounded-full object-cover",unoptimized:!0}):s.jsx(l.default,{src:"/assets/images/icon/theme/bg_light.jpg",width:18,height:18,alt:"icon",className:"w-full h-full rounded-full",unoptimized:!0})]})}},96799:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>n,__esModule:()=>a,default:()=>l});let s=(0,r(86843).createProxy)(String.raw`C:\Users\datla\OneDrive\Máy tính\2024\Thang_4\03_04_2024\kuroform-client\src\app\(NextClient)\(Auth)\layout.tsx`),{__esModule:a,$$typeof:n}=s,l=s.default},63178:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>n,__esModule:()=>a,default:()=>l});let s=(0,r(86843).createProxy)(String.raw`C:\Users\datla\OneDrive\Máy tính\2024\Thang_4\03_04_2024\kuroform-client\src\app\(NextClient)\(Auth)\oauth\page.tsx`),{__esModule:a,$$typeof:n}=s,l=s.default}};var t=require("../../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[1638,8397,7429,8488,8420],()=>r(16694));module.exports=s})();