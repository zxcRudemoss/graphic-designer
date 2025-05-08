$(document).ready(function() {
	var utm_source = getUrlParameter('utm_source');
	var utm_medium = getUrlParameter('utm_medium');
	var utm_term = getUrlParameter('utm_term');
	var utm_campaign = getUrlParameter('utm_campaign');
	var utm_content = getUrlParameter('utm_content');
	$('input[name=utm_source]').val(utm_source);
	$('input[name=utm_medium]').val(utm_medium);
	$('input[name=utm_term]').val(utm_term);
	$('input[name=utm_campaign]').val(utm_campaign);
	$('input[name=utm_content]').val(utm_content);
	$('input[name=custom_referer]').val(window.location.href);

	// AOS.init();
});


$(window).load(function() {
	$("input[name=name]").val(getCookie("name"));
	$("input[name=email]").val(getCookie("email"));
	$("input[name=phone]").val(getCookie("phone"));
	$('.input').each(function () {
		if ($(this).val() != '') {
			$(this).closest('.input__wrap').addClass('focused');
		}
	});
});



var lazyLoadInstance = new LazyLoad({
	// Your custom settings go here
});

$('.logos__items').on('init', function (event, slick) {
	lazyLoadInstance.update();
});



$.getJSON('https://ipapi.co/json/?key=e4192db949f63bdb4a84f9d73bf5cafa9921a6a5', function (obj) {
	if(getCookie("phone")){
		$('input.phone').val(getCookie("phone"));
	}
	else {
		$('input.phone').val(obj.country_calling_code);
	}
	$("input.phone").intlTelInput({
		utilsScript       : '/js/utils.js',
		defaultCountry    : 'auto',
		nationalMode      : false,
		initialCountry    : obj.country_code,
		preferredCountries: ['ua','kz']
	});

});

$('.input__wrap').on('focusin', function () {
	$(this).addClass('focused');
});

// UTM SCRIPTS //
// var utm ='?' + window.location.search.substr(1);
// $('.btn-utm').each(function(){
// 	var url = $(this).attr('href');
// 	$(this).attr('href', url + '?' + utm);
// });
// var tyurl = $('#checkrespo').val();
// $('#checkrespo, #emailexist').val(tyurl + utm);



$('form .subm').on('click', function(e){
  e.preventDefault();
  var form = $(this).closest('form');
  form.addClass('loading');
  setTimeout(function(){
    form.submit();
  }, 1000)
});



// SMOOTH SCROLL //

$('a[href*="#"]')
	.not('[href="#"]')
	.not('[href="#0"]')
	.not('[href*="modal"]')
	.click(function(event) {
		// On-page links
		$('.header').removeClass('active');
		if (
			location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
			&&
			location.hostname == this.hostname
		) {
			// Figure out element to scroll to
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			// Does a scroll target exist?
			if (target.length) {
				// Only prevent default if animation is actually gonna happen
				event.preventDefault();
				// var headerHeight = $('.header').height();
				var headerHeight =0;
				if($(window).width() < 760){
					headerHeight = 0;
				}
				$('html, body').animate({
					scrollTop: target.offset().top - headerHeight
				},
				{
					// Set the duration long enough to allow time
					// to lazy load the elements.
					duration: 1500,
					// At each animation step, check whether the target has moved.
					step: function( now, fx ) {
					// Where is the target now located on the page?
					// i.e. its location will change as images etc. are lazy loaded
					var newOffset = target.offset().top - headerHeight;
					// If where we were originally planning to scroll to is not
					// the same as the new offset (newOffset) then change where
					// the animation is scrolling to (fx.end).
					if(fx.end !== newOffset)
						fx.end = newOffset;
					}
				})
			}
		}
});

const partnersSlider = new Swiper('.ticker', {
	speed: 8000,
	spaceBetween: 80,
	loop: true,
	slidesPerView: 'auto',
	autoplay: {
		delay: 0,
		disableOnInteraction: false
	},
});


$('.logos__items').slick({
	variableWidth: true,
	arrows: false,
	autoplay: true,
	autoplaySpeed: 0,
	speed: 8000,
	cssEase: 'linear',
	pauseOnHover: true,
	swipeToSlide: true,
});

function sendGR(formid) {
	var output = false;
	form = $(formid);
	form.addClass('loading');
	form.find('input[name="name"]').focus();
	form.find('input[name="email"]').focus();
	form.find('input[name="phone"]').focus();
	form.find('button[type="submit"]').focus();

	let phone = form.find('input[name="phone"]').val();
	phone = phone.replace(/\s/g, '');

	let url = window.location.href;

	const formdata = {
		name: form.find('input[name=name]').val(),
		email: form.find('input[name=email]').val(),
		phone: phone,
		url: url,
		utm_source: form.find('input[name=utm_source]').val(),
		utm_medium: form.find('input[name=utm_medium]').val(),
		utm_term: form.find('input[name=utm_term]').val(),
		utm_campaign: form.find('input[name=utm_campaign]').val(),
		utm_content: form.find('input[name=utm_content]').val(),
	}

	if ($('.not_error').length >= 3){

		$.ajax({
			type: "POST",
			url: 'https://script.google.com/macros/s/AKfycby9gfdPEfxappzMRBWzw45cuJMDJCWbzLb9QEanXIev6t8JAEBQ6Qj8-t0RdFEY13YY/exec',
			async: false,
			data: formdata,
			success: function (data) {
				setCookie('name', formdata.name, 365);
				setCookie('email', formdata.email, 365);
				setCookie('phone', formdata.phone, 365);
				console.log('google spreadsheet success');
			}
		});

		if(typeof fbq !== "undefined"){
			fbq('track', 'Lead');
			console.log('fb-pixel-done');
		}
		else{
			console.log('fb-pixel-none!!!')
		}
		output = true;
	}
	else{
		form.find('input.error').first().focus();
		form.removeClass('loading');
	}
	return output;
};



// AUTO DATE
let newDate = new Date();
newDate.setDate(newDate.getDate() + 1);
let month = [
	'січня',
	'лютого',
	'березня',
	'квітня',
	'травня',
	'червня',
	'липня',
	'серпня',
	'вересня',
	'жовтня',
	'листопада',
	'грудня',
];

$('.cDate').text(`${newDate.getDate()} ${month[newDate.getMonth()]}`);