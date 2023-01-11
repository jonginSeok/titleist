<%--
  Class Name : EgovLoginLogList.jsp
  Description : 로그인 로그 정보목록 화면(jqGrid 변환)
  Modification Information
 
      수정일         수정자                   수정내용
    -------    --------    ---------------------------
     2009.03.11  이삼섭              최초 생성
     2011.08.31   JJY       경량환경 버전 생성
 
    author   : 공통서비스 개발팀  이삼섭
    since    : 2009.03.11  
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.text.SimpleDateFormat,java.util.Date"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<% String version = "?version=" + new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()); %>

<link type="text/css" rel="stylesheet" href="/css/jquery-ui-themes-1.13.2/themes/redmond/theme.css">

<!-- // 달력이 안나온다.
<link type="text/css" rel="stylesheet" href="/css/jquery-ui-themes-1.13.2/themes/redmond/jquery-ui.min.css">
<link type="text/css" rel="stylesheet" href="/css/jquery-ui-1.8.24.custom.css" /> 
 -->
<link type="text/css" rel="stylesheet" href="/css/ui.jqgrid.css" />

<script type="text/javascript" src="/js/plugin/jquery.jqGrid.min.js<%=version%>"></script>
<!-- jquery.jqgrid-4.15.5-pre.min.js -->
<script type="text/javascript" src="/js/plugin/grid.locale-kr.js<%=version%>"></script>

<script type="text/javascript" src="/js/lib/jquery.com.form.js<%=version%>"></script>
<script type="text/javascript" src="/js/lib/jquery.com.grid.js<%=version%>"></script>
<script type="text/javascript" src="/js/lib/jquery.com.util.js<%=version%>"></script>
<script type="text/javascript" src="/js/lib/jquery.com.datepicker.js<%=version%>"></script>
 
<script type="text/javascript" src="/js/egovframework/EgovCalPopup.js<%=version%>"></script>

