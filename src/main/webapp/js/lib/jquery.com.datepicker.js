/*--------------------------------------------------*
 * Function : $(selector).calendar();
 * Desc : 기본 달력
 * Parameter : option.yearRange : 년도 콤보 범위 지정 옵션
 * 				ex) 2002-2020 -> '2002:2020'
 * Return :
 *--------------------------------------------------*/
(function($) {
	$.fn.calendar = function(design, option) {
		var showon = 'both';
		var year_range = 'c-10:c+10';
		var dateFormat_fmt = 'yy-mm-dd';

		if (!$.util.isNull(option) && !$.util.isNull(option.showon)) {
			showon = option.showon;
		}
		if (!$.util.isNull(option) && !$.util.isNull(option.yearRange)) {
			year_range = option.yearRange;
		}

		if (!$.util.isNull(option) && !$.util.isNull(option.deteformat)) {
			dateFormat_fmt = option.deteformat; // 날짜형식
		}

		$(this).datepicker({
			dateFormat : dateFormat_fmt // 날짜형식

			,
			showOn : showon // both : 버튼과 필드 모두 캘린더를 보여준다. button : 버튼만 보이게 한다..
			,
			showAnim : '' // slideDown/fadeIn/blind/bounce/clip/drop/fold/slide
			,
			showOtherMonths : true // 공백에 이전, 이후 날짜 표시
			,
			buttonImage : '/air/imgs/airA/btn/btn_calendar_m.gif' // 우측 달력
			// icon 의
			// 이미지
			// 패스,수정(jisuk)
			,
			buttonImageOnly : true // inputbox 뒤에 달력icon만 표시한다. ('...' 표시생략)
			,
			changeMonth : true // 월선택 select box 표시 (기본은 false)
			,
			changeYear : true // 년선택 selectbox 표시 (기본은 false)
			// ,showButtonPanel: true// 하단 today, done 버튼기능 추가 표시 (기본은 false)
			,
			numberOfMonths : 1 // 달력 갯수
			,
			yearRange : year_range,
			buttonText : "달력",
			design : design,
			beforeShowDay : function(day) {
				var result;
				switch (day.getDay()) {
				case 0: // 일요일
					result = [ true, "date-sunday" ];
					break;
				case 6: // 토요일
					result = [ true, "date-saturday" ];
					break;
				default:
					result = [ true, "" ];
					break;
				}
				return result;
			},
			onSelect : function(selectedDate) {
				if (typeof design.onselect == 'function') {
					design.onselect(selectedDate);
				}
			}
		});
		// css변경
		$.gfnDpCss(design);
		// 자동으로 생성되는 div객체 숨김
		$(".ui-datepicker").hide();
		$(".ui-datepicker-trigger").css('cursor', 'pointer');
	};
})(jQuery);

/*--------------------------------------------------------------------------------------*
 * Function : $(selector).usecal(json);
 * Desc : 사용자 설정 달력
 * Parameter : {
 * 				nummons : 달력 갯수 (default:3)
 * 			  , select : 년, 월 selectBox선택여부[년, 월](default:true,true)
 * 			  , mindate : 현재 날짜 이전 선택 금지 (-1:이전 날짜, +0:현재날짜, +1:다음 날짜)
 *            , maxdate : 지정한 날짜 이후 선택 금지 (-1:이전 날짜, +0:현재날짜, +1:다음 날짜)
 *			  , deteformat : 날짜형식 (default:yy-mm-dd)
 *			  , beforeShowDayWeek beforeShowDay 실행하기 위한 값 (1: 요일선택)
 * 			  , beforeShowDay : 선택 요일 배열(일:0,월:1,화:2,수:3,목:4,금:5,토:6)
 * 			  , yearRange : 년도 콤보 범위 지정 옵션 ex) 2002-2020 -> '2002:2020'
 *				}
 * Return :
 *--------------------------------------------------------------------------------------*/
(function($) {
	$.fn.usecal = function(arr, design) {
		$.trim(arr) == "" ? arr = "" : arr;
		$.trim(design) == "" ? design = "" : design;
		var yearb;
		var monb;
		if ($.trim(arr.select) == "") {
			yearb = false;
			monb = false;
		} else {
			$.trim(arr.select[0]) == "" ? yearb = false : yearb = arr.select[0];
			$.trim(arr.select[1]) == "" ? monb = false : monb = arr.select[1];
		}
		var year_range = 'c-10:c+10';
		if (!$.util.isNull(arr) && !$.util.isNull(arr.yearRange)) {
			year_range = arr.yearRange;
		}
		$(this).datepicker({
			dateFormat : ($.trim(arr.deteformat) == "" ? 'yy-mm-dd' : arr.deteformat) // 날짜형식
			,
			showOn : ($.trim(arr.dtlaypop) == "" ? 'both' : '') // both : 버튼과 필드
			// 모두 캘린더를 보여준다.
			// button : 버튼만
			// 보이게 한다..
			,
			showAnim : '' // slideDown/fadeIn/blind/bounce/clip/drop/fold/slide
			,
			showOtherMonths : true // 공백에 이전, 이후 날짜 표시
			,
			buttonImage : '/air/imgs/airA/btn/btn_calendar_b2b.gif' // 우측 달력
			// icon 의
			// 이미지 path
			// 수정(jisuk)
			,
			buttonImageOnly : true // inputbox 뒤에 달력icon만 표시한다. ('...' 표시생략)
			,
			changeMonth : monb // 월선택 select box 표시 (기본은 false)
			,
			changeYear : yearb // 년선택 select box 표시 (기본은 false)
			// ,showButtonPanel: true// 하단 today, done 버튼기능 추가 표시 (기본은 false)
			,
			numberOfMonths : ($.trim(arr.nummons) == "" ? 3 : arr.nummons) // 달력
			// 갯수
			,
			stepMonths : ($.trim(arr.nummons) == "" ? 3 : arr.nummons) // next,
			// prev
			// 버튼을
			// 클릭했을때
			// 얼마나
			// 많은 월을
			// 이동하여
			// 표시하는가.
			,
			yearRange : year_range,
			buttonText : "달력",
			dtlaypop : ($.trim(arr.dtlaypop) == "" ? false : arr.dtlaypop),
			design : design,
			onSelect : function(selectedDate) {
				if ($.trim(arr.dtlaypop) != "") {
					if ($("input:radio[name='rdo_popInterval']:checked").val() == "1") {
						$("#txt_popInterval1").val(selectedDate);
						// $(this).datepicker("option", "maxDate",
						// selectedDate);
					} else if ($("input:radio[name='rdo_popInterval']:checked").val() == "2") {
						$("#txt_popInterval2").val(selectedDate);
						// $(this).datepicker("option", "minDate",
						// selectedDate);
					}
				}
				// 날짜선택 후 함수실행
				if ($.trim(arr.onselect) != "") {
					arr.onselect(this);
				}
			},
			beforeShowDay : function(day) {
				var result;
				switch (day.getDay()) {
				case 0: // 일요일
					result = [ true, "date-sunday" ];
					break;
				case 6: // 토요일
					result = [ true, "date-saturday" ];
					break;
				default:
					result = [ true, "" ];
					break;
				}
				// 요일 선택을 위한 로직, beforeShowDayWeek 1일 경우에만 실행.
				if ($.trim(arr.beforeShowDayWeek) == "1") {
					result = [ false, "" ];
					var showDay = "";
					for ( var i = 0; i < $.trim(arr.beforeShowDay).length; i++) {
						switch (String($.trim(arr.beforeShowDay)[i])) {
						case "일":
							showDay = 0;
							break;
						case "월":
							showDay = 1;
							break;
						case "화":
							showDay = 2;
							break;
						case "수":
							showDay = 3;
							break;
						case "목":
							showDay = 4;
							break;
						case "금":
							showDay = 5;
							break;
						case "토":
							showDay = 6;
							break;
						}
						if (String(day.getDay()) == String(showDay)) {
							result = [ true, "" ];
							break;
						}
					}
				}
				return result;
			}
		});
		if ($.trim(arr.mindate) != "") {
			$(this).datepicker("option", "minDate", arr.mindate + "d");
		}
		if ($.trim(arr.maxdate) != "") {
			$(this).datepicker("option", "maxDate", arr.maxdate + "d");
		}
		// 자동으로 생성되는 div객체 숨김
		$(".ui-datepicker").hide();
		if ($.trim(arr.dtlaypop) != "") {
			// popup size 변경
			// $("#k1_calendar_group").css("height", "275px");

			// 출국일자 radio
			$("#rdo_popInterval1").unbind("click");
			$("#rdo_popInterval1").click(function() {
				$.gfnDpReDate({
					gubun : "from",
					mindate : arr.mindate,
					maxdate : arr.maxdate,
					beforeShowDayWeek : (typeof arr.beforeShowDayWeek != 'undefined') ? arr.beforeShowDayWeek : '',
					beforeShowDay : (typeof arr.beforeShowDay != 'undefined') ? arr.beforeShowDay : ''

				}, design);
			});
			// 귀국일자 radio
			$("#rdo_popInterval2").unbind("click");
			$("#rdo_popInterval2").click(function() {
				$.gfnDpReDate({
					gubun : "to",
					mindate : arr.mindate,
					maxdate : arr.maxdate,
					beforeShowDayWeek : (typeof arr.beforeShowDayWeek != 'undefined') ? arr.beforeShowDayWeek : '',
					beforeShowDay : (typeof arr.beforeShowDay != 'undefined') ? arr.beforeShowDay : ''

				}, design);
			});
			// 출국일자 input
			$("#txt_popInterval1").unbind("click");
			$("#txt_popInterval1").click(function() {
				$("input:radio[id='rdo_popInterval1']").attr("checked", true);
				$.gfnDpReDate({
					gubun : "from",
					mindate : arr.mindate,
					maxdate : arr.maxdate,
					beforeShowDayWeek : (typeof arr.beforeShowDayWeek != 'undefined') ? arr.beforeShowDayWeek : '',
					beforeShowDay : (typeof arr.beforeShowDay != 'undefined') ? arr.beforeShowDay : ''

				}, design);
			});
			// 귀국일자 input
			$("#txt_popInterval2").unbind("click");
			$("#txt_popInterval2").click(function() {
				$("input:radio[id='rdo_popInterval2']").attr("checked", true);
				$.gfnDpReDate({
					gubun : "to",
					mindate : arr.mindate,
					maxdate : arr.maxdate,
					beforeShowDayWeek : (typeof arr.beforeShowDayWeek != 'undefined') ? arr.beforeShowDayWeek : '',
					beforeShowDay : (typeof arr.beforeShowDay != 'undefined') ? arr.beforeShowDay : ''

				}, design);
			});
		}
		design.usewidth = false;
		if (arr.nummons == 2) {
			design.usewidth = true;
		}
		// css변경
		$.gfnDpCss(design);
		$(".ui-datepicker-trigger").css('cursor', 'pointer');
	};
})(jQuery);

