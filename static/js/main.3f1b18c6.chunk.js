(this["webpackJsonporigo-bysykkel"]=this["webpackJsonporigo-bysykkel"]||[]).push([[0],{26:function(e,t,a){e.exports=a(42)},31:function(e,t,a){},37:function(e,t,a){},39:function(e,t,a){},40:function(e,t,a){},42:function(e,t,a){"use strict";a.r(t);var n,r=a(0),l=a.n(r),o=a(9),s=a.n(o),i=(a(31),a(6)),c=a(24),A=(a(37),a(3)),m=a.n(A),u=a(1),I=a(2);!function(e){e.INITIALIZING="INITIALIZING",e.SUCCESS="SUCCESS",e.FAILURE="FAILURE"}(n||(n={}));var d=a(7),b=a.n(d),E=a(14),g=function(){var e=Object(E.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch(t.replace("http://","https://"),{headers:new Headers({"Client-Identifier":"vidarramdal-origo-oppgave"})}));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),v=function(){var e=Object(E.a)(b.a.mark((function e(t){return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",g(t).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();function f(e,t){var a=e.data.nb.feeds.find((function(e){return e.name===t}));if(!a)throw new Error("Har ikke URL til feed: "+t);return a.url}var p,C,h,O="AUTODISCOVERY_COMPLETE",N={urls:{stationInfo:void 0,stationStatus:void 0},lastUpdated:(p={},Object(I.a)(p,O,-1),Object(I.a)(p,"STATION_INFORMATION_FETCHED",-1),Object(I.a)(p,"STATION_STATUS_FETCHED",-1),p),ttl:(C={},Object(I.a)(C,O,1/0),Object(I.a)(C,"STATION_INFORMATION_FETCHED",60),Object(I.a)(C,"STATION_STATUS_FETCHED",20),C),fetchStates:(h={},Object(I.a)(h,O,n.INITIALIZING),Object(I.a)(h,"STATION_INFORMATION_FETCHED",n.INITIALIZING),Object(I.a)(h,"STATION_STATUS_FETCHED",n.INITIALIZING),h),fetchState:n.INITIALIZING,stationInfo:void 0,stationStatus:void 0};function y(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:N,t=arguments.length>1?arguments[1]:void 0;if("FETCH_FAILED"===t.type){var a=Object(u.a)(Object(u.a)({},e.fetchStates),{},Object(I.a)({},t.actionName,n.FAILURE));return Object(u.a)(Object(u.a)({},e),{},{fetchState:n.FAILURE,fetchStates:a})}if(!t.payload||e.lastUpdated[t.type]>=t.payload.last_updated)return e;var r=Object(u.a)(Object(u.a)({},e.lastUpdated),{},Object(I.a)({},t.type,t.payload.last_updated)),l=Object(u.a)(Object(u.a)({},e.ttl),{},Object(I.a)({},t.type,t.payload.ttl)),o=Object(u.a)(Object(u.a)({},e.fetchStates),{},Object(I.a)({},t.type,n.SUCCESS)),s=o.STATION_STATUS_FETCHED===n.SUCCESS&&o.STATION_INFORMATION_FETCHED===n.SUCCESS&&o[O]===n.SUCCESS&&n.SUCCESS||(o.STATION_STATUS_FETCHED===n.FAILURE||o.STATION_INFORMATION_FETCHED===n.FAILURE||o[O]===n.FAILURE)&&n.FAILURE||n.INITIALIZING,i=Object(u.a)(Object(u.a)({},e),{},{lastUpdated:r,fetchState:s,ttl:l,fetchStates:o});switch(t.type){case O:return Object(u.a)(Object(u.a)({},i),{},{urls:{stationInfo:f(t.payload,"station_information"),stationStatus:f(t.payload,"station_status")}});case"STATION_INFORMATION_FETCHED":return Object(u.a)(Object(u.a)({},i),{},{stationInfo:t.payload.data.stations.sort((function(e,t){return e.name<t.name?-1:1}))});case"STATION_STATUS_FETCHED":return Object(u.a)(Object(u.a)({},i),{},{stationStatus:t.payload.data.stations});default:return e}}var T=function(e){return function(t,a){var n="STATION_INFORMATION_FETCHED"===e?"stationInfo":"stationStatus",r=a().urls[n];return r?v(r).then((function(a){t({type:e,payload:a}),t(k(e))})).catch((function(a){console.error("Error fetching ".concat(n," from ").concat(r),a),t({type:"FETCH_FAILED",actionName:e}),t(k(e))})):t({type:"NO_OP"})}};function k(e){return function(t,a){var n=a().ttl[e];n<1/0&&setTimeout((function(){t(T(e))}),1e3*n)}}var S,j=function(e){return l.a.createElement("div",{role:"table",className:m()(e.className)},e.children)},D=function(e){return l.a.createElement("div",{role:"cell",className:e.className},e.children)},R=function(e){return l.a.createElement("div",{className:m()("row",e.className),role:"row"},e.children)},G=function(e){return l.a.createElement("div",{className:e.className,role:"rowgroup"},e.children)},Z=function(e){return l.a.createElement("div",{className:m()(e.className),role:"columnheader"},e.children)},F=function(e){var t=e.station;return l.a.createElement(R,null,l.a.createElement(D,null,t.stationName),l.a.createElement(D,{className:m()({disabled:!t.isReturning,exhausted:0===t.numLocks})},t.numLocks),l.a.createElement(D,{className:m()({disabled:!t.isRenting,exhausted:0===t.numBikes})},t.numBikes))},L=function(e){var t;return l.a.createElement(j,{className:m()("station-table",{disabled:e.fetchState===n.FAILURE})},l.a.createElement(R,{className:"station-table__header"},l.a.createElement(Z,null,"Stasjon"),l.a.createElement(Z,null,"Antall l\xe5ser"),l.a.createElement(Z,null,"Antall sykler")),l.a.createElement(G,{className:"station-table__body"},null===(t=e.stations)||void 0===t?void 0:t.map((function(e){return l.a.createElement(F,{key:e.stationId,station:e})}))))},M=a(15),w=a(19),U=a(20),W=a(25),H=a(23),z=a(5),P=a.n(z),J=(a(39),a(8)),B=a.n(J);!function(e){e.WORLD="WORLD",e.MEDIUM="MEDIUM",e.DETAIL="DETAIL"}(S||(S={}));var Y=function(e){var t=e.station,a=e.refObject,n=e.zoomCategory,r=e.markerClickHandler;return l.a.createElement("div",{ref:a},l.a.createElement("div",{className:m()("station-marker","zoom-".concat(n),{"has-bikes-available":t.numBikes&&t.numBikes>0,"has-locks-available":t.numLocks&&t.numLocks>0}),onClick:function(){return r(t)},role:"tooltip"},l.a.createElement("img",{src:B.a,alt:"Oslo Bysykkel-logo",className:"oslobysykkel-logo"}),n===S.DETAIL&&l.a.createElement(l.a.Fragment,null,l.a.createElement("h2",null,t.stationName),l.a.createElement("p",null,"ID: ",t.stationId),t.stationName!==t.address&&l.a.createElement("address",null,t.address)),(n===S.DETAIL||n===S.MEDIUM)&&l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"bikes"},l.a.createElement("span",{role:"img","aria-label":"sykkel"},"\ud83d\udeb2")," ",t.numBikes),l.a.createElement("div",{className:"locks"},l.a.createElement("span",{role:"img","aria-label":"sykkel"},"\ud83d\udd12")," ",t.numLocks))))},x=function(){return l.a.createElement("div",{className:"legend",role:"list"},l.a.createElement("div",{role:"listitem"},l.a.createElement("img",{src:B.a,alt:"Oslo Bysykkel-logo",className:"oslobysykkel-logo bike-and-lock-available"}),l.a.createElement("span",null,"Sykkel og l\xe5s ledig")),l.a.createElement("div",null,l.a.createElement("img",{src:B.a,alt:"Oslo Bysykkel-logo",className:"oslobysykkel-logo bike-no-lock-available"}),l.a.createElement("span",null,"Ingen l\xe5s ledig")),l.a.createElement("div",null,l.a.createElement("img",{src:B.a,alt:"Oslo Bysykkel-logo",className:"oslobysykkel-logo lock-no-bike-available"}),l.a.createElement("span",null,"Ingen sykkel ledig")))},V=function(e){Object(W.a)(a,e);var t=Object(H.a)(a);function a(e){var n;Object(w.a)(this,a),(n=t.call(this,e)).mapContainerRef=l.a.createRef(),n.map=void 0,n.markers=new Map,n.markerRefs=new Map,P.a.accessToken="pk.eyJ1IjoidnJhbWRhbCIsImEiOiJjaXVmNW5qMncwMDE1MnlwcmN1MnJkMzQ4In0.4_QLMQFAPRz_vfwn5m76vQ",n.state={center:{lng:10.7303766,lat:59.9108469},zoom:15};var r,o=Object(M.a)(e.stations);try{for(o.s();!(r=o.n()).done;){var s=r.value.stationId,i=l.a.createRef();n.markerRefs.set(s,i)}}catch(c){o.e(c)}finally{o.f()}return n}return Object(U.a)(a,[{key:"componentDidMount",value:function(){var e=this;if(this.mapContainerRef.current){this.map=new P.a.Map({container:this.mapContainerRef.current,style:"mapbox://styles/mapbox/streets-v11",center:[this.state.center.lng,this.state.center.lat],zoom:this.state.zoom}),this.map.addControl(new P.a.NavigationControl);var t=new P.a.GeolocateControl({positionOptions:{enableHighAccuracy:!0},showAccuracyCircle:!1,fitBoundsOptions:{maxZoom:18},trackUserLocation:!0});this.map.addControl(t),this.map.on("zoomend",(function(){var t,a=(null===(t=e.map)||void 0===t?void 0:t.getZoom())||15;e.setState({zoom:a})})),this.map.on("load",(function(){t.trigger()})),this.createMarkers(this.props.stations,this.map)}}},{key:"createMarkers",value:function(e,t){var a,n=Object(M.a)(e);try{for(n.s();!(a=n.n()).done;){var r=a.value,l=r.stationId,o=this.markerRefs.get(l);if(o){var s=new P.a.Marker({element:o.current||void 0});s.setLngLat([r.lon,r.lat]),this.markers.set(l,s),s.addTo(t)}}}catch(i){n.e(i)}finally{n.f()}}},{key:"zoomToStation",value:function(e){var t;null===(t=this.map)||void 0===t||t.easeTo({center:{lat:e.lat,lng:e.lon},animate:!0,zoom:19})}},{key:"render",value:function(){var e,t=this,a=(e=this.state.zoom)>18?S.DETAIL:e>14?S.MEDIUM:S.WORLD,n=this.props.stations.map((function(e){return l.a.createElement(Y,{station:e,key:e.stationId,refObject:t.markerRefs.get(e.stationId),zoomCategory:a,markerClickHandler:function(e){return t.zoomToStation(e)}})}));return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{ref:this.mapContainerRef,className:"mapContainer","data-testid":"mapContainer",role:"application"},n),l.a.createElement(x,null))}}]),a}(l.a.Component);V.defaultProps={stations:[]};a(40);function X(e){var t=e.activeId,a=e.switchTab,n=e.tabs;return l.a.createElement("div",{className:"tab-bar"},Array.from(n.keys()).map((function(e){return l.a.createElement("button",{role:"tab",key:e,disabled:e===t,type:"button",onClick:function(){return a(e)}},n.get(e))})))}var K=function(e){var t,a,r;switch(e.fetchState){case n.INITIALIZING:t="loading-indicator",a="Vent litt, henter data ...";break;case n.FAILURE:t="failure-indicator",a="Beklager, det oppsto en feil",r="alert";break;default:t="success-indicator"}var o=m()("state-indicator",t);return l.a.createElement("div",{"data-testid":t,className:o,role:r},a)},Q=new Map([["map","Map"],["list","List"]]),_=function(e){switch(e.tabId){case"map":return l.a.createElement(V,{stations:e.stations,fetchState:e.fetchState});case"list":return l.a.createElement(L,{stations:e.stations,fetchState:e.fetchState});default:throw new Error("Invalid tab id: "+e.tabId)}},q=Object(i.b)((function(e){var t;return{fetchState:e.fetchState,stations:null===(t=e.stationInfo)||void 0===t?void 0:t.map((function(t){var a,n=null===(a=e.stationStatus)||void 0===a?void 0:a.find((function(e){return e.station_id===t.station_id}));return{stationId:t.station_id,stationName:t.name,isRenting:1===(null===n||void 0===n?void 0:n.is_renting)||!1,isReturning:1===(null===n||void 0===n?void 0:n.is_returning)||!1,numBikes:null===n||void 0===n?void 0:n.num_bikes_available,numLocks:null===n||void 0===n?void 0:n.num_docks_available,lat:t.lat,lon:t.lon,address:t.address}}))}}))((function(e){var t=Object(i.c)();Object(r.useEffect)((function(){t((function(e){return v("https://gbfs.urbansharing.com/oslobysykkel.no/gbfs.json").then((function(t){e({type:O,payload:t}),e(T("STATION_INFORMATION_FETCHED")),e(T("STATION_STATUS_FETCHED"))})).catch((function(t){console.error("Error doing autodiscovery",t),e({type:"FETCH_FAILED",actionName:O})}))}))}),[t]);var a,n,o,s=(a="tab",n=window.location,o="map",[new URLSearchParams(n.search).get(a)||o,function(e){var t=new URL(n.href);t.searchParams.set(a,e),n.href=t.href}]),A=Object(c.a)(s,2),m=A[0],u=A[1];return l.a.createElement(l.a.Fragment,null,l.a.createElement(K,{fetchState:e.fetchState}),l.a.createElement(X,{tabs:Q,activeId:m,switchTab:u}),e.stations&&l.a.createElement(_,{fetchState:e.fetchState,tabId:m,stations:e.stations}))})),$=a(21),ee=a(4),te=a(22),ae=[$.a],ne=function(){return l.a.createElement(l.a.StrictMode,null,l.a.createElement(i.a,{store:Object(ee.createStore)(y,Object(te.composeWithDevTools)(ee.applyMiddleware.apply(void 0,ae)))},l.a.createElement(q,null)))};a(41);s.a.render(l.a.createElement(ne,null),document.getElementById("root"))},8:function(e,t){e.exports="data:image/png;base64,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"}},[[26,1,2]]]);
//# sourceMappingURL=main.3f1b18c6.chunk.js.map