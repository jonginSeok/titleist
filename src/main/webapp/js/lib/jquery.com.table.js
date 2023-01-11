/*
 * Table 관련 플러그인...
 */
(function($) {
	var methods = {
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).table('colmove', levt, revt, cntOpt);
		 * Desc : 좌우 버튼을 클릭하여 테이블의 숨겨진 칼럼을 보여 주는 함수.  
		 * Parameter : levt (칼럼을 왼쪽으로 이동하는 버튼 아이디) 
		 * 				revt (칼럼을오른쪽으로 이동하는 버튼 아이디) 
		 * 				cntOpt (테이블 칼럼 이동시 필요한 옵션 ex.[앞 고정갯수, 앞뒤보여지는 칼럼 갯수, 뒤 고정갯수])
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		colmove : function(levt, revt, cntOpt) {
			return this.each(function() {
				var table = $(this);
				var cols = $('#' + $(this).attr('id') + ' > thead > tr').children();
				var prefix_cnt = 0;
				var afterfix_cnt = 0;
				var view_cnt = 4;
				if (!$.util.isNull(cntOpt)) {
					prefix_cnt = cntOpt[0];
					afterfix_cnt = cntOpt[2];
					view_cnt = cntOpt[1];
				}
				var hid_col_arr = [];
				var moveIdx = -1;

				$.each(cols, function(index) {
					var colnum = index + 1;
					if (colnum > (prefix_cnt + view_cnt) && colnum <= (cols.length - afterfix_cnt)) {
						hid_col_arr.unshift(colnum);
						// cols.hide();
					}
					return hid_col_arr;
				});

				hid_col_arr = hid_col_arr.reverse();

				var opt = {
					listTargetID : 'targetall',
					onClass : '',
					offClass : '',
					colsHidden : hid_col_arr
				};
				table.columnManager(opt);

				$(levt).bind('click', function() {
					if (moveIdx == -1) {
						return;
					}

					var hiddenColIdx = hid_col_arr[moveIdx];
					var showColIdx = hiddenColIdx - view_cnt;
					table.showColumns([ showColIdx ], opt);
					table.hideColumns([ hiddenColIdx ], opt);

					moveIdx = moveIdx - 1;
				});

				$(revt).bind('click', function(e) {
					if (hid_col_arr[moveIdx] == cols.length - afterfix_cnt) {
						return;
					}

					moveIdx = moveIdx + 1;
					var showColIdx = hid_col_arr[moveIdx];
					var hiddenColIdx = showColIdx - view_cnt;
					table.showColumns([ showColIdx ], opt);
					table.hideColumns([ hiddenColIdx ], opt);
				});

			});
		},
		/*----------------------------------------------------------------------------------* 	
		 * Function : $(selector).table('rowspan', colIdx, isStats);
		 * Desc : 테이블의 칼럼을 자동으로 rowspan 시켜주는 함수. 
		 * Parameter : colIdx (rowspan 속성을 지정할 칼럼 인덱스) 
		 * 				isStats () 
		 * Return : 
		 * ----------------------------------------------------------------------------------*/
		rowspan : function(colIdx, isStats) {
			return this.each(function() {
				var that;
				$('tr', this).each(function(row) {
					$('td:eq(' + colIdx + ')', this).filter(':visible').each(function(col) {

						if ($(this).html() == $(that).html() && (!isStats || isStats && $(this).prev().html() == $(that).prev().html())) {
							rowspan = $(that).attr("rowspan") || 1;
							rowspan = Number(rowspan) + 1;

							$(that).attr("rowspan", rowspan);
							// do your action for the colspan cell here
							// $(this).hide();

							$(this).remove();
							// do your action for the old cell here

						} else {
							that = this;

						}

						// set the that if not already set
						that = (that == null) ? this : that;
					});
				});
			});
		}
	};

	$.fn.table = function(method) {

		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method || $.util.isNull(methods[method])) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.tooltip');
		}
	};

})(jQuery);
