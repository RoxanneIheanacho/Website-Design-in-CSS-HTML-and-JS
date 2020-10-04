
function addListener(obj, type, fn) {
	if (obj.addEventListener) obj.addEventListener(type,fn,false);
	else obj.attachEvent("on"+type,fn);
} 
function removeListener(obj, type, fn) {
	if (obj.removeEventListener) obj.removeEventListener(type,fn,false);
	else obj.detachEvent("on"+type,fn);
} 
