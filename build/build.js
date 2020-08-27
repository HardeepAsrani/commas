!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function r(e,t,n,r,o,l,a){try{var c=e[l](a),i=c.value}catch(e){return void n(e)}c.done?t(i):Promise.resolve(i).then(r,o)}function o(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var n=[],r=!0,o=!1,l=void 0;try{for(var a,c=e[Symbol.iterator]();!(r=(a=c.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(e){o=!0,l=e}finally{try{r||null==c.return||c.return()}finally{if(o)throw l}}return n}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return l(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return l(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function l(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.r(t);var a=wp.apiFetch,c=wp.i18n.__,i=wp.blocks.serialize,u=wp.blockEditor,s=u.BlockControls,p=u.InnerBlocks,m=u.InspectorControls,f=wp.components,d=f.Button,y=f.PanelBody,b=f.Placeholder,v=f.SelectControl,w=f.Spinner,g=f.Toolbar,h=f.ToolbarButton,k=wp.data,E=k.useSelect,S=k.useDispatch,P=wp.element.useState,x=function(e){var t=e.clientId,n=E((function(e){var n=e("core/block-editor").getBlock;return i(n(t))})),l=S("core/notices").createNotice,u=o(P(!1),2),f=u[0],k=u[1],x=o(P([]),2),O=x[0],j=x[1],C=function(){var e,t=(e=regeneratorRuntime.mark((function e(){var t,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return k(!0),j([]),t=n.replace(/<\!--.*?-->/g,""),e.prev=3,e.next=6,a({path:"commas/v1/check",method:"POST",data:{content:t}});case 6:r=e.sent,(r=JSON.parse(r)).message?l("error",r.message,{type:"snackbar"}):r.matches&&j(r.matches),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(3),l("error",e.t0.message?e.t0.message:c("There was an undefined error."),{type:"snackbar"});case 14:k(!1);case 15:case"end":return e.stop()}}),e,null,[[3,11]])})),function(){var t=this,n=arguments;return new Promise((function(o,l){var a=e.apply(t,n);function c(e){r(a,o,l,c,i,"next",e)}function i(e){r(a,o,l,c,i,"throw",e)}c(void 0)}))});return function(){return t.apply(this,arguments)}}();return wp.element.createElement(React.Fragment,null,wp.element.createElement(s,null,wp.element.createElement(g,null,wp.element.createElement(h,{icon:"editor-spellcheck",label:c("Proofread"),onClick:C}))),wp.element.createElement(m,null,O.map((function(e){return wp.element.createElement(y,{title:e.shortMessage||e.message,initialOpen:!1},e.message&&wp.element.createElement("div",{style:{padding:"5px"}},wp.element.createElement("strong",null,c("Explanation: ")),e.message),e.sentence&&wp.element.createElement("div",{style:{padding:"5px"}},wp.element.createElement("strong",null,c("Sentence: ")),'"',e.sentence,'"'),e.replacements&&0<e.replacements.length&&wp.element.createElement(v,{label:c("Possible Replacements"),options:e.replacements.map((function(e){return{value:e.value,label:e.value}}))}))})),wp.element.createElement(y,null,f?wp.element.createElement(b,null,wp.element.createElement(w,null)):wp.element.createElement(d,{isPrimary:!0,onClick:C},c("Proofread")))),wp.element.createElement(p,{templateLock:!1,template:[["core/paragraph"]]}))},O=wp.i18n.__,j=wp.blocks.registerBlockType,C=wp.blockEditor.InnerBlocks;j("commas/commas",{title:O("Commas - Grammar Check"),description:O("Commas brings proofreading to the Block Editor."),icon:"editor-spellcheck",category:"common",keywords:["grammar","spelling","spellcheck"],supports:{customClassName:!1},edit:x,save:function(){return wp.element.createElement(C.Content,null)}})}]);