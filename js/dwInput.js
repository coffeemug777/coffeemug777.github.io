jQuery.noConflict();
( function($) {

	$(document).ready(function() {
		//masker
		var e = "admin"; // replace with your email username
		var atSign = "@"; // replace with your email username
		var t = "pwibowo"; // replace with your email provider
		var n = ".com"; // replace with your email provider TLD
		var r =  e + atSign + t + n;
		$('.hide-email').attr('href','mailto:' + r).html(r);
		
		var delayTime = 100;
	
		//toggle menu mobile
		$('#menu-toggle').click(function (e) {
			$('#menu').slideToggle( "slow");
			e.preventDefault();
		});

		$('#menu-toggle2').click(function (e) {
			$('#menu2').slideToggle( "slow");
			e.preventDefault();
		});
		
		//toggle menu mobile
		$('#searchLoupe').click(function (e) {
			$('#searchForm').slideToggle( "slow");
			e.preventDefault();
		});			
	
		$('.hasChild').mouseenter(function (e) {
			$(this).children('div.dropContainer').stop().slideDown(delayTime);
		});
		
		$('.hasChild').mouseleave(function () {
			$(this).children('div.dropContainer').stop().slideUp(delayTime);
		});		

		$('a').click(function(){
			if ($('[name="' + $.attr(this, 'href').substr(1) + '"]').length) {
			    $('html, body').animate({
			        scrollTop: $('[name="' + $.attr(this, 'href').substr(1) + '"]').offset().top-65
			    }, 500);
			    return false;
			}
		});		
	});

	$(window).on('scroll',function() {
			var scrolltop = $(this).scrollTop();
			var fromTop = 100;
			if(scrolltop >= fromTop) {
			  $('#wrapper1Hidden').fadeIn(250);
			}
			 
			else if(scrolltop <= fromTop - 100) {
			  $('#wrapper1Hidden').fadeOut(250);
			}
	});

	$(window).scroll(function() {
	    if ($(this).scrollTop()) {
	        $('#autohidebacktotop:hidden').stop(true, true).fadeIn();
	    } else {
	        $('#autohidebacktotop').stop(true, true).fadeOut();
	    }
	});	

} ) ( jQuery );