/*------------------------------------------------------------------------------------*
 * Function : $(selector).validcal(json);
 * Desc : 사용자 설정 달력 + validation 체크 시작일, 종료일 날짜선택을 제어를 할 수 있다.
 * Parameter : { toid : 대상 id
 * 			   , nummons : 달력 갯수 (default:3)
 * 			   , select : 년, 월 selectBox선택여부[년, 월](default:true,true)
 * 			   , mindate : 현재 날짜 이전 선택 금지 (-1:이전 날짜, +0:현재날짜, +1:다음 날짜)
 *             , maxdate : 지정한 날짜 이후 선택 금지 (-1:이전 날짜, +0:현재날짜, +1:다음 날짜)
 * 			   , deteformat : 날짜형식 (default:yy-mm-dd)
 * 			   , beforeShowDayWeek beforeShowDay 실행하기 위한 값 (1:시작일, 2:종료일, 3:시작일+종료일)
 * 			   , beforeShowDay : 선택 요일 배열(일:0,월:1,화:2,수:3,목:4,금:5,토:6)
 * 			   , yearRange : 년도 콤보 범위 지정 옵션 ex) 2002-2020 -> '2002:2020'
 * 			   }
 * Return :
 *------------------------------------------------------------------------------------*/
(function($) {
	$.fn.validcal = function(arr, design) {
		$.trim(arr) == "" ? arr = "" : arr;
		$.trim(design) == "" ? design = "" : design;
		var from = $(this);
		var yearb;
		var monb;

		if ($.trim(arr.select) == "") {
			yearb = false;
			monb = false;
		} else {
			$.trim(arr.select[0]) == "" ? yearb = false : yearb = arr.select[0];
			$.trim(arr.select[1]) == "" ? monb = false : monb = arr.select[1];
		}
		var year_range = 'c-10:c+10';
		if (!$.util.isNull(arr) && !$.util.isNull(arr.yearRange)) {
			year_range = arr.yearRange;
		}
		$(this).datepicker({
			dateFormat : ($.trim(arr.dateformat) == "" ? 'yy-mm-dd' : arr.dateformat) // 날짜형식
			,
			showOn : 'both' // both : 버튼과 필드 모두 캘린더를 보여준다. button : 버튼만 보이게 한다..
			,
			showOtherMonths : true // 공백에 이전, 이후 날짜 표시
			,
			showAnim : '' // slideDown/fadeIn/blind/bounce/clip/drop/fold/slide
			,
			buttonImage : '/air/imgs/airA/btn/btn_calendar_m.gif' // 우측 달력
			// icon 의
			// 이미지
			// path(jisuk)
			,
			buttonImageOnly : true // inputbox 뒤에 달력icon만 표시한다. ('...' 표시생략)
			,
			changeMonth : monb // 월선택 select box 표시 (기본은 false)
			,
			changeYear : yearb // 년선택 selectbox 표시 (기본은 false)
			// ,showButtonPanel: true // 하단 today, done 버튼기능 추가 표시 (기본은 false)
			// , minDate : "+0d" // 오늘날짜 이전은 선택 못 함
			,
			numberOfMonths : ($.trim(arr.nummons) == "" ? 3 : arr.nummons) // 달력
			// 갯수
			,
			stepMonths : ($.trim(arr.nummons) == "" ? 3 : arr.nummons) // next,
			// prev
			// 버튼을
			// 클릭했을때
			// 얼마나
			// 많은 월을
			// 이동하여
			// 표시하는가.
			,
			yearRange : year_range,
			buttonText : "달력",
			design : design,
			onSelect : function(selectedDate) {
				$("#" + arr.toid).datepicker("option", "minDate", selectedDate);
				// 날짜선택 후 함수실행
				if ($.trim(arr.onselect) != "") {
					arr.onselect(this);
				}
			},
			beforeShowDay : function(day) {
				var result;
				switch (day.getDay()) {
				case 0: // 일요일
					result = [ true, "date-sunday" ];
					break;
				case 6: // 토요일
					result = [ true, "date-saturday" ];
					break;
				default:
					result = [ true, "" ];
					break;
				}

				// 요일 선택을 위한 로직, beforeShowDayWeek 1일 경우에만 실행.
				if ($.trim(arr.beforeShowDayWeek) == "1" || $.trim(arr.beforeShowDayWeek) == "3") {
					result = [ false, "" ];
					var showDay = "";
					for ( var i = 0; i < $.trim(arr.beforeShowDay).length; i++) {
						switch (String($.trim(arr.beforeShowDay)[i])) {
						case "일":
							showDay = 0;
							break;
						case "월":
							showDay = 1;
							break;
						case "화":
							showDay = 2;
							break;
						case "수":
							showDay = 3;
							break;
						case "목":
							showDay = 4;
							break;
						case "금":
							showDay = 5;
							break;
						case "토":
							showDay = 6;
							break;
						}
						if (String(day.getDay()) == String(showDay)) {
							result = [ true, "" ];
							break;
						}
					}
				}
				return result;
			},
			beforeShow : (typeof arr.beforeShowFnc == 'function') ? arr.beforeShowFnc : null,
			onClose : (typeof arr.onCloseFnc == 'function') ? arr.onCloseFnc : null

		});

		if ($.trim(arr.toid) != "") {
			$("#" + arr.toid).datepicker({ // inputbox 의 id
				dateFormat : ($.trim(arr.dateformat) == "" ? 'yy-mm-dd' : arr.dateformat) // 날짜형식
				,
				showOn : 'both' // both : 버튼과 필드 모두 캘린더를 보여준다. button : 버튼만 보이게
				// 한다..
				,
				showAnim : '' // slideDown/fadeIn/blind/bounce/clip/drop/fold/slide
				,
				showOtherMonths : true // 공백에 이전, 이후 날짜 표시
				,
				buttonImage : '/air/imgs/airA/btn/btn_calendar_m.gif' // 우측 달력
				// icon
				// 의 이미지
				// path
				,
				buttonImageOnly : true // inputbox 뒤에 달력icon만 표시한다. ('...'
				// 표시생략)
				,
				changeMonth : monb // 월선택 select box 표시 (기본은 false)
				,
				changeYear : yearb // 년선택 selectbox 표시 (기본은 false)
				// ,showButtonPanel: true // 하단 today, done 버튼기능 추가 표시 (기본은
				// false)
				// , minDate : "+0d" // 오늘날짜 이전은 선택 못 함
				,
				numberOfMonths : ($.trim(arr.nummons) == "" ? 3 : arr.nummons) // 달력
				// 갯수
				,
				stepMonths : ($.trim(arr.nummons) == "" ? 3 : arr.nummons) // next,
				// prev
				// 버튼을
				// 클릭했을때
				// 얼마나
				// 많은
				// 월을
				// 이동하여
				// 표시하는가.
				,
				yearRange : year_range,
				buttonText : "달력",
				design : design,
				onSelect : function(selectedDate) {
					$("#" + from.attr("id")).datepicker("option", "maxDate", selectedDate);
					// 날짜선택 후 함수실행
					if ($.trim(arr.onselect) != "") {
						arr.onselect(this);
					}
				},
				beforeShowDay : function(day) {
					var result;
					switch (day.getDay()) {
					case 0: // 일요일
						result = [ true, "date-sunday" ];
						break;
					case 6: // 토요일
						result = [ true, "date-saturday" ];
						break;
					default:
						result = [ true, "" ];
						break;
					}

					// 요일 선택을 위한 로직, beforeShowDayWeek 1일 경우에만 실행.
					if ($.trim(arr.beforeShowDayWeek) == "2" || $.trim(arr.beforeShowDayWeek) == "3") {
						result = [ false, "" ];
						var showDay = "";
						for ( var i = 0; i < $.trim(arr.beforeShowDay).length; i++) {
							switch (String($.trim(arr.beforeShowDay)[i])) {
							case "일":
								showDay = 0;
								break;
							case "월":
								showDay = 1;
								break;
							case "화":
								showDay = 2;
								break;
							case "수":
								showDay = 3;
								break;
							case "목":
								showDay = 4;
								break;
							case "금":
								showDay = 5;
								break;
							case "토":
								showDay = 6;
								break;
							}
							if (String(day.getDay()) == String(showDay)) {
								result = [ true, "" ];
								break;
							}
						}
					}
					return result;
				},
				beforeShow : (typeof arr.beforeShowFnc == 'function') ? arr.beforeShowFnc : null,
				onClose : (typeof arr.onCloseFnc == 'function') ? arr.onCloseFnc : null
			});
		}

		if ($.trim(arr.mindate)) {
			$(this).datepicker("option", "minDate", arr.mindate + "d");
			if ($.trim(arr.toid) != "") {
				$("#" + arr.toid).datepicker("option", "minDate", arr.mindate + "d");
			}
		}
		if ($.trim(arr.maxdate)) {
			$(this).datepicker("option", "maxDate", arr.maxdate + "d");
			if ($.trim(arr.toid) != "") {
				$("#" + arr.toid).datepicker("option", "maxDate", arr.maxdate + "d");
			}
		}
		// 자동으로 생성되는 div객체 숨김
		$(".ui-datepicker").hide();
		// css변경
		design.usewidth = false;
		if (arr.nummons == 2) {
			design.usewidth = true;
		}
		$.gfnDpCss(design);
		// $.cssChange("vof");
		$(".ui-datepicker-trigger").css('cursor', 'pointer');
	};
})(jQuery);
// layer popup - 출국, 귀국일자 체크
(function($) {
	$.gfnDpValid = function(arr, design) {
		if ($.trim($("#txt_popInterval1").val()) == "") {
			alert("출국일자를 선택해 주세요");
			$("input:radio[id='rdo_popInterval1']").attr("checked", true);
			arr.gubun = "from";
			$.gfnDpReDate(arr, design);
			return false;
		} else if ($.trim($("#txt_popInterval2").val()) == "") {
			alert("귀국일자를 선택해 주세요");
			$("input:radio[id='rdo_popInterval2']").attr("checked", true);
			arr.gubun = "to";
			$.gfnDpReDate(arr, design);
			return false;
		}
		return true;
	};
})(jQuery);
// layer popup - div1 : maskdiv id, div2 : calendar id, btn: button click여부
// (layer popup 제어)
(function($) {
	$.gfnDpMask = function(div1, div2, btn) {
		$("#" + div2).toggle();
		if (btn) {
			$("#" + div2).hide();
			$("#" + div1).hide();
			return;
		}
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
		$("#" + div1).css({
			'width' : maskWidth,
			'height' : maskHeight
		});
		$("#" + div1).show();
		$("#" + div1).unbind("click");
		$("#" + div1).click(function(e) {
			$("#" + div2).hide();
			$(this).hide();
		});
	};
})(jQuery);

// layer popup - datepicker 재 생성
// - param1 : {from : 출국일자, to : 귀국일자, gubun : from, to 구분, mindate : 이전일 선택 제한,
// maxdate : 다음일 선택제한, dtlaypop:layer popup 달력일 경우 true}
// - parma2 : {siteType : 사이트 타입}
(function($) {
	$.gfnDpReDate = function(arr, design) {
		$("#div_datepicker").datepicker("destroy");
		$("#div_datepicker").usecal({
			nummons : 3,
			mindate : arr.mindate,
			maxdate : arr.maxdate,
			dtlaypop : true,
			beforeShowDayWeek : (typeof arr.beforeShowDayWeek != 'undefined') ? arr.beforeShowDayWeek : '',
			beforeShowDay : (typeof arr.beforeShowDay != 'undefined') ? arr.beforeShowDay : ''

		}, design);
		if (arr.gubun == "from") {
			if ($.trim(arr.mindate) != "") {
				$("#div_datepicker").datepicker("option", "minDate", arr.mindate + "d");
			}
			if ($.trim($("#txt_popInterval2").val()) == "") {
				if ($.trim(arr.maxdate) != "") {
					$("#div_datepicker").datepicker("option", "maxDate", arr.maxdate + "d");
				}
			} else {
				$("#div_datepicker").datepicker("option", "maxDate", $.trim($("#txt_popInterval2").val()));
			}
		} else if (arr.gubun == "to") {
			if ($.trim($("#txt_popInterval1").val()) == "") {
				if ($.trim(arr.mindate) != "") {
					$("#div_datepicker").datepicker("option", "minDate", arr.mindate + "d");
				}
			} else {
				$("#div_datepicker").datepicker("option", "minDate", $.trim($("#txt_popInterval1").val()));
			}
			if ($.trim(arr.maxdate) != "") {
				$("#div_datepicker").datepicker("option", "maxDate", arr.maxdate + "d");
			}
		}

		// css변경
		$.gfnDpCss(design);
		$(".ui-datepicker-trigger").css('cursor', 'pointer');
	};
})(jQuery);

