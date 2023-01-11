/*
 * Tab 관련 플러그인...
 * 디자인은 그대로 사용하면서 기능만 구현한 플러그인
 */
(function($) {
	var gAtagYN = 'Y';
	var methods = {
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).uitab(options, atagYN);
		 * Desc : Tab를 초기 구성한다.
		 * Parameter : options (탭을 구성하는 옵션, 초기 selected 인덱스 또는 선택되었을 때 메소드
		 *                      등을 선언한다.)
		 * 				ex. {selected: 0, tabselect:gfnTabSelect}
		 * 				atagYN (li 태그 안에 a 태그가 존재하는지 여부 )
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		init : function(options, atagYN) {
			var selectIdx = (!$.util.isNull(options.selected)) ? options.selected : 1;
			gAtagYN = ($.util.isNull(atagYN)) ? gAtagYN : atagYN;

			$(this).uitab('selected', selectIdx);

			$(this).uitab('tabselect', options.tabselect);
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).uitab('selected', sIdx, htmlarr);
		 * Desc : 탭 중에서 어떤 탭을 선택할지 정하는 메소드
		 * Parameter : sIdx (선택하고자 하는 탭의 인덱스)
		 * 				htmlarr (활성화된 탭 또는 비활성화된 탭의 html 태그를 넘긴다. )
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		selected : function(sIdx, htmlarr) {

			var target = $(this);
			var tabBtn_width = ($('.tabs_arrow').length > 0) ? Number($.util.replace($('.tabs_arrow').css('width'), 'px', '')) : 0;
			var div_width = Number($.util.replace($(this).css('width'), 'px', '')) - tabBtn_width;
			var list = $(this).find("ol,ul").eq(0);
			var lis = (gAtagYN == 'Y') ? $(" > li:has(a[href])", list) : $(" > li", list);
			var li_widths = 0, overIndex = -1;

			var actHtml = ($.util.isNull(htmlarr) || $.util.isNull(htmlarr.act)) ? $(".active", list).html() : htmlarr.act;

			var inActHtml = ($.util.isNull(htmlarr) || $.util.isNull(htmlarr.inact)) ? '' : htmlarr.inact;

			if (inActHtml == '') {
				for ( var i = 0, li; (li = lis[i]); i++) {
					var link = (gAtagYN == 'Y') ? $(" > a", li) : $(li);
					if ($.util.isNull(link.attr('class'))) {
						inActHtml = link.html();
						break;
					}
				}
			}

			for ( var i = 0, li; (li = lis[i]); i++) {
				// var alink = $(" > a", li);
				var link = (gAtagYN == 'Y') ? $(" > a", li) : $(li);
				var li_width = (gAtagYN == 'Y') ? link.parent().css('width') : link.css('width');

				li_widths += Number($.util.replace(li_width, 'px', ''));

				if (li_widths > div_width) {
					overIndex = i;
				}
				if (overIndex > -1 && i >= overIndex) {
					link.css('display', 'none');
				}

			}

			// 보여지는 탭 인덱스를 구한다.
			var showlis = target.uitab('getIndexArray', 'block');
			var fvalue = showlis[0]; // 보여지는 탭의 첫번째 요소값
			var lvalue = showlis[showlis.length - 1]; // 보여지는 탭의 마지막 요소값
			var slayer = null;

			// alert(actHtml + "\n" + inActHtml);
			for ( var i = 0, li; (li = lis[i]); i++) {
				// var alink = (gAtagYN == 'Y') ? $(" > a", li) : li;
				var link = (gAtagYN == 'Y') ? $(" > a", li) : $(li);
				var orgLabel = $("span", li).html();
				slayer = (link.attr('href').lastIndexOf('#') > 0) ? link.attr('href').substring(link.attr('href').lastIndexOf('#')) : link
						.attr('href');
				// slayer = link.attr('href');

				// alert(orgLabel);
				// console.log("orgLabel = " + orgLabel);

				link.attr('onclick', 'return false;');

				if (i == sIdx) {
					// 선택된 탭의 인덱스가 숨겨져 있는 탭이면
					// 탭을 이동시켜 선택되게 한다.
					if (link.css('display') == 'none') {
						if (lvalue < sIdx) { // 선택된 탭이 마지막 요소보다 크면 next 탭이동을
							// 한다.
							for ( var j = 0; j < sIdx - lvalue; j++) {
								$(this).uitab('tabmove', 'next');
							}
						} else if (fvalue > sIdx) { // 선택된 탭이 첫번째 요소보다 작으면 next
							// 탭이동을 한다.
							for (j = 0; j < fvalue - sIdx; j++) {
								$(this).uitab('tabmove', 'prev');
							}
						}
					}
					// alert(link.attr('href').lastIndexOf('#'));
					link.addClass('active');
					link.parent().addClass('k1_on');
					link.html(actHtml);
					$('span', link).html(orgLabel);
					$('' + slayer).show();

				} else {
					// alert($.type(slayer) + ':' + slayer);
					$(slayer).hide();
					link.removeClass('active');
					link.parent().removeClass('k1_on');
					link.html(inActHtml);
					$('span', link).html(orgLabel);
					// $(slayer + '> iframe').css('display', 'none');
					// alert(slayer + ' : ' + $(slayer + ' iframe').attr('id'));
					// $(slayer).find(' > iframe').attr('');
				}

				slayer = null;

			} // end for

			// 삭제 버튼 클릭시 이벤트
			$(".close").unbind('click');
			$(".close").bind('click', function() {
				// alert('close ...');

				target.uitab('remove');
				return false;
			});

			// alert(div_width + ':' + li_widths + ':' + overIndex);
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).uitab('tabselect', func);
		 * Desc : 탭을 선택했을 때 실행하는 함수를 정한다.
		 *         만약에 사용자가 따로 정의하지 않으면 기본적인 메소드가 실행된다.
		 * Parameter : func (탭 클릭시 실행되는 메소드 이름)
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		tabselect : function(func) {
			var target = $(this);
			var list = target.find("ol,ul").eq(0);
			// var lis = $(" > li:has(a[href])", list);
			var lis = $(" > li", list);

			lis.unbind('click');

			lis.bind('click', function() {
				if ($.util.isNull(func)) {
					// alert($(this).index() + "번째 탭이 선택 되었다.");
					target.uitab('selected', $(this).index());
					return false;
				} else {
					func($(this));
				}
			});
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).uitab('getIndex');
		 * Desc : 선택된 탭의 인덱스를 구하는 메소드
		 * Parameter :
		 * Return : 선택된 탭 인덱스
		 * ----------------------------------------------------------------------------------*/
		getIndex : function() {
			var target = $(this);
			var list = target.find("ol,ul").eq(0);
			var lis = $(" > li:has(a[href])", list);
			var selectedIndex = -1;

			$.each(lis, function(index) {
				var alink = $(" > a", lis[index]);
				if (alink.attr('class') == 'active') {
					selectedIndex = index;
				}
			});

			return selectedIndex;
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).uitab('getIndexArray', type, delIndex);
		 * Desc : 보여지는 탭의 배열 또는 보여지지 않는 탭의 배열을 구하는 함수.
		 * Parameter : type (보여지는 또는 보여지지 않는 type ex.block/none)
		 * 				delIndex (삭제된 탭 인덱스. 삭제된 탭 인덱스를 배열에 포함시키지 않는다. )
		 * Return : 해당 type에 따른 탭 인덱스 배열
		 * ----------------------------------------------------------------------------------*/
		getIndexArray : function(type, delIndex) {
			var target = $(this);
			var list = target.find("ol,ul").eq(0);
			var lis = $(" > li:has(a[href])", list);
			var indexArr = new Array();

			$.each(lis, function(index) {
				var alink = $(" > a", lis[index]);
				var display = alink.css('display');
				if (display == 'inline') {
					display = 'block';
				}
				if (display == type) {
					if (!$.util.isNull(delIndex) && index < delIndex) {
						return;
					}
					indexArr.push(index);
				}
			});
			return indexArr;
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).uitab('remove');
		 * Desc : 선택된 탭 인덱스를 구해서 그 탭을 삭제한다.
		 * Parameter :
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		remove : function() {
			var selectedIndex = $(this).uitab('getIndex');
			var list = $(this).find("ol,ul").eq(0);
			var lis = $(" > li:has(a[href])", list);

			var del_li = list.find("li:eq(" + selectedIndex + ")");
			var del_link = $(" > a", del_li);
			// var del_layer = del_link.attr('href');
			var del_layer = (del_link.attr('href').lastIndexOf('#') > 0) ? del_link.attr('href').substring(del_link.attr('href').lastIndexOf('#'))
					: del_link.attr('href');

			// 메인페이지는 닫을수 없다.
			if (del_li.text() == "Main") {
				alert('Main 페이지는 닫을수 없습니다. ');
				return;
			}
			// 최소 1개는 항상 열려 있도록 한다.
			if (lis.length == 1) {
				alert('1개이상일 때만 삭제가능합니다. ');
				return;
			}

			// 탭을 삭제된 왼쪽 또는 오른쪽에 숨겨져 있는 탭을 보여 준다.
			showlis = $(this).uitab('getIndexArray', 'block');
			var l_index = showlis[showlis.length - 1] + 1;
			var f_index = showlis[0] - 1;

			// alert(lis.length + ":" + l_index + ":" + f_index);
			if (l_index < lis.length) {
				$(this).uitab('tabmove', 'next', true);
			} else if (f_index > -1) {
				$(this).uitab('tabmove', 'prev', true);
			}

			var actHtml = del_link.html();
			del_li.remove();
			$(del_layer).remove();

			// 제일 마지막 탭이 삭제된 경우에는 앞의 탭을 선택되게 한다.
			// 제일 마지막 탭이 아니면 뒤의 탭이 선택된다.
			if (selectedIndex == (lis.length - 1)) {
				$(this).uitab('selected', selectedIndex - 1, {
					act : actHtml
				});
			} else {
				$(this).uitab('selected', selectedIndex, {
					act : actHtml
				});
			}

			$(this).uitab('setTabMove');
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).uitab('tabmove',type, del_falg);
		 * Desc : 탭이 많은 경우 좌/우 이동 버튼을 이용하여 탭을 이동시킨다.
		 * Parameter : type (next 버튼 or prev 버튼)
		 * 				del_falg (탭이 삭제되었을 경우에는 앞의 요소를 보이지 않게 하는 부분을 실행하지 않는다. )
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		tabmove : function(type, del_falg) {
			var target = $(this);
			var list = target.find("ol,ul").eq(0);
			var lis = $(" > li:has(a[href])", list);

			var tabBtn_width = ($('.tabs_arrow').length > 0) ? Number($.util.replace($('.tabs_arrow').css('width'), 'px', '')) : 0;
			var div_width = Number($.util.replace($(this).css('width'), 'px', '')) - tabBtn_width;

			var showlis = [];

			showlis = target.uitab('getIndexArray', 'block');

			var lis_width = 0;
			for ( var i = 0; i < showlis.length; i++) {
				lis_width += Number($.util.replace($(lis[showlis[i]]).css('width'), 'px', ''));
			}

			if (type == 'next') {
				var l_index = showlis[showlis.length - 1] + 1;

				if (l_index == lis.length) {
					return;
				}

				var l_link = $(" > a", lis[l_index]);
				l_link.css('display', 'block');

				lis_width += Number($.util.replace($(lis[l_index]).css('width'), 'px', ''));

				if ($.util.isNull(del_falg)) {
					for ( var i = 0; i < showlis.length; i++) {
						if (lis_width > div_width) {
							lis_width -= Number($.util.replace($(lis[showlis[i]]).css('width'), 'px', ''));
							var f_link = $(" > a", lis[showlis[i]]);
							f_link.css('display', 'none');
						} else {
							break;
						}
					}
				}
			}
			if (type == 'prev') {
				var f_index = showlis[0] - 1;
				if (f_index == -1) {
					return;
				}

				var f_link = $(" > a", lis[f_index]);
				f_link.css('display', 'block');

				lis_width += Number($.util.replace($(lis[f_index]).css('width'), 'px', ''));

				if ($.util.isNull(del_falg)) {
					for ( var i = 1; i < showlis.length; i++) {
						if (lis_width > div_width) {
							lis_width -= Number($.util.replace($(lis[showlis[showlis.length - i]]).css('width'), 'px', ''));
							var l_link = $(" > a", lis[showlis[showlis.length - i]]);
							l_link.css('display', 'none');
						} else {
							break;
						}
					}
				}
			}

			// 탭 이동시마다 이동 버튼을 disble/enable 시킨다.
			target.uitab('displayMoveButton');
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).uitab('add', title, link);
		 * Desc : 왼쪽 메뉴를 클릭시 MDI 창 처럼 탭이 추가된다.
		 * Parameter : title (탭 제목)
		 * 				link (탭이 열리면서 로드해야 되는 페이지 주소)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		add : function(title, link) {
			var $target = $(this);
			var $list = $target.find("ol,ul").eq(0);
			var $lis = $(" > li:has(a[href])", $list);

			var $firstDiv = $("li:first > a", $list).attr('href').split('-');
			// 중복되지 않는 id값을 얻기 위해서 li 목록 중에서 제일 마지막 값을 구한다.
			var $lastIdx = $("li:last > a", $list).attr('href').split('-');
			// 다음 id 값을 구하여 div, iframe등을 생성한다.
			var $nextIdx = ($lastIdx[1] == 'main') ? 1 : (Number($lastIdx[1]) + 1);
			// ie7에서는 탭레이어 아이디를 주소+아이디로 가져온다.
			var div_id = $firstDiv[0].substring(1) + '-' + $nextIdx;

			// 탭이 기존에 있는지 여부를 체크한다.
			var isTab = false;
			var selectTab = -1;
			for ( var i = 0, li; (li = $lis[i]); i++) {
				var tlabel = $("span", li).text();
				if (tlabel == title) {
					selectTab = i;
					isTab = true;
					break;
				}
			}
			// $(" > li:has(a[href])", $list).removeClass('k1_on');

			// 이미 탭이 추가가 되어 있으면 추가하지 않는다.
			if (isTab) {
				$target.uitab('selected', selectTab);
				return;
			}

			// alert($lastIdx[0] + ' : ' + div_id);
			var addItem = '<span><label>' + title + '</label><img src="/vof/imgs/main/btn_tclose.gif" alt="탭닫기" class="close"></span>';
			var $newlis = $('<li class="k1_on"><a href="#' + div_id + '" onClick="return false;"></a></li>');

			$newlis.find('a').append(addItem);

			$list.append($newlis);

			// Table 클릭시 보여 주는 페이지
			// === var cont = '#' + $target.parent().attr('id');
			var cont = '#k1_content_wrap';
			var $cont_div = $('<div></div>');
			var $cont_frame = $('<iframe id="ifrm_' + $nextIdx
					+ '" src="" style="width:100%; height:638px; border:none; overflow:hidden;" class="ifrm" scrolling="no" frameborder="0" title="'
					+ title + '"></iframe>');

			$cont_frame.bind('load', function() {
				var iframeHeight = $(this).contents().height();

				// alert(iframeHeight);
				$(this).height(iframeHeight + 20);
			});

			$cont_frame.attr('frameBorder', 0);
			$cont_frame.attr('src', ($.util.isNull(link)) ? '' : link);
			// $cont_frame.attr('id', 'ifrm_' + $nextIdx);

			$cont_div.attr('id', div_id).attr('class', $('#fragment-main').attr('class'));
			$cont_div.append($cont_frame);

			// alert($cont_div.html());
			$(cont).append($cont_div);

			// 탭 선택
			if ($lis.length == 1) {
				$target.uitab('selected', $lis.length, {
					inact : addItem
				});
			} else {
				$target.uitab('selected', $lis.length);
			}

			// Tab이 선택되었을 때 이벤트 실행시킨다.
			// 만약에 그게 필요하다면 탭이 선택되었을 때
			// 제약사항이 필요한 함수를 실행시키게 한다.
			$target.uitab('tabselect');
			$target.uitab('setTabMove');

			// alert($(cont).html());
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).uitab('setTabMove');
		 * Desc : 탭이 추가 또는 삭제될 때 탭 이동 이벤트를 실행 또는 해제한다.
		 * Parameter :
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		setTabMove : function() {
			var target = $(this);
			var nextBtn = $('#tab_next');
			var prevBtn = $('#tab_prev');

			var hideTabArray = target.uitab('getIndexArray', 'none');

			if (hideTabArray.length > 0) {

				nextBtn.unbind('click');
				prevBtn.unbind('click');

				// 버튼 표시.
				target.uitab('displayMoveButton');

				// Tab 좌/우 버튼 클릭시...
				nextBtn.bind('click', function() {
					target.uitab('tabmove', 'next');
				});
				prevBtn.bind('click', function() {
					target.uitab('tabmove', 'prev');
				});
			} else {
				if (nextBtn.attr("src").indexOf('_off') == -1) {
					var nextMoveImg = nextBtn.attr("src").substring(0, nextBtn.attr("src").lastIndexOf('.')) + "_off"
							+ nextBtn.attr("src").substring(nextBtn.attr("src").lastIndexOf('.'));

					var prevMoveImg = prevBtn.attr("src").substring(0, prevBtn.attr("src").lastIndexOf('.')) + "_off"
							+ prevBtn.attr("src").substring(prevBtn.attr("src").lastIndexOf('.'));

					nextBtn.attr('src', nextMoveImg);
					prevBtn.attr('src', prevMoveImg);

					nextBtn.unbind('click');
					prevBtn.unbind('click');
				}
			}
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).uitab('displayMoveButton');
		 * Desc : 탭 초기화 또는 탭 이동시 탭 이동 버튼을 활성화/비활성화해서 보여 주는 메소드.
		 * Parameter :
		 *
		 * Return : enable/disable button display
		 * ----------------------------------------------------------------------------------*/
		displayMoveButton : function() {
			var target = $(this);
			var nextBtn = $('#tab_next');
			var prevBtn = $('#tab_prev');
			var list = target.find("ol,ul").eq(0);
			var lis = $(" > li:has(a[href])", list);
			var nextMoveImg = '', prevMoveImg = '';

			var hideTabArray = target.uitab('getIndexArray', 'none');
			var showTabArray = target.uitab('getIndexArray', 'block');

			// 다음 버튼을 disable
			if (showTabArray[showTabArray.length - 1] + 1 == lis.length) {
				if (nextBtn.attr("src").indexOf('_off') == -1) {
					nextMoveImg = nextBtn.attr("src").substring(0, nextBtn.attr("src").lastIndexOf('.')) + "_off"
							+ nextBtn.attr("src").substring(nextBtn.attr("src").lastIndexOf('.'));

					nextBtn.attr('src', nextMoveImg);
				}
			}
			// 이전 버튼을 disable
			if (showTabArray[0] - 1 == -1) {
				if (prevBtn.attr("src").indexOf('_off') == -1) {
					prevMoveImg = prevBtn.attr("src").substring(0, prevBtn.attr("src").lastIndexOf('.')) + "_off"
							+ prevBtn.attr("src").substring(prevBtn.attr("src").lastIndexOf('.'));
					prevBtn.attr('src', prevMoveImg);
				}
			}

			$.each(hideTabArray, function(index, value) {
				// 이전 버튼을 enable
				if (showTabArray[0] > value) {
					prevMoveImg = $.util.replace(prevBtn.attr("src"), '_off', '');
					prevBtn.attr('src', prevMoveImg);
				}
				// 다음 버튼을 enable
				if (showTabArray[showTabArray.length - 1] < value) {
					nextMoveImg = $.util.replace(nextBtn.attr("src"), '_off', '');
					nextBtn.attr('src', nextMoveImg);
				}
			});
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(selector).uitab('popuptabselect');
		 * Desc : 탭을 선택하여 특정 div를 visible시킴
		 * Parameter :
		 *
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		popuptabselect : function(fnc) {
			var target = $(this);
			var list = target.find("a");
			list.unbind('click');

			list.bind('click', function() {
				if (typeof fnc == 'function') {
					fnc($(this).index());
				}
				list.removeClass('active');
				list.find('em').removeClass('ico1').addClass('ico2');
				$('div[id*="popuptab_"]').css('display', 'none');

				$(this).addClass('active');
				$(this).find('em').removeClass('ico2').addClass('ico1');
				$('#popuptab_' + $(this).index()).css('display', 'block');
			});
		}
	};

	$.fn.uitab = function(method) {

		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}
	};

})(jQuery);
