(function($) {
	var methods = {
		/*----------------------------------------------------------------------------------*
		 * Function : $(input).cursor('getSelection');
		 * Desc : text필드에서 커서의 위치를 구함.
		 * Parameter :
		 * Return : 커서의 시작위치, 끝 위치
		 * ----------------------------------------------------------------------------------*/
		getSelection : function() {
			return {
				start : $(this).cursor('getSelectionStart'),
				end : $(this).cursor('getSelectionEnd')
			};
		},

		getSelectionStart : function() {
			if (this.length == 0) {
				return -1;
			}
			input = this[0];

			var pos = input.value.length;

			if (input.createTextRange) {
				var r = document.selection.createRange().duplicate();
				r.moveEnd('character', input.value.length);
				if (r.text == '') {
					pos = input.value.length;
				}
				pos = input.value.lastIndexOf(r.text);
			} else if (typeof (input.selectionStart) != "undefined") {
				pos = input.selectionStart;
			}

			return pos;
		},

		getSelectionEnd : function() {
			if (this.length == 0) {
				return -1;
			}
			input = this[0];

			var pos = input.value.length;

			if (input.createTextRange) {
				var r = document.selection.createRange().duplicate();
				r.moveStart('character', -input.value.length);

				if (r.text == '') {
					pos = input.value.length;
				}
				pos = r.text.length;
			} else if (typeof (input.selectionEnd) != "undefined") {
				pos = input.selectionEnd;
			}

			return pos;
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(input).cursor('setSelection', selectionStart, selectionEnd);
		 * Desc : text필드에서 커서의 위치를 지정함.
		 * Parameter : selectionStart(커서의 시작위치)
		 * 			   selectionEnd(커서의 끝 위치)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		setSelection : function(selectionStart, selectionEnd) {
			if (this.length == 0) {
				return this;
			}
			input = this[0];

			if (input.createTextRange) {
				var range = input.createTextRange();
				range.collapse(true);
				range.moveEnd('character', selectionEnd);
				range.moveStart('character', selectionStart);
				range.select();
			} else if (input.setSelectionRange) {
				input.focus();
				input.setSelectionRange(selectionStart, selectionEnd);
			}
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(input).formatter('onlynumber');
		 * Desc : text필드의 입력포맷을 숫자형으로 세팅함.
		 * Parameter :
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		onlynumber : function() {
			$(this).css('text-align', 'center');
			$(this).bind('keydown', function(event) {
				if (event.preventDefault) {
					event.preventDefault();
				} else {
					event.returnValue = false;
				}
				var p = $(this).cursor('getSelection');
				var pos = p.start;
				var tmpvalue = $(this).val();

				if (event.keyCode >= 96 && event.keyCode <= 105) {
					event.keyCode = event.keyCode - 48;
				}
				if (p.start != p.end) {
					tmpvalue = tmpvalue.substring(0, p.start) + tmpvalue.substring(p.end);
				}
				if (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 39) {
					var pattern = /[0-9]/;
					if (pattern.test(String.fromCharCode(event.keyCode))) {
						tmpvalue = tmpvalue.substring(0, pos) + String.fromCharCode(event.keyCode) + tmpvalue.substring(pos);
						$(this).val(tmpvalue);
						$(this).cursor('setSelection', pos + 1, pos + 1);
					}
				} else if (event.keyCode == 8) { // 백스페이스
					if (p.start == p.end) {
						tmpvalue = tmpvalue.substring(0, pos - 1) + tmpvalue.substring(pos);
						$(this).val(tmpvalue);
						$(this).cursor('setSelection', pos - 1, pos - 1);
					} else {
						$(this).val(tmpvalue);
						$(this).cursor('setSelection', pos, pos);
					}
				} else if (event.keyCode == 46) { // 딜리트
					if (p.start == p.end) {
						tmpvalue = tmpvalue.substring(0, pos) + tmpvalue.substring(pos + 1);
					}
					$(this).val(tmpvalue);
					$(this).cursor('setSelection', pos, pos);
				} else if (event.keyCode == 37) { // 좌로
					if (p.start > 0) {
						$(this).cursor('setSelection', p.start - 1, p.start - 1);
					}
				} else if (event.keyCode == 39) { // 우로
					if (p.start < tmpvalue.length) {
						$(this).cursor('setSelection', p.start + 1, p.start + 1);
					}
				}
			});
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(input).formatter('onlynumber2');
		 * Desc : text필드의 입력포맷을 숫자형으로 세팅함.
		 * Parameter :
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		onlynumber2 : function() {
			$(this).bind(
					'blur keyup',
					function(e) {
						var keyPressed;
						if (!e) {
							var e = window.event;
						}
						if (e.keyCode || e.charCode) {
							keyPressed = e.keyCode ? e.keyCode : e.charCode;
						} else if (e.which) {
							keyPressed = e.which;
						}

						var hasDecimalPoint = (($(this).val().split('.').length - 1) > 0);
						if (keyPressed == 46 || keyPressed == 8 || ((keyPressed == 190 || keyPressed == 110) && (!hasDecimalPoint))
								|| keyPressed == 9 || keyPressed == 27 || keyPressed == 13 ||
								// Allow: Ctrl+A
								(keyPressed == 65 && e.ctrlKey === true) ||
								// Allow: home, end, left, right
								(keyPressed >= 35 && keyPressed <= 39)) {
							// let it happen, don't do anything
							return;
						} else {
							// Ensure that it is a number and stop the keypress
							if (e.shiftKey || (keyPressed < 48 || keyPressed > 57) && (keyPressed < 96 || keyPressed > 105)) {
								e.preventDefault();
							}
						}

						if (/\D/g.test(this.value)) {

							// Filter non-digits from input value.
							this.value = this.value.replace(/\D/g, '');
						}

					});
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(input).formatter('number');
		 * Desc : text필드의 입력포맷을 숫자형으로 세팅함. 입력값의 세자리마다 콤마를 찍어줌.
		 * Parameter :
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		number : function() {
			$(this).css('text-align', 'right');
			$(this).bind('keydown', function(event) {
				if (event.preventDefault) {
					event.preventDefault();
				} else {
					event.returnValue = false;
				}
				var p = $(this).cursor('getSelection');
				var pos = p.start;
				var reg = /(^[+-]?\d+)(\d{3})/;
				var tmpvalue = $(this).val();
				// if (p.start != p.end) {
				// console.log(p);
				// tmpvalue = tmpvalue.substring(0, p.start) + tmpvalue.substring(0, p.end);
				// }

				if (event.keyCode >= 96 && event.keyCode <= 105) {
					event.keyCode = event.keyCode - 48;
				}
				if (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 39) {
					var pattern = /[0-9]/;
					if (pattern.test(String.fromCharCode(event.keyCode))) {
						var length = tmpvalue.substring(pos).length;

						tmpvalue = tmpvalue.substring(0, pos) + String.fromCharCode(event.keyCode) + tmpvalue.substring(pos);
						tmpvalue = tmpvalue.replace(/,/g, '');
						while (reg.test(tmpvalue)) {
							tmpvalue = tmpvalue.replace(reg, '$1' + ',' + '$2');
						}
						$(this).val(tmpvalue);

						if (length == 0) { // 커서 뒤 쪽으로 문자열이 없으면
							$(this).cursor('setSelection', tmpvalue.length + 1, tmpvalue.length + 1);
						} else {
							$(this).cursor('setSelection', tmpvalue.length - length, tmpvalue.length - length);
						}
					}
				} else if (event.keyCode == 8) { // 백스페이스
					var length = tmpvalue.substring(pos).length;

					var char = tmpvalue.substring(pos - 1, pos);
					if (char == ',') {
						tmpvalue = tmpvalue.substring(0, pos - 2) + tmpvalue.substring(pos);
					} else {
						tmpvalue = tmpvalue.substring(0, pos - 1) + tmpvalue.substring(pos);
					}

					tmpvalue = tmpvalue.replace(/,/g, '');
					while (reg.test(tmpvalue)) {
						tmpvalue = tmpvalue.replace(reg, '$1' + ',' + '$2');
					}
					$(this).val(tmpvalue);

					if (length == 0) { // 커서 뒤 쪽으로 문자열이 없으면
						$(this).cursor('setSelection', tmpvalue.length + 1, tmpvalue.length + 1);
					} else {
						$(this).cursor('setSelection', tmpvalue.length - length, tmpvalue.length - length);
					}
				} else if (event.keyCode == 46) { // 딜리트
					var length = tmpvalue.substring(pos).length;
					var char = tmpvalue.substring(pos, pos + 1);
					if (char == ',') {
						tmpvalue = tmpvalue.substring(0, pos) + tmpvalue.substring(pos + 2);
					} else {
						tmpvalue = tmpvalue.substring(0, pos) + tmpvalue.substring(pos + 1);
					}

					tmpvalue = tmpvalue.replace(/,/g, '');
					while (reg.test(tmpvalue)) {
						tmpvalue = tmpvalue.replace(reg, '$1' + ',' + '$2');
					}
					$(this).val(tmpvalue);

					if (char == ',') { // 커서 뒤쪽에 오는 문자가 콤마이면
						$(this).cursor('setSelection', tmpvalue.length - length + 2, tmpvalue.length - length + 2);
					} else {
						$(this).cursor('setSelection', tmpvalue.length - length + 1, tmpvalue.length - length + 1);
					}
				} else if (event.keyCode == 37) { // 좌로
					if (p.start > 0) {
						$(this).cursor('setSelection', p.start - 1, p.start - 1);
					}
				} else if (event.keyCode == 39) { // 우로
					if (p.start < tmpvalue.length) {
						$(this).cursor('setSelection', p.start + 1, p.start + 1);
					}
				}
			});
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(input).formatter('date');
		 * Desc : text필드의 입력포맷을 날짜형으로 세팅함.
		 * Parameter :
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		date : function() {
			$(this).attr('maxlength', 10);
			$(this).css('text-align', 'center');
			$(this).val('____-__-__');
			$(this).bind('keydown', function(event) {
				if (event.preventDefault) {
					event.preventDefault();
				} else {
					event.returnValue = false;
				}
				var p = $(this).cursor('getSelection');
				var pos = p.start;

				if (event.keyCode >= 96 && event.keyCode <= 105) {
					event.keyCode = event.keyCode - 48;
				}
				if (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 39) {
					var pattern = /[0-9]/;
					if (pattern.test(String.fromCharCode(event.keyCode))) {
						if (pos == 4 || pos == 7) {
							pos++;
						}
						if (pos < 10) {
							this.value = this.value.substring(0, pos) + String.fromCharCode(event.keyCode) + this.value.substring(pos + 1);
							$(this).cursor('setSelection', pos + 1, pos + 1);
						}
					}
				} else if (event.keyCode == 8) { // 백스페이스
					if (pos > 0) {
						if (pos == 5 || pos == 8) {
							this.value = this.value.substring(0, pos - 1) + '-' + this.value.substring(pos);
							$(this).cursor('setSelection', pos - 1, pos - 1);
						} else {
							this.value = this.value.substring(0, pos - 1) + '_' + this.value.substring(pos);
							$(this).cursor('setSelection', pos - 1, pos - 1);
						}
					}
				} else if (event.keyCode == 46) { // 딜리트
					var tmpvalue = '';

					if (pos == 4 || pos == 7) {
						tmpvalue = this.value.substring(0, pos) + this.value.substring(pos + 2);
					} else {
						tmpvalue = this.value.substring(0, pos) + this.value.substring(pos + 1);
					}

					tmpvalue = tmpvalue.replace(/-/g, '');
					tmpvalue = tmpvalue.replace(/_/g, '');
					tmpvalue = $.util.rpad(tmpvalue, 8, '_');

					this.value = tmpvalue.substring(0, 4) + '-' + tmpvalue.substring(4, 6) + '-' + tmpvalue.substring(6);
					$(this).cursor('setSelection', pos, pos);
				} else if (event.keyCode == 37) { // 좌로
					if (p.start > 0) {
						$(this).cursor('setSelection', p.start - 1, p.start - 1);
					}
				} else if (event.keyCode == 39) { // 우로
					if (p.start < 10) {
						$(this).cursor('setSelection', p.start + 1, p.start + 1);
					}
				}
			});
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(input).formatter('time');
		 * Desc : text필드의 입력포맷을 시간형으로 세팅함.
		 * Parameter :
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		time : function() {
			$(this).attr('maxlength', 5);
			$(this).css('text-align', 'center');
			$(this).val('__:__');
			$(this).bind('keydown', function(event) {
				if (event.preventDefault) {
					event.preventDefault();
				} else {
					event.returnValue = false;
				}
				var p = $(this).cursor('getSelection');
				var pos = p.start;

				if (event.keyCode >= 96 && event.keyCode <= 105) {
					event.keyCode = event.keyCode - 48;
				}
				if (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 39) {
					var pattern = /[0-9]/;
					if (pattern.test(String.fromCharCode(event.keyCode))) {
						if (pos == 2 || pos == 5) {
							pos++;
						}
						if (pos < 5) {
							this.value = this.value.substring(0, pos) + String.fromCharCode(event.keyCode) + this.value.substring(pos + 1);
							$(this).cursor('setSelection', pos + 1, pos + 1);
						}
					}
				} else if (event.keyCode == 8) { // 백스페이스
					if (pos > 0) {
						if (pos == 3 || pos == 6) {
							this.value = this.value.substring(0, pos - 1) + ':' + this.value.substring(pos);
							$(this).cursor('setSelection', pos - 1, pos - 1);
						} else {
							this.value = this.value.substring(0, pos - 1) + '_' + this.value.substring(pos);
							$(this).cursor('setSelection', pos - 1, pos - 1);
						}
					}
				} else if (event.keyCode == 46) { // 딜리트
					var tmpvalue = '';

					if (pos == 2 || pos == 5) {
						tmpvalue = this.value.substring(0, pos) + this.value.substring(pos + 2);
					} else {
						tmpvalue = this.value.substring(0, pos) + this.value.substring(pos + 1);
					}

					tmpvalue = tmpvalue.replace(/:/g, '');
					tmpvalue = tmpvalue.replace(/_/g, '');
					tmpvalue = $.util.rpad(tmpvalue, 4, '_');

					this.value = tmpvalue.substring(0, 2) + ':' + tmpvalue.substring(2, 4);// + ':' + tmpvalue.substring(4);
					$(this).cursor('setSelection', pos, pos);
				} else if (event.keyCode == 37) { // 좌로
					if (p.start > 0) {
						$(this).cursor('setSelection', p.start - 1, p.start - 1);
					}
				} else if (event.keyCode == 39) { // 우로
					if (p.start < 5) {
						$(this).cursor('setSelection', p.start + 1, p.start + 1);
					}
				}
			});
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $(input).formatter('datetime');
		 * Desc : text필드의 입력포맷을 날짜/시간형으로 세팅함.
		 * Parameter :
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		datetime : function() {
			$(this).attr('maxlength', 19);
			$(this).css('text-align', 'center');
			$(this).val('____-__-__ __:__:__');
			$(this).bind(
					'keydown',
					function(event) {
						if (event.preventDefault) {
							event.preventDefault();
						} else {
							event.returnValue = false;
						}
						var p = $(this).cursor('getSelection');
						var pos = p.start;

						if (event.keyCode >= 96 && event.keyCode <= 105) {
							event.keyCode = event.keyCode - 48;
						}
						if (event.keyCode != 8 && event.keyCode != 46 && event.keyCode != 37 && event.keyCode != 39) {
							var pattern = /[0-9]/;
							if (pattern.test(String.fromCharCode(event.keyCode))) {
								if (pos == 4 || pos == 7 || pos == 10 || pos == 13 || pos == 16) {
									pos++;
								}
								if (pos < 19) {
									this.value = this.value.substring(0, pos) + String.fromCharCode(event.keyCode) + this.value.substring(pos + 1);
									$(this).cursor('setSelection', pos + 1, pos + 1);
								}
							}
						} else if (event.keyCode == 8) { // 백스페이스
							if (pos > 0) {
								if (pos == 5 || pos == 8) {
									this.value = this.value.substring(0, pos - 1) + '-' + this.value.substring(pos);
								} else if (pos == 14 || pos == 17) {
									this.value = this.value.substring(0, pos - 1) + ':' + this.value.substring(pos);
								} else if (pos == 11) {
									this.value = this.value.substring(0, pos - 1) + ' ' + this.value.substring(pos);
								} else {
									this.value = this.value.substring(0, pos - 1) + '_' + this.value.substring(pos);
								}
								$(this).cursor('setSelection', pos - 1, pos - 1);
							}
						} else if (event.keyCode == 46) { // 딜리트
							var tmpvalue = '';

							if (pos == 4 || pos == 7 || pos == 10 || pos == 13 || pos == 16) {
								tmpvalue = this.value.substring(0, pos) + this.value.substring(pos + 2);
							} else {
								tmpvalue = this.value.substring(0, pos) + this.value.substring(pos + 1);
							}

							tmpvalue = tmpvalue.replace(/-/g, '');
							tmpvalue = tmpvalue.replace(/:/g, '');
							tmpvalue = tmpvalue.replace(/_/g, '');
							tmpvalue = tmpvalue.replace(/ /g, '');
							tmpvalue = $.util.rpad(tmpvalue, 14, '_');

							this.value = tmpvalue.substring(0, 4) + '-' + tmpvalue.substring(4, 6) + '-' + tmpvalue.substring(6, 8) + ' '
									+ tmpvalue.substring(8, 10) + ':' + tmpvalue.substring(10, 12) + ':' + tmpvalue.substring(12);
							$(this).cursor('setSelection', pos, pos);
						} else if (event.keyCode == 37) { // 좌로
							if (p.start > 0) {
								$(this).cursor('setSelection', p.start - 1, p.start - 1);
							}
						} else if (event.keyCode == 39) { // 우로
							if (p.start < 19) {
								$(this).cursor('setSelection', p.start + 1, p.start + 1);
							}
						}
					});
		}
	};

	$.fn.formatter = $.fn.cursor = function(method) {

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
	$.util = {
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.min(a, b);
		 * Desc : a와 b 중에서 최소값을 구하는 함수.
		 * Parameter : a, b (최소값을 구하기 위한 숫자)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		min : function(a, b) {
			return a < b ? a : b;
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.max(a, b);
		 * Desc : a와 b 중에서 최대값을 구하는 함수
		 * Parameter : a, b (최대값을 구하기 위한 숫자)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		max : function(a, b) {
			return a > b ? a : b;
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.isNull(val);
		 * Desc : val 값이 null인지 아닌지 구분하는 함수
		 * Parameter : val (null 체크를 하는 값)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		isNull : function(val) {
			if (new String(val).valueOf() == "undefined") {
				return true;
			}
			if (val == null) {
				return true;
			}
			var v_ChkStr = new String(val);

			if (v_ChkStr == null) {
				return true;
			}

			if (v_ChkStr.toString().length == 0) {
				return true;
			}

			return false;
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.checkURL(val);
		 * Desc : val 값이 주소 유형에 맞는지 여부 체크
		 * Parameter : val (url 체크를 하는 값)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		checkURL : function(val) {
			if ($.util.isNull(val)) {
				return false;
			} else if (val.indexOf(".") == -1) {
				return false;
			} else {
				return true;
			}
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.checkEmail(val);
		 * Desc : val 값이 이메일 주소 유형에 맞는지 여부 체크
		 * Parameter : val (이메일 주소를 체크하기 위한 값)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		checkEmail : function(val) {
			if ($.util.isNull(val)) {
				return false;
			}

			var nIndexOfAt = val.indexOf("@");
			var nIndexOfDot = val.indexOf(".");
			var nLength = val.length;

			// "@" 이 하나도 없거나 맨 끝에 위치한 경우
			if (nIndexOfAt <= 0 || nIndexOfAt == nLength) {
				return false;
			}

			// "." 이 하나도 없거나 맨 끝에 위치한 경우
			if (nIndexOfDot <= 0 || nIndexOfDot == nLength) {
				return false;
			}

			// "@"이 두개 이상 존재하는 경우
			if (val.indexOf("@", nIndexOfAt + 1) != -1) {
				return false;
			}

			// ".@" 인 경우 또는 "@."인 경우
			if (val.substr(nIndexOfAt - 1, 1) == "." || val.substr(nIndexOfAt + 1, 1) == ".") {
				return false;
			}

			// "@" 이후에 "."이 존재하지 않는 경우
			if (val.indexOf(".", (nIndexOfAt + 2)) == -1) {
				return false;
			}

			// 공백문자가 존재하는 경우
			if (val.indexOf(" ") != -1) {
				return false;
			}

			return true;

		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.checkPhone(val);
		 * Desc : val 값이 전화 번호인지 체크하는 함수
		 * Parameter : val (전화번호 값)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		checkPhone : function(val) {
			if ($.util.isNull(val) || (!$.util.isNull(val) && val.indexOf("-") == -1)) {
				// 숫자만 입력했으면 저장
				if ($.util.checkNumber(val) || (val.indexOf("+") == 0 && val.lastIndexOf("+") == 0)) {
					return true;
				} else {
					return false;
				}
			} else if (val.indexOf(".") >= 0) {
				return false;
			} else {
				// "-" 사이의 값이 숫자가 아닌 경우
				var arrNumbers = val.split("-");
				for ( var i = 0; i < arrNumbers.length; i++) {
					if (!$.util.checkNumber(arrNumbers[i], "+")) {
						return false;
					}
				}
			}
			return true;
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.checkNumber(val);
		 * Desc : val 값이 숫자인지 여부를 체크하는 함수
		 * Parameter : val (숫자값)
		 * 			 : sign (+, -)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		checkNumber : function(val, sign) {
			var strBase = "1234567890";
			var strSign = sign;
			var bReturn = true;

			if (!$.util.isNull(strSign)) {
				strBase += strSign;
			}

			if ($.util.isNull(val)) {
				bReturn = false;
			} else {
				for ( var i = 0; i < $.util.length(val); i++) {
					if (strBase.indexOf($.util.substring(val, i, 1)) < 0) {
						bReturn = false;
						break;
					}
				}
			}
			return bReturn;

		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.checkDate8(val);
		 * Desc : 날짜가 8자리인지 체크하는 함수
		 * Parameter : val (날짜)
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		checkDate8 : function(val) {
			if ($.util.length(val) != 8) {
				return false;
			} else if (!$.date.dateCheck(val)) {
				return false;
			}
			return true;

		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.checkDate10(val);
		 * Desc : 10자리 날짜를 체크하는 함수
		 * Parameter : val (날짜)
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		checkDate10 : function(val) {
			return $.util.checkDate8($.util.replace($.util.replace($.util.replace(val, "/", ""), "-", ""), ".", ""));
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.checkDate12(val);
		 * Desc : 12자리 날짜/시간을 체크하는 함수
		 * Parameter : val (날짜)
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		checkTime12 : function(val) {
			var pattern = "^(([0]?[1-9]|1[0-2]):[0-5][0-9](:[0-5][0-9])?( )?(AM|am|aM|Am|PM|pm|pM|Pm))$";

			if (val.match(pattern)) {
				return true;
			} else {
				return false;
			}
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.checkDate24(val);
		 * Desc : 24자리 날짜/시간을 체크하는 함수
		 * Parameter : val (날짜)
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		checkTime24 : function(val) {
			var pattern = "^(([0]?[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?)$";

			if (val.match(pattern)) {
				return true;
			} else {
				return false;
			}

		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.checkPassword(val);
		 * Desc : 비밀번호 체크 형식에 맞는지 여부 확인하는 함수
		 * Parameter : val (비밀번호)
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		checkPassword : function(val) {
			var result1 = val.match(/[^a-zA-Z]/gi);
			var result2 = val.match(/[^0-9]/gi);

			if (val.length > 5) {
				if (result1 != null && result2 != null) {
					return true;
				}
			} else {
				return false;
			}

		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.checkBTMSPassword1(val);
		 * Desc : 비밀번호 체크 형식에 맞는지 여부 확인하는 함수(영문, 숫자, 특수문자 포함)
		 * Parameter : val (비밀번호)
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		checkBTMSPassword1 : function(val) {
			var result1 = val.match(/[a-zA-Z]/gi);
			var result2 = val.match(/[0-9]/gi);
			var result3 = val.match(/[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\('\"]/gi);

			// 1234qwer!@
			// alert("result1 : " + result1); // qwer
			// alert("result2 : " + result2); // 1234
			// alert("result3 : " + result3); // !@

			if (result1 != null) {

				if (result2 != null) {

					if (result3 != null) {
						// alert("영문, 숫자, 특수문자 good");
						return true;
					}
					// alert("result3 (특수문자) 위배");
					return false;
				}
				// alert("result2 (숫자) 위배");
				return false;
			}
			// alert("result1 (영문) 위배");
			return false;
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.checkBTMSPassword2(val);
		 * Desc : 비밀번호 체크 형식에 맞는지 여부 확인하는 함수(8자리 이상 50자리 이하)
		 * Parameter : val (비밀번호)
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		checkBTMSPassword2 : function(val) {
			if (val.length < 8) {
				alert("비밀번호는 최소 8자리 이상이어야 합니다.");
				return false;
			} else if (val.length > 35) {
				alert("비밀번호는 최대 35자리 이하이어야 합니다.");
				return false;
			} else {
				// alert("자리수check good");
				return true;
			}

		},

		/*----------------------------------------------------------------------------------*
		 * Function : $.util.checkVofPassword(val);
		 * Desc : 비밀번호 체크 형식에 맞는지 여부 확인하는 함수(6자리 이상 16자리 이하),영숫자혼용 - VOF비밀번호
		 * Parameter : val (비밀번호)
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		checkVofPassword : function(val) {
			var iLen = val.length;
			var bIsNumeric = val.match(/[^a-zA-Z]/gi);
			var bIsAlphabet = val.match(/[^0-9]/gi);

			if (val.match(/[^A-Za-z0-9]/g) != null) {
				// alert("영숫자만");
				return false;
			} else {
				if (iLen < 6) {
					// alert("최소6자");
					return false;
				} else if ((bIsNumeric == null) && (bIsAlphabet != null)) {
					// alert("영문도 필요");
					return false;
				} else if ((bIsNumeric != null) && (bIsAlphabet == null)) {
					// alert("숫자도 필요");
					return false;
				} else if (iLen > 16) {
					// alert("최대 16");
					return false;
				}
			}
			return true;
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $.util.replace("abc", "b", "*");
		 * Desc : 입력된 문자열의 일부분을 다른 문자열로 치환
		 * Parameter : str(원본 String)
		 *              oldstr(대체할 문자열)
		 * 				newstr(새로 바꿀 문자열)
		 * Return : String(대체 된 문자열)
		 * ----------------------------------------------------------------------------------*/
		replace : function(str, oldstr, newstr) {
			while (str.indexOf(oldstr) != -1) {
				str = str.replace(oldstr, newstr);
			}
			return str;

		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.length(val);
		 * Desc : 입력값 형태에 따라서 길이 또는 범위를 구하는 함수
		 * Parameter : 객체, 문자열, 배열
		 * Return : Type에 따라 구해진 길이 또는 범위
		 * ----------------------------------------------------------------------------------*/
		length : function() {
			var varRtnValue = 0;
			var arrArgument = Array.prototype.slice.apply(arguments);
			if (arrArgument.length < 1) {
				return 0;
			}

			if (!$.util.isEmpty(arrArgument[0])) {
				varRtnValue = arrArgument[0].toString().length;
			}

			return varRtnValue;

		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.substring(strString, nIndex, nSize);
		 * Desc : 입력된 문자열에서 특정 위치 안에 있는 문자열 반환
		 * Parameter : strString(String 문자열)
		 * 				nIndex(얻어올 첫 글자의 Index)
		 * 				nSize(얻어올 글자수, Default length(해당 객체의 길이)
		 * Return : String(지정 위치 안의 문자열)
		 * ----------------------------------------------------------------------------------*/
		substring : function() {
			var retVal = "";
			var strString = "";
			var nIndex = 0;
			var nSize = 0;
			var arrArgument = Array.prototype.slice.apply(arguments);

			if (arrArgument.length >= 1) {
				strString = arrArgument[0];
			}
			if (arrArgument.length >= 2) {
				nIndex = parseInt(arrArgument[1]);
			}
			if (arrArgument.length >= 3) {
				nSize = parseInt(arrArgument[2]);
			} else {
				nSize = $.util.length(arrArgument[0]);
			}
			if (!$.util.isEmpty(strString)) {
				retVal = strString.substr(nIndex, nSize);
			}

			return retVal;

		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.isEmpty(val);
		 * Desc : 값이 존재하는지 여부 체크
		 * Parameter : val(입력값)
		 * Return : true = 입력값이 null, 빈 스트링(""), undefined일 경우 false = 그 외 값이 존재하는 경우
		 * ----------------------------------------------------------------------------------*/
		isEmpty : function(val) {
			sVal = new String(val);
			if (sVal == null || sVal == "null" || sVal.length <= 0 || escape(sVal) == "undefined") {
				return true;
			} else {
				return false;
			}
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.trim(val);
		 * Desc     : 좌,우측 스페이스와 팁공간 제거
		 * Parameter : String val
		 * Return   : String
		 *			좌, 우측 스페이스와 팁 공간을 모두 제거한 문자열 리턴
		 * Example  : $.util.isEmpty(" abc def ") -> "abc def" 리턴
		 * ----------------------------------------------------------------------------------*/
		trim : function(val) {
			return $.trim(val);
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.isNumber(sVal);
		 * Desc : 입력값이 숫자인지를 확인한다
		 * Parameter : sVal 입력스트링
		 * Return : Boolean True이면 숫자값
		 * ----------------------------------------------------------------------------------*/
		isNumber : function(sVal) {
			if (sVal.length < 1) {
				return false;
			}

			for ( var i = 0; i < sVal.length; i++) {
				iBit = parseInt(sVal.substring(i, i + 1)); // 문자(Char)를 숫자로 변경
				if (('0' < iBit) || ('9' > iBit)) {
					// alert(i+':'+iBit+':'+'Mun');
				} else {
					// alert((i+1)+'번째 문자는 숫자가 아닙니다.');
					return false;
				}
			}
			return true;

		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.trimChar(sVal, chars);
		 * Desc : 스트링값에서 chars를 제외
		 * Parameter : sVal (입력스트링)
		 * 				chars (제외할 chars)
		 * Return : chars가 제외된 문자열
		 * ----------------------------------------------------------------------------------*/
		trimChar : function(sVal, chars) {
			var un_str = "";
			str = String(sVal);

			for ( var j = 0; j < str.length; j++) {
				if (str.charAt(j) != chars) {
					un_str = un_str + str.charAt(j);
				}
			}

			return un_str;
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.checkDate10(val);
		 * Desc : 10자리 날짜를 체크하는 함수
		 * Parameter : val (날짜)
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		checkDateTime : function(val) {
			var pattern = "^(([0]?[0-9]|1[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?)$";
			var time = $.util.substring(val, 11, 5);
			if ($.util.checkDate8($.util.replace($.util.replace($.util.replace($.util.substring(val, 0, 10), "/", ""), "-", ""), ".", ""))) {
				if (time.match(pattern)) {
					return true;
				} else {
					return false;
				}
			}
			return false;
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.intSize(val, changeChar);
		 * Desc : 객체의 width 또는 height 크기가 String형태인 것을 숫자로 뽑아서 써야 할 때 사용한다.
		 * Parameter : val (객체 width)
		 * 				changeChar (제외하는 char ex. px, %)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		intSize : function(val, changeChar) {
			return Number($.util.replace(val, changeChar, ''));
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $.util.formatter(parentId);
		 * Desc : form 안의 input 태그중 타입이 text이고 format attribute를 갖고 있는 필드의 입력 포맷을 세팅한다.
		 * Parameter : parentId (input을 둘러싸고 있는 상위 노드 id)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		formatter : function(formId) {
			$('#' + formId + ' input[type="text"]').each(function(idx, elem) {
				if (typeof $(this).attr('format') != 'undefined' && $(this).attr('format') != null && $(this).attr('format') != '') {
					$(this).formatter($(this).attr('format'));
				}
			});
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $.util.lpad(originalstr, length, strToPad);
		 * Desc : 문자열의 왼쪽을 지정하는 길이만큼 특정문자로 채워준다.
		 * Parameter : originalstr (해당문자열)
		 * 			   length (왼쪽이 특정문자로 채워진 문자열의 전체길이)
		 * 			   strToPad (왼쪽에 채울 문자)
		 * Return : originalstr의 왼쪽에 strToPad로 채워진 length길이의 문자열
		 * ----------------------------------------------------------------------------------*/
		lpad : function(originalstr, length, strToPad) {
			while (originalstr.length < length) {
				originalstr = strToPad + originalstr;
			}
			return originalstr;
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $.util.rpad(originalstr, length, strToPad);
		 * Desc : 문자열의 오른쪽을 지정하는 길이만큼 특정문자로 채워준다.
		 * Parameter : originalstr (해당문자열)
		 * 			   length (오른쪽이 특정문자로 채워진 문자열의 전체길이)
		 * 			   strToPad (오른쪽에 채울 문자)
		 * Return : originalstr의 오른쪽에 strToPad로 채워진 length길이의 문자열
		 * ----------------------------------------------------------------------------------*/
		rpad : function(originalstr, length, strToPad) {
			while (originalstr.length < length) {
				originalstr = originalstr + strToPad;
			}
			return originalstr;
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $.util.decode(value, if1, ret1[, if2, ret2, ...... , ifn, retn][, defaultVal]);
		 * Desc : value가 ifn의 값일 때 retn의 값을 반환한다.(오라클의 decode와 동일)
		 * Parameter : value ()
		 * 			   ifn (value와 비교할 값)
		 * 			   retn (value와 ifn을 비교해서 같으면 반환할 값)
		 *             defaultVal (value와 ifn을 비교해서 같은 값이 없을 경우 반환할 값)
		 * Return : retn
		 * ----------------------------------------------------------------------------------*/
		decode : function() {
			var defaultVal = '';
			var retVal = "";
			var flag = false;
			var val = arguments[0];
			var param = Array.prototype.slice.call(arguments).slice(1);
			var length = param.length;
			if (length % 2 == 1) {
				defaultVal = param[length - 1];
			}

			for ( var i = 0; i < length; i = i + 2) {
				if (val == param[i]) {
					retVal = param[i + 1];
					flag = true;
					break;
				}
			}
			if (flag) {
				return retVal;
			} else {
				return defaultVal;
			}
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $.util.setdatetimefmt(datestr);
		 * Desc : 문자열의 오른쪽을 지정하는 길이만큼 특정문자로 채워준다.
		 * Parameter : datestr (데이타 문자열)
		 * Return : datestr을 datetime포맷으로 변경해 준다.
		 * ----------------------------------------------------------------------------------*/
		setdatetimefmt : function(datestr) {
			var strLen = datestr.length;

			if (strLen == 14) {
				return datestr.replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/g, "$1-$2-$3 $4:$5:$6");
			} else if (strLen == 8) {
				return datestr.replace(/(\d{4})(\d{2})(\d{2})/g, "$1-$2-$3");
			} else {
				return datestr;
			}
		},

		mask : function(parentId) {
			$('#' + parentId + ' input[type="text"]').each(function(idx, elem) {
				if (typeof $(this).attr('mask') != 'undefined' && $(this).attr('mask') != null && $(this).attr('mask') != '') {
					$(this).mask($(this).attr('mask'));
				}
			});
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $.util.checkAlphabet(val);
		 * Desc : 영문만 입력
		 * Parameter : val (데이타문자열)
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		checkAlphabet : function(val) {
			if (val.length < 1) {
				return false;
			}
			if (val.match(/[^A-Za-z]/gi) == null) {
				return true;
			} else {
				return false;
			}
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.util.checkAlphabetNumber(val);
		 * Desc : 영문 +숫자만 입력
		 * Parameter : val (데이타문자열)
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		checkAlphabetNumber : function(val) {
			if (val.length < 1) {
				return false;
			}
			if (val.match(/[^A-Za-z0-9]/g) == null) {
				return true;
			} else {
				return false;
			}
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $.util.checkLowerAlphabetNumber(val);
		 * Desc : 영문소문자 +숫자만 입력
		 * Parameter : val (데이타문자열)
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		checkLowerAlphabetNumber : function(val) {
			if (val.length < 1) {
				return false;
			}
			if (val.match(/[^a-z0-9]/g) == null) {
				return true;
			} else {
				return false;
			}
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $.util.checkUpperAlphabet(val);
		 * Desc : 영문대문자만 입력
		 * Parameter : val (데이타문자열)
		 *
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		checkUpperAlphabet : function(val) {
			if (val.length < 1) {
				return false;
			}
			if (val.match(/[^A-Z]/g) == null) {
				return true;
			} else {
				return false;
			}
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $.date.isDate(sDate);
		 * Desc : yyyy-mm-dd 형태의 날짜 포맷을 체크하는 함수
		 * Parameter : sDate (yyyy-mm-dd 형태의 날짜 String)
		 * Return : boolean (yyyy-mm-dd형태가 정확)
		 * ----------------------------------------------------------------------------------*/
		isDateGrid : function(pDate, colname) {
			var rtnArr = new Array();
			rtnArr[0] = "";
			rtnArr[1] = true;

			var datePat = /^(\d{4})(\/|-)?(\d{2})(\/|-)?(\d{2})$/;
			// var datePat = /^(\d{4})(\d{2})(\d{2})$/;
			var matchArray = pDate.match(datePat); // is the format ok?
			// var dateFmtErr = "날짜 형식은 yyyy-mm-dd로 입력해 주세요.";
			var dateFmtErr = colname + "은(는) yyyymmdd로 입력해 주세요.";

			if ($.util.isNull(matchArray)) {
				rtnArr[0] = dateFmtErr;
				rtnArr[1] = false;
				return rtnArr;
			}

			year = matchArray[1];
			month = matchArray[3]; // p@rse date into variables
			day = matchArray[5];
			if (month.length != 2) {
				rtnArr[0] = dateFmtErr;
				rtnArr[1] = false;
				return rtnArr;
			}

			if (day.length != 2) {
				rtnArr[0] = dateFmtErr;
				rtnArr[1] = false;
				return rtnArr;
			}

			if (matchArray == null) {
				rtnArr[0] = dateFmtErr;
				rtnArr[1] = false;
				return rtnArr;
			}

			if (month < 1 || month > 12) { // check month range
				rtnArr[0] = colname + "은(는) 1월에서 12월까지 입력가능합니다.";
				rtnArr[1] = false;
				return rtnArr;
			}

			if (day < 1 || day > 31) {
				rtnArr[0] = colname + "은(는) 1일부터 31일까지 입력가능합니다.";
				rtnArr[1] = false;
				return rtnArr;
			}

			if ((month == 4 || month == 6 || month == 9 || month == 11) && day == 31) {
				rtnArr[0] = colname + "의 " + Number(month) + "월은 31일이 없습니다.";
				rtnArr[1] = false;

				return rtnArr;
			}

			if (month == 2) { // check for february 29th
				var isleap = (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0));
				if (day > 29 || (day == 29 && !isleap)) {
					rtnArr[0] = colname + "의 " + Number(year) + "년 2월은 " + Number(day) + "일이 없습니다.";
					rtnArr[1] = false;
					return rtnArr;
				}
			}
			return rtnArr; // date is valid
		},

		/*----------------------------------------------------------------------------------*
		 * Function : $.util.numComma(n);
		 * Desc : 숫자에 콤마를 추가하는 함수
		 * Parameter : n (숫자 String)
		 * Return : n (콤마를 포함한 숫자)
		 * ----------------------------------------------------------------------------------*/
		numComma : function(n) {
			var reg = /(^[+-]?\d+)(\d{3})/; // 정규식
			n += ''; // 숫자를 문자열로 변환

			while (reg.test(n)) {
				n = n.replace(reg, '$1' + ',' + '$2');
			}

			return n;
		}

	};

})(jQuery);

(function($) {
	$.date = {
		/*----------------------------------------------------------------------------------*
		 * Function : $.date.dateCheck(sDate);
		 * Desc : 날짜 형식인지 아닌지 체크하는 함수
		 * Parameter : sDate(입력값)
		 * Return : 날짜 형식 여부
		 * ----------------------------------------------------------------------------------*/
		dateCheck : function(sDate) {
			sDate = sDate.replace(" ", "").replace("-", "").replace("/", "");
			if ($.isNumeric(sDate) == false || $.date.getDay(sDate) == -1) {
				return false;
			}
			var df = "^[0-9]{4}([0]?[0-9]|1[0-2])([0-2]?[0-9]|[3][0-1])$";
			return sDate.match(df);
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.date.getDay(sDate);
		 * Desc : 입력된 날짜의 요일을 반납
		 * Parameter : sDate (yyyyMMdd 형태의 날짜 String)
		 * Return : 0 = 일요일, 1 = 월요일, ..., 6 = 토요일 * -1 = 오류 발생시
		 * ----------------------------------------------------------------------------------*/
		getDay : function(sDate) {
			var objDate = $.date.strToDate(sDate);
			return objDate.getDay();
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.date.strToDate(sDate);
		 * Desc : yyyyMMdd 형태의 String을 Date 객체로 변환하는 함수
		 * Parameter : sDate (yyyyMMdd 형태의 날짜 String)
		 * Return : Date
		 * ----------------------------------------------------------------------------------*/
		strToDate : function(sDate) {
			var nYear = Number(sDate.substring(0, 4));
			var nMonth = Number(sDate.substring(4, 6));
			var nDate = Number(sDate.substring(6, 8));

			return new Date(nYear, nMonth, nDate);
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.date.fillZero(id, size);
		 * Desc : size 만큼 '0'을 날짜 뒤에 채워  변환하는 함수
		 * Parameter : $.date.fillZero('2013-08-07', 14)
		 * Return : String (yyyyMMdd+'000000' 형태의 날짜 String)
		 * ----------------------------------------------------------------------------------*/
		fillZero : function(id, size) {
			var gRtnVal = "";
			// $("#paytl").val().replace(/[^0-9]/g, '');
			var gLenDt = $("#" + id).val().replace(/[^0-9]/g, '');
			var gDiff = parseInt(size) - parseInt(gLenDt.length);
			if (gDiff > 0) {
				for ( var int = 0; int < gDiff; int++) {
					gLenDt += "0";
				}
				gRtnVal.concat(gDiff);
			} else {
				gRtnVal.concat(gDiff);
			}
			return gRtnVal;
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.date.conv1aDate(sDate);
		 * Desc : ddMMyyyy 형태의 String을 yyyyMMdd 로 변환하는 함수
		 * Parameter : sDate (ddMMyyyy 형태의 날짜 String)
		 * Return : String (yyyyMMdd 형태의 날짜 String)
		 * ----------------------------------------------------------------------------------*/
		conv1aDate : function(sDate) {
			var retrnDate = "";
			try {
				if (sDate != null || sDate != undefined || sDate != "") {
					// ddMMyy
					if (sDate.length == 6) {
						var nYear = parseInt(sDate.substr(4, 2));
						var nMonth = parseInt(sDate.substr(2, 2));
						var nDate = parseInt(sDate.substr(0, 2));

						var fullDatetime = new Date(nYear, nMonth, nDate);
						var mYear = fullDatetime.getFullYear() + 100;
						var mMonth = String(fullDatetime.getMonth());
						mMonth = mMonth.length == 1 ? "0" + mMonth : mMonth;
						var mDate = String(fullDatetime.getDate());
						mDate = mDate.length == 1 ? "0" + mDate : mDate;
						retrnDate = (mYear + mMonth + mDate);

					} else if (sDate.length == 8) {
						// ddMMyyyy//생일:::13/12/2005
						var nYear = sDate.substr(4, 4);
						var nMonth = sDate.substr(2, 2);
						var nDate = sDate.substr(0, 2);

						// var fullDatetime = new Date(nYear, nMonth, nDate);
						// var mYear = fullDatetime.getFullYear() + 100;
						// var mMonth = String(fullDatetime.getMonth());
						// mMonth = mMonth.length == 1 ? "0" + mMonth : mMonth;
						// var mDate = String(fullDatetime.getDate());
						// mDate = mDate.length == 1 ? "0" + mDate : mDate;
						var mYear = String(nYear);
						var mMonth = String(nMonth);
						var mDate = String(nDate);
						retrnDate = (mYear + mMonth + mDate);

					} else if (sDate.length == 10) {
						// ddMMyyHHmm
						var nTime = sDate.substr(6, 4);
						var nYear = parseInt(sDate.substr(4, 2));
						var nMonth = parseInt(sDate.substr(2, 2));
						var nDate = parseInt(sDate.substr(0, 2));

						var fullDatetime = new Date(nYear, nMonth, nDate);

						var mYear = fullDatetime.getFullYear() + 100;// 1900+100=2000
						var mMonth = String(fullDatetime.getMonth());
						mMonth = mMonth.length == 1 ? "0" + mMonth : mMonth;
						var mDate = String(fullDatetime.getDate());
						mDate = mDate.length == 1 ? "0" + mDate : mDate;
						retrnDate = (mYear + mMonth + mDate + nTime);
					}
				}
			} catch (e) {
			}

			return retrnDate;
		},
		/*----------------------------------------------------------------------------------*
		 * Function : $.date.formatter(sDate, flag, separator);
		 * Desc : yyyyMMdd 형태의 String을 Date 객체로 변환하는 함수
		 * Parameter : sDate - 숫자형태의 Full날짜 String
		 * 			   flag - day(요일) : 최소 8자리
		 * 			   flag - date(년월일) : 최소 8자리
		 * 			   flag - dateday(년월일(요일)) : 최소 8자리
		 * 			   flag - datetime(년월일시분)) : 최소 12자리
		 * 			   flag - datedaytime(년월일(요일)시분)) : 최소 12자리
		 * 			   flag - time(시분) : 최소 12자리
		 * 			   separator - 요일 구분자 값
		 * Return : Date
		 * ----------------------------------------------------------------------------------*/
		formatter : function(pDate, pFlag, pSeperator) {
			var ret = '', sFlag = '', sDay = '';

			if (typeof pDate == 'undefined' || pDate == null || pDate.length < 8 || pDate == 'null') {
				return '';
			}
			if (typeof pFlag == 'undefined' || pFlag == null || pFlag.length == 0 || pFlag == 'null') {
				return '';
			}
			if (typeof pSeperator == 'undefined' || pSeperator == null || pSeperator.length == 0 || pSeperator == 'null') {
				sFlag = '-';
			} else {
				sFlag = pSeperator;
			}

			var sYear = pDate.substring(0, 4);
			var sMonth = pDate.substring(4, 6);
			var sDate = pDate.substring(6, 8);
			var sHour = pDate.substring(8, 10);
			var sMinute = pDate.substring(10, 12);
			var nDay = $.date.getDay(pDate.substring(0, 8));
			switch (nDay) {
			case 0:
				sDay = "일";
				break;
			case 1:
				sDay = "월";
				break;
			case 2:
				sDay = "화";
				break;
			case 3:
				sDay = "수";
				break;
			case 4:
				sDay = "목";
				break;
			case 5:
				sDay = "금";
				break;
			case 6:
				sDay = "토";
				break;
			}

			switch (pFlag) {
			case 'day': // 요일
				ret = sDay;
				break;
			case 'date': // 날짜
				ret = sYear + sFlag + sMonth + sFlag + sDate;
				break;
			case 'dateday': // 날짜(요일)
				ret = sYear + sFlag + sMonth + sFlag + sDate + '(' + sDay + ')';
				break;
			case 'datetime': // 날짜 시간
				ret = sYear + sFlag + sMonth + sFlag + sDate + ' ' + sHour + ':' + sMinute;
				break;
			case 'datedaytime': // 날짜(요일) 시간
				ret = sYear + sFlag + sMonth + sFlag + sDate + '(' + sDay + ') ' + sHour + ':' + sMinute;
				break;
			case 'time': // 시간
				ret = sHour + ':' + sMinute;
				break;
			}

			return ret;
		}

	};
})(jQuery);

(function($) {
	$.gridformatter = {
		dateTimeFormat : function(cellvalue, options, rowObject) {

			if (typeof cellvalue == 'undefined' || cellvalue == null || cellvalue.length == 0 || cellvalue == 'null') {
				return '';
			}
			switch (options.colModel.formatoptions.dateformat) {
			case 'datetime':
				if (cellvalue.length > 13) {
					cellvalue = cellvalue.substring(0, 4) + '-' + cellvalue.substring(4, 6) + '-' + cellvalue.substring(6, 8) + ' '
							+ cellvalue.substring(8, 10) + ':' + cellvalue.substring(10, 12) + ':' + cellvalue.substring(12, 14);
				}
				break;
			case 'datehhmm':
				if (cellvalue.length > 11) {
					cellvalue = cellvalue.substring(0, 4) + '-' + cellvalue.substring(4, 6) + '-' + cellvalue.substring(6, 8) + ' '
							+ cellvalue.substring(8, 10) + ':' + cellvalue.substring(10, 12);
				}
				break;
			case 'date':
				if (cellvalue.length > 7) {
					cellvalue = cellvalue.substring(0, 4) + '-' + cellvalue.substring(4, 6) + '-' + cellvalue.substring(6, 8);
				}
				break;
			}

			return cellvalue;
		},

		businessRegNoFormat : function(cellvalue, options, rowObject) {
			if (typeof cellvalue == 'undefined' || cellvalue == null || cellvalue.length == 0 || cellvalue == 'null') {
				return '';
			}

			if (cellvalue.length == 10) {
				cellvalue = cellvalue.substring(0, 3) + '-' + cellvalue.substring(3, 5) + '-' + cellvalue.substring(5);
			}

			return cellvalue;
		},

		postCodeFormat : function(cellvalue, options, rowObject) {
			if (typeof cellvalue == 'undefined' || cellvalue == null || cellvalue.length == 0 || cellvalue == 'null') {
				return '';
			}

			if (cellvalue.length == 6) {
				cellvalue = cellvalue.substring(0, 3) + '-' + cellvalue.substring(3);
			}

			return cellvalue;
		},

		urlLinkFormat : function(cellvalue, options, rowObject) {
			var $grid = $('#' + options.gid);
			var pkey = $grid.grid('getGridParam', 'constraints')['pkey'];
			// var pkArr = {};
			// console.log('===========');
			// console.log(rowObject);
			// console.log('===========');
			var retStr = '';
			for ( var i = 0; i < pkey.length; i++) {
				if (i != 0) {
					retStr += ';';
				}
				retStr += pkey[i] + '=' + $(rowObject).find(pkey[i]).text();

				// pkArr[pkey[i]] = $(rowObject).find(pkey[i]).text();
			}
			// return '<a href="#" onClick="openForm(' + pkArr + ')">' +
			// cellvalue + '</a>';
			return '<a href="#" onClick="openForm(\'' + retStr + '\')">' + cellvalue + '</a>';
		},

		urlLinkUnformat : function(cellvalue, options, rowObject) {
			return cellvalue;
		},

		removeFormatter : function(cellvalue, options) {
			cellvalue = cellvalue.replace(/-/g, '');
			cellvalue = cellvalue.replace(/ /g, '');
			cellvalue = cellvalue.replace(/:/g, '');
			return cellvalue;
		},

		passFormat : function(cellvalue, options, rowObject) {
			return '**********';
		}
	};

	$.gridvalidate = {
		require : function(value, colname) {
			if (typeof value == 'undefined' || value == '' || value == null) {
				return [ false, colname + '는(은) 필수 입력항목입니다.' ];
			} else {
				return [ true, '' ];
			}
		},

		minvalue : function(value, colname, limitVal) {
			if (Number(value) < Number(limitVal)) {
				return [ false, colname + '의 최소값은 ' + limitVal + '입니다.' ];
			} else {
				return [ true, '' ];
			}
		},

		maxvalue : function(value, colname, limitVal) {
			if (Number(value) > Number(limitVal)) {
				return [ false, colname + '의 최대값은 ' + limitVal + '입니다.' ];
			} else {
				return [ true, '' ];
			}
		},

		number : function(value, colname) {
			return [ $.util.checkNumber(value), colname + '는(은) 숫자만 입력 가능합니다.' ];
		},

		minlength : function(value, colname, limitVal) {
			if (value.length < Number(limitVal)) {
				return [ false, colname + '의 최소 입력 자리수는 ' + limitVal + '입니다.' ];
			} else {
				return [ true, '' ];
			}
		},

		maxlength : function(value, colname, limitVal) {
			if (value.length > Number(limitVal)) {
				return [ false, colname + '의 최대 입력 자리수는 ' + limitVal + '입니다.' ];
			} else {
				return [ true, '' ];
			}
		},

		email : function(value, colname) {
			if (!$.util.checkEmail(value)) {
				return [ false, colname + '의  이메일형식을 확인하세요' ];
			} else {
				return [ true, '' ];
			}
		},

		password : function(value, colname) {
			if (!$.util.checkVofPassword(value)) {
				return [ false, colname + '의 형식을 확인하세요(최소:6자, 최대:16자, 영숫자혼용)' ];
			} else {
				return [ true, '' ];
			}
		},

		alphabet : function(value, colname) {
			if (typeof value != 'undefined' && value != '' && value != null) {
				if (!$.util.checkAlphabet(value)) {
					return [ false, colname + '은(는) 영문만 입력가능합니다.' ];
				} else {
					return [ true, '' ];
				}
			} else {
				return [ true, '' ];
			}

		},

		alphabetnumber : function(value, colname) {
			if (!$.util.checkAlphabetNumber(value)) {
				return [ false, colname + '은(는) 영문과 숫자만 입력가능합니다.' ];
			} else {
				return [ true, '' ];
			}
		},

		loweralphabetnumber : function(value, colname) {
			if (!$.util.checkLowerAlphabetNumber(value)) {
				return [ false, colname + '은(는) 소문자영문과 숫자만 입력가능합니다.' ];
			} else {
				return [ true, '' ];
			}
		},

		upperalphabet : function(value, colname) {
			if (!$.util.checkUpperAlphabet(value)) {
				return [ false, colname + '은(는) 대문자영문만 입력가능합니다.' ];
			} else {
				return [ true, '' ];
			}
		},

		isdate : function(value, colname) { // 날짜 validate 추가
			var dateArr = $.util.isDateGrid(value, colname);
			if (!dateArr[1]) {
				return [ false, dateArr[0] ];
			} else {
				return [ true, '' ];
			}
		}
	};
})(jQuery);