// layer popup
// - param1 : {from : 출국일자, to : 귀국일자, gubun : from, to 구분, mindate : 이전일 선택 제한,
// maxdate : 다음일 선택제한, dtlaypop:layer popup 달력일 경우 true}
// - parma2 : {siteType : 사이트 타입}
(function($) {
	$.gfnDpDefult = function(arr, design) {
		$("#txt_popInterval1").val(arr.from);
		$("#txt_popInterval2").val(arr.to);
		// if ($.trim(from) != "" && $.trim(to) != "") {
		if (arr.gubun == "from") {
			$.gfnDpReDate(arr, design);
			$("input:radio[id='rdo_popInterval1']").attr("checked", true);
		} else if (arr.gubun == "to") {
			$.gfnDpReDate(arr, design);
			$("input:radio[id='rdo_popInterval2']").attr("checked", true);
		}
		// }
	};
})(jQuery);

// datepicker css 변경
(function($) {
	$.gfnDpCss = function(design) {
		var theme = 'A';
		if (typeof gTheme != 'undefined' && gTheme != null && gTheme != '') {
			theme = gTheme;
		}

		var b2cTheme = {
			triggerImg : {
				A : '/air/imgs/airA/btn/btn_calendar_m.gif',
				B : '/air/imgs/airB/btn/btn_calendar_m.gif',
				C : '/air/imgs/airC/btn/btn_calendar_m.gif',
				D : '/air/imgs/airD/btn/btn_calendar_m.gif',
				E : '/air/imgs/airE/btn/btn_calendar_m.gif'
			},
			calPrevImg : {
				A : '/air/wfw/imgs/airA/btn/btn_cal_arrow_prev.gif',
				B : '/air/wfw/imgs/airB/btn/btn_cal_arrow_prev.gif',
				C : '/air/wfw/imgs/airC/btn/btn_cal_arrow_prev.gif',
				D : '/air/wfw/imgs/airD/btn/btn_cal_arrow_prev.gif',
				E : '/air/wfw/imgs/airE/btn/btn_cal_arrow_prev.gif'
			},
			calNextImg : {
				A : '/air/wfw/imgs/airA/btn/btn_cal_arrow_next.gif',
				B : '/air/wfw/imgs/airB/btn/btn_cal_arrow_next.gif',
				C : '/air/wfw/imgs/airC/btn/btn_cal_arrow_next.gif',
				D : '/air/wfw/imgs/airD/btn/btn_cal_arrow_next.gif',
				E : '/air/wfw/imgs/airE/btn/btn_cal_arrow_next.gif'
			},
			frameBorderCss : {
				A : '2px solid #4d95c9',
				B : '2px solid #4d95c9',
				C : '2px solid #4d95c9',
				D : '2px solid #4d95c9',
				E : '2px solid #4d95c9'
			},
			headerCss : {
				A : 'url(/air/imgs/airA/popup/bul_popup.gif) 10px 10px no-repeat #4d95c9',
				B : 'url(/air/imgs/airB/popup/bul_popup.gif) 10px 10px no-repeat #4d95c9',
				C : 'url(/air/imgs/airC/popup/bul_popup.gif) 10px 10px no-repeat #4d95c9',
				D : 'url(/air/imgs/airD/popup/bul_popup.gif) 10px 10px no-repeat #4d95c9',
				E : 'url(/air/imgs/airE/popup/bul_popup.gif) 10px 10px no-repeat #4d95c9'
			},
			titleBarBackgroundColor : {
				A : '#4D95C9',
				B : '#4D95C9',
				C : '#4D95C9',
				D : '#4D95C9',
				E : '#4D95C9'
			},
			titleBarBorderCss : {
				A : '1px solid #3279AD',
				B : '1px solid #3279AD',
				C : '1px solid #3279AD',
				D : '1px solid #3279AD',
				E : '1px solid #3279AD'
			}
		};

		var btmsTheme = {
			triggerImg : {
				A : '/air/imgs/airA/btn/btn_btms_calendar.gif',
				B : '/air/imgs/airB/btn/btn_btms_calendar.gif',
				C : '/air/imgs/airC/btn/btn_btms_calendar.gif',
				D : '/air/imgs/airD/btn/btn_btms_calendar.gif',
				E : '/air/imgs/airE/btn/btn_btms_calendar.gif'
			}
		};

		var htlTheme = {
			triggerImg : {
				A : '/htl/imgs/htlA/btn/btn_calendar_m.gif',
				B : '/htl/imgs/htlB/btn/btn_calendar_m.gif',
				C : '/htl/imgs/htlC/btn/btn_calendar_m.gif',
				D : '/htl/imgs/htlD/btn/btn_calendar_m.gif',
				E : '/htl/imgs/htlE/btn/btn_calendar_m.gif'
			},
			calPrevImg : {
				A : '/htl/wfw/imgs/airA/btn/btn_cal_arrow_prev.gif',
				B : '/htl/wfw/imgs/airB/btn/btn_cal_arrow_prev.gif',
				C : '/htl/wfw/imgs/airC/btn/btn_cal_arrow_prev.gif',
				D : '/htl/wfw/imgs/airD/btn/btn_cal_arrow_prev.gif',
				E : '/htl/wfw/imgs/airE/btn/btn_cal_arrow_prev.gif'
			},
			calNextImg : {
				A : '/htl/wfw/imgs/airA/btn/btn_cal_arrow_next.gif',
				B : '/htl/wfw/imgs/airB/btn/btn_cal_arrow_next.gif',
				C : '/htl/wfw/imgs/airC/btn/btn_cal_arrow_next.gif',
				D : '/htl/wfw/imgs/airD/btn/btn_cal_arrow_next.gif',
				E : '/htl/wfw/imgs/airE/btn/btn_cal_arrow_next.gif'
			},
			frameBorderCss : {
				A : '2px solid #4d95c9',
				B : '2px solid #4d95c9',
				C : '2px solid #4d95c9',
				D : '2px solid #4d95c9',
				E : '2px solid #4d95c9'
			},
			headerCss : {
				A : 'url(/air/imgs/htlA/popup/bul_popup.gif) 10px 10px no-repeat #4d95c9',
				B : 'url(/air/imgs/htlB/popup/bul_popup.gif) 10px 10px no-repeat #4d95c9',
				C : 'url(/air/imgs/htlC/popup/bul_popup.gif) 10px 10px no-repeat #4d95c9',
				D : 'url(/air/imgs/htlD/popup/bul_popup.gif) 10px 10px no-repeat #4d95c9',
				E : 'url(/air/imgs/htlE/popup/bul_popup.gif) 10px 10px no-repeat #4d95c9'
			},
			titleBarBackgroundColor : {
				A : '#4D95C9',
				B : '#4D95C9',
				C : '#4D95C9',
				D : '#4D95C9',
				E : '#4D95C9'
			},
			titleBarBorderCss : {
				A : '1px solid #3279AD',
				B : '1px solid #3279AD',
				C : '1px solid #3279AD',
				D : '1px solid #3279AD',
				E : '1px solid #3279AD'
			}
		};

		$.trim(design) == "" ? design = "" : design;
		// 디자인 변경
		$("#k1_pop_wrap .popup").css('backgroundColor', '#ffffff');
		$("#k1_pop_wrap").css('zIndex', 999999999);
		switch ($.trim(design.siteType)) {
		case "b2c":
			$(".ui-datepicker-trigger").attr("src", "/air/imgs/airA/btn/btn_calendar_m.gif"); // 달력
			// 이미지,수정(jisuk)
			$("#k1_pop_wrap .contents #k1_calendar_group").css("height", "240px"); // 달력
			// 높이

			// 전체 테두리 색 변경
			$("#k1_pop_wrap .popup").css("border", (b2cTheme['frameBorderCss'])[theme]);
			// header css 변경
			$("#k1_pop_wrap .popup .header").css("background", (b2cTheme['headerCss'])[theme]);// 수정(jisuk)
			// 이전, 다음 버튼 이미지
			$("input.cal_prev").attr("src", (b2cTheme['calPrevImg'])[theme]);// 수정(jisuk)
			$("input.cal_next").attr("src", (b2cTheme['calNextImg'])[theme]);// 수정(jisuk)
			// 년, 월 표시부분 css 변경
			$("#k1_calendar_group .calendar_wrap .cal_date").css({
				"background" : (b2cTheme['titleBarBackgroundColor'])[theme],
				"border" : (b2cTheme['titleBarBorderCss'])[theme]
			});
			break;
		case "b2b":
			$(".ui-datepicker-trigger").attr("src", "/air/imgs/airA/btn/btn_calendar_b2b.gif"); // 달력
			// 이미지,수정(jisuk)

			if ($("#k1_date_wrap_1").css("width") !== undefined) {
				$(".popup").has("#k1_date_wrap_1").parent().css("width", "235px");
			}
			$("#k1_pop_wrap .contents #k1_calendar_group").css("height", "280px"); // 달력
			// 높이

			break;
		case "vof":
			$(".ui-datepicker-trigger").attr("src", "/vof/imgs/btn/btn_calendar.gif"); // 달력
			// 이미지,수정(jisuk)

			$("#k1_pop_wrap .popup .header").addClass('k1_pop_header2');
			$("#k1_pop_wrap .popup .contents").addClass('k1_pop_container2');
			$("#k1_pop_wrap .popup .header .close").addClass('k1_pop_close');

			if ($("#k1_date_wrap_1").css("width") !== undefined) {
				$(".popup").has("#k1_date_wrap_1").parent().css("width", "235px");
			}

			// $("#k1_pop_wrap .contents #k1_calendar_group").css("height", "240px"); // 달력 높이
			// $("#k1_pop_wrap .popup").css("padding", "0px"); // 달력 padding
			// $("#k1_pop_wrap .header").css("border", "0px"); // 달력 header
			// border
			// $("#k1_pop_wrap .header h1.tit").css({
			// "padding" : "0px",
			// "background" : "rgba(255, 255, 255, 0)"
			// }); // 달력 header border
			/*
			 * jquery-ui-1.8.24.custom.css 부분 동일 적용 시작 $(".ui-state-disabled, .ui-widget-content .ui-state-disabled, .ui-widget-header
			 * .ui-state-disabled").css({ "opacity" : ".35", "filter" : "Alpha(Opacity=35)", "background-image" : "none" }); $(".ui-datepicker
			 * table").css({ "width" : "100%", "border-collapse" : "collapse", "margin" : "0 0 .4em" }); $(".ui-datepicker td").css({ "border-top" :
			 * "1px solid #EEE", "padding" : "1px", "height" : "28px" }); $(".ui-datepicker table thead tr th").css({ "color" : "fff", "background" :
			 * "#e3e3e3", "border-bottom" : "none", "padding" : ".3em .3em" }); $(".ui-state-default.decoration").css({ "text-decoration" :
			 * "underline" }); // jquery-ui-1.8.24.custom.css 부분 동일 적용 종료
			 */
			break;
		case "btms":
			$(".ui-datepicker-trigger").attr("src", (btmsTheme['triggerImg'])[theme]);

			if ($("#k1_date_wrap_1").css("width") !== undefined) {
				$(".popup").has("#k1_date_wrap_1").parent().css("width", "235px");
			}
			break;
		case "htl":
			$(".ui-datepicker-trigger").attr("src", (htlTheme['triggerImg'])[theme]); // 달력
			// 이미지 수정
			$("#k1_htlpop_wrap .k1_htlpop_container #k1_calendar_group").css("height", "240px"); // 달력
			// 높이

			if (design.usewidth) { // 달력 갯수가 2개인 경우..
				$("#k1_pop_wrap").css('width', '520px');
				$("#k1_calendar_group").css("width", "510px");
				$("#k1_calendar_group").css("left", "-100px");
				$("#k1_calendar_group .calendar_box").css("width", "430px");
			}

			// 전체 테두리 색 변경
			$("#k1_htlpop_wrap .k1_htlpop").css("border", (htlTheme['frameBorderCss'])[theme]);
			// header css 변경
			$("#k1_htlpop_wrap .k1_htlpop .k1_htlpop_header").css("background", (htlTheme['headerCss'])[theme]);// 수정(jisuk)
			// 이전, 다음 버튼 이미지
			$("input.cal_prev").attr("src", (htlTheme['calPrevImg'])[theme]);// 수정(jisuk)
			$("input.cal_next").attr("src", (htlTheme['calNextImg'])[theme]);// 수정(jisuk)
			// 년, 월 표시부분 css 변경
			$("#k1_calendar_group .calendar_wrap .cal_date").css({
				"background" : (htlTheme['titleBarBackgroundColor'])[theme],
				"border" : (htlTheme['titleBarBorderCss'])[theme]
			});
			break;
		case "pop":
			// 자동으로 생성되는 div객체 숨김
			$("#k1_pop_wrap .contents #k1_calendar_group").css("height", "280px"); // 달력
			// 높이
			$(".ui-datepicker").show();
		default:
			break;
		}

		// $(".date-sunday .ui-state-default").css("color", "red"); // 일요일
		// 날짜색(날짜)
		// $(".date-sunday").css("color", "red"); // 일요일 날짜색(요일)
		// $(".date-saturday .ui-state-default").css("color", "blue"); // 토요일
		// 날짜색(날짜)
		// $(".date-saturday").css("color", "blue"); // 토요일 날짜색(요일)
		// 달력 세로 줄 생성
		// $("#k1_calendar_group .calendar_wrap td").css({
		// "border-right" : '1px solid #EEE',
		// "border-top" : '1px solid #EEE'
		// });
		// $(".ui-datepicker-week-end.date-saturday").css("border-right-color",
		// "#d0d0d0");
		// 달력 세로 스크롤 삭제
		// $("#k1_pop_wrap .popup .contents").css("overflow-y", "hidden");
		// 달력 테두리 explorer8.0, firefox에서 다르게 나타나는 문제 해결
		// $("#k1_calendar_group .calendar_wrap td").css("background",
		// "transparent");

		// 달력 넓이
		// if ($.trim(design.width) != "") {
		// var popWidth = design.width;
		// var dateWidth = design.width - 25;
		// var calWidth;
		// if ($.trim($(".calendar_wrap").css("width")) != "") {
		// calWidth = ($(".calendar_wrap").css("width").replace(/[^0-9]/g, ''))
		// - ((730 - design.width) / 3);
		// } else {
		// calWidth = ((730 - design.width) / 3);
		// }
		// 사이즈 변경
		// $("#k1_pop_wrap").css("width", popWidth + "px");
		// $("#k1_date_wrap").css("width", dateWidth + "px");
		// $(".calendar_wrap").css("width", calWidth + "px");
		// }
		// 달력 높이
		// if ($.trim(design.height) != "") {
		// var popHeight = design.height;
		// var padding = ".4em .1em .4em .1em";
		// if (popHeight < 224) {
		// padding = ".2em .1em .2em .1em";
		// }
		// $("#k1_pop_wrap .contents #k1_calendar_group").css("height",
		// popHeight + "px");
		// $(".calendar_box").css("height", (popHeight - 10) + "px");
		// $(".ui-datepicker td").css("height", (popHeight / 8.6) + "px");
		// $(".ui-datepicker td span, .ui-datepicker td a").css("padding",
		// padding);
		// }

	};
})(jQuery);

