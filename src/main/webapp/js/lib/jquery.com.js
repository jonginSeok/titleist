(function($) {
	var methods = {
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).event('maskDiv', div, toggleVal, speed, url); 
		 * Desc : 레이어 팝업을 띄우고 아래 화면은 Mask 처리를 하는 Toggle함수.
		 * Parameter : div (레이어 팝업 아이디)
		 * 				toggleVal (Toggle되는 버튼의 val : 배열) 
		 * 				speed (레이어 팝업을 보여 주고 감출때의 속도) 
		 * 				url (레이어를 보여줄 페이지 경로)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		maskDiv : function(div, toggleVal, speed, url) {
			$(this).one('click', function() {
				// iframe이 있으면 iframe resize
				var ifrmObj = $('#' + div + '> iframe');
				if (!$.util.isNull(ifrmObj)) {
					ifrmObj.event('resizeIframe', {
						h : 10,
						w : 50
					});
					ifrmObj.attr('src', url);
				}

			});

			var tagName = $(this).tagName();
			$(this).toggle(function() {

				var obj = $(this);

				var maskHeight = $(document).height() - Number($.util.replace($('#mask').css('top'), "px", ""));
				var maskWidth = $(window).width() - Number($.util.replace($('#mask').css('left'), "px", ""));

				$('#mask').css({
					'width' : maskWidth,
					'height' : maskHeight
				});
				$('#mask').fadeTo("slow", 0.6);

				$('#' + div).slideDown(speed, function() {
					if (tagName == 'span' || tagName == 'div') {
						obj.text(toggleVal[0]);
					} else {
						obj.val(toggleVal[0]);
					}

					// 다른 여정 조회 레이어의 이벤트 처리
					// 다른 여정 조회 > iframe resizing 처리 ...
					var cal_h = 0; // date picker 활성화시 처음에 높이를 구하는 변수.
					$('#' + div + '> iframe').contents().find('form button, form div').mouseover(function() {
						// alert('111');
						var h = $('#' + div + '> iframe').contents().find('#k1_content').outerHeight(true);
						$('#' + div + '> iframe').height(h + 5);
						cal_h = 0; // date picker 활성화시 본문 높이 초기화.

					});

					// 다른 여정 조회 > 달력 조회 > iframe resizing 처리 ...
					$('#' + div + '> iframe').contents().find('#k1_pop_wrap').bind('mouseover', function() {
						// 처음에는 달력 높이를 구하고 그다음부터는 cal_h 높이를 준다.
						var h = (cal_h == 0) ? $('#' + div + '> iframe').contents().height() + 5 : cal_h; //
						$('#' + div + '> iframe').height(h);
						if (cal_h == 0) {
							cal_h = h;
						}
					});

					// 다른 여정 조회 > 팝업 처리..
					$('#' + div + '> iframe').contents().find("img[src*='btn_searhc_glass_m'], #btn_bisiRule, #chk_lowest").bind('click', function() {
						var h = $('body').height();
						$('#' + div + '> iframe').height(h);
					});

				});

			}, function() {
				var obj = $(this);
				$('#' + div).slideUp(speed, function() {
					$('#mask').hide();
					if (tagName == 'span' || tagName == 'div') {
						obj.text(toggleVal[1]);
					} else {
						obj.val(toggleVal[1]);
					}
				});

			});

		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).event('sideMoveDiv', menuDiv, contDiv, speed, options); 
		 * Desc : 좌측 레이어가 감춰 지면서 우측 레이어를 크게 보여지게 하는 이벤트 . 
		 * 			좌측 레이어가 다시 보여지면 우측 레이어를 원래 크기대로 보게 한다. 
		 * Parameter : menuDiv (좌측 없어졌다 보였다 하는 레이어 아이디)
		 * 				contDiv (우측 크게 보였다 작게 보였다 하는 레이어 아이디) 
		 * 				speed (이벤트를 보여 주는 속도) 
		 * 				options (해당 이벤트가 발생한 후의 처리 함수 구현  
		 * 					ex.afterIn:function(){ }, afterOut:function(){ } )
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		sideMoveDiv : function(menuDiv, contDiv, speed, options) {
			var inDiv = $('#' + menuDiv).find('div').eq(0); // .k1_left_wrap
			var menuWidth = $.util.intSize($('#' + menuDiv).css('width'), 'px'); // 185
			var inWidth = $.util.intSize(inDiv.css('width'), 'px'); // 163
			var contWidth = $.util.intSize($('#' + contDiv).css('width'), 'px'); // 995

			$(this).toggle(function() {
				inDiv.animate({
					width : '0',
					opacity : '0'
				}, speed);
				$('#' + menuDiv).animate({
					width : menuWidth - inWidth
				}, speed);
				$('#' + contDiv).animate({
					width : contWidth + inWidth
				}, speed);

				$('.ifrm').contents().find('#' + contDiv + '_wrap').animate({
					width : contWidth + inWidth
				}, speed, null, function() {
					if (!$.util.isNull(options) && !$.util.isNull(options.afterIn)) {
						options.afterIn();
					}
				});

			}, function() {
				$('#' + menuDiv).animate({
					width : menuWidth
				}, speed);
				$('#' + contDiv).animate({
					width : contWidth
				}, speed);

				$('.ifrm').contents().find('#' + contDiv + '_wrap').animate({
					width : contWidth
				}, speed, null, function() {
					if (!$.util.isNull(options) && !$.util.isNull(options.afterOut)) {
						options.afterOut();
					}
				});
				inDiv.animate({
					width : inWidth,
					opacity : '1'
				}, speed);

			});

		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).event('upSideMoveDiv', upDiv, speed, options); 
		 * Desc : 검색 조건을 상/하로 이동시키는 이벤트 
		 * 			
		 * Parameter : upDiv (상/하로 움직이는 검색 조건 레이어 Class 이름 ex) .search_condition )
		 * 				speed (이벤트를 보여 주는 속도) 
		 * 				options (해당 이벤트가 발생한 후의 처리 함수 구현  
		 * 					ex.afterIn:function(){ }, afterOut:function(){ } )
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		upSideMoveDiv : function(upDiv, speed, options) {
			var target = $(this);
			var upHeight = $.util.intSize($(upDiv).css('height'), 'px');
			var inDiv = $(upDiv).find('.k1_selcet2_spot');

			target.toggle(function() {
				$(upDiv).animate({
					height : '30'
				}, speed, null, function() {

					if (!$.util.isNull(options) && !$.util.isNull(options.afterIn)) {
						options.afterIn();
					}

				});
				inDiv.animate({
					opacity : 'hide'
				}, speed);
				/*
				 * $.each(inDiv, function(index) { alert(index); // if (index > 0) { $(this).animate({ opacity : 'hide' }, speed); // } });
				 */
			}, function() {
				$(upDiv).animate({
					height : upHeight
				}, speed, null, function() {

					if (!$.util.isNull(options) && !$.util.isNull(options.afterOut)) {
						options.afterOut();
					}

				});

				inDiv.animate({
					opacity : 'show'
				}, speed);

				/*
				 * $.each(inDiv, function(index) { if (index > 0) { $(this).animate({ opacity : 'show' }, speed); } });
				 */
			});

		},

		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).event('resizeIframe', margin); 
		 * Desc : iframe width와 height를 자동으로 resizing.
		 * Parameter : margin (iframe 의 body를 보여 주기 위한 margin width, margin height을 배열로 지정해 준다. )
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		resizeIframe : function(margin) {
			$(this).bind('load', function() {
				var iframeHeight = $(this).contents().height();
				var iframeWidth = $(this).contents().width();

				$(this).height(iframeHeight + margin.h); // iframeHeight + 5 //10
				$(this).width(iframeWidth + margin.w); // iframeWidth + 5 //50
			});
		}
	};

	$.fn.event = function(method) {

		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}
	};

})(jQuery);

