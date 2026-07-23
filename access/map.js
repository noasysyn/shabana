function initialize() {
var latlng = new google.maps.LatLng(34.72279876834135, 135.43271139264107);
var myOptions = {
zoom: 15, 
center: latlng,
mapTypeId: google.maps.MapTypeId.ROADMAP
};

var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

var marker = new google.maps.Marker({
position: new google.maps.LatLng(34.72279876834135, 135.43271139264107),
map: map, 
title: "map"
});
}


if(window.addEventListener) {
window.addEventListener("load", initialize, false);
}
else if(window.attachEvent) {
window.attachEvent("onload", initialize);
}