(function($) {
	$.fn.divCalendar = function(targetId, caption, linkageDiv, linkageInput, limitType) {
		var $this = $(this);
		var divId = $this.attr('id');
		var date = new Date();
		var month = date.getMonth();
		var year = date.getFullYear();

		/** 이미 날짜가 들어가 있는 경우 현재 값으로 달력 표시 */
		if ($('#' + targetId).val() != "") {
			var iptdate = $('#' + targetId).val();
			year = parseInt(iptdate.substring(0, 4));
			month = parseInt(iptdate.substring(5, 6).replace('0', '') + iptdate.substring(6, 7)) - 1;
		}

		var before1Month = new Date();
		// before1Month.setMonth(before1Month.getMonth() - 1);
		before1Month.setMonth(month - 1);

		var after1Month = new Date();
		// after1Month.setMonth(after1Month.getMonth() + 1);
		after1Month.setMonth(month + 1);

		var calHtml = '';
		calHtml += '<div class="calendar_wrap">\n';
		calHtml += '	<div class="cal_date k1_h18 k1_lh8">\n';
		// calHtml += ' <a href="javascript:;" class="k1_cal2_prevs k1_pt5" title="이전" year="' + before1Month.getFullYear() + '" month="'
		// + before1Month.getMonth() + '"></a>\n'; //firefox 플러그인 에서 title 부분이 지적되서 우선 주석함.//2013-07-18//jiseok(jonginseok)
		calHtml += '		<a href="javascript:;" class="k1_cal2_prevs k1_pt5" year="' + before1Month.getFullYear() + '" month="'
				+ before1Month.getMonth() + '"></a>\n';
		calHtml += '		<span id="' + divId + 'ThisMonth" class="k1_tit4 k1_tac">' + year + '년 ' + (month + 1) + '월</span>\n';

		// calHtml += ' <a href="javascript:;" class="k1_cal2_nexts k1_pt5" title="다음" year="' + after1Month.getFullYear() + '" month="'
		// + after1Month.getMonth() + '"></a>\n'; //firefox 플러그인 에서 title 부분이 지적되서 우선 주석함.//2013-07-18//jiseok(jonginseok)
		calHtml += '		<a href="javascript:;" class="k1_cal2_nexts k1_pt5" year="' + after1Month.getFullYear() + '" month="' + after1Month.getMonth()
				+ '"></a>\n';
		calHtml += '	</div>\n';

		calHtml += '	<table class="table_th">\n';
		calHtml += '		<caption>' + ((typeof caption == 'undefined' || caption == null) ? '달력' : caption) + '</caption>\n';
		calHtml += '		<colgroup>\n';
		calHtml += '			<col style="" />\n';
		calHtml += '			<col style="" />\n';
		calHtml += '			<col style="" />\n';
		calHtml += '			<col style="" />\n';
		calHtml += '			<col style="" />\n';
		calHtml += '			<col style="" />\n';
		calHtml += '			<col style="" />\n';
		calHtml += '		</colgroup>\n';
		calHtml += '		<thead>\n';
		calHtml += '			<tr>\n';
		calHtml += '				<th class="sun" scope="col">일</th>\n';
		calHtml += '				<th scope="col">월</th>\n';
		calHtml += '				<th scope="col">화</th>\n';
		calHtml += '				<th scope="col">수</th>\n';
		calHtml += '				<th scope="col">목</th>\n';
		calHtml += '				<th scope="col">금</th>\n';
		calHtml += '				<th class="sat" scope="col">토</th>\n';
		calHtml += '			</tr>\n';
		calHtml += '		</thead>\n';
		calHtml += '	</table>\n';
		calHtml += '	<table class="table_calendar">\n';
		calHtml += '		<caption>' + ((typeof caption == 'undefined' || caption == null) ? '달력' : caption) + '</caption>\n';
		calHtml += '		<colgroup>\n';
		calHtml += '			<col style="" />\n';
		calHtml += '			<col style="" />\n';
		calHtml += '			<col style="" />\n';
		calHtml += '			<col style="" />\n';
		calHtml += '			<col style="" />\n';
		calHtml += '			<col style="" />\n';
		calHtml += '			<col style="" />\n';
		calHtml += '		</colgroup>\n';
		calHtml += '		<tbody>\n';

		calHtml += '		</tbody>\n';
		calHtml += '	</table>\n';
		calHtml += '</div>\n';

		$this.html(calHtml);

		$.getCalHtml(year, month, targetId, divId, linkageDiv, linkageInput, limitType);

		$('#' + divId + ' .calendar_wrap a.k1_cal2_prevs').bind('click', function() {
			var yy = parseInt($(this).attr('year'));
			var mm = parseInt($(this).attr('month'));
			var limitFlag = true;
			if (limitType == 'min') {
				var minVal = $('#' + linkageInput).val();
				if (minVal != '') {
					var minYear = minVal.split('-')[0];
					var minMonth = minVal.split('-')[1];
					if (parseInt(yy + '' + ((mm + 1) < 10 ? '0' + (mm + 1) : (mm + 1))) < parseInt(minYear + minMonth)) {
						limitFlag = false;
					}
				}
			}

			// if ((yy > year || (yy == year && mm >= month)) && limitFlag) {
			if (limitFlag) {
				var pmonth = new Date(yy + '/' + (mm + 1 < 10 ? '0' + (mm + 1) : (mm + 1)) + '/01');
				pmonth.setMonth(pmonth.getMonth() - 1);

				var nmonth = new Date(yy + '/' + (mm + 1 < 10 ? '0' + (mm + 1) : (mm + 1)) + '/01');
				nmonth.setMonth(nmonth.getMonth() + 1);

				$('#' + divId + 'ThisMonth').text(yy + '년 ' + (mm + 1) + '월');

				$(this).attr('year', pmonth.getFullYear());
				$(this).attr('month', pmonth.getMonth());

				$('#' + divId + ' .calendar_wrap a.k1_cal2_nexts').attr('year', nmonth.getFullYear());
				$('#' + divId + ' .calendar_wrap a.k1_cal2_nexts').attr('month', nmonth.getMonth());

				$.getCalHtml(yy, mm, targetId, divId, linkageDiv, linkageInput, limitType);

			}
		});

		$('#' + divId + ' .calendar_wrap a.k1_cal2_nexts').bind('click', function() {
			var yy = parseInt($(this).attr('year'));
			var mm = parseInt($(this).attr('month'));

			var limitFlag = true;
			if (limitType == 'max') {
				var maxVal = $('#' + linkageInput).val();
				if (maxVal != '') {
					var maxYear = maxVal.split('-')[0];
					var maxMonth = maxVal.split('-')[1];

					if (parseInt(yy + '' + ((mm + 1) < 10 ? '0' + (mm + 1) : (mm + 1))) > parseInt(maxYear + maxMonth)) {
						limitFlag = false;
					}
				}
			}

			if (limitFlag) {
				var pmonth = new Date(yy + '/' + (mm + 1 < 10 ? '0' + (mm + 1) : (mm + 1)) + '/01');
				pmonth.setMonth(pmonth.getMonth() - 1);

				var nmonth = new Date(yy + '/' + (mm + 1 < 10 ? '0' + (mm + 1) : (mm + 1)) + '/01');
				nmonth.setMonth(nmonth.getMonth() + 1);

				$('#' + divId + 'ThisMonth').text(yy + '년 ' + (mm + 1) + '월');

				$('#' + divId + ' .calendar_wrap a.k1_cal2_prevs').attr('year', pmonth.getFullYear());
				$('#' + divId + ' .calendar_wrap a.k1_cal2_prevs').attr('month', pmonth.getMonth());

				$(this).attr('year', nmonth.getFullYear());
				$(this).attr('month', nmonth.getMonth());

				$.getCalHtml(yy, mm, targetId, divId, linkageDiv, linkageInput, limitType);
			}
		});
	};
})(jQuery);

