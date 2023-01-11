(function($) {
	/*----------------------------------------------------------------------------------* 
	 * Function : $(selector).pager(options, styleOptions, side); 
	 * Desc : list의 Paging 처리를 한다. 
	 * Parameter : options (페이지 구성에 필요한 옵션) 
	 * 				ex. pageSize: pageSize, 			//한 페이지당 보여 주는 row수
	 *							pageBlock: pageBlock, 	//block으로 보여 주는 page 수
	 *							currentPage: currentPage, //현재 페이지
	 *							pageTotal: pageTotal, 		//총 row 수
	 *							url:url, 					//페이지 이동시 url
	 *							formid:formid				//페이지 이동시 param으로 넘겨야 하는 form id
	 *							
	 *				styleOptions (페이지 네비게이션을 구성하기 위해서 필요한 옵션 )
	 *				 ex. {type:'grid', 					//페이징하고자 하는 목록이  Grid Or Table
	 *				 		id:'tbl_grid', 				//페이징하고자 하는 목록의 아이디
	 *				 		style:'vof_list'}			//페이징 네비게이션을 만들기 위한 스타일을 미리 정해 놓는다. 
	 *				side : Server Side Or Client Side 여부 
	 *				 ex. 'C' : client, 'S'/null : server 
	 * Return :
	 * ----------------------------------------------------------------------------------*/
	$.fn.pager = function(options, styleOptions, side) {

		// 기본값 설정
		var defaults = {
			pageSize : 10,
			currentPage : 1,
			pageTotal : 0,
			pageBlock : 10
		};

		var subOption = $.extend(true, defaults, options); // defaults와 option을 병합한다.

		return this.each(function() {

			var currentPage = subOption.currentPage * 1; // 현재 페이지
			var pageSize = subOption.pageSize * 1; // 출력 리스트 수
			var pageBlock = subOption.pageBlock * 1; // 1~10까지 블락
			var pageTotal = subOption.pageTotal * 1; // 총 데이터 수

			if (!pageSize) {
				pageSize = 10; // 출력 리스트수가 없으면 초기값 10으로 설정
			}
			if (!pageBlock) {
				pageBlock = 10; // 블락 초기값이 없으면 10으로 설정
			}

			var pageTotalCnt = Math.ceil(pageTotal / pageSize);
			var pageBlockCnt = Math.ceil(currentPage / pageBlock);
			var sPage, ePage;
			var html = "";

			if (pageBlockCnt > 1) {
				sPage = (pageBlockCnt - 1) * pageBlock + 1;
			} else {
				sPage = 1;
			}

			if ((pageBlockCnt * pageBlock) >= pageTotalCnt) {
				ePage = pageTotalCnt;
			} else {
				ePage = pageBlockCnt * pageBlock;
			}

			var pages = {
				first : 1,
				prev : sPage - pageBlock,
				next : ePage + 1,
				last : pageTotalCnt
			};

			var naviOpt = {
				sPage : sPage,
				ePage : ePage,
				currentPage : currentPage,
				pageTotalCnt : pageTotalCnt
			};
			html = $.pager.navigator(naviOpt, styleOptions.style);
			// alert(html);
			$(this).empty().append(html);

			$.pager.link($(this), options.url, options.formid, pages, styleOptions, side);

		});

	};

	$.pager = {
		/*----------------------------------------------------------------------------------* 
		 * Function : $.pager.navigator(naviOption, style); 
		 * Desc : Paging Navigator 을 만든다. 
		 * Parameter : naviOption (네이게이션을 만들기 위해서 필요한 값) 
		 * 				ex. sPage : sPage,		//시작 페이지
		 *						ePage : ePage,	//마지막 페이지
		 *						currentPage : currentPage,	//현재 페이지
		 *						pageTotalCnt : pageTotalCnt	//페이지 총 갯수
		 *								
		 *				style (디자인이 틀리기 때문에 구분자로 스타일을 틀리게 준다.  )
		 *						(다른 디자인이 필요하면 추가해서 만드렁야 한다. )
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		navigator : function(naviOption, style) {
			switch (style) {
			case 'vof_list':
				var html = '';

				if (naviOption.sPage > 1) {
					html += '<a href="javascript:;" class="li-first"><img src="/vof/imgs/btn/btn_astart.gif" alt="처음" /></a>&nbsp;';
					html += '<a href="javascript:;" class="li-prev"><img src="/vof/imgs/btn/btn_aprev.gif" alt="이전" /></a>&nbsp;';
				}

				for ( var i = naviOption.sPage; i <= naviOption.ePage; i++) {
					if (naviOption.currentPage == i) {
						html += '<a href="javascript:;" class="active">' + i + '</a> &nbsp;';
					} else {
						html += '<a href="javascript:;" class="li-page">' + i + '</a> &nbsp;';
					}
				}

				if (naviOption.ePage < naviOption.pageTotalCnt) {
					html += '<a href="javascript:;" class="li-next"><img src="/vof/imgs/btn/btn_anext.gif" alt="다음" /></a>&nbsp;';
					html += '<a href="javascript:;" class="li-last"><img src="/vof/imgs/btn/btn_aend.gif" alt="끝" /></a>';
				}

				return html;
				break;

			default:
				break;
			}
		},
		/*----------------------------------------------------------------------------------* 
		 * Function : $.pager.link(target, url, formid, pages, styleOptions, side);
		 * Desc : 페이지 네비게이션을 클릭시 이벤트를 선언한다. 
		 * Parameter : target (페이징 navigator를 표시하는 레이어)
		 * 				url (다른 페이지를 클릭시 이동하는 url) 
		 * 				formid (페이지 이동시 param으로 넘겨야 하는 form id)
		 * 				pages (각 링크마다 계산되어진 페이지 No)
		 *				styleOptions (페이지 네비게이션을 구성하기 위해서 필요한 옵션 )
		 *				side (Server Side Or Client Side 여부)
		 * Return :
		 * ----------------------------------------------------------------------------------*/
		link : function(target, url, formid, pages, styleOptions, side) {
			var sside = ($.util.isNull(side)) ? 'S' : side;
			var targetId = '#' + target.attr('id'); // 페이징 navigator div id
			var pageVariable = 'spage';
			if (!$.util.isNull(styleOptions.pageVariableName)) {
				pageVariable = styleOptions.pageVariableName;
			}

			switch (styleOptions.type) {
			case 'grid':
				$(targetId + ' .li-first').bind('click', function() {
					var pageEnable = $('#' + styleOptions.id).grid('getGridParam', 'pageEnable');
					if (!pageEnable) {
						return;
					}
					if (sside == 'C') {
						// 2013-06-13 URL 복사관련 추가 시작
						var gridCRUDUrl = $('#' + styleOptions.id).grid('getGridParam', 'gridCRUDUrl');
						// 페이지번호 추가
						gridCRUDUrl.lastSelectedTargetPage = pages.first;
						// 2013-06-13 URL 복사관련 추가 종료

						$('#' + styleOptions.id).setGridParam({
							page : pages.first
						}).trigger("reloadGrid");
					} else {
						$('#' + styleOptions.id).setGridParam({
							page : pages.first
						});
						$('#' + styleOptions.id).grid('selectData', url, formid);
					}
				});

				$(targetId + ' .li-prev').bind('click', function() {
					var pageEnable = $('#' + styleOptions.id).grid('getGridParam', 'pageEnable');
					if (!pageEnable) {
						return;
					}
					if (sside == 'C') {
						// 2013-06-13 URL 복사관련 추가 시작
						var gridCRUDUrl = $('#' + styleOptions.id).grid('getGridParam', 'gridCRUDUrl');
						// 페이지번호 추가
						gridCRUDUrl.lastSelectedTargetPage = pages.prev;
						// 2013-06-13 URL 복사관련 추가 종료

						$('#' + styleOptions.id).setGridParam({
							page : pages.prev
						}).trigger("reloadGrid");
					} else {
						$('#' + styleOptions.id).setGridParam({
							page : pages.prev
						});
						$('#' + styleOptions.id).grid('selectData', url, formid);
					}
				});

				$(targetId + ' .li-next').bind('click', function() {
					var pageEnable = $('#' + styleOptions.id).grid('getGridParam', 'pageEnable');
					if (!pageEnable) {
						return;
					}
					if (sside == 'C') {
						// 2013-06-13 URL 복사관련 추가 시작
						var gridCRUDUrl = $('#' + styleOptions.id).grid('getGridParam', 'gridCRUDUrl');
						// 페이지번호 추가
						gridCRUDUrl.lastSelectedTargetPage = pages.next;
						// 2013-06-13 URL 복사관련 추가 종료

						$('#' + styleOptions.id).setGridParam({
							page : pages.next
						}).trigger("reloadGrid");
					} else {
						$('#' + styleOptions.id).setGridParam({
							page : pages.next
						});
						$('#' + styleOptions.id).grid('selectData', url, formid);
					}

				});

				$(targetId + ' .li-last').bind('click', function() {
					var pageEnable = $('#' + styleOptions.id).grid('getGridParam', 'pageEnable');
					if (!pageEnable) {
						return;
					}
					if (sside == 'C') {
						// 2013-06-13 URL 복사관련 추가 시작
						var gridCRUDUrl = $('#' + styleOptions.id).grid('getGridParam', 'gridCRUDUrl');
						// 페이지번호 추가
						gridCRUDUrl.lastSelectedTargetPage = pages.last;
						// 2013-06-13 URL 복사관련 추가 종료

						$('#' + styleOptions.id).setGridParam({
							page : pages.last
						}).trigger("reloadGrid");
					} else {
						$('#' + styleOptions.id).setGridParam({
							page : pages.last
						});
						$('#' + styleOptions.id).grid('selectData', url, formid);
					}
				});

				$(targetId + ' .li-page').bind('click', function() {
					var spage = $(this).text();
					var pageEnable = $('#' + styleOptions.id).grid('getGridParam', 'pageEnable');
					if (!pageEnable) {
						return;
					}

					if (sside == 'C') {
						// 2013-06-13 URL 복사관련 추가 시작
						var gridCRUDUrl = $('#' + styleOptions.id).grid('getGridParam', 'gridCRUDUrl');
						// 페이지번호 추가
						gridCRUDUrl.lastSelectedTargetPage = spage;
						// 2013-06-13 URL 복사관련 추가 종료

						$('#' + styleOptions.id).setGridParam({
							page : spage
						}).trigger("reloadGrid");
					} else {
						$('#' + styleOptions.id).setGridParam({
							page : spage
						});
						$('#' + styleOptions.id).grid('selectData', url, formid);
					}
				});
				break;

			default:
				break;
			}
		}

	};

})(jQuery);
