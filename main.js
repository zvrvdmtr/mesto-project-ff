(()=>{"use strict";var e="popup_is-opened",t=function(t){if("Escape"===t.key){var n=document.querySelector("."+e);r(n)}},n=function(n){n.classList.add(e),document.addEventListener("keydown",t)},r=function(n){n.classList.remove(e),document.removeEventListener("keydown",t)},o=function(e){e.querySelector(".popup__close").addEventListener("click",(function(){r(e)})),e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup")&&r(e)}))},c={baseUrl:"https://nomoreparties.co/v1/wff-cohort-26",headers:{authorization:"b5cd6d55-26d0-4f2f-83ba-d0df94f80042","Content-Type":"application/json "}};function a(){return fetch("".concat(c.baseUrl,"/users/me"),{headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка:".concat(e.status))})).catch((function(e){console.log(e)}))}var u=document.querySelector("#card-template").content;function i(e,t,n,r,o){var c=u.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__image"),i=c.querySelector(".card__delete-button");return o===e.owner._id?i.addEventListener("click",t):i.remove(),a.src=e.link,a.alt=e.name,c.querySelector(".card__title").textContent=e.name,c.querySelector(".card__like-number").textContent=e.likes.length,c.querySelector(".card__like-button").addEventListener("click",n),c.querySelector(".card__image").addEventListener("click",r),e.likes.forEach((function(e){e._id===o&&c.querySelector(".card__like-button").classList.add("card__like-button_is-active")})),c}function s(e,t){return function(o){n(t),t.querySelector(".popup__button").addEventListener("click",(function(){(function(e){return fetch("".concat(c.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка:".concat(e.status))})).catch((function(e){console.log(e)}))})(e).then((function(){o.target.closest(".card").remove(),r(t)}))}))}}function l(e){return function(t){t.target.classList.contains("card__like-button_is-active")?function(e){return fetch("".concat(c.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка:".concat(e.status))})).catch((function(e){console.log(e)}))}(e).then((function(e){t.target.classList.remove("card__like-button_is-active"),t.target.closest(".card").querySelector(".card__like-number").textContent=e.likes.length})):function(e){return fetch("".concat(c.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка:".concat(e.status))})).catch((function(e){console.log(e)}))}(e).then((function(e){t.target.classList.add("card__like-button_is-active"),t.target.closest(".card").querySelector(".card__like-number").textContent=e.likes.length}))}}function p(e,t,n){var r=e.querySelector(".".concat(t.name,"_error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}function d(e,t){e.querySelectorAll(t.inputSelector).forEach((function(n){p(e,n,t)}))}function _(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(s)throw o}}return u}}(e,t)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var m,v,y=document.querySelector(".places__list"),h=document.querySelector(".profile__add-button"),b=document.querySelector(".profile__edit-button"),S=document.querySelector(".popup_type_new-card"),g=document.querySelector(".popup_type_edit"),k=document.querySelector(".popup_type_update_avatar"),C=document.querySelector(".popup_type_image"),q=document.forms["edit-profile"],E=document.forms["edit-avatar"],L=q.name,j=q.description,x=document.querySelector(".profile__title"),P=document.querySelector(".profile__description"),A=document.querySelector(".profile__image"),U=document.querySelector(".profile__image_hover"),w=document.forms["new-place"],B=w["place-name"],T=w.link,O=E.avatar,D=document.querySelector(".popup_type_card-remove");a().then((function(e){x.textContent=e.name,P.textContent=e.about,A.style.backgroundImage="url(".concat(e.avatar,")")})),m=a(),v=fetch("".concat(c.baseUrl,"/cards"),{headers:c.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка:".concat(e.status))})).catch((function(e){console.log(e)})),Promise.all([m,v]).then((function(e){var t=_(e,2),n=t[0];t[1].forEach((function(e){y.append(i(e,s(e._id,D),l(e._id),M,n._id))}))}));var I,M=function(e){var t=C.querySelector(".popup__image");t.src=e.target.src,t.alt=e.target.alt,C.querySelector(".popup__caption").textContent=e.target.alt,n(C)};h.addEventListener("click",(function(){d(w,{inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"}),n(S)})),U.addEventListener("click",(function(){d(w,{inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"}),n(k)})),b.addEventListener("click",(function(){d(q,{inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"}),L.value=x.textContent,j.value=P.textContent,n(g)})),o(S),o(g),o(C),o(D),o(k),q.addEventListener("submit",(function(e){e.preventDefault();var t=e.target.querySelector(".popup__button");t.textContent="Сохранение...",x.textContent=L.value,P.textContent=j.value,function(e){return fetch("".concat(c.baseUrl,"/users/me"),{method:"PATCH",headers:c.headers,body:JSON.stringify(e)}).then((function(e){return e.ok?e.json():(console.log(e),Promise.reject("Ошибка:".concat(e.status)))})).catch((function(e){console.log(e)}))}({name:L.value,about:j.value}).finally((function(){t.textContent="Сохранить"})),r(g)})),w.addEventListener("submit",(function(e){var t;e.preventDefault(),Promise.all([(t={name:B.value,link:T.value},fetch("".concat(c.baseUrl,"/cards"),{method:"POST",headers:c.headers,body:JSON.stringify(t)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка:".concat(e.status))})).catch((function(e){console.log(e)}))),a()]).then((function(e){var t=_(e,2),n=t[0],o=t[1];y.prepend(i(n,s(n._id,D),l(n._id),M,o._id)),w.reset(),r(S)}))})),E.addEventListener("submit",(function(e){var t;e.preventDefault(),(t={avatar:O.value},fetch("".concat(c.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:c.headers,body:JSON.stringify(t)}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка:".concat(e.status))})).catch((function(e){console.log(e)}))).then((function(){A.style.backgroundImage="url(".concat(O.value,")")})).finally((function(){r(k)}))})),I={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},document.querySelectorAll(I.formSelector).forEach((function(e){e.querySelectorAll(I.inputSelector).forEach((function(t){t.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?p(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.name,"_error"));t.classList.add(r.inputErrorClass),o.classList.add(r.errorClass),o.textContent=n}(e,t,t.validationMessage,n)}(e,t,I)}))}))}))})();