(function($) {
	$.getCalHtml = function(tyear, tmonth, target, divId, linkageDiv, linkageInput, limitType) {
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getYear();
		if (year <= 200) {
			year += 1900;
		}

		var daysInMonth = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
		if (tyear % 4 == 0 && tyear != 1900) {
			daysInMonth[1] = 29;
		}
		var total = daysInMonth[tmonth];
		var beg_i = new Date((tmonth + 1) + '/01/' + tyear);
		beg_i.setDate(1);
		if (beg_i.getDate() == 2) {
			beg_i = setDate(0);
		}
		beg_i = beg_i.getDay();
		if (beg_i == 0) {
			beg_i = 7;
		}
		var calHtml = '';
		calHtml += '			<tr class="k1_h20">\n';

		var week = 0;
		var row = 1;

		for ( var i = 1; i <= beg_i; i++) {
			// 전달 마지막 주
			calHtml += '				<td><a href="javascript:;" class="undate">' + (daysInMonth[(tmonth - 1 > -1) ? tmonth - 1 : 11] - beg_i + i)
					+ '</a></td>\n';
			week++;
			if (week == 7) {
				calHtml += '			</tr>\n';
				week = 0;
			}
		}
		if (tyear > year || (tyear == year && tmonth >= month)) {
			for ( var i = 1; i <= total; i++) {
				// 이번달 이후
				if (week == 0) {
					calHtml += '			<tr class="k1_h20">\n';
					row++;
				}
				if (i < day && tmonth == month && tyear == year) {
					// 이번달 오늘 이전
					if (week == 6) {
						calHtml += '				<td class="last"><a href="javascript:;" class="undate">' + i + '</a></td>\n';
						calHtml += '			</tr>\n';
						week = 0;
					} else {
						calHtml += '				<td><a href="javascript:;" class="undate">' + i + '</a></td>\n';
						week++;
					}
				} else {
					var limitVal = '';
					if (typeof linkageInput != 'undefined' && linkageInput != '') {
						limitVal = $('#' + linkageInput).val().replace(/-/g, '');
					}
					var presentDay = tyear + '' + ((tmonth + 1 < 10) ? '0' + (tmonth + 1) : (tmonth + 1)) + (i < 10 ? '0' + i : i);

					if ((limitType == 'min' && parseInt(presentDay) < parseInt(limitVal))
							|| (limitType == 'max' && parseInt(presentDay) > parseInt(limitVal))) {
						if (week == 6) {
							calHtml += '				<td class="last"><a href="javascript:;" class="undate">' + i + '</a></td>\n';
							week = 0;
						} else {
							calHtml += '				<td><a href="javascript:;" class="undate">' + i + '</a></td>\n';
							week++;
						}
					} else {
						// 오늘 이후
						if (week == 0) {
							// 일요일
							calHtml += '				<td><a href="javascript:;" class="sun" year="' + tyear + '" month="' + (tmonth + 1) + '">' + i
									+ '</a></td>\n';
							week++;
						} else if (week == 6) {
							// 토요일
							calHtml += '				<td class="last"><a href="javascript:;" class="sat" year="' + tyear + '" month="' + (tmonth + 1) + '">'
									+ i + '</a></td>\n';
							calHtml += '			</tr>\n';
							week = 0;
						} else {
							// 그외 요일
							calHtml += '				<td><a href="javascript:;" year="' + tyear + '" month="' + (tmonth + 1) + '">' + i + '</a></td>\n';
							week++;
						}
					}
				}
			}
		} else {
			for ( var i = 1; i <= total; i++) {
				// 과거의 달
				if (week == 0) {
					calHtml += '			<tr class="k1_h20">\n';
					row++;
				}
				if (week == 6) {
					calHtml += '				<td class="last"><a href="javascript:;" class="undate">' + i + '</a></td>\n';
					calHtml += '			</tr>\n';
					week = 0;
				} else {
					calHtml += '				<td><a href="javascript:;" class="undate">' + i + '</a></td>\n';
					week++;
				}
			}
		}
		var nextMonthLastDay = 0;
		for ( var i = 1; week != 0; i++) {
			// 다음달 첫 주
			if (week == 0) {
				calHtml += '			<tr class="k1_h20">\n';
				row++;
			}
			if (week == 6) {
				calHtml += '				<td class="last"><a href="javascript:;" class="undate">' + i + '</a></td>\n';
			} else {
				calHtml += '				<td><a href="javascript:;" class="undate">' + i + '</a></td>\n';
			}
			week++;
			if (week == 7) {
				calHtml += '			</tr>\n';
				week = 0;
			}
			nextMonthLastDay = i;
		}

		if (row < 6) {
			// 달력 row가 모자라면 다음달 한 주를 더 찍음
			calHtml += '			<tr class="k1_h20">\n';
			for ( var i = nextMonthLastDay + 1; i < nextMonthLastDay + 8; i++) {

				if (i == nextMonthLastDay + 8 - 1) {
					calHtml += '				<td class="last"><a href="javascript:;" class="undate">' + i + '</a></td>\n';
				} else {
					calHtml += '				<td><a href="javascript:;" class="undate">' + i + '</a></td>\n';
				}
			}
			calHtml += '			</tr>\n';
		}
		$('#' + divId + ' .calendar_wrap .table_calendar tbody').html(calHtml);

		$('#' + divId + ' .calendar_wrap .table_calendar tbody td a:not(.undate)').bind('click', function() {
			var year = $(this).attr('year');
			var month = parseInt($(this).attr('month'));
			var day = parseInt($(this).text());

			$('#' + target).val(year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day));

			if (limitType == 'max') {
				var val = $('#' + target).val().replace(/-/g, '');
				var compareVal = $('#' + linkageInput).val().replace(/-/g, '');

				if (compareVal == '' || parseInt(val) >= parseInt(compareVal) || val.substring(0, 6) == compareVal.substring(0, 6)) {
					// $('#' + linkageInput).val('');
					$('#' + linkageDiv + ' .calendar_wrap a.k1_cal2_nexts').attr('year', year);
					$('#' + linkageDiv + ' .calendar_wrap a.k1_cal2_nexts').attr('month', month - 1);
					$('#' + linkageDiv + ' .calendar_wrap a.k1_cal2_nexts').trigger('click');
				}
			} else if (limitType == 'min') {
				var val = $('#' + target).val().replace(/-/g, '');
				var compareVal = $('#' + linkageInput).val().replace(/-/g, '');

				if (compareVal == '' || parseInt(val) <= parseInt(compareVal) || val.substring(0, 6) == compareVal.substring(0, 6)) {
					// $('#' + linkageInput).val('');
					$('#' + linkageDiv + ' .calendar_wrap a.k1_cal2_prevs').attr('year', year);
					$('#' + linkageDiv + ' .calendar_wrap a.k1_cal2_prevs').attr('month', month - 1);
					$('#' + linkageDiv + ' .calendar_wrap a.k1_cal2_prevs').trigger('click');
				}
			}
		});
	};
})(jQuery);

