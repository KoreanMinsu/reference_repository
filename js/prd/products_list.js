// 번역
var kgb_lang = [];
kgb_lang['게임인원'] = 'Player';
kgb_lang['대상연령'] = 'Age';
kgb_lang['게임시간'] = 'Time';
kgb_lang['출시년월'] = 'Published In';

var lang = "kr";

//페이지 변수
var pagemax = 5;

$(window).load(function () {
	//검색 탭
	get_searchTab();
});

var removeCommas = function(x){
    return x.toString().replace(/\,/g,'');
};

var nWithCommas = function(x) {
	var num = removeCommas(x);
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//체크박스 이벤트
$(document).on('click', ":checkbox, :radio", function(){
	get_products_list();
	document.location.hash = $("form#searchForm").serialize();
});

$(document).on('change', 'select[name="search_sort"]', function(){
	get_products_list();
	document.location.hash = $("form#searchForm").serialize();
});

//정렬순서 이벤트
$(document).on('click',".sort", function(){
	$(".sort a").removeClass('current');
	$(this).find('a').addClass('current');

	$("#search_sort").val($(this).data('value'));
	document.location.hash = $("form#searchForm").serialize();
	get_products_list($("#pagenum").val());
});

function change_page(num){
	get_products_list(num);
	document.location.hash = $("form#searchForm").serialize();
}

// 게임 목록 불러오기
function get_products_list(pagenum){
	
//	if (!pagenum) {
//		pagenum = 1;
//	} 
	
	if (!$("#pagenum").val() && !pagenum) {
		$("#pagenum").val(1);
	} else {
		if (pagenum) {
			$("#pagenum").val(pagenum);
		}
	}
	
	var url 		= "/_proc/get_products_list.php";
	var form_data 	= $("#searchForm").serialize();

	var txt_player = '게임인원';
	var txt_age = '대상연령';
	var txt_playing_time = '게임시간';
	var txt_Published_in = '출시년월';
	var txt_discontinue = '단종';
	var txt_price = "소비자가";
	var txt_price_v = "원";
	//if (/\_eng/.test(window.location.href )) {
	if ( /\_eng/.test(window.location.href )  || /\_fra/.test(window.location.href ) || /\_ger/.test(window.location.href )) {  //독일어 프랑스어도 영문으로 나오게 변경 by canondos 2018.07.03
		url = url + "?lang=eng";
		txt_player = 'Player';
		txt_age = 'Age';
		txt_playing_time = 'Time';
		txt_Published_in = 'Published In';
		txt_discontinue	 = 'Discontinue';
		txt_price = "price";
		txt_price_v = "";
		lang = "eng";
	}

	$.ajax({
		type 	: "POST",
        url		: url,
		data	: form_data,
        dataType: "JSON",
        success : function(data) {
			//console.log(data);
        	var html = "";
			//console.log($("#view_type").val());
        	if ($("#view_type").val() == 'bg') {
				
	        	$.each(data.rows, function (i, v) {
					if ( /\_eng/.test(window.location.href )  || /\_fra/.test(window.location.href ) || /\_ger/.test(window.location.href )) {
						var tprice = "<span style='font-weight:bold;color:#666666;'>&#65510;</span> "+nWithCommas(v.prd_retail_prc);
					} else {
						var tprice = nWithCommas(v.prd_retail_prc)+" "+txt_price_v;
					}
	        		html += '<li>';
					html +=	'	<div class="thum">';
					html += '		<a href="game_view.php?prd_idx=' + v.idx + '">'; 
					html += 			v.img;

					if (v.prds_discontinue == 'Y') {
						html += '<div class="over"><span class="close">'+txt_discontinue+'</span></div>';
					}
					
					html += '		</a>'
					html += '	</div>';
					html +=	'	<div class="desc">';
					html +=	'		<p class="title"><a href="game_view.php?prd_idx=' + v.idx + '">' + v.prd_name + '</a></p>';
					html +=	'		<table>';
					html +=	'			<tbody>';
					if(v.prd_retail_prc > 0){
						html +=	'				<tr>';
						html +=	'					<th scope="row"><img src="/images/main/ico_cost.png" alt="" />' + txt_price + '</th>';
						html +=	'					<td>' + tprice + '</td>';
						html +=	'				</tr>';
					}
					html +=	'				<tr>';
					html +=	'					<th scope="row"><img src="/images/main/best_icon01.gif" alt="" />' + txt_player + '</th>';
					html +=	'					<td>' + v.game_pers + '</td>';
					html +=	'				</tr>';
					html +=	'				<tr>';
					html +=	'					<th scope="row"><img src="/images/main/best_icon02.gif" alt="" />' + txt_age + '</th>';
					html +=	'					<td>' + v.game_age + '</td>';
					html +=	'				</tr>';
					html +=	'				<tr>';
					html +=	'					<th scope="row"><img src="/images/main/best_icon03.gif" alt="" />' + txt_playing_time + '</th>';
					if (v.game_time != null){
						html +=	'				<td>' + v.game_time+ '</td>';
					}
					html +=	'				</tr>';
					html +=	'			</tbody>';
					html +=	'		</table>';
					html +=	'	</div>';
					html +=	'</li>';
	        	});
        	}
        	else if ($("#view_type").val() == 'pg01'){

        		$.each(data.rows, function (i, v) {
	        		html += '<li>';
	        		html +=	'	<div class="thum">';
					html += '		<a href="publishing01_view01.php?prd_idx=' + v.idx + '">'; 
					html += 			v.img;
					if (v.prds_discontinue == 'Y') {
						html += '<div class="over"><span class="close">'+txt_discontinue+'</span></div>';
					}
					html += '		</a></div>';
					html += '	<dl>';
					html += '		<dt><a href="publishing01_view01.php?prd_idx=' + v.idx + '">' + v.prd_name + '</a></dt>';
					html += '		<dd class="game_info">';
					html += '			<ul>';
					html += '				<li><span class="icoImg"><img src="/images/boardgame/game_info_icon01.gif" alt="" /></span>'+txt_player+' : ' + v.game_pers + '</li>';
					html += '				<li><span class="icoImg"><img src="/images/boardgame/game_info_icon03.gif" alt="" /></span>'+txt_age+' : ' + v.game_age + '</li>';
					html += ' 				<li><span class="icoImg"><img src="/images/boardgame/game_info_icon02.gif" alt="" /></span>'+txt_playing_time+' : ' + v.game_time+ '</li>';
					html += '			</ul>';
					html += '		</dd>';

					if (lang == 'eng') {
						if (v.prds_info_eng != null) {
							html += '		<dd class="txt">' + v.prds_info_eng + '</dd>';
						}
					} else {
						if (v.prds_info != null) {
							html += '		<dd class="txt">' + v.prds_info + '</dd>';	
						}
					}
					
					html += '	</dl>';
					html += '</li>';
        		});
        	}
        	else if ($("#view_type").val() == 'pg02'){

        		$.each(data.rows, function (i, v) {
        			
        			html += '<li>';
					html +=	'	<div class="thum">';
					html += '		<a href="publishing01_view01.php?prd_idx=' + v.idx + '">'; 
					html += 			v.img;
					if (v.prds_discontinue == 'Y') {
						html += '<div class="over"><span class="close">'+txt_discontinue+'</span></div>';
					}
					html += '		</a></div>';
					html +=	'		<div class="desc">';
					html +=	'			<p class="title"><a href="publishing01_view01.php?prd_idx=' + v.idx + '">' + v.prd_name + '</a></p>';
					html +=	'			<table>';
					html +=	'				<tbody>';
					html +=	'					<tr>';
					html +=	'						<th scope="row"><img src="/images/main/best_icon01.gif" alt="" />'+txt_player+'</th>';
					html +=	'						<td>' + v.game_pers + '</td>';
					html +=	'					</tr>';
					html +=	'					<tr>';
					html +=	'						<th scope="row"><img src="/images/main/best_icon02.gif" alt="" />'+txt_age+'</th>';
					html +=	'						<td>' + v.game_age + '</td>';
					html +=	'					</tr>';
					html +=	'					<tr>';
					html +=	'						<th scope="row"><img src="/images/main/best_icon03.gif" alt="" />'+txt_playing_time+'</th>';
					if (v.game_time != null){
						html +=	'						<td>' + v.game_time+ '</td>';
					}
					html +=	'					</tr>';
					html +=	'				</tbody>';
					html +=	'			</table>';
					html +=	'		</div>';

        		});
        	} else if ($("#view_type").val() == 'brand'){
        		
        		$.each(data.rows, function (i, v) {
        		    
					if ( /\_eng/.test(window.location.href )  || /\_fra/.test(window.location.href ) || /\_ger/.test(window.location.href )) {
						var tprice = "<span style='font-weight:bold;color:#666666;'>&#65510;</span> "+nWithCommas(v.prd_retail_prc);
					} else {
						var tprice = nWithCommas(v.prd_retail_prc)+txt_price_v;
					}

        			html += '<li>';
        			html +=	'	<div class="thum">';
					html += '		<a href="game_view.php?prd_idx=' + v.idx + '">'; 
					html += 			v.img;
					if (v.prds_discontinue == 'Y') {
						html += '<div class="over"><span class="close">'+txt_discontinue+'</span></div>';
					}
					html += '		</a></div>';
        			html += '	<dl>';
        			html += '		<dt><a href="game_view.php?prd_idx=' + v.idx + '">' + v.prd_name + '</a></dt>';
        			html += '		<dd class="game_info">';
        			html += '			<table>';
        			html += '				<tbody>';
					if(v.prd_retail_prc > 0){
						html +=	'					<tr>';
						html +=	'						<th scope="row"><img src="/images/main/ico_cost.png" alt="" />' + txt_price + '</th>';
						html +=	'						<td>' + tprice + '</td>';
						html +=	'					</tr>';
					}
					html += '					<tr>';						
        			html += '						<th scope="row"><img src="/images/main/best_icon01.gif" alt="">'+txt_player+'</th>';						
        			html +=	'						<td>' + v.game_pers + '</td>';
        			html += '					</tr>';
        			html += '					<tr>';
        			html += '						<th scope="row"><img src="/images/main/best_icon02.gif" alt="">'+txt_age+'</th>';						
        			html += '						<td>' + v.game_age + '</td>';
        			html += '					</tr>';
        			html += '					<tr>';
        			html += '						<th scope="row"><img src="/images/main/best_icon03.gif" alt="">'+txt_playing_time+'</th>';					
        			if (v.game_time != null){
        			html +=	'						<td>' + v.game_time+ '</td>';
					}
        			html += '					</tr>';
					
        			html += '				</tbody>';
        			html += '			</table>';
        			html += '		</dd>';
        			html += '	</dl>';
        			html += '</li>';
        		});
        				
        	}

        	$("#gameList").html(html);
        	$("#paging").html(data.pagelist);
        },
		error : function(xhr) {
			console.log(xhr.responseText);
		}
	});
}

// 검색 탭 불러오기
// pagemax = 탭 페이지에 불러울 항목 수
function get_searchTab(pgmax){
	
	if (!pgmax){
		pgmax = 5;
	}

	var url = "/_proc/get_products_search_tab.php";
	var all_text = '전체';
	if (/\_eng/.test(window.location.href)) {
		url = url + "?lang=eng";
		all_text = 'All';
	}
	else if (/\_fra/.test(window.location.href)) {
		url = url + "?lang=fra";
		all_text = 'All';
	}
	else if (/\_ger/.test(window.location.href)) {
		url = url + "?lang=ger";
		all_text = 'All';
	}

	$.ajax({
		type 	: "POST",
        url		: url,
		data	: {pagemax : pgmax},
        dataType: "JSON",
        success : function(data) {

        	var html = "";

        	for(i = 0; i < data.arr_count; i++) {

        		html += '<li>';
        		html += '	<dl>';
				html += '		<dt onclick="searchTab_event(this);">'+data[i].cate_name+'</dt>';
				html += '		<dd>';
				html += '			<ul id="search_item' + i + '">';
				html += '				<li><input type="checkbox" id="check_all_item' + i + '" onClick="all_click(this);" /><label onclick="$(this).prev().trigger(\'click\');">'+ all_text +'</label></li>';

				//검색 항목
        		$.each(data[i].rows, function (index, value) {

        			var css = "hide";
        			if (index < data[i].pagemax) css = "show";

        			html += '<li class="' + css + '" item_num="' + index + '">';
					html += '	<input type="checkbox" id="search_checkbox_' + index + '" name="search_checkbox' + i + '[]" value="' + value.cateid + '" />';
					html += '	<label onclick="$(this).prev().trigger(\'click\');">' + value.name + '</label>';
					html += '</li>';
            	});

        		//페이징
        		html += "				<li class='search_paging' style='text-align:center;'>";
				html += "					<a href='javascript:void(0);' onClick=searchTab_paging('prev','" + i + "');>&lt;</a>";
				html +=	"					<span><strong id='page" + i + "'>1</strong> of " + data[i].totpage + "</span>";
				html += "					<a href='javascript:void(0);' onClick=searchTab_paging('next','" + i + "'); >&gt;</a>";
				html +=	"				</li>";
				html += '				<input type="hidden" id="totpage' + i + '" value="' + data[i].totpage + '">';
        		html += '				<input type="hidden" id="pagenum' + i + '" value="1">';

        		html += '			</ul>';
				html += '		</dd>';
				html += '	</dl>';
				html += '</li>';
        	}

        	$("#search_tab").html(html);
        	
        	//해시값 체크
        	checkForHash();
        	//게임 목록
        	get_products_list();
        }
	});
}
//검색 탭 클릭 이벤트
function searchTab_event(obj){

	if ($(obj).next('dd').css("display") != "none") {
		$(obj).removeClass("on");
		$(obj).next('dd').hide();
	}
	else {
		$('.sortSelect > ul > li > dl > dt').removeClass("on");
		$('.sortSelect > ul > li > dl > dd').hide();
		$(obj).addClass("on");
		$(obj).next('dd').show();
	}
}

//검색 전체 클릭
function all_click(obj){
	$(obj).closest('ul').find(":checkbox").prop("checked", obj.checked);
}

//검색탭 페이징
function searchTab_paging(type, num){

	var pagenum = parseInt($("#pagenum" + num).val());
	var totpage = parseInt($("#totpage" + num).val());
	var offset_start;
	var offset_end;

	if (type == 'prev') {
		if (pagenum != 1) {
			$("#pagenum" + num).val(pagenum - 1);
			$("#page" + num).html(pagenum - 1);
			offset_start 	= (pagenum - 2) * pagemax;
			offset_end 		= (pagenum - 1) * pagemax;
		} else {
			return false;
		}
	} else {
		if (pagenum != totpage) {
			$("#pagenum" + num).val(pagenum + 1);
			$("#page" + num).html(pagenum + 1);
			offset_start 	= (pagenum) * pagemax;
			offset_end 		= (pagenum + 1) * pagemax;
		} else {
			return false;
		}
	}

	$("ul#search_item" + num + " li:not(.search_paging)").each(function (k, v) {
		var p = $(this).attr("item_num");
		if (p >= offset_start && p < offset_end ) {
			$(this).removeClass("hide").addClass("show");
		}
		else {
			if(k > 0) $(this).removeClass("show").addClass("hide");
		}
	});
}

//ajax url 추가 
function checkForHash() {
	
    if(document.location.hash){
    	
        var HashLocationName = document.location.hash;
        document.location.hash = HashLocationName;
        
        str_hash = HashLocationName.replace("#","");
		temp = str_hash.split("&");
		
		for(var a = 0; a<temp.length; a++){
			
			arr_curpage = temp[a].split("=");
			
			arr_curpage[0] = arr_curpage[0].replace(/%5B/gi,'');
			arr_curpage[0] = arr_curpage[0].replace(/%5D/gi,'');
			
			console.log(arr_curpage[0] + "/" + arr_curpage[1]);
			
			if (arr_curpage[0].search("search_checkbox") > -1){
				//검색조건 
				$("input:checkbox[name='" + arr_curpage[0] + "[]']").each(function() {
					if(this.value == arr_curpage[1]){
						$(this).prop("checked",true);
						return;
					} 
				});
			}
			else{
				$(".sort").each(function(i, v){
					if($(this).data('value') == arr_curpage[1]){
						$(".sort a").removeClass('current');
						$(this).find('a').addClass('current');
						return;
					}
				});
				$("input[name="+arr_curpage[0]+"]").val(arr_curpage[1]);
			}
		}
		
    } else {
    	document.location.hash = $("form#searchForm").serialize();
    }
}



$( document ).ajaxStart(function() {
	$("#loding").show();
}).ajaxStop(function() {
	$("#loding").hide();
});