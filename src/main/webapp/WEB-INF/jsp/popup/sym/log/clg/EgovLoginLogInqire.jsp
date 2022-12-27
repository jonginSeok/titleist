<%--
  Class Name : EgovLoginLogInqire.jsp
  Description : 로그인 로그 정보 상세조회 화면
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
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<title>로그인 로그 상세</title>
<!-- 검색 필드 박스 시작 -->
<h2>
	<strong>로그인 로그 정보</strong>
</h2>
<form name="Form" method="post" action="#LINK">
	<input type="submit" id="invisible" class="invisible" />
	<div class="popop_detail">
		<table>
			<!--  width="50%" -->
			<tr>
				<th width="20%" height="23" align="center">로그ID</th>
				<td width="80%" nowrap>&nbsp;&nbsp; <c:out
						value="${result.logId}" />
				</td>
			</tr>
			<tr>
				<th width="20%" height="23" align="center">발생일자</th>
				<td width="80%" nowrap>&nbsp;&nbsp; <c:out
						value="${result.creatDt}" />
				</td>
			</tr>
			<tr>
				<th width="20%" height="23" align="center">로그유형</th>
				<td width="80%" nowrap>&nbsp;&nbsp; <c:out
						value="${result.loginMthd}" />
				</td>
			</tr>
			<tr>
				<th width="20%" height="23" align="center">요청자</th>
				<td width="80%" nowrap>&nbsp;&nbsp; <c:out
						value="${result.loginNm}" />
				</td>
			</tr>
			<tr>
				<th width="20%" height="23" align="center">요청자IP</th>
				<td width="80%" nowrap>&nbsp;&nbsp; <c:out
						value="${result.loginIp}" />
				</td>
			</tr>
		</table>
	</div>

	<!-- 버튼 시작(상세지정 style로 div에 지정) -->
	<div class="buttons" style="padding-top: 10px; padding-bottom: 10px;">
		<!-- 목록/저장버튼  -->
		<table><!--  border="0" cellspacing="0" cellpadding="0" align="center" -->
			<tr>
				<td><a href="#LINK"
					onclick="javascript:window.close(); return false;">닫기</a></td>
			</tr>
		</table>
	</div>
	<!-- 버튼 끝 -->

	<!-- 검색조건 유지 -->
	<!-- 검색조건 유지 -->
</form>
<!-- //content 끝 -->