(function($) {
	$.iframeCalendar = function(type, design, option) {

		switch (type) {
		case 'cal':
			var hiddenInput = '<div style="display:none;">';
			hiddenInput += '<input type="text" id="iframe_' + option.iframeInputDtId + '">';
			hiddenInput += '</div>';
			$('body').append(hiddenInput);

			$('#iframe_' + option.iframeInputDtId).calendar(design);
			$('#' + option.iframeId).contents().find('#' + option.iframeInputDtBtn).bind('click', function() {
				var position = $('#' + option.iframeId).contents().find('#' + option.iframeInputDtId).offset();
				setFocusIn('iframe_' + option.iframeInputDtId, position.top, position.left, option.iframeInputDtId);
			});

			$('#' + option.iframeId).contents().find('#' + option.iframeInputDtId).bind('focus', function() {
				var position = $('#' + option.iframeId).contents().find('#' + option.iframeInputDtId).offset();
				setFocusIn('iframe_' + option.iframeInputDtId, position.top, position.left, option.iframeInputDtId);
			});
			break;
		case 'val':
			var hiddenInput = '<div id="hiddenDt" style="display:none;">';
			hiddenInput += '<input type="text" id="_startDt">';
			hiddenInput += '<input type="text" id="_endDt">';
			hiddenInput += '</div>';
			$('body').append(hiddenInput);

			var arr = {
				toid : '_endDt',
				nummons : (typeof option.nummons != 'undefined') ? option.nummons : '',
				select : (typeof option.select != 'undefined') ? option.select : '',
				mindate : (typeof option.mindate != 'undefined') ? option.mindate : '',
				maxdate : (typeof option.maxdate != 'undefined') ? option.maxdate : '',

				beforeShowDayWeek : (typeof option.beforeShowDayWeek != 'undefined') ? option.beforeShowDayWeek : '',
				beforeShowDay : (typeof option.beforeShowDay != 'undefined') ? option.beforeShowDay : '',

				onselect : function(obj) {
					$('#' + option.iframeId).contents().find('#' + $(obj).attr('target')).val($(obj).val());
				},
				dateformat : (typeof option.dateformat != 'undefined') ? option.dateformat : ''
			};
			$('#_startDt').validcal(arr, design);

			$('#' + option.iframeId).contents().find('#' + option.iframeStartDtBtn).bind('click', function() {
				var position = $('#' + option.iframeId).contents().find('#' + option.iframeStartDtInputId).offset();
				setFocusIn('_startDt', position.top, position.left, option.iframeStartDtInputId);
			});

			$('#' + option.iframeId).contents().find('#' + option.iframeEndDtBtn).bind('click', function() {
				var position = $('#' + option.iframeId).contents().find('#' + option.iframeEndDtInputId).offset();
				setFocusIn('_endDt', position.top, position.left, option.iframeEndDtInputId);
			});

			$('#' + option.iframeId).contents().find('#' + option.iframeStartDtInputId).bind('focus', function() {
				var position = $('#' + option.iframeId).contents().find('#' + option.iframeStartDtInputId).offset();
				setFocusIn('_startDt', position.top, position.left, option.iframeStartDtInputId);
			});

			$('#' + option.iframeId).contents().find('#' + option.iframeEndDtInputId).bind('focus', function() {
				var position = $('#' + option.iframeId).contents().find('#' + option.iframeEndDtInputId).offset();
				setFocusIn('_endDt', position.top, position.left, option.iframeEndDtInputId);
			});

			break;
		case 'use':
			var hiddenInput = '<div style="display:none;">';
			hiddenInput += '<input type="text" id="iframe_' + option.iframeInputDtId + '">';
			hiddenInput += '</div>';
			$('body').append(hiddenInput);

			var arr = {
				nummons : (typeof option.nummons != 'undefined') ? option.nummons : '',
				select : (typeof option.select != 'undefined') ? option.select : '',
				mindate : (typeof option.mindate != 'undefined') ? option.mindate : '',
				maxdate : (typeof option.maxdate != 'undefined') ? option.maxdate : '',
				beforeShowDayWeek : (typeof option.beforeShowDayWeek != 'undefined') ? option.beforeShowDayWeek : '',
				beforeShowDay : (typeof option.beforeShowDay != 'undefined') ? option.beforeShowDay : '',
				onselect : function(obj) {
					$('#' + option.iframeId).contents().find('#' + $(obj).attr('target')).val($(obj).val());
				},
				dateformat : (typeof option.dateformat != 'undefined') ? option.dateformat : ''
			};
			$('#iframe_' + option.iframeInputDtId).usecal(arr, design);

			$('#' + option.iframeId).contents().find('#' + option.iframeInputDtBtn).bind('click', function() {
				var position = $('#' + option.iframeId).contents().find('#' + option.iframeInputDtId).offset();
				setFocusIn('iframe_' + option.iframeInputDtId, position.top, position.left, option.iframeInputDtId);
			});

			$('#' + option.iframeId).contents().find('#' + option.iframeInputDtId).bind('focus', function() {
				var position = $('#' + option.iframeId).contents().find('#' + option.iframeInputDtId).offset();
				setFocusIn('iframe_' + option.iframeInputDtId, position.top, position.left, option.iframeInputDtId);
			});
			break;

		case 'dal':
			/*
			 * option 중에 필수는 화면에서 사용 되는 인자 들로서 iframeCalendar 호출시에 옵션값으로 받아야 한다.
			 * 필수를 제외한 나머지 인자는 자동으로 생성 되도록 처리 되어 있드나 화면에서 받아 처리 해도 무방 하다.
			 *
			 *
			 */
			var option = {
				toid : option.txtPopInterval,
				fromid : option.txtPopInterval2,
				nummons : (typeof option.nummons != 'undefined') ? option.nummons : '',
				select : (typeof option.select != 'undefined') ? option.select : '',
				mindate : (typeof option.mindate != 'undefined') ? option.mindate : '',
				maxdate : (typeof option.maxdate != 'undefined') ? option.maxdate : '',
				beforeShowDayWeek : (typeof option.beforeShowDayWeek != 'undefined') ? option.beforeShowDayWeek : '',
				beforeShowDay : (typeof option.beforeShowDay != 'undefined') ? option.beforeShowDay : '',
				iframeId : (typeof option.iframeId != 'undefined') ? option.iframeId : 'ifrSegSelect',				//
				imgPopFrom : (typeof option.imgPopFrom != 'undefined') ? option.imgPopFrom :  'img_popFrom',				//필수-시작 일자 선택번튼
				imgPopTo : (typeof option.imgPopTo != 'undefined') ? option.imgPopTo :   'img_popTo',					//필수-종료 일자 선택 버튼
				txtPopFrom : (typeof option.txtPopFrom != 'undefined') ? option.txtPopFrom :   'txt_popFrom',				//필수-시작일자
				txtPopTo : (typeof option.txtPopTo != 'undefined') ? option.txtPopTo :   'txt_popTo',					//필수-종료일자
				divMask	: (typeof option.divMask != 'undefined') ? option.divMask :   'div_mask',					//필수-마스크 레이어
				reWriteDiv : (typeof option.reWriteDiv != 'undefined') ? option.reWriteDiv :   'layerTmp',				//필수-달력 출력 부분
				imgPopClose : (typeof option.imgPopClose != 'undefined') ? option.imgPopClose :   'img_popClose',			//팝업 닫기 버튼
				btnDateReturn : (typeof option.btnDateReturn != 'undefined') ? option.btnDateReturn :   'btn_dateReturn',		//선택 완료 버튼
				txtPopInterval1 : (typeof option.txtPopInterval1 != 'undefined') ? option.txtPopInterval1 :   'txt_popInterval1',	//반환 시작일
				txtPopInterval2 : (typeof option.txtPopInterval2 != 'undefined') ? option.txtPopInterval2 :   'txt_popInterval2',	//반환 종룡일
				rdoPopInterval : (typeof option.rdoPopInterval != 'undefined') ? option.rdoPopInterval :   'rdo_popInterval',		//달력세서 사용될 라디오명
				rdoPopInterval1 : (typeof option.rdoPopInterval1 != 'undefined') ? option.rdoPopInterval1 :   'rdo_popInterval1',	//달력에서 사용될 라디오
				rdoPopInterval2 : (typeof option.rdoPopInterval2 != 'undefined') ? option.rdoPopInterval2 :   'rdo_popInterval2',	//달력에서 사용될 다리도
				divDatepicker : (typeof option.divDatepicker != 'undefined') ? option.divDatepicker :   'div_datepicker',		//달력 출력 되는 레이어
				layerPop : (typeof option.layerPop != 'undefined') ? option.layerPop :   'layer_pop',					//팝업 레이어
				dtlaypop	: (typeof option.dtlaypop != 'undefined') ? option.dtlaypop :   'pop'						//출력형태(사용 안함)
			}

			var hiddenInput = '<span id="' + option.reWriteDiv + '"></span>';
			hiddenInput += '<div id="' + option.divMask + '" style="position:absolute;left:0;top:0;z-index:9000;"></div>';
			$('body').append(hiddenInput);

			var divHtml = '';
			divHtml += '<div id="' + option.layerPop + '" style="position:absolute;width:725px;z-index:10000">';
			divHtml += '<div id="k1_pop_wrap">';
			divHtml += '<div class="popup"  style="background:#ffffff">';
			divHtml += '<div class="header">';
			divHtml += '<h1 class="tit">날짜 선택</h1>';
			divHtml += '<img src="/air/imgs/airA/btn/btn_p_close.gif" alt="닫기" class="close" id="' + option.imgPopClose + '" style="cursor: pointer;"/></div>';
			divHtml += '<div class="contents">';
			divHtml += '<div id="k1_date_wrap">';
			divHtml += '<div id="k1_calendar_group">';
			divHtml += '<div class="date">';
			divHtml += '<span class="date_departure">';
			divHtml += '<input type="radio" id="' + option.rdoPopInterval1 + '" class="input_radio" name="' + option.rdoPopInterval + '" value="1" checked="checked"/>';
			divHtml += '<label for="rdo_popInterval1">출국일자</label>';
			divHtml += '<input id="' + option.txtPopInterval1 + '" class="k1_input_text" type="text" value="" readonly="readonly"/>';
			divHtml += '</span>';
			divHtml += '<span class="date_return">';
			divHtml += '<input type="radio" id="' + option.rdoPopInterval2 + '" class="input_radio" name="' + option.rdoPopInterval + '" value="2"/><label for="rdo_popInterval2">귀국일자</label>';
			divHtml += '<input id="' + option.txtPopInterval2 + '" class="k1_input_text" type="text" value="" readonly="readonly"/>';
			divHtml += '</span>';
			divHtml += '<span class="k1_btn6"><span id="' + option.btnDateReturn + '" style="cursor:pointer;">날짜선택완료</span></span>';
			divHtml += '</div>';
			divHtml += '<div id="' + option.divDatepicker + '"></div>';
			divHtml += '</div>';
			divHtml += '</div>';	
			divHtml += '</div>';
			divHtml += '</div>';
			divHtml += '</div>';
			divHtml += '</div>';

			var arr = {
				toid : option.txtPopInterval,
				fromid : option.txtPopInterval2,
				nummons : (typeof option.nummons != 'undefined') ? option.nummons : '',
				select : (typeof option.select != 'undefined') ? option.select : '',
				mindate : (typeof option.mindate != 'undefined') ? option.mindate : '',
				maxdate : (typeof option.maxdate != 'undefined') ? option.maxdate : '',

				beforeShowDayWeek : (typeof option.beforeShowDayWeek != 'undefined') ? option.beforeShowDayWeek : '',
				beforeShowDay : (typeof option.beforeShowDay != 'undefined') ? option.beforeShowDay : '',

				onselect : function(obj) {
					alert("onselect");//현재 사용 안함.
					//$('#' + option.iframeId).contents().find('#' + $(obj).attr('target')).val($(obj).val());
				},
				dateformat : (typeof option.dateformat != 'undefined') ? option.dateformat : ''
			};
			
			var from = {from:$('#' + option.txtPopFrom).val(), to:$("#" + option.txtPopTo).val(), gubun:"from", mindate:0, dtlaypop : true};
			var to = {from:$("#" + option.txtPopFrom).val(), to:$("#" + option.txtPopTo).val(), gubun:"to", mindate:0, dtlaypop : true};

			/*시작 버튼 클릭시*/
			$('#' + option.imgPopFrom).bind('click', function() {
				$.gfnDpMaskDual(option.divMask, option.reWriteDiv, false);//마스킹 처리
				$('#' + option.reWriteDiv).html(divHtml);//디자인 요소 출력
				$.gfnDpDefultDual(from, {siteType : "pop"}, option);//달력 출력
			});

			/*종료 버튼 클릭시*/
			$('#' + option.imgPopTo).bind('click', function() {
				$.gfnDpMaskDual(option.divMask, option.reWriteDiv, false);//마스킹 처리
				$('#' + option.reWriteDiv).html(divHtml);//디자인 요소 출력
				$.gfnDpDefultDual(to, {siteType : "pop"}, option);//달력 출력
			});

			//선택 완료 버튼
			$('#' + option.btnDateReturn).live('click', function() {
				setReturn(option);
			});

			//달력 닫기
			$('#' + option.imgPopClose).live('click', function() {
				$('#' + option.reWriteDiv).html('');
				$.gfnDpMaskDual(option.divMask, option.layerPop, true);//막제거
			});
			break;
		}

		function setFocusIn(id, top, left, target) {
			var iframePosition = $('#' + option.iframeId).offset();

			$('#' + id).attr('top', iframePosition.top + top + 20);
			$('#' + id).attr('left', iframePosition.left + left);
			$('#' + id).attr('target', target);
			$('#' + id).focus();
		}

		function setReturn() {
			if($('#'+option.txtPopInterval1).val() == ""){
				alert("출국일자를 선택 하셔야 합니다.");
				return;
			}
			if($('#'+option.txtPopInterval2).val() == ""){
				alert("귀국일자를 선택 하셔야 합니다.");
				return;
			}
			$('#'+option.txtPopFrom).val($('#'+option.txtPopInterval1).val());
			$('#'+option.txtPopTo).val($('#'+option.txtPopInterval2).val());
			$('#' + option.reWriteDiv).html('');
			$.gfnDpMaskDual(option.divMask, option.layerPop, true);//막제거
		}

		function fn_close(){
			$('#' + option.reWriteDiv).html('');
		}

	};
})(jQuery);