<script type="text/javascript">
	
	var fv_lastSelection;
	var fv_uurl = "/sym/log/clg/SelectLoginLogList.ax";
	
	//Grid title
	var fv_colNames = [ '번호', '로그ID', '발생일자', '로그유형', '상세보기1', '상세보기2', '상세보기3' ];

	//Grid Model
	var fv_colModel = [
		{ name : 'no',/*번호*/ width : 10, align : 'center', editable : false, sorttype : 'integer', },
		{ name : 'logId',/*로그ID*/ width : 150, editable : false, /* must set editable to true if you want to make the field editable */ key : true, align : 'center', }, 
		{ name : 'creatDt',/*발생일자*/ width : 150, align : 'center', editable : false, }, 
		{ name : 'loginMthd',/*로그유형*/ width : 90, align : 'center', editable : true, edittype : 'select', editoptions : { value : "I:입력;U:수정;D:삭제;'':선택" }, /* select box */ }, 
		{ name : 'loginIp',/*상세보기1*/ width : 120, align : 'left', editable : false, formatter : fn_btnDetail, }, 
		{ name : 'loginId',/*상세보기2*/ width : 15, align : 'center', editable : false, hidden : true, }, 
		{ name : 'loginNm',/*상세보기3*/ width : 15, align : 'center', editable : false, hidden : true, }
	];
	
	var fv_option = {
		multiselect : true, //옵션에 multiselect:true 부분을 추가하면 그리드 목록 전체선택/전체 해제가 가능하다.
		viewrecords : true,
		rowNum : 10,
		rowList : [ 10, 20, 30, 40, 50 ],
		pager : '#jqGridPager',
		sortable : true,
		//sortname : 'no', // 그리드 헤더에 표시가 나타난다.
		sortorder : 'desc', // 그리드 헤더에 표시가 나타난다.
		// emptyrecords: "Nothing to display", // 그리드 조회결과아 없을 때, 하단 오른쪽 text
		jsonReader : {
			root : "resultList",
			id : "logId",
			page : "paginationInfo>currentPageNo", // 현재 페이지
			total : "paginationInfo>recordCountPerPage", // 페이지당 데이터 row 수
			records : "resultCnt", // 총 데이터 row 수
			repeatitems : false,
		},
	};

	var fv_event = {
		loadComplete	: fn_loadComplete,
		onSelectRow		: fn_editRow,
		ondblClickRow	: fn_ondblClickRow,
		onRightClickRow : fn_onRightClickRow,
		paging			: fn_onPaging,
	};

	function fn_loadComplete() {
		var ids = $("#jqGrid").jqGrid('getDataIDs');
		//Paging 
		var currentPage = $('#jqGrid').grid('getGridParam', 'page'); //현재 페이지
		var pageSize = $('#jqGrid').grid('getGridParam', 'rowNum'); //한 페이지당 보여 주는 row수
		var pageTotal = $('#jqGrid').grid('getGridParam', 'records'); //총 row 수
		var pageBlock = 10; //block으로 보여 주는 page 수
		var url = $('#jqGrid').grid('getGridParam', 'url'); //페이지 이동시 url
		var formid = ''; //페이지 이동시 param으로 넘겨야 하는 form id

	}
	
	function fn_editRow(id) {
		if (id && id !== fv_lastSelection) {
			var grid = $("#jqGrid");
			grid.jqGrid('restoreRow', fv_lastSelection);
			grid.jqGrid('editRow', id, {
				keys : true,
				onEnter : function(rowid, options, event) {
					console.log("#onEnter(" + rowid + "," + options + "," + event + ")");
					if (confirm("Save the row with ID: " + rowid) === true) {
						$(this).jqGrid("saveRow", rowid, options);
					}
				}
			});
			fv_lastSelection = id;
		}
	}

	function fn_ondblClickRow() {
		console.log("-fn_ondblClickRow");

	}

	function fn_onRightClickRow() {
		console.log("-fn_onRightClickRow");

	}
	
	function fn_onPaging (action) {
		console.log("#fn_onPaging  :" + action);
		
		$("#jqGrid").grid("onPaging", action, fv_uurl);
		
		$("#jqGrid").grid("setGridParam", { page : 2 });
		$("#jqGrid").grid("setGridParam", { postData : 2 });
	}
	

	/*
	 * 화면로드 이벤트. 지역(page)함수는 fn_ , 전역(grobal, 공통)함수는 gfn_ 으로 작성
	 */
	$(document).ready(function(event) {

		// 조회조건 발생일자
		/* $("#searchBgnDe").datepicker();
		$("#searchEndDe").datepicker(); */
		
		/* defaultDate: '01/01/01',
		dateFormat : 'yy-mm-dd', */
		
		$("#searchEndDe").datepicker({
			id : 'searchEndDe_datePicker',
			dateFormat : 'yy-mm-dd',
			minDate : new Date(1910, 0, 1),
			maxDate : new Date(2025, 0, 1),
			showOn : 'focus'
		});//.datepicker("setDate", new Date());
		
		$("#searchBgnDe").datepicker({
			id : 'searchBgnDe_datePicker',
			dateFormat : 'yy-mm-dd',
			minDate : new Date(1910, 0, 1),
			maxDate : new Date(2025, 0, 1),
			showOn : 'focus'
		});//.datepicker("setDate", $.date.diffDate($("#searchEndDe").val(), -4));
		
		$("#jqGrid").grid("init", fv_uurl, fv_colNames, fv_colModel, fv_option, fv_event);
		
		
		
		// 조회클릭
		$('#search').bind('click', function() {
			// $([name='pageIndex']).val(); // pageIndex set
			$("#jqGrid").grid('selectData', fv_uurl, 'frm');
		});
	});

	function fn_rowBtnClick(rowid, idx) {
		var str = "rowid 는 " + rowid + " / idx 는 " + idx + " 입니다.";
		alert(str);
	}

	function fn_onSelectRow(rowId, iRow, iCol) {
		console.log("-fn_onSelectRow rowId:" + rowId + " iRow:" + iRow
				+ " iCol:" + iCol);

		if (rowId) {
			var row = $("#jqGrid").jqGrid('getRowData', rowId);
			console.log("-fn_onSelectRow row:" + row + " row.no:" + row.no
					+ " row.logId:" + row.logId + " row.creatDt:" + row.creatDt
					+ " row.loginMthd:" + row.loginMthd);

		}
	}

	// button 예제
	function fn_btnDetail(cellvalue, options, rowObject) {

		var str = "";
		var row_id = options.rowId;
		var idx = Number(rowObject.no - 1);

		str += "<div class=\"\">"; // buttons
		str += "<button type='button' class='' title='상세' style='cursor: pointer; background-repeat: no-repeat; overflow: hidden; margin-left: 8px; width: 70px; height: 20px; background-image: url(\'/images/img_search.gif\');' onclick=\"javascript:fn_rowBtnClick('"
				+ row_id + "','" + idx + "' )\">상세</button>";
		str += "</div>";
		return str;
	}
	
	function fn_egov_select_loginLog(pageNo) {
		var fromDate = document.frm.searchBgnDe.value;
		var toDate = document.frm.searchEndDe.value;

		fromDate = fromDate.replaceAll('-', '');
		toDate = toDate.replaceAll('-', '');

		if (fromDate > toDate) {
			alert("종료일자는 시작일자보다  이후날짜로 선택하세요.");
			//return false;
		} else {
			/* submit 방식*/
			//document.frm.pageIndex.value = pageNo;
			//document.frm.action = "<c:url value='/sym/log/clg/SelectLoginLogList.do'/>";
			//document.frm.submit();
			/* jqGrid 조회 */
			$("#jqGrid").grid('selectData', fv_uurl, 'frm');

		}
	}

	function fn_egov_inqire_loginLog(logId) {
		var url = "<c:url value ='/sym/log/clg/InqireLoginLog.do?logId='/>"
				+ logId;

		var openParam = "scrollbars=yes,toolbar=0,location=no,resizable=0,status=0,menubar=0,width=640,height=300,left=0,top=0";
		window.open(url, "p_loginLogInqire", openParam);
	}
	
	/* ********************************************************
	 * PROTOTYPE JS FUNCTION
	 ******************************************************** */
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "");
	}

	String.prototype.replaceAll = function(src, repl) {
		var str = this;
		if (src == repl) {
			return str;
		}
		while (str.indexOf(src) != -1) {
			str = str.replace(src, repl);
		}
		return str;
	}
