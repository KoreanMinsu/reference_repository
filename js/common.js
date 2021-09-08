$(document).ready(function(){
	//GNB 메뉴 롤오버
	$(".main_gnb>li").mouseover(function(){
		$("#all_gnb").slideDown(350);
		$("#all_gnb").addClass("hover");
		$(".main_gnb>li").removeClass("on");
		$(".depth1menu>li").removeClass("on").removeClass("current_l");
		$(this).addClass("on");
		var nowID = $(this).attr("class").substr(0,5);
		$('.depth1menu>li.'+nowID).each(function() {
			$(this).addClass("on");
			$(this).prev('li').addClass("current_l");
		});
	});

	//GNB 서브 메뉴 롤오버
	$('.depth1menu>li').delegate('ul', 'mouseover focus', function() {
		$(".main_gnb>li").removeClass("on");
		var nowID = $(this).parent().attr("class").substr(0,5);

		$('.main_gnb>li.'+nowID).each(function() {
			$(this).addClass("on");
		});
		$('.depth1menu>li').removeClass("on");
		$(this).parent().addClass("on");
	});
	$('.gnb_depth02>li').delegate('a', 'mouseover focus', function() {
		$('.gnb_depth02>li').removeClass("on");
		$(this).parent('li').addClass("on");
	})
	//GNB 메뉴 아웃
	$('#all_gnb').mouseleave(function() {
		$(".main_gnb>li").removeClass("on");
		$('.main_gnb>li.current').addClass("on");
		$("#all_gnb").slideUp("fast");
		$("#all_gnb").removeClass("hover");
		$('.depth1menu>li').removeClass("on").removeClass("current_r");
		$('.depth1menu>li.current').each(function() {
			$(this).addClass("on");
		});
		$('.gnb_depth02>li').removeClass("on");
		$('.gnb_depth02>li.current').addClass("on");
	});
	/* 사이드메뉴 */
	$(".mDepth01>li>dl>dt").click(function() {
		var objA = $(this).next("dd");
		if(objA.css("display") != "none"){
			objA.prev('dt').removeClass("on");
			objA.hide();
		 } else {
			jQuery('.mDepth01>li>dl>dd').css('display','none');
			jQuery('.mDepth01>li>dl>dt').removeClass("on");
			objA.prev('dt').addClass("on");
			objA.slideDown();
		 }
	});
	// 사이드메뉴 닫기
	jQuery('.side_back').bind("touchend click", function(){
		sideMenu('off');
	});
	//1080px 이하일경우 모바일 메뉴 자동으로 닫기
	$(window).resize(function(){
		var winW = $(window).width();
		if (winW > 1080)
		{
			sideMenu('off');
			jQuery('#m_search').hide();
		}  else {
			$(".main_gnb>li").removeClass("on");
			$('.main_gnb>li.current').each(function() {
				$(this).addClass("on");
			});
			$("#all_gnb").hide();
			$("#all_gnb").removeClass("hover");
			$('.depth1menu>li').removeClass("on");
			$('.depth1menu>li.current').each(function() {
				$(this).addClass("on");
			});
			$('.gnb_depth02>li').removeClass("on");
			$('.gnb_depth02>li.current').addClass("on");
		}
	})
});

$(window).bind('orientationchange', function(e) {
	if(jQuery('#sideMenu').css("left")=="0px"){

		var clientHeight = parseInt(screen.height);
		setTimeout(scrollTo, 0, 0, 1);
		jQuery('#sideMenu').show();
		jQuery('#sideMenu').css({"left":"0", "height":clientHeight + 'px'});
		jQuery('html, body, #wrapper').css({
			'overflow-y':'hidden',
			'height': '100%'
        });
		jQuery('.side_back').height(clientHeight + 'px');
		return false
	}
});

