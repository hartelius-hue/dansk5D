/* 5.D: juleuniverset er aktivt til og med 28. december 2026 i dansk tid. */
(function(){
"use strict";
const START="2026-11-26", END="2026-12-29";
const localDay=(date=new Date())=>new Intl.DateTimeFormat("sv-SE",{
 timeZone:"Europe/Copenhagen",year:"numeric",month:"2-digit",day:"2-digit"
}).format(date);
const isOpen=(date=new Date())=>{const day=localDay(date);return day>=START&&day<END};
window.JUL5D_SEASON=Object.freeze({start:START,close:END,localDay,isOpen});
})();