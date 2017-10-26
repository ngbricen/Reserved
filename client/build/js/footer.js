// window.addEventListener("resize", function() {
// 	var height = $(window).height();
// 	console.log(height);
// 	$(".mainContainer").css({ "height": height-70 });
// });

// var addEvent = function(object, type, callback) {
//     if (object == null || typeof(object) == 'undefined') return;
//     if (object.addEventListener) {
//         object.addEventListener(type, callback, false);
//     } else if (object.attachEvent) {
//         object.attachEvent("on" + type, callback);
//     } else {
//         object["on"+type] = callback;
//     }
// };

// addEvent(window, "resize", function(event) {
// 	console.log("window height:" + height)
// 	$(this).children($(".mainContainer")).css({ "height": height-70 });
// })