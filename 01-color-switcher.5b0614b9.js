!function(){var t={startChangeColorBtn:document.querySelector("[data-start]"),stopChangeColorBtn:document.querySelector("[data-stop]")},e=null;t.stopChangeColorBtn.setAttribute("disabled",!0);t.startChangeColorBtn.addEventListener("click",(function(){e=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16)),console.log("".concat(Date.now()," время вейчас через 1 секунду"))}),1e3),t.startChangeColorBtn.setAttribute("disabled",!0),t.stopChangeColorBtn.removeAttribute("disabled")})),t.stopChangeColorBtn.addEventListener("click",(function(){clearInterval(e),t.startChangeColorBtn.removeAttribute("disabled"),t.stopChangeColorBtn.setAttribute("disabled",!0)}))}();
//# sourceMappingURL=01-color-switcher.5b0614b9.js.map