"use strict";(self.webpackChunkreact=self.webpackChunkreact||[]).push([[486],{486:(e,r,s)=>{s.r(r),s.d(r,{default:()=>l});var t=s(43),a=s(134),o=s(782),c=s(579);const n=()=>(0,c.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",children:[1,2,3,4,5,6].map((e=>(0,c.jsxs)("div",{className:"animate-pulse",children:[(0,c.jsx)("div",{className:"bg-gray-200 h-56 rounded-lg mb-4"}),(0,c.jsx)("div",{className:"h-4 bg-gray-200 rounded mx-auto w-3/4"})]},e)))}),l=()=>{const[e,r]=(0,t.useState)([]),[s,l]=(0,t.useState)(!0),[i,d]=(0,t.useState)(null),h=(0,a.g)(),m=(0,a.Zp)();return(0,t.useEffect)((()=>{let e=!0;return l(!0),d(null),(async e=>{try{const r=await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=fd1e2b3809874b39adc37108b66a6f77&query=${encodeURIComponent(e)}`);if(!r.ok){if(402===r.status)throw new Error("API quota exceeded. Please try again tomorrow.");if(401===r.status)throw new Error("Invalid API key. Please check your configuration.");throw new Error(`Failed to fetch recipes: ${r.status}`)}const s=await r.json();if(!s.results)throw new Error("Invalid response format from API");return s.results}catch(i){throw console.error("Search error:",i),i}})(h.search).then((s=>{e&&(r(s),l(!1))})).catch((r=>{e&&(d(r.message),l(!1))})),()=>{e=!1}}),[h.search]),s?(0,c.jsx)(n,{}):i?(0,c.jsxs)("div",{className:"text-center p-8",children:[(0,c.jsx)("h2",{className:"text-2xl font-bold text-red-500 mb-4",children:"Error"}),(0,c.jsx)("p",{className:"text-gray-600 mb-4",children:i}),(0,c.jsx)("button",{onClick:()=>m("/"),className:"px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors",children:"Return to Home"})]}):0===e.length?(0,c.jsxs)("div",{className:"text-center p-8",children:[(0,c.jsx)("h2",{className:"text-2xl font-bold mb-4",children:"No Results Found"}),(0,c.jsxs)("p",{className:"text-gray-600 mb-4",children:['No recipes found for "',h.search,'". Try a different search term.']}),(0,c.jsx)("button",{onClick:()=>m("/"),className:"px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors",children:"Return to Home"})]}):(0,c.jsxs)(o.P.div,{className:"p-4",initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.5},children:[(0,c.jsxs)("h2",{className:"text-2xl font-bold mb-6 text-center",children:['Search Results for "',h.search,'"']}),(0,c.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",children:e.map((e=>{let{title:r,id:s,image:t}=e;return(0,c.jsx)(o.P.div,{className:"rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow",whileHover:{scale:1.02},transition:{duration:.2},children:(0,c.jsxs)(a.N_,{to:`/recipe/${s}`,children:[(0,c.jsx)("img",{src:t,alt:r,className:"w-full h-56 object-cover",loading:"lazy"}),(0,c.jsx)("h4",{className:"p-4 text-lg font-medium hover:text-orange-500 transition-colors",children:r})]})},s)}))})]})}}}]);
//# sourceMappingURL=486.40ef6ad9.chunk.js.map