function mSearch(key) {
	if(key=="on") {
		sideMenu('off');

		var clientHeight = parseInt(screen.height);
		setTimeout(scrollTo, 0, 0, 1);
		jQuery('#m_search').show();
		jQuery('html, body, #wrapper').css({
			'overflow-y':'hidden',
			'height': '100%'
        });
		jQuery('.search_back').height(clientHeight + 'px').fadeIn();

		return false
	} else {
		jQuery('#m_search .keyword').val('');
		jQuery('#m_search').hide();
		jQuery('body, #wrapper').css({
			'height': 'auto'
        });
		jQuery('html').css({
			'overflow-y':'scroll',
			'height': 'auto'
        });
		jQuery('.search_back').fadeOut();
		return false
	}
}
function sideMenu(key) {
	if(key=="on") {
		jQuery('#m_search').hide();
		jQuery('.mDepth01>li>dl>dd').css('display','none');
		jQuery('.mDepth01>li>dl>dt').removeClass("on");
		$(".mDepth01>li.current").each(function() {
			$(this).addClass("on");
			$(this).children('dl').children('dt').addClass("on");
			$(this).children('dl').children('dd').show();
		});

		var clientHeight = parseInt(screen.height);
		setTimeout(scrollTo, 0, 0, 1);
		jQuery('#sideMenu').show();
		jQuery('#sideMenu').css({"left":"0", "height":clientHeight + 'px'});
		jQuery('html, body, #wrapper').css({
			'overflow-y':'hidden',
			'height': '100%'
        });
		jQuery('.side_back').height(clientHeight + 'px').fadeIn();

		return false
	} else {
		jQuery('#sideMenu').css("left","-87%");
		jQuery('body, #wrapper').css({
			'height': 'auto'
        });
		jQuery('html').css({
			'overflow-y':'scroll',
			'height': 'auto'
        });
		jQuery('.side_back').fadeOut();
		return false
	}
}
 // 레이어 팝업