/* *******************************************************************************************
 * 추가 함수내 인자들 변수 처리로 변경 하였음.
 ******************************************************************************************* */

// layer popup - div1 : maskdiv id, div2 : calendar id, btn: button click여부
// (layer popup 제어)
(function($) {
	$.gfnDpMaskDual = function(div1, div2, btn, option) {

		$("#" + div2).toggle();
		if (btn) {
			$("#" + div2).hide();
			$("#" + div1).hide();
			return;
		}
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
		$("#" + div1).css({
			'width' : maskWidth,
			'height' : maskHeight,
			'backgroundColor' : '#efefef',
			'opacity' : 0.3
		});
		$("#" + div1).show();
		$("#" + div1).unbind("click");
		$("#" + div1).click(function(e) {
			$("#" + div2).hide();
			$(this).hide();
		});
	};
})(jQuery);

/*--------------------------------------------------------------------------------------*
 * Function : $(selector).usecalDual(json);
 * Desc : 사용자 설정 달력
 * Parameter : {
 * 				nummons : 달력 갯수 (default:3)
 * 			  , select : 년, 월 selectBox선택여부[년, 월](default:true,true)
 * 			  , mindate : 현재 날짜 이전 선택 금지 (-1:이전 날짜, +0:현재날짜, +1:다음 날짜)
 *            , maxdate : 지정한 날짜 이후 선택 금지 (-1:이전 날짜, +0:현재날짜, +1:다음 날짜)
 *			  , deteformat : 날짜형식 (default:yy-mm-dd)
 *			  , beforeShowDayWeek beforeShowDay 실행하기 위한 값 (1: 요일선택)
 * 			  , beforeShowDay : 선택 요일 배열(일:0,월:1,화:2,수:3,목:4,금:5,토:6)
 * 			  , yearRange : 년도 콤보 범위 지정 옵션 ex) 2002-2020 -> '2002:2020'
 *				}
 * Return :
 *--------------------------------------------------------------------------------------*/
(function($) {
	$.fn.usecalDual = function(arr, design, optArr) {
		$.trim(arr) == "" ? arr = "" : arr;
		$.trim(design) == "" ? design = "" : design;
		var yearb;
		var monb;
		if ($.trim(arr.select) == "") {
			yearb = false;
			monb = false;
		} else {
			$.trim(arr.select[0]) == "" ? yearb = false : yearb = arr.select[0];
			$.trim(arr.select[1]) == "" ? monb = false : monb = arr.select[1];
		}
		var year_range = 'c-10:c+10';
		if (!$.util.isNull(arr) && !$.util.isNull(arr.yearRange)) {
			year_range = arr.yearRange;
		}
		$(this).datepicker({
			dateFormat : ($.trim(arr.deteformat) == "" ? 'yy-mm-dd' : arr.deteformat) // 날짜형식
			,
			showOn : ($.trim(arr.dtlaypop) == "" ? 'both' : '') // both : 버튼과 필드
			// 모두 캘린더를 보여준다.
			// button : 버튼만
			// 보이게 한다..
			,
			showAnim : '' // slideDown/fadeIn/blind/bounce/clip/drop/fold/slide
			,
			showOtherMonths : true // 공백에 이전, 이후 날짜 표시
			,
			buttonImage : '/air/imgs/airA/btn/btn_calendar_b2b.gif' // 우측 달력
			// icon 의
			// 이미지 path
			// 수정(jisuk)
			,
			buttonImageOnly : true // inputbox 뒤에 달력icon만 표시한다. ('...' 표시생략)
			,
			changeMonth : monb // 월선택 select box 표시 (기본은 false)
			,
			changeYear : yearb // 년선택 select box 표시 (기본은 false)
			// ,showButtonPanel: true// 하단 today, done 버튼기능 추가 표시 (기본은 false)
			,
			numberOfMonths : ($.trim(arr.nummons) == "" ? 3 : arr.nummons) // 달력
			// 갯수
			,
			stepMonths : ($.trim(arr.nummons) == "" ? 3 : arr.nummons) // next,
			// prev
			// 버튼을
			// 클릭했을때
			// 얼마나
			// 많은 월을
			// 이동하여
			// 표시하는가.
			,
			yearRange : year_range,
			buttonText : "달력",
			dtlaypop : ($.trim(arr.dtlaypop) == "" ? false : arr.dtlaypop),
			design : design,
			onSelect : function(selectedDate) {
				if ($.trim(arr.dtlaypop) != "") {
					if ($("input:radio[name='" + optArr.rdoPopInterval + "']:checked").val() == "1") {

						$("#" + optArr.txtPopInterval1).val(selectedDate);
						// $(this).datepicker("option", "maxDate",
						// selectedDate);
					} else if ($("input:radio[name='" + optArr.rdoPopInterval + "']:checked").val() == "2") {

						$("#" + optArr.txtPopInterval2).val(selectedDate);
						// $(this).datepicker("option", "minDate",
						// selectedDate);
					}
				}
				// 날짜선택 후 함수실행
				if ($.trim(arr.onselect) != "") {
					arr.onselect(this);
				}
			},
			beforeShowDay : function(day) {
				var result;
				switch (day.getDay()) {
				case 0: // 일요일
					result = [ true, "date-sunday" ];
					break;
				case 6: // 토요일
					result = [ true, "date-saturday" ];
					break;
				default:
					result = [ true, "" ];
					break;
				}
				// 요일 선택을 위한 로직, beforeShowDayWeek 1일 경우에만 실행.
				if ($.trim(arr.beforeShowDayWeek) == "1") {
					result = [ false, "" ];
					var showDay = "";
					for ( var i = 0; i < $.trim(arr.beforeShowDay).length; i++) {
						switch (String($.trim(arr.beforeShowDay)[i])) {
						case "일":
							showDay = 0;
							break;
						case "월":
							showDay = 1;
							break;
						case "화":
							showDay = 2;
							break;
						case "수":
							showDay = 3;
							break;
						case "목":
							showDay = 4;
							break;
						case "금":
							showDay = 5;
							break;
						case "토":
							showDay = 6;
							break;
						}
						if (String(day.getDay()) == String(showDay)) {
							result = [ true, "" ];
							break;
						}
					}
				}
				return result;
			}
		});
		if ($.trim(arr.mindate) != "") {
			$(this).datepicker("option", "minDate", arr.mindate + "d");
		}
		if ($.trim(arr.maxdate) != "") {
			$(this).datepicker("option", "maxDate", arr.maxdate + "d");
		}
		// 자동으로 생성되는 div객체 숨김
		$(".ui-datepicker").hide();
		if ($.trim(arr.dtlaypop) != "") {
			// popup size 변경
			// $("#k1_calendar_group").css("height", "275px");

			// 출국일자 radio
			$("#" + optArr.rdoPopInterval1).unbind("click");
			$("#" + optArr.rdoPopInterval1).click(function() {
				$.gfnDpReDateDual({
					gubun : "from",
					mindate : arr.mindate,
					maxdate : arr.maxdate,
					beforeShowDayWeek : (typeof arr.beforeShowDayWeek != 'undefined') ? arr.beforeShowDayWeek : '',
					beforeShowDay : (typeof arr.beforeShowDay != 'undefined') ? arr.beforeShowDay : ''

				}, design, optArr);
			});
			// 귀국일자 radio
			$("#" + optArr.rdoPopInterval2).unbind("click");
			$("#" + optArr.rdoPopInterval2).click(function() {
				$.gfnDpReDateDual({
					gubun : "to",
					mindate : arr.mindate,
					maxdate : arr.maxdate,
					beforeShowDayWeek : (typeof arr.beforeShowDayWeek != 'undefined') ? arr.beforeShowDayWeek : '',
					beforeShowDay : (typeof arr.beforeShowDay != 'undefined') ? arr.beforeShowDay : ''

				}, design, optArr);
			});
			// 출국일자 input
			$("#" + optArr.txtPopInterval1).unbind("click");
			$("#" + optArr.txtPopInterval1).click(function() {
				$("input:radio[id='" + optArr.rdoPopInterval1 + "']").attr("checked", true);
				$.gfnDpReDateDual({
					gubun : "from",
					mindate : arr.mindate,
					maxdate : arr.maxdate,
					beforeShowDayWeek : (typeof arr.beforeShowDayWeek != 'undefined') ? arr.beforeShowDayWeek : '',
					beforeShowDay : (typeof arr.beforeShowDay != 'undefined') ? arr.beforeShowDay : ''

				}, design, optArr);
			});
			// 귀국일자 input
			$("#" + optArr.txtPopInterval2).unbind("click");
			$("#" + optArr.txtPopInterval2).click(function() {
				$("input:radio[id='" + optArr.rdoPopInterval2 + "']").attr("checked", true);
				$.gfnDpReDateDual({
					gubun : "to",
					mindate : arr.mindate,
					maxdate : arr.maxdate,
					beforeShowDayWeek : (typeof arr.beforeShowDayWeek != 'undefined') ? arr.beforeShowDayWeek : '',
					beforeShowDay : (typeof arr.beforeShowDay != 'undefined') ? arr.beforeShowDay : ''

				}, design, optArr);
			});
		}
		design.usewidth = false;
		if (arr.nummons == 2) {
			design.usewidth = true;
		}
		// css변경
		$.gfnDpCss(design);
		$(".ui-datepicker-trigger").css('cursor', 'pointer');
	};
})(jQuery);



(function($) {
	$.gfnDpReDateDual = function(arr, design, optArr) {
		$("#" + optArr.divDatepicker).datepicker("destroy");
		$("#" + optArr.divDatepicker).usecalDual({
			nummons : 3,
			mindate : arr.mindate,
			maxdate : arr.maxdate,
			dtlaypop : true,
			beforeShowDayWeek : (typeof arr.beforeShowDayWeek != 'undefined') ? arr.beforeShowDayWeek : '',
			beforeShowDay : (typeof arr.beforeShowDay != 'undefined') ? arr.beforeShowDay : ''

		}, design, optArr);
		if (arr.gubun == "from") {
			if ($.trim(arr.mindate) != "") {
				$("#" + optArr.divDatepicker).datepicker("option", "minDate", arr.mindate + "d");
			}
			if ($.trim($("#" + optArr.txtPopInterval2).val()) == "") {
				if ($.trim(arr.maxdate) != "") {
					$("#" + optArr.divDatepicker).datepicker("option", "maxDate", arr.maxdate + "d");
				}
			} else {
				$("#" + optArr.divDatepicker).datepicker("option", "maxDate", $.trim($("#" + optArr.txtPopInterval2).val()));
			}
		} else if (arr.gubun == "to") {
			if ($.trim($("#" + optArr.txtPopInterval1).val()) == "") {
				if ($.trim(arr.mindate) != "") {
					$("#" +optArr. divDatepicker).datepicker("option", "minDate", arr.mindate + "d");
				}
			} else {
				$("#" + optArr.divDatepicker).datepicker("option", "minDate", $.trim($("#" + optArr.txtPopInterval1).val()));
			}
			if ($.trim(arr.maxdate) != "") {
				$("#" + optArr.divDatepicker).datepicker("option", "maxDate", arr.maxdate + "d");
			}
		}

		// css변경
		$.gfnDpCss(design);
		$(".ui-datepicker-trigger").css('cursor', 'pointer');
	};
})(jQuery);