</script>
<title>로그인 로그 목록</title>

<!-- //content 시작 -->
<div id="content">
	<form name="frm" id="frm" action="<c:url value='/sym/log/SelectLoginLogList.do'/>" method="post">
		<input type="submit" id="invisible" class="invisible">
		<!-- 현재위치 네비게이션 시작 -->
		<div id="cur_loc">
			<div id="cur_loc_align">
				<ul>
					<li>HOME</li>
					<li>&gt;</li>
					<li>내부서비스관리</li>
					<li>&gt;</li>
					<li>사용현황관리</li>
					<li>&gt;</li>
					<li><strong>접속로그관리</strong></li>
				</ul>
			</div>
		</div>

		<!-- 검색 필드 박스 시작 -->
		<div id="search_field">
			<div id="search_field_loc">
				<h2>
					<strong>로그인 로그조회</strong>
				</h2>
			</div>

			<input type="hidden" name="cal_url" value="<c:url value='/sym/cmm/EgovNormalCalPopup.do'/>" />
			<fieldset>
				<legend>조건정보 영역</legend>
				<div class="sf_start">
					<ul id="">
						<li>발생일자
							<input type="text" name="searchBgnDe" id="searchBgnDe" size="10" maxlength="10" readonly="readonly" title="시작일자입력" value="${searchVO.searchBgnDe}"> ~ 
							<input type="text" name="searchEndDe" id="searchEndDe" size="10" maxlength="10" readonly="readonly" title="종료일자입력" value="${searchVO.searchEndDe}">
						</li>
					</ul>
					<ul id="search_second_ul">
						<li>
							<div class="buttons" style="float: right;">
								<%-- <a href="<c:url value='/sym/log/SelectLoginLogList.do'/>" onclick="javascript:fn_egov_select_loginLog('1'); return false;"><img src="<c:url value='/images/img_search.gif' />" alt="search">조회</a> --%>
								<button type="button" id="search" title="조회" style="background-repeat: no-repeat; overflow: hidden; margin-left: 8px; width: 70px; background-image: url('/images/img_search.gif'); cursor: pointer;">조회</button>
								<a href="#LINK" onclick="document.frm.searchBgnDe.value=''; document.frm.searchEndDe.value=''; return false;">초기화</a>
							</div>
						</li>
					</ul>
				</div>
			</fieldset>
		</div>
		<!-- //검색 필드 박스 끝 -->
		<div id="page_info">
			<div id="page_info_align"></div>
		</div>
		<!-- table add start -->
		<div class="default_tablestyle">
			<table id="jqGrid">
				<!--  cellpadding="0" cellspacing="0" -->
				<%-- <caption>로그인 로그조회</caption>
				<colgroup>
					<col width="10%">
					<col width="20%">
					<col width="20%">
					<col width="20%">
					<col width="20%">
				</colgroup>
				<thead>
					<tr>
						<th scope="col" class="f_field" nowrap="nowrap">번호</th>
						<th scope="col" nowrap="nowrap">로그ID</th>
						<th scope="col" nowrap="nowrap">발생일자</th>
						<th scope="col" nowrap="nowrap">로그유형</th>
						<th scope="col" nowrap="nowrap">상세보기</th>
					</tr>
				</thead>
				<tbody>

					<c:forEach var="result" items="${resultList}" varStatus="status">
						<!-- loop 시작 -->
						<tr>
							<td nowrap="nowrap"><strong><c:out value="${(searchVO.pageIndex-1) * searchVO.pageSize + status.count}" /></strong></td>
							<td nowrap="nowrap"><c:out value="${result.logId}" /></td>
							<td nowrap="nowrap"><c:out value="${result.creatDt}" /></td>
							<td nowrap="nowrap"><c:out value="${result.loginMthd}" /></td>
							<td nowrap="nowrap"><a href="#LINK" onclick="javascript:fn_egov_inqire_loginLog('<c:out value="${result.logId}"/>'); return false;" style="selector-dummy: expression(this.hideFocus = false);">
								<img src="<c:url value='/images/search.gif'/>" alt="상세보기" width="15" height="15" align="middle"></a></td>
						</tr>
					</c:forEach>
				</tbody> --%>
			</table>
			<div id="jqGridPager"></div>
		</div>

		<!-- 페이지 네비게이션 시작 -->
		<%-- <div id="paging_div">
			<ul class="paging_align">
				<ui:pagination paginationInfo="${paginationInfo}" type="image" jsFunction="fn_egov_select_loginLog" />
			</ul>
		</div> --%>
		<!-- //페이지 네비게이션 끝 -->

		<input name="pageIndex" type="hidden" value="<c:out value='${searchVO.pageIndex}'/>" />
	</form>
</div>
<!-- //content 끝 -->