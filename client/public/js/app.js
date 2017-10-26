$(document).ready(function() {

	window.addEventListener("resize", function() {
		$(".mainContainer").css({ "min-height": $(window).height()-70 });
	});

	$(".mainContainer").css({ "min-height": $(window).height()-70 });


	$(".meetTeam").css({"height": "0px", "overflow": "hidden"});
	$(".personBody").css({"height": "0px", "overflow": "hidden", "padding-top": "0px", "padding-bottom": "0px"});

	$("#loginModal").hide();

	(function($) { //a function for creating a click toggle
	    $.fn.clickToggle = function(func1, func2) {
	        var funcs = [func1, func2];
	        this.data('toggleclicked', 0);
	        this.click(function() {
	            var data = $(this).data();
	            var tc = data.toggleclicked;
	            $.proxy(funcs[tc], this)();
	            data.toggleclicked = (tc + 1) % 2;
	        });
	        return this;
	    };
	}(jQuery));

	$('.meetTeamLink').clickToggle(function() { //click toggle for showing recipe list
	    $('.meetTeam').animate({
    		height: $('.meetTeam').get(0).scrollHeight
		}, 1000, function(){
    		$(this).height('auto');
		});
	},
	function() {
	    $(".meetTeam").animate({
	        height: 0
	    }, 1000);
	});

	$('.personHeader').clickToggle(function() { //click toggle for showing recipe list
	    $(this).next($('.personBody')).animate({
	    	"padding-top": "10px",
	    	"padding-bottom": "6px",
    		height: $(this).next($('.personBody')).get(0).scrollHeight
		}, 500, function(){
    		$(this).height('auto');
		});
	},
	function() {
	    $(this).next($('.personBody')).animate({
	    	"padding-top": 0,
	    	"padding-bottom": 0,
	        height: 0
	    }, 500);
	});

});