function onLayerPop(layerId, seq, lang) {
	//alert(layerId);
	if (layerId == 'offLayer'){
		$(".pop_layer").hide();
	} else {
		var h = $("#"+layerId).height();
		if(document.body.scrollHeight <= document.body.Height){
			var allHeight = document.body.Height;
		} else {
			var allHeight = document.body.scrollHeight;
		}

		//문의사항 공통 레이어팝업
		if (layerId == 'popQnaEtc') {
			
			// 영어 타이틀 입력
			if (lang == 'eng') {
				
				if (seq == '3') 		$("#etc_title").text('Submission');
				else if (seq == '4') 	$("#etc_title").text('공모전 문의 (영어)');
				else if (seq == '5') 	$("#etc_title").text('채용 문의 (영어)');
				else if (seq == '7') 	$("#etc_title").text('기타 문의 (영어)');
			} 
			// 프랑스어 타이틀 입력
			else if (lang == 'fra') {
				
				if (seq == '3') 		$("#etc_title").text('Submission');
				else if (seq == '4') 	$("#etc_title").text('공모전 문의 (프랑스어)');
				else if (seq == '5') 	$("#etc_title").text('채용 문의 (프랑스어)');
				else if (seq == '7') 	$("#etc_title").text('기타 문의 (프랑스어)');
			} 
			// 독일어 타이틀 입력
			else if (lang == 'ger') {
				
				if (seq == '3') 		$("#etc_title").text('Submission');
				else if (seq == '4') 	$("#etc_title").text('공모전 문의 (독일어)');
				else if (seq == '5') 	$("#etc_title").text('채용 문의 (독일어)');
				else if (seq == '7') 	$("#etc_title").text('기타 문의 (독일어)');
			} 
			// 기본 타이틀 입력 (한글)
			else {
				if (seq == '3') 		$("#etc_title").text('게임 아이디어 제안 및 공모전 문의');
				else if (seq == '4') 	$("#etc_title").text('공모전 문의');
				else if (seq == '5') 	$("#etc_title").text('채용 문의');
				else if (seq == '7') 	$("#etc_title").text('잡지 문의');
				else if (seq == '9')	$("#etc_title").text('이벤트 문의');
			}
			
			$("#inq_class").val(seq);
		}
		
		if (layerId == 'popQnaTie-up') {
			// 영문 타이틀 입력
			if (lang == 'eng') {
				if (seq == '6'){ $("#Tie_title").text('마케팅 제휴 문의 (영어)'); }
			} else if (lang == 'fra') {
				if (seq == '6'){ $("#Tie_title").text('마케팅 제휴 문의 (프랑스어)'); }
			} else if (lang == 'ger') {
				if (seq == '6'){ $("#Tie_title").text('마케팅 제휴 문의 (독일어)'); }
			} else {
				// 기본 타이틀 입력 (한글)
				if (seq == '6'){ $("#Tie_title").text('마케팅 제휴 문의'); }
			}
			$("#inq_class_tie").val(seq);
		}

		if (layerId == 'popQnaTie-ws') {
			if (lang == 'eng' && seq == '2') {
				$("#Tie_title").text('도매 문의 (영어)');
			} else if (lang == 'fra' && seq == '2') {
				$("#Tie_title").text('도매 문의 (프랑스어)');
			} else if (lang == 'ger' && seq == '2') {
				$("#Tie_title").text('도매 문의 (독일어)');
			} else {
				// 기본 타이틀 입력 (한글)
				$("#Tie_title").text('도매 문의');
			}
			$("#inq_class_tie").val(seq);
		}
		$(".pop_layer").hide();
		$(".pop_layer_back").css("height",allHeight).show(); //스크롤때문에 전체 height값을 구해 배경에 직접height값 적용
		$("#"+layerId).show();
		$("#"+layerId+">.popContainer").show();

		if (layerId == 'popQnaAS') {
			$("#"+layerId+">.popContainer").css('max-height', $(window).height() - 60 + 'px');
			$("#"+layerId+">.popContainer").css('overflow', 'scroll');
			$("#"+layerId+">.popContainer").css('overflow-x', 'hidden');
			
		}
		
		// jbh 추가 - 팝업위치 조정
		if ( $(document).scrollTop() + 50 + $("#"+layerId+">.popContainer").height() > $('body').height() ) {
			$("#"+layerId+">.popContainer").css('top', $('body').height() - $("#"+layerId+">.popContainer").height() - 50 );
		} else {
			$("#"+layerId+">.popContainer").css('top', $(document).scrollTop() + 50 );
		}
		
		return;
		//$('html, body').animate( { scrollTop : 0 }, 500 );
	}
	return;
}


 // 레이어 팝업
function onLayerPop02(layerId, seq) {
	//alert(layerId);
	if (layerId == 'offLayer'){
		$(".pop_layer").hide();
	} else {
		var h = $("#"+layerId).height();
	//	$(".pop_layer_back").hide();
		if(document.body.scrollHeight <= document.body.Height){
			var allHeight = document.body.Height;
		} else {
			var allHeight = document.body.scrollHeight;
		}

		$(".pop_layer").hide();
		$(".pop_layer_back").css("height",allHeight).show(); //스크롤때문에 전체 height값을 구해 배경에 직접height값 적용
		$("#"+layerId).show();
		$("#"+layerId+">.popContainer").show();

	}
}

function showLayer( obj ) {
	 $('#' + obj).slideToggle("fast", function () {
		 if($(this).css("display") == 'block') {
			 $("img#arDown").attr("src","/mobile/img/arrow_up.png");
		 }
		 else {
			 $("img#arDown").attr("src","/mobile/img/arrow_down.png");
		 }
	 });
}

function changeMyTab(opt) {
	$('#myTab1').hide();
	$('#myTab2').hide();
	$('#myTab3').hide();
	$('#myTab4').hide();
	$('#myTab5').hide();
	$('#myTab6').hide();
	$('#myTab7').hide();
	$('#myTab8').hide();
	$('#myTab' + opt).show();
}