(function($) {
	$.popup = {
		popupType : 'M', // M:modal, O:open
		localType : '',
		closeMethod : null,
		/*----------------------------------------------------------------------------------* 	
		 * Function : $.popup.modal(url, params, options, closefunc); 
		 * Desc : popupType에 따라서 모달창 또는 윈도우 팝업을 보여 준다. 
		 * Parameter : url (팝업으로 보여줄 화면 URL)
		 * 				params (팝업에 전달할 Parameter ex.param1=value1&param2=value2)
		 * 				options (팝업에 필요한 옵션을 배열로 만든다. height, widht, windowName...)
		 * 				closefunc (팝업에서 보내 주는 값을 받아서 처리하는 함수)
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		/*
		 * setType : function(type) { this.popupType = type; }, getType : function() { if (this.popupType == '') { this.popupType = 'M'; } return
		 * this.popupType; },
		 */
		modal : function(url, params, options, closefunc) {
			if (this.popupType == 'M') {
				this.showmodal(url, params, options, closefunc);
			} else {
				this.winopen(url, params, options, closefunc);
			}
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $.popup.showmodal(url, params, options, closefunc); 
		 * Desc : 모달창을 보여 주는 함수.  
		 * Parameter : url (팝업으로 보여줄 화면 URL)
		 * 				params (팝업에 전달할 Parameter ex.param1=value1&param2=value2)
		 * 				options (팝업에 필요한 옵션을 배열로 만든다. height, widht, windowName...)
		 * 					options.execlose : 모달창을 두개 띄웠을 때 두번째 모달창에서 close function을
		 * 					실행함과 동시에 두개의 모달창을 모두 닫고자 할때 true 옵션을 준다. 
		 * 					두번째 모달창이 닫히기 전에 close function이 실행되는데 첫번째 모달창에서 
		 * 					return 값이 있으면 그 값을 두번째 모달창에서 찾을 수 없기 때문에 주는 옵션. 
		 * 				closefunc (팝업에서 보내 주는 값을 받아서 처리하는 함수)
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		showmodal : function(url, params, options, closefunc) {

			var inputs = '';
			// $.each(params.split('&'), function() {
			for ( var param in params) {
				// var p = this.split('=');
				// inputs += '<input type="hidden" name="' + p[0] + '" value="' + p[1] + '" />';
				inputs += '<input type="hidden" name="' + param + '" value="' + params[param] + '" />';

			}
			// );
			var id = '';
			if (typeof options.id != 'undefined') {
				// 팝업의 팝업일 경우 id, name이 같으면 form submit에 문제가 됨
				// 팝업의 팝업일 경우 option에 id를 줘서 고유한 id, name을 갖도록 함
				id = options.id;
			}
			var isdnr = (!$.util.isNull(options.isdrag) && options.isdrag) ? true : false;

			var dhtml = '<form id="_frm' + id + '" method="post" action="">';
			dhtml += inputs;
			dhtml += '<input type="hidden" name="_retval" value="" />';
			dhtml += '</form>';
			dhtml += '<iframe name="_ifrm'
					+ id
					+ '" id="_ifrm'
					+ id
					+ '" src="about:blank" title="_ifrm'
					+ id
					+ '" height="'
					+ options.height
					+ '" width="'
					+ options.width
					+ '" style="border:0;overflow:hidden"  frameborder=0></iframe><script type="text/javascript">var h=0; var retVal = null; function _close(){$.modal.close();}</script>';

			var modalHtml = '<div id="_modal" style="overflow:hidden;">' + dhtml + '</div>';
			var addHtml = '<div id="b_modal" style="cursor:move;background-color:#f00;height:20px;">';
			addHtml += (isdnr) ? ((options.title === undefined) ? '' : options.title) : '';
			addHtml += '</div>';

			var nw_modalHtml = '';
			var contheight = options.height + 5;
			if (isdnr) {
				nw_modalHtml = addHtml + modalHtml;
				contheight = options.height + 20 + 5;
			} else {
				nw_modalHtml = modalHtml;
			}
			// $('#b_modal').remove();
			// $('body').append(addHtml);
			// $('#b_modal').html(modalHtml);

			$.modal(nw_modalHtml, {
				// $("#_modal").modal({
				closeHTML : options.closeHTML,
				containerCss : {
					backgroundColor : "#fff",
					borderColor : "#fff",
					height : contheight,
					padding : 0,
					width : options.width + 5
				},
				overlayClose : false,
				opacity : ($.util.isNull(options.opacity)) ? 0 : options.opacity,
				overlayCss : {
					backgroundColor : "#fff"
				},
				autoResize : true,
				position : [],
				onOpen : function(dialog) {
					dialog.overlay.fadeIn(1, function() {
						dialog.data.hide();
						dialog.container.fadeIn(1, function() {
							dialog.data.slideDown(1);
							$("#_frm" + id).attr({
								action : url,
								method : 'post',
								target : '_ifrm' + id
							});

							$("#_frm" + id).submit();

							// $('#simplemodal-overlay').css('display', 'none');

							if (isdnr) {
								$('#simplemodal-container').draggable().resizable();

								$('#_ifrm' + id).load(function() {
									// console.log('load..');
									var popwidth = $('#_ifrm' + id).contents().find('#k1_btmspop_wrap').width();
									// console.log($('#_ifrm' + id).contents().find('#k1_btmspop_wrap').width());

									$('#b_modal').width(popwidth);
								});
							}
						});
					});
				},
				onShow : function(dialog) {
					// console.log('show > ' + $("#_modal", parent.document).attr('id'));
					// dialog.draggable();
				},
				onClose : function(dialog) {
					if (!$.util.isNull(options.execlose)) {
						if (options.execlose) {
							$.modal.close();
						}
					}
					if (!$.util.isNull(closefunc)) {
						closefunc(parent.retVal);
					}
					$.modal.close();
				}
			});

			// return retVal;
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $.popup.winopen(url, params, options, closefunc); 
		 * Desc : 윈도우 팝업을 띄우는 함수.  
		 * Parameter : url (팝업으로 보여줄 화면 URL)
		 * 				params (팝업에 전달할 Parameter ex.param1=value1&param2=value2)
		 * 				options (팝업에 필요한 옵션을 배열로 만든다. height, widht, windowName...)
		 * 				closefunc (팝업에서 보내 주는 값을 받아서 처리하는 함수)
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		winopen : function(url, params, options, closefunc) {
			// 변수 전달 함수를 저장한다.
			this.closeMethod = closefunc;

			var inputs = '';
			// $.each(params.split('&'), function() {
			for ( var param in params) {
				// var p = this.split('=');
				// inputs += '<input type="hidden" name="' + p[0] + '" value="' + p[1] + '" />';
				inputs += '<input type="hidden" name="' + param + '" value="' + params[param] + '" />';
			}
			// );

			var dhtml = '<form id="_frm" method="post" action="">';
			dhtml += inputs;
			dhtml += '</form><script type="text/javascript">var wName=null; var retVal = null; function beforeClose() {$.popup.closeMethod(retVal);} </script>';

			var addHtml = '<div id="b_modal"></div>';
			$('#b_modal').remove();
			$('body').append(addHtml);
			$('#b_modal').html(dhtml);

			// $('body').append(dhtml);
			// alert(dhtml);
			var strop;
			var winName = (!$.util.isNull(options.winName)) ? options.winName : '_win';
			strop = "width=" + options.width + ",height=" + options.height + ",left=" + (screen.width / 2 - options.width / 2) + ",top="
					+ (screen.height / 2 - options.height / 2) + ",scrollbars=1,menubar=0,status=0,toolbar=0,location=0,directories=0,resizable="
					+ ((!$.util.isNull(options.resizable)) ? options.resizable : 0);
			var myWin = window.open('', winName, strop);

			wName = myWin;

			$("#_frm").attr({
				action : url,
				method : 'post',
				target : winName
			});
			$("#_frm").submit();

		},
		layer : function(url, options, closefunc) {

			var dhtml = '<iframe name="_ifrm" id="_ifrm" src="'
					+ url
					+ '" height="'
					+ options.height
					+ '" width="'
					+ options.width
					+ '" style="border:0" frameborder=0></iframe><script type="text/javascript">var retVal = null; function close(){$.modal.close();}</script>';

			$.modal('<div id="_modal">' + dhtml + '</div>', {
				closeHTML : options.closeHTML,
				containerCss : {
					backgroundColor : "#fff",
					borderColor : "#fff",
					height : options.height + 5,
					padding : 0,
					width : options.width + 5
				},
				position : [ 39, 39 ],
				autoResize : true,
				// minHeight : 300,
				// maxHeight : 500,
				overlayClose : false,
				opacity : 0,
				overlayCss : {
				// backgroundColor : "#fff",
				// top : 39
				},
				onOpen : function(dialog) {
					dialog.overlay.fadeIn('fast', function() {
						dialog.container.slideDown('fast', function() {

							dialog.data.fadeIn('fast');
							return false;
						});
					});

				},
				onShow : function(dialog) {
				},
				onClose : function(dialog) {
					dialog.data.fadeOut('fast', function() {
						dialog.container.hide('fast', function() {
							dialog.overlay.slideUp('fast', function() {
								$.modal.close();
							});
						});
					});
				}
			});
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $.popup.winopenfull(url, params, options, closefunc); 
		 * Desc : 윈도우 팝업을 띄우는 함수(모든옵션추가).  
		 * Parameter : url (팝업으로 보여줄 화면 URL)
		 * 				params (팝업에 전달할 Parameter ex.param1=value1&param2=value2)
		 * 				options (팝업에 필요한 옵션을 배열로 만든다. height, widht, windowName...)
		 * 				closefunc (팝업에서 보내 주는 값을 받아서 처리하는 함수)
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		winopenfull : function(url, params, options, closefunc) {
			// 변수 전달 함수를 저장한다.
			this.closeMethod = closefunc;

			var inputs = '';
			// $.each(params.split('&'), function() {
			for ( var param in params) {
				// var p = this.split('=');
				// inputs += '<input type="hidden" name="' + p[0] + '" value="' + p[1] + '" />';
				inputs += '<input type="hidden" name="' + param + '" value="' + params[param] + '" />';
			}
			// );

			var dhtml = '<form id="_frm" method="post" action="">';
			dhtml += inputs;
			dhtml += '</form><script type="text/javascript">var retVal = null; function beforeClose() {$.popup.closeMethod(retVal);} </script>';

			var addHtml = '<div id="b_modal"></div>';
			$('#b_modal').remove();
			$('body').append(addHtml);
			$('#b_modal').html(dhtml);

			// $('body').append(dhtml);
			// alert(dhtml);
			var strop;
			var winName = (!$.util.isNull(options.winName)) ? options.winName : '_win';
			strop = "width=" + options.width + ",height=" + options.height + ",left=" + (screen.width / 2 - options.width / 2) + ",top="
					+ (screen.height / 2 - options.height / 2) + ",scrollbars=1,menubar=1,status=1,toolbar=1,location=1,directories=1,resizable=1";
			var myWin = window.open('', winName, strop);

			$("#_frm").attr({
				action : url,
				method : 'post',
				target : winName
			});
			$("#_frm").submit();

		},
		layer : function(url, options, closefunc) {

			var dhtml = '<iframe name="_ifrm" id="_ifrm" src="'
					+ url
					+ '" height="'
					+ options.height
					+ '" width="'
					+ options.width
					+ '" style="border:0" frameborder=0></iframe><script type="text/javascript">var retVal = null; function close(){$.modal.close();}</script>';

			$.modal('<div id="_modal">' + dhtml + '</div>', {
				closeHTML : options.closeHTML,
				containerCss : {
					backgroundColor : "#fff",
					borderColor : "#fff",
					height : options.height + 5,
					padding : 0,
					width : options.width + 5
				},
				position : [ 39, 39 ],
				autoResize : true,
				// minHeight : 300,
				// maxHeight : 500,
				overlayClose : false,
				opacity : 0,
				overlayCss : {
				// backgroundColor : "#fff",
				// top : 39
				},
				onOpen : function(dialog) {
					dialog.overlay.fadeIn('fast', function() {
						dialog.container.slideDown('fast', function() {

							dialog.data.fadeIn('fast');
							return false;
						});
					});

				},
				onShow : function(dialog) {
				},
				onClose : function(dialog) {
					dialog.data.fadeOut('fast', function() {
						dialog.container.hide('fast', function() {
							dialog.overlay.slideUp('fast', function() {
								$.modal.close();
							});
						});
					});
				}
			});
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $.popup.close(); 
		 * Desc : popupType에 따라서 모달창 또는 윈도우 팝업을 닫는 함수.
		 * Parameter : 
		 * 				
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		close : function() {
			if (this.popupType == 'M') {
				this.modalclose();
			} else {
				this.winclose();
			}
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $.popup.winclose(); 
		 * Desc : 윈도우 팝업을 닫는 함수.
		 * Parameter : 
		 * 				
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		winclose : function() {
			window.close();
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $.popup.modalclose(); 
		 * Desc : 모달창을 닫는 함수. 
		 * Parameter : 
		 * 				
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		modalclose : function() {
			parent._close();
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $.popup.retval(ret); 
		 * Desc : popupType에 따라서 부모창에 값을 전달하는 함수. 
		 * Parameter : ret (모달창 또는 팝업창에서 전달하는 값 ex.{'id':'aaa', 'name':'bbb'} )
		 * 				
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		retval : function(ret) {
			if (this.popupType == 'M') {
				this.modalval(ret);
			} else {
				this.winval(ret);
			}
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $.popup.winval(ret); 
		 * Desc : 윈도우 팝업을 띄웠을 때 부모창에 값을 전달하는 함수. 
		 * Parameter : ret (팝업창에서 전달하는 값 ex.{'id':'aaa', 'name':'bbb'} )
		 * 				
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		winval : function(ret) {
			opener.retVal = ret;
			opener.beforeClose();
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $.popup.modalval(ret); 
		 * Desc : 모달 팝업을 띄웠을 때 부모창에 값을 전달하는 함수. 
		 * Parameter : ret (모달창에서 전달하는 값 ex.{'id':'aaa', 'name':'bbb'} )
		 * 				
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		modalval : function(ret) {
			parent.parent.retVal = ret;
		}
	};

})(jQuery);

(function($) {
	/*----------------------------------------------------------------------------------* 	
	 * Function : $(selector).sliding('target id', ['button text'], '속도', custom callback function);
	 * Desc : 슬라이딩 메뉴 펼침. 
	 * Parameter : 펼칠 대상 ID, 
	 * 				버튼 text 제어 (default:['열기', '닫기']), 
	 * 				sliding 속도 (default:fast)(slow) / int:숫자가 작을수로 빠름
	 * Return : 일치하는데 데이터
	 * ----------------------------------------------------------------------------------*/
	$.fn.sliding = function(target, str, speed, func) {
		var formid = $(this).attr('id');
		$('#' + target).slideToggle($.trim(speed) == "" ? "fast" : speed, function() {
			if ($('#' + target).is(':visible')) {
				$('#' + formid).text($.trim(str[1]) == "" ? "닫기" : str[1]);
			} else {
				$('#' + formid).text($.trim(str[0]) == "" ? "열기" : str[0]);
			}
			// toggle 완료 후 사용자 정의 함수 실행
			if (typeof func == 'function') {
				func();
			}
		});
	};
})(jQuery);

/*----------------------------------------------------------------------------------* 	
 * Function : $.autocom(['id'], 'searchData');
 * Desc : text field에 단어 입력시 xml데이터에 일치하는 단어가 나오면
 *  		list로 보여준다
 * Parameter : 대상 id 
 *				기준 데이터(url)
 * Return : 일치하는데 데이터
 * ----------------------------------------------------------------------------------*/
(function($) {
	$.autocom = function(id, url) {
		// var match;
		// if($.trim(att)){
		// typeof(att)=="boolean" ? match=att : match=false;
		// }else{
		// match = false;
		// }
		// return $("#"+id).autocomplete(array,{
		// matchContains:match
		// });
		$.ajax({
			url : url,
			dataType : "xml",
			success : function(xmlResponse) {
				var data = $("geoname", xmlResponse).map(function() {
					return {
						value : $("name", this).text() + ", " + ($.trim($("countryName", this).text()) || "(unknown country)"),
						id : $("geonameId", this).text()
					};
				}).get();
				for ( var i = 0; i < id.length; i++) {
					$("#" + id[i]).autocomplete({
						source : data,
						minLength : 0,
						matchContains : typeof (att) == "boolean" ? att : false
					// select: function( event, ui ) {
					// log( ui.item ?
					// "Selected: " + ui.item.value + ", geonameId: " + ui.item.id :
					// "Nothing selected, input was " + this.value );
					// }
					});
				}
			}
		});
	};
})(jQuery);

/*----------------------------------------------------------------------------------* 	
 * Function : $(selector).multisdata("option", "return function");
 * Desc : 기본 select box를 multi select box로 변경해준다
 * Parameter : 
 *				
 * Return : 선택된 값[]
 * ----------------------------------------------------------------------------------*/
(function($) {
	$.fn.multisdata = function() {
		var arr = [];
		$("input:checkbox[name='" + $(this).attr('id') + "[]']:checked").each(function(index) {
			// alert("value="+$(this).val()+":text="+$(this).parent().text());
			arr.push($(this).val());
		});
		return arr;
	};
})(jQuery);

/*----------------------------------------------------------------------------------* 	
 * Function : $(selector).tooltip($targetLayer, options);
 * Desc : 툴팁을 보여주는 함수.
 * Parameter : $targetLayer (tooltip으로 보여줄 레이어 객체)
 * 				options (옵션)
 *				
 * Return : 
 * ----------------------------------------------------------------------------------*/
(function($) {
	$.fn.tooltip = function($targetLayer, options) {
		var opts = $.extend({}, $.fn.tooltip.defaults, options);
		return this.each(function() {
			var $self = $(this);
			$self.hover(function(e) {
				var str = 'abcd';// $self.attr('tooltip');
				// $targetLayer.find(options.tooltipcss).text(str);
				// console.log($self.offset().left + ":" + $self.offset().top + " - " + $targetLayer.outerHeight());
				var offset = $self.offset();
				var x = e.pageX - ($targetLayer.outerHeight() / 2);
				var y = e.pageY - ($targetLayer.outerHeight() + 5);
				// console.log(e.pageX + " = " + e.pageX);
				$targetLayer.show().css({
					left : x, // $self.offset().left + 'px',
					top : y, // $self.offset().top - $targetLayer.outerHeight() + 'px',
					position : 'absolute'
				});
			}, function() {
				$targetLayer.hide();
			})
		});// end of return
	};
	// (public)---------------------------------------------------------------------------
	// plugin defaults
	$.fn.tooltip.defaults = {
		metadata : {}
	};
})(jQuery);
/*----------------------------------------------------------------------------------* 	
 * Function : $(selector).inputToComma();
 * Desc : input box 숫자 입력 + ','생성 함수.
 * Parameter : 
 *				
 * Return : 변경된 데이터
 * ----------------------------------------------------------------------------------*/
(function($) {
	$.fn.inputToComma = function() {
		$(this).css('ime-mode', 'disabled').bind({

			keypress : function(event) {
				if (event.which && (event.which > 47 && event.which < 58 || event.which == 8)) {

				} else {
					if (event.which != 0) { // tab key의 경우를 우선 제외시켰음. by sunny.
						event.preventDefault();
					}
				}
			},
			keyup : function(event) {
				if (event.which != 9) {
					return $(this).val($.toComma($(this).val()));
				}
			},
			blur : function() {
				return $(this).val($.toComma($(this).val()));
			}
		});
	};
})(jQuery);
/*----------------------------------------------------------------------------------* 	
 * Function : $.toComma();
 * Desc : 금액형식을 만들어 주는 함수
 * Parameter : 
 *				
 * Return : 변경된 데이터
 * ----------------------------------------------------------------------------------*/
(function($) {
	$.toComma = function(val) {
		var inVal = val;
		inVal += "";
		var reVal = isNaN(parseInt(inVal.replace(/[^0-9]/g, ''))) ? 0 : parseInt(inVal.replace(/[^0-9]/g, ''));
		var reg = /(^[+-]?\d+)(\d{3})/;
		reVal += "";
		while (reg.test(reVal)) {
			reVal = reVal.replace(reg, '$1' + ',' + '$2');
		}
		return reVal;
	};
})(jQuery);

/*----------------------------------------------------------------------------------* 	
 * Function : $(selector).toEn();
 * Desc : input box 영문만 입력
 * Parameter : 
 *				
 * Return : 변경된 데이터
 * ----------------------------------------------------------------------------------*/
(function($) {
	$.fn.toEn = function() {
		$(this).css('ime-mode', 'disabled').bind({
			keyup : function(event) {
				var pattern = /[^(a-zA-Z)]/;
				if (pattern.test($(this).val())) {
					var eleid = $(this).attr("id");
					var style = {
						width : "300px", // 폭
						height : "100px", // 높이
						top : ($(window).height() / 2) - 150,
						left : ($(document).width() / 2) - 100,
						cursor : "default"
					};
					$.message.forLayer("영문만 입력 가능합니다.", eleid, style);
					$(this).val("");
					return;
				}
			}
		});
	};
})(jQuery);
/*----------------------------------------------------------------------------------* 	
 * Function : $(selector).inputToNum();
 * Desc : input box 숫자 입력
 * Parameter : 
 *				
 * Return : 변경된 데이터
 * ----------------------------------------------------------------------------------*/
(function($) {
	$.fn.inputToNum = function() {
		$(this).css('ime-mode', 'disabled').bind({
			keypress : function(event) {
				if (event.which && (event.which > 47 && event.which < 58 || event.which == 8 || event.which == 9)) {

				} else {
					event.preventDefault();
				}
			}
		});
	};
})(jQuery);

/*----------------------------------------------------------------------------------* 	
 * Function : $(selector).inputToNum();
 * Desc : input box 숫자, '-' 입력
 * Parameter : 
 *				계좌번호 입력
 * Return : 변경된 데이터
 * ----------------------------------------------------------------------------------*/
(function($) {
	$.fn.inputToDashNum = function() {
		$(this).css('ime-mode', 'disabled').bind({
			keypress : function(event) {
				// 숫자, 탭,백스페이스, '-'
				if (event.which && (event.which > 47 && event.which < 58 || event.which == 8 || event.which == 9 || event.which == 45)) {

				} else {
					event.preventDefault();
				}
			}
		});
	};
})(jQuery);
/*----------------------------------------------------------------------------------* 	
 * Function : $(selector).toEnNum();
 * Desc : input box 영문,숫자만 입력
 * Parameter : 
 *			ex) 예약번호
 * Return : 변경된 데이터
 * ----------------------------------------------------------------------------------*/
(function($) {
	$.fn.toUpprEnNum = function() {
		$(this).css('ime-mode', 'disabled').bind({
			keyup : function(event) {
				var pattern = /[^(a-zA-Z0-9)]/;
				if (pattern.test($(this).val())) {
					var eleid = $(this).attr("id");
					var style = {
						width : "300px", // 폭
						height : "100px", // 높이
						top : ($(window).height() / 2) - 150,
						left : ($(document).width() / 2) - 100,
						cursor : "default"
					};
					$.message.forLayer("영문, 숫자만 입력 가능합니다.", eleid, style);
					$(this).val("");
					return;
				} else {
					$(this).val($(this).val().toUpperCase());
				}
			}
		});
	};
})(jQuery);
/*----------------------------------------------------------------------------------* 	
 * Function : $(selector).toEnNum();
 * Desc : input box 영문(대소문자),숫자만 입력
 * Parameter : 		
 * Return : 변경된 데이터
 * ----------------------------------------------------------------------------------*/
(function($) {
	$.fn.toEnNum = function() {

		$(this).css('ime-mode', 'disabled').bind({
			keyup : function(event) {
				var pattern = /[^(a-zA-Z0-9)]/;
				if (pattern.test($(this).val())) {
					var eleid = $(this).attr("id");
					var style = {
						width : "300px", // 폭
						height : "100px", // 높이
						top : ($(window).height() / 2) - 150,
						left : ($(document).width() / 2) - 100,
						cursor : "default"
					};
					$.message.forLayer("영문, 숫자만 입력 가능합니다.", eleid, style);
					$(this).val("");
					return;
				}
			}
		});
	};
})(jQuery);
/*----------------------------------------------------------------------------------* 	
 * Function : $(selector).toEnNum();
 * Desc : input box 영문,숫자만 입력
 * Parameter : 
 *		ex) 항공사 ,목적지
 * Return : 변경된 데이터
 * ----------------------------------------------------------------------------------*/
(function($) {
	$.fn.toUpprEn = function() {
		$(this).css('ime-mode', 'disabled').bind({
			keyup : function(event) {
				var pattern = /[^(a-zA-Z)]/;
				if (pattern.test($(this).val())) {
					var eleid = $(this).attr("id");
					var style = {
						width : "300px", // 폭
						height : "100px", // 높이
						top : ($(window).height() / 2) - 150,
						left : ($(document).width() / 2) - 100,
						cursor : "default"
					};
					$.message.forLayer("영문만 입력 가능합니다.", eleid, style);
					$(this).val("");
					return;
				} else {
					$(this).val($(this).val().toUpperCase());
				}
			}
		});
	};
})(jQuery);
/*----------------------------------------------------------------------------------* 	
 * Function : $(selector).formClear();
 * Desc : 하위 전체 요소 (input box, check box, select box) 초기화
 * Parameter : 
 *				
 * Return : 
 * ----------------------------------------------------------------------------------*/
(function($) {
	$.fn.formClear = function() {
		var id = $(this).attr("id");
		// input box 초기화
		$("#" + id + " :input[type='text']").val("");
		// check box 초기화
		$("#" + id + " :input[type='checkbox']").attr("checked", false);
		// select box 초기화(첫번째 요소 선택)
		$("#" + id + " select").each(function(index) {
			var cboId = $(this).attr("id");
			$("#" + cboId + " option:eq(0)").attr("selected", true);
		});
		$("#" + id + " :input[type='textarea']").val("");
	};
})(jQuery);
/*----------------------------------------------------------------------------------* 	
 * Function : $.getDate(addYear, addMonth, addDay, token);
 * Desc : 날짜계산기
 * 		     아무것도 안던지면 오늘날짜 반환
 * 		     오늘일자 기준 년,월,일 +- 계산 
 * Parameter : addYear : 년도계산 +10, -10 등
 * 			   addMonth : 월계산 +10, -10 등
 * 			   addDay : 일자계산 +10, -10 등 
 * 			   token : 기본값 "-
 * Return : yyyy-mm-dd
 * ----------------------------------------------------------------------------------*/
(function($) {
	$.getDate = function(addYear, addMonth, addDay, token) {
		token = token == undefined || token == null ? "-" : token;
		addYear = addYear == null ? 0 : addYear;
		addMonth = addMonth == null ? 0 : addMonth;
		addDay = addDay == null ? 0 : addDay;

		var now = new Date();
		var ry = now.getFullYear();
		var rm = now.getMonth() + 1;
		var rd = now.getDate();

		if (addYear != 0) {// cal year
			ry = ry + addYear;
		}

		if (addMonth != 0) {// cal month
			var isRun = true;
			rm = rm + addMonth;
			while (isRun == true) {
				if (rm > 12) {
					ry++;
					rm = rm - 12;
				} else if (rm < 1) {
					ry--;
					rm = 12 + rm;
				}

				if (rm > 0 && rm < 13) {
					isRun = false;
				}
			}
		}

		var cal = new Date(ry, rm, 0);
		if (rd > cal.getDate()) {
			rd = cal.getDate();
		}
		if (addDay != 0) {
			rd = rd + addDay;
			if (rd > cal.getDate() || rd < 1) {
				var isRun = true;
				while (isRun == true) {
					if (rd > cal.getDate()) {
						rd = rd - cal.getDate();
						rm++;
						if (rm > 12) {
							ry++;
							rm = 1;
						}
					}
					if (rd < 1) {
						rm--;
						if (rm < 1) {
							ry--;
							rm = 12;
						}
						cal = new Date(ry, rm, 0);
						rd = cal.getDate() + rd;
					}

					cal = new Date(ry, rm, 0);
					if (rd <= cal.getDate() && rd >= 1) {
						isRun = false;
					}
				}
			}

			if (rd > cal.getDate() || rd < 1) {
				cal = new Date(ry, rm, 0);
			}
		}

		if (rm.toString().length < 2) {
			rm = '0' + rm;
		}
		if (rd.toString().length < 2) {
			rd = '0' + rd;
		}

		return ry + token + rm + token + rd;
	};
})(jQuery);
/*----------------------------------------------------------------------------------* 	
 * Function : $.nightsDay(from, to);
 * Desc : 일수 계산 함수 
 * Parameter : from : 시작일 (yyyy-mm-dd)
 * 			   to : 종료일 (yyyy-mm-dd)
 * Return : 두 날짜의 차이 일수
 * ----------------------------------------------------------------------------------*/
(function($) {
	$.getDateCalc = function(from, to) {
		// var fromArray = from.split("-");
		// var toArray = to.split("-");
		var fromDt = from.replace(/[^0-9]/g, "");
		var toDt = to.replace(/[^0-9]/g, "");
		var fromObj = new Date(fromDt.substr(0, 4), Number(fromDt.substr(4, 2)) - 1, fromDt.substr(6, 2));
		var toObj = new Date(toDt.substr(0, 4), Number(toDt.substr(4, 2)) - 1, toDt.substr(6, 2));
		var betweenDay = (toObj.getTime() - fromObj.getTime()) / 1000 / 60 / 60 / 24;
		return betweenDay;
	};
})(jQuery);
/*----------------------------------------------------------------------------------* 	
 * Function : $.progress();
 * Desc : 화면 로딩중 이미지
 * Parameter : 
 * Return : 
 * ----------------------------------------------------------------------------------*/
(function($) {
	$.uiBlockByGif = function(option) {
		// var left = ( $(window).scrollLeft() + ($(window).width() - $("#progressDiv").width()) / 2 );
		// var top = ( $(window).scrollTop() + ($(window).height() - $("#progressDiv").height()) / 2 );

		$('body').append(" <div id='progressDiv'></div>");

		$("#progressDiv").css({
			'position' : 'absolute',
			'width' : '100%',
			'height' : '100%',
			'top' : '0',
			'left' : '0',
			'z-index' : '9000',
			'display' : 'none',
			'cursor' : 'wait',
			'filter' : 'alpha(opacity=80)',
			'-khtml-opacity' : '0.8',
			'-moz-opacity' : '0.8',
			'opacity' : '0.8',
			'background-color' : '#FFFFFF',
			// 로딩이미지
			// 'background-image' : 'url("/imgs/progressbar/spinner.gif")',
			'background-attachment' : 'fixed',
			'background-repeat' : 'no-repeat'
		});

		var bgImgWidth = 0;
		var bgImgHeight = 0;
		var img = new Image;
		img.src = $('#progressDiv').css('background-image').replace(/url\(|\)$/ig, "");

		$(img).load(function() {
			bgImgWidth = img.width;
			bgImgHeight = img.height;
		});

		var left = ($(document).width() / 2) - (bgImgWidth / 2);
		var top = ($(window).height() / 2) - (bgImgHeight / 2);

		$("#progressDiv").css({
			'background-position' : parseInt(left) + 'px ' + parseInt(top) + 'px'
		});

		$("#progressDiv").ajaxStart(function() {
			$(this).fadeIn();
		}).ajaxStop(function() {
			$(this).fadeOut();
		});
	};
})(jQuery);

/*----------------------------------------------------------------------------------* 	
 * Function : $.uiBlockByJq('divId');
 * Desc : 화면 로딩중 이미지
 * Parameter : 
 * Return : 
 * ----------------------------------------------------------------------------------*/
(function($) {
	$.uiBlockByJq = function(value, cssOptions) {
		var message = $('#' + value).html();

		var css = {
			padding : 0,
			margin : 0,
			width : '30%',
			top : '40%',
			left : '35%',
			// textAlign : 'center',
			color : '#000',
			// border : '3px solid #aaa',
			// backgroundColor : '#fff',
			cursor : 'default'
		};

		var overlayCSS = {
			backgroundColor : '#000',
			opacity : 0.6,
			cursor : 'default'
		};

		if (typeof cssOptions != 'undefined' && typeof cssOptions.css != 'undefined') {
			$.extend(true, css, cssOptions.css);
		}
		if (typeof cssOptions != 'undefined' && typeof cssOptions.overlayCSS != 'undefined') {
			$.extend(true, overlayCSS, cssOptions.overlayCSS);
		}
		$.blockUI({
			message : message,
			css : css,
			overlayCSS : overlayCSS
		});
	};
})(jQuery);

/*----------------------------------------------------------------------------------* 	
 * Function : $.uiUnblockByJq();
 * Desc : 화면 로딩중 이미지
 * Parameter : 
 * Return : 
 * ----------------------------------------------------------------------------------*/
(function($) {
	$.uiUnblockByJq = function() {
		$.unblockUI();
	};
})(jQuery);

(function($) {
	$.menuToggle = function(closeBtn, openBtn, speed, options) {
		var openWrapWidth = $.util.intSize($('#k1_aside .k1_left_wrap').css('width'), 'px');
		var closeWrapWidth = $.util.intSize($('#k1_aside .k1_left_wrap_close').css('width'), 'px');

		var asideWidth = $.util.intSize($('#k1_aside').css('width'), 'px');
		var contWidth = $.util.intSize($('#k1_content_wrap').css('width'), 'px');
		var contMarginLeft = $.util.intSize($('#k1_content_wrap').css('margin-left'), 'px');

		$('#k1_aside button.' + closeBtn).bind('click', function() {
			var realContWidth = $.util.intSize($('#k1_content_wrap').css('width'), 'px');
			$('#k1_aside .k1_left_wrap').animate({
				width : closeWrapWidth
			}, speed, function() {
				$('#k1_aside .k1_left_wrap').hide();
				$('#k1_aside button.' + closeBtn).hide();
				$('#k1_aside .k1_left_wrap_close').show();
			});
			$('#k1_aside .left_menu').animate({
				opacity : 0
			}, speed);
			$('#k1_aside .h2_tit').animate({
				opacity : 0
			}, speed);
			$('#k1_aside').animate({
				width : (asideWidth - (openWrapWidth - closeWrapWidth))
			}, speed);
			$('#k1_content_wrap').animate({
				width : (realContWidth + (openWrapWidth - closeWrapWidth)),
				marginLeft : (contMarginLeft - (openWrapWidth - closeWrapWidth))
			}, speed, null, function() {
				if (!$.util.isNull(options) && !$.util.isNull(options.afterIn)) {
					options.afterIn();
				}
			});

			// $('.ifrm').contents().find('.k1_cont_bg').animate({
			// width : (contWidth + (openWrapWidth - closeWrapWidth) - 10)
			// }, speed, null, function() {
			// if (!$.util.isNull(options) && !$.util.isNull(options.afterIn)) {
			// options.afterIn();
			// }
			// });
		});
		$('#k1_aside .k1_left_wrap_close button.' + openBtn).bind('click', function() {
			var realContWidth = $.util.intSize($('#k1_content_wrap').css('width'), 'px');
			$('#k1_aside .k1_left_wrap').show();
			$('#k1_aside button.' + closeBtn).show();
			$('#k1_aside .k1_left_wrap_close').hide();
			$('#k1_aside .k1_left_wrap').animate({
				width : openWrapWidth
			}, speed, function() {

			});
			$('#k1_aside .left_menu').animate({
				opacity : 1
			}, speed);
			$('#k1_aside .h2_tit').animate({
				opacity : 1
			}, speed);
			$('#k1_aside').animate({
				width : asideWidth
			}, speed);
			$('#k1_content_wrap').animate({
				width : realContWidth - (openWrapWidth - closeWrapWidth),
				marginLeft : contMarginLeft
			}, speed, null, function() {
				if (!$.util.isNull(options) && !$.util.isNull(options.afterOut)) {
					options.afterOut();
				}
			});

			// $('.ifrm').contents().find('.k1_cont_bg').animate({
			// width : contWidth - 10
			// }, speed, null, function() {
			// if (!$.util.isNull(options) && !$.util.isNull(options.afterOut)) {
			// options.afterOut();
			// }
			// });
		});
	};
})(jQuery);

/*----------------------------------------------------------------------------------* 	
 * Function : $.cssChange();
 * Desc : 프로젝트 구분 별로 css 변경
 * Parameter : cssOption (프로젝트명)
 * Return : 
 * ----------------------------------------------------------------------------------*/
(function($) {
	$.cssChange = function(cssOption) {
		switch (cssOption) {
		case "vof":
			$(".ui-widget-header").css({
				"background" : "url(/imgs/popup/bg_ptit.gif) repeat-x", /* by c7 (1-1번) */
				"border" : "#0c3a97 1px solid", /* by c7 (1-2번) */
				"color" : "#FFFFFF", /* by c7 (1-3번) */
				"height" : "30px",
				"font-weight" : "bold"
			});

			$(".ui-widget-header .ui-state-default").css({
				"background" : "", /* (모든 설정을 막음) by c7 (2번) */
				"font-weight" : "",
				"color" : ""
			});

			$(".ui-dialog").css({
				"position" : "absolute",
				"padding" : "0 0 0 0", /* by c7 (3-1번) */
				"outline" : "0",
				"border" : "#4272d4 1px solid" /* by c7 (3-2번) */

			});

			$(".ui-dialog .ui-dialog-title").css({
				"background" : "url(/imgs/popup/bul_popup.gif) no-repeat 7px 3px", /* by c7 (4-1번) */
				"font-family" : "'돋움', Dotum, '굴림', Gulim, AppleGothic, sans-serif",
				"color" : "#ffffff",
				"font-size" : "14px",
				"font-weight" : "bold",
				"padding-left" : "23px",
				"margin-top" : "7px",
				"float" : "left",
				"white-space" : "nowrap",
				"width" : "90%",
				"overflow" : "hidden",
				"text-overflow" : "ellipsis"
			});

			$(".ui-dialog .ui-dialog-titlebar-close").css({
				"background" : "url(/imgs/btn/btn_p_close.gif) no-repeat 2px 2px", /* by c7 (5번) */
				"position" : "absolute",
				"right" : ".3em",
				"top" : "50%",
				"width" : "21px",
				"margin" : "-10px 0 0 0",
				"padding" : "1px",
				"height" : "20px"
			});

			break;
		}
	};
})(jQuery);