// layer popup
// - param1 : {from : 출국일자, to : 귀국일자, gubun : from, to 구분, mindate : 이전일 선택 제한,
// maxdate : 다음일 선택제한, dtlaypop:layer popup 달력일 경우 true}
// - parma2 : {siteType : 사이트 타입}
(function($) {
	$.gfnDpDefultDual = function(arr, design, option) {

		$("#" + option.txtPopInterval1).val(arr.from);
		$("#" + option.txtPopInterval2).val(arr.to);
		
		// if ($.trim(from) != "" && $.trim(to) != "") {
		if (arr.gubun == "from") {
			$.gfnDpReDateDual(arr, design, option);
			$("input:radio[id='"+option.rdoPopInterval1+"']").attr("checked", true);
			
		} else if (arr.gubun == "to") {
			$.gfnDpReDateDual(arr, design, option);
			$("input:radio[id='"+option.rdoPopInterval2+"']").attr("checked", true);
		}
	};
})(jQuery);



/*아래는 아이프레임 에서 팝업 형태로 출력 되는 용도로 사용 됨*/

(function($) {
	$.iframeCalendarDual = function(type, design, option) {

		switch (type) {

		case 'dal':

			var option = {
				toid : option.txtPopInterval,
				fromid : option.txtPopInterval2,
				nummons : (typeof option.nummons != 'undefined') ? option.nummons : '',
				select : (typeof option.select != 'undefined') ? option.select : '',
				mindate : (typeof option.mindate != 'undefined') ? option.mindate : '',
				maxdate : (typeof option.maxdate != 'undefined') ? option.maxdate : '',
				beforeShowDayWeek : (typeof option.beforeShowDayWeek != 'undefined') ? option.beforeShowDayWeek : '',
				beforeShowDay : (typeof option.beforeShowDay != 'undefined') ? option.beforeShowDay : '',
				iframeId : (typeof option.iframeId != 'undefined') ? option.iframeId : '',				//
				imgPopFrom : (typeof option.imgPopFrom != 'undefined') ? option.imgPopFrom :  'img_popFrom',				//필수-시작 일자 선택번튼
				imgPopTo : (typeof option.imgPopTo != 'undefined') ? option.imgPopTo :   'img_popTo',					//필수-종료 일자 선택 버튼
				txtPopFrom : (typeof option.txtPopFrom != 'undefined') ? option.txtPopFrom :   'txt_popFrom',				//필수-시작일자
				txtPopTo : (typeof option.txtPopTo != 'undefined') ? option.txtPopTo :   'txt_popTo',					//필수-종료일자
				divMask	: (typeof option.divMask != 'undefined') ? option.divMask :   'div_mask',					//마스크 레이어
				reWriteDiv : (typeof option.reWriteDiv != 'undefined') ? option.reWriteDiv :   'layerTmp',				//달력 출력 부분
				imgPopClose : (typeof option.imgPopClose != 'undefined') ? option.imgPopClose :   'img_popClose',			//팝업 닫기 버튼
				btnDateReturn : (typeof option.btnDateReturn != 'undefined') ? option.btnDateReturn :   'btn_dateReturn',		//선택 완료 버튼
				txtPopInterval1 : (typeof option.txtPopInterval1 != 'undefined') ? option.txtPopInterval1 :   'txt_popInterval1',	//반환 시작일
				txtPopInterval2 : (typeof option.txtPopInterval2 != 'undefined') ? option.txtPopInterval2 :   'txt_popInterval2',	//반환 종룡일
				rdoPopInterval : (typeof option.rdoPopInterval != 'undefined') ? option.rdoPopInterval :   'rdo_popInterval',		//달력세서 사용될 라디오명
				rdoPopInterval1 : (typeof option.rdoPopInterval1 != 'undefined') ? option.rdoPopInterval1 :   'rdo_popInterval1',	//달력에서 사용될 라디오
				rdoPopInterval2 : (typeof option.rdoPopInterval2 != 'undefined') ? option.rdoPopInterval2 :   'rdo_popInterval2',	//달력에서 사용될 다리도
				divDatepicker : (typeof option.divDatepicker != 'undefined') ? option.divDatepicker :   'div_datepicker',		//달력 출력 되는 레이어
				layerPop : (typeof option.layerPop != 'undefined') ? option.layerPop :   'layer_pop',					//팝업 레이어
				dtlaypop	: (typeof option.dtlaypop != 'undefined') ? option.dtlaypop :   'pop'						//출력형태(사용 안함)
			}

			var hiddenInput = '<span id="' + option.reWriteDiv + '"></span>';
			hiddenInput += '<div id="' + option.divMask + '" style="position:absolute;left:0;top:0;z-index:9000;"></div>';
			$('body').append(hiddenInput);

			var divHtml = '';
			divHtml += '<div id="' + option.layerPop + '" style="position:absolute;width:725px;z-index:10000">';
			divHtml += '<div id="k1_pop_wrap">';
			divHtml += '<div class="popup"  style="background:#ffffff">';
			divHtml += '<div class="header">';
			divHtml += '<h1 class="tit">날짜 선택</h1>';
			divHtml += '<img src="/air/imgs/airA/btn/btn_p_close.gif" alt="닫기" class="close" id="' + option.imgPopClose + '" style="cursor: pointer;"/></div>';
			divHtml += '<div class="contents">';
			divHtml += '<div id="k1_date_wrap">';
			divHtml += '<div id="k1_calendar_group">';
			divHtml += '<div class="date">';
			divHtml += '<span class="date_departure">';
			divHtml += '<input type="radio" id="' + option.rdoPopInterval1 + '" class="input_radio" name="' + option.rdoPopInterval + '" value="1" checked="checked"/>';
			divHtml += '<label for="rdo_popInterval1">출국일자</label>';
			divHtml += '<input id="' + option.txtPopInterval1 + '" class="k1_input_text" type="text" value="" readonly="readonly"/>';
			divHtml += '</span>';
			divHtml += '<span class="date_return">';
			divHtml += '<input type="radio" id="' + option.rdoPopInterval2 + '" class="input_radio" name="' + option.rdoPopInterval + '" value="2"/><label for="rdo_popInterval2">귀국일자</label>';
			divHtml += '<input id="' + option.txtPopInterval2 + '" class="k1_input_text" type="text" value="" readonly="readonly"/>';
			divHtml += '</span>';

			divHtml += '<span class="k1_btn6"><span id="' + option.btnDateReturn + '" style="cursor:pointer;">날짜선택완료</span></span>';
			divHtml += '</div>';
			divHtml += '<div id="' + option.divDatepicker + '"></div>';
			divHtml += '</div>';
			divHtml += '</div>';	
			divHtml += '</div>';
			divHtml += '</div>';
			divHtml += '</div>';
			divHtml += '</div>';
			divHtml += '<input type="text" id="_focus" style="display:none;">';

			var arr = {
				toid : option.txtPopInterval,
				fromid : option.txtPopInterval2,
				nummons : (typeof option.nummons != 'undefined') ? option.nummons : '',
				select : (typeof option.select != 'undefined') ? option.select : '',
				mindate : (typeof option.mindate != 'undefined') ? option.mindate : '',
				maxdate : (typeof option.maxdate != 'undefined') ? option.maxdate : '',

				beforeShowDayWeek : (typeof option.beforeShowDayWeek != 'undefined') ? option.beforeShowDayWeek : '',
				beforeShowDay : (typeof option.beforeShowDay != 'undefined') ? option.beforeShowDay : '',

				onselect : function(obj) {
					//alert("onselect");//현재 사용 안함.
					//$('#' + option.iframeId).contents().find('#' + $(obj).attr('target')).val($(obj).val());
				},
				dateformat : (typeof option.dateformat != 'undefined') ? option.dateformat : ''
			};
			
			var from = {from:$('#' + option.iframeId).contents().find('#' + option.txtPopFrom).val(), to:$('#' + option.iframeId).contents().find('#' + option.txtPopTo).val(), gubun:"from", mindate:0, dtlaypop : true};
			var to = {from:$("#" + option.iframeId).contents().find('#' + option.txtPopFrom).val(), to:$('#' + option.iframeId).contents().find('#' + option.txtPopTo).val(), gubun:"to", mindate:0, dtlaypop : true};

			//시작 버튼 클릭시
			$('#' + option.iframeId).contents().find('#' + option.imgPopFrom).bind('click', function(event) {
				//alert("( top : "+ event.pageY +" )");
				$.gfnDpMaskDual(option.divMask, option.reWriteDiv, false);//마스킹 처리
				$('#' + option.reWriteDiv).html(divHtml);//디자인 요소 출력
				var position = $('#' + option.iframeId).contents().find('#' + option.txtPopFrom).offset();//아이프레임 위치
				setFocusIn(option.layerPop, position.top, position.left, $('#' + option.iframeId).contents().find('#' + option.txtPopFrom));//달력 레이어 위치 이동
				$.gfnDpDefultDual(from, {siteType : "pop"}, option);//달력 출력
			});

			//종료 버튼 클릭시
			$('#' + option.iframeId).contents().find('#' + option.imgPopTo).bind('click', function() {
				$.gfnDpMaskDual(option.divMask, option.reWriteDiv, false);//마스킹 처리
				$('#' + option.reWriteDiv).html(divHtml);//디자인 요소 출력
				var position = $('#' + option.iframeId).contents().find('#' + option.txtPopTo).offset();//아이프레임 위치
				setFocusIn(option.layerPop, position.top, position.left, $('#' + option.iframeId).contents().find('#' + option.txtPopTo));//달력 레이어 위치 이동
				$.gfnDpDefultDual(to, {siteType : "pop"}, option);//달력 출력
			});

			//선택 완료 버튼
			$('#' + option.btnDateReturn).live('click', function() {
				setReturn(option);
			});

			//달력 닫기
			$('#' + option.imgPopClose).live('click', function() {
				$('#' + option.reWriteDiv).html('');
				$.gfnDpMaskDual(option.divMask, option.layerPop, true);//막제거
			});
			break;
			

		}

		function setFocusIn(id, top, left, target) {
			var iframePosition = $('#' + option.iframeId).offset();
 
			$("#" + id).css({'position':'absolute', 'top':iframePosition.top + top + 20});
			$("#" + id).css({'position':'absolute', 'left':iframePosition.left + left});
			//$('#' + id).attr('target', target);
			$('#_focus').focus();

		}

		function setReturn() {
			if($('#'+option.txtPopInterval1).val() == ""){
				alert("출국일자를 선택 하셔야 합니다.");
				return;
			}
			if($('#'+option.txtPopInterval2).val() == ""){
				alert("귀국일자를 선택 하셔야 합니다.");
				return;
			}
			$('#' + option.iframeId).contents().find('#' + option.txtPopFrom).val($('#'+option.txtPopInterval1).val());
			$('#' + option.iframeId).contents().find('#' + option.txtPopTo).val($('#'+option.txtPopInterval2).val())
			$('#' + option.reWriteDiv).html('');
			$.gfnDpMaskDual(option.divMask, option.layerPop, true);//막제거
		}

		function fn_close(){
			$('#' + option.reWriteDiv).html('');
		}
		
	};
})(jQuery);

/* iframeCalendar 내에 case dal 로 추가 되어 있음*/