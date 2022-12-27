<%--
  Class Name : EgovLoginLogList.jsp
  Description : 로그인 로그 정보목록 화면(jqgrid 변환)
  Modification Information
 
      수정일         수정자                   수정내용
    -------    --------    ---------------------------
     2009.03.11  이삼섭              최초 생성
     2011.08.31   JJY       경량환경 버전 생성
 
    author   : 공통서비스 개발팀  이삼섭
    since    : 2009.03.11  
--%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script type="text/javascript" src="<c:url value='/js/egovframework/EgovCalPopup.js'/>"></script>
<script type="text/javascript" src="<c:url value='/js/plugin/jquery.jqGrid.min.js'/>"></script>

<script type="text/javascript">


	/* ********************************************************
	 * PROTOTYPE JS FUNCTION
	 ******************************************************** */
	String.prototype.trim = function(){
	    return this.replace(/^\s+|\s+$/g, "");
	}
	
	String.prototype.replaceAll = function(src, repl){
	     var str = this;
	     if(src == repl){return str;}
	     while(str.indexOf(src) != -1) {
	        str = str.replace(src, repl);
	     }
	     return str;
	}
	
	/*
	 * 화면로드 이벤트. 지역함수는 fn_ , 전역(grobal, 공통)함수는 gfn_ 으로 작성
	 */
	$(document).ready(function(event) {
		//alert(1);
		//console.log('1');
		
		fn_init_load();
	});
	
	function fn_init_load() {
		
		fn_init_grid();
	}
	
	function fn_init_grid(){
		
		//Grid title 
		var title = ['번호', '로그ID', '발생일자', '로그유형', '상세보기'];
		//Grid Model 
		var model = [
			{name:'no',index:'no', width:60, sorttype:'int',summaryType:'count', summaryTpl : '({0}) total'},
			{name:'logId',index:'logId', width:90, sorttype:"date"},
			{name:'creatDt',index:'creatDt', width:100},
			{name:'loginMthd',index:'loginMthd', width:80, align:'right',sorttype:"float",formatter:"number", summaryType:"sum"},
			{name:'dtlView',index:'tax', width:80, align:'right',sorttype:'number',formatter:'number',summaryType:'sum'}
		];

		var options = 	{
			//옵션에 multiselect:true 부분을 추가하면 그리드 목록 전체선택/전체 해제가 가능하다. 
			multiselect:true,	
			pager: '#pager1', 	
			rowNum:3,
		   	rowList:[3,6,9,12,15],
		   	
		   	/* 
		   	xmlReader: {
		   		root : "data",
				row: "list", 
				page: "data>page", 			//
			    total: "data>total", 		//
			    records : "data>records", 	//
				repeatitems: false,
				id: "logId"
			},
			 */
			
			jsonReader : {
				root : "data",
				id : "logId",
				repeatitems : false,
				total : "data>total", //
				records : "data>records", //
				row : "list",
				page : "data>page", //
				//userdata : "userdata", //
			},

			//옵션에 groupFlag: true 부분을 추가하면 소계/합계를 보여줄수 있다. 
			groupFlag : true,
			groupView : {
				//소계와 관련된 옵션
				groupField : [ 'name' ],
				groupColumnShow : [ true ],
				groupText : [ 'b>{0}' ],
				groupCollapse : false,
				groupOrder : [ 'asc' ],
				groupSummary : [ true ],
				showSummaryOnHide : true,
				groupDataSorted : true
			},
			//합계로우 보여주기
			footerrow : true,
			userDataOnFooter : true
		};

		var events = {
			loadComplete : fn_loadComplete,
			ondblClickRow : fn_ondblClickRow,
			onRightClickRow : fn_onRightClickRow
		};

		var uurl = "/sym/log/clg/SelectLoginLogList.do";
		//1. 기본적인 Grid을 만든다. : 화면 로딩시 바로 데이타 조회
		$("#jqgrid").grid('init', uurl, title, model, options, events);

		/* var url = "/sym/log/clg/SelectLoginLogList.do";
		$("#jqgrid").grid('selectData', url, 'frm'); */
	}

	function fn_loadComplete() {
		console.log("-fn_loadComplete");

	}

	function fn_ondblClickRow() {
		console.log("-fn_ondblClickRow");

	}

	function fn_onRightClickRow() {
		console.log("-fn_onRightClickRow");

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
			document.frm.pageIndex.value = pageNo;
			document.frm.action = "<c:url value='/sym/log/clg/SelectLoginLogList.do'/>";
			document.frm.submit();
		}
	}

	function fn_egov_inqire_loginLog(logId) {
		var url = "<c:url value ='/sym/log/clg/InqireLoginLog.do?logId='/>"
				+ logId;

		var openParam = "scrollbars=yes,toolbar=0,location=no,resizable=0,status=0,menubar=0,width=640,height=300,left=0,top=0";
		window.open(url, "p_loginLogInqire", openParam);
	}
</script>
<title>로그인 로그 목록</title>
<!-- 현재위치 네비게이션 시작 -->
<div id="content">
	<form name="frm" id="frm" action="<c:url value='/sym/log/SelectLoginLogList.do'/>" method="post">
		<input type="submit" id="invisible" class="invisible" >
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
					<ul id="search_first_ul">
						<li>발생일자 <!-- input name="searchBgnDe" type="hidden"  value="<c:out value='${searchVO.searchBgnDe}'/>" -->
							<input name="searchBgnDe" type="text" size="10" value="${searchVO.searchBgnDe}" readonly="readonly" onclick="javascript:fn_egov_NormalCalendar(document.frm, document.frm.searchBgnDe);" title="시작일자입력">
							<a href="javascript:fn_egov_NormalCalendar(document.frm, document.frm.searchBgnDe);" style="selector-dummy: expression(this.hideFocus = false);">
								<img src="<c:url value='/images/egovframework/com/cmm/icon/bu_icon_carlendar.gif' />" alt="달력창팝업버튼이미지" width="15" height="15"></a> ~ <!-- input name="searchEndDe" type="hidden"  value="<c:out value='${searchVO.searchEndDe}'/>"-->
							<input name="searchEndDe" type="text" size="10" value="${searchVO.searchEndDe}" readonly="readonly" onclick="javascript:fn_egov_NormalCalendar(document.frm, document.frm.searchEndDe);" title="종료일자입력">
							<a href="javascript:fn_egov_NormalCalendar(document.frm, document.frm.searchEndDe);" style="selector-dummy: expression(this.hideFocus = false);">
								<img src="<c:url value='/images/egovframework/com/cmm/icon/bu_icon_carlendar.gif' />" alt="달력창팝업버튼이미지" width="15" height="15"></a>
						</li>
					</ul>
					<ul id="search_second_ul">
						<li>
							<div class="buttons" style="float: right;">
								<a href="<c:url value='/sym/log/SelectLoginLogList.do'/>" onclick="javascript:fn_egov_select_loginLog('1'); return false;">
									<img src="<c:url value='/images/img_search.gif' />" alt="search">조회</a>
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
			<table id="jqgrid"> <!--  cellpadding="0" cellspacing="0" -->
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
		</div>

		<!-- 페이지 네비게이션 시작 -->
		<div id="paging_div">
			<ul class="paging_align">
				<ui:pagination paginationInfo="${paginationInfo}" type="image"
					jsFunction="fn_egov_select_loginLog" />
			</ul>
		</div>
		<!-- //페이지 네비게이션 끝 -->
		
		<input name="pageIndex" type="hidden" value="<c:out value='${searchVO.pageIndex}'/>" />
	</form>
</div>
<!-- //content 끝 -->