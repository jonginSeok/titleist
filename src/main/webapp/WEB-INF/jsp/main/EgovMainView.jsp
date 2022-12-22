<%--
  Class Name : EgovMainView.jsp 
  Description : 메인화면
  Modification Information
 
      수정일         수정자                   수정내용
    -------    --------    ---------------------------
     2011.08.31   JJY       경량환경 버전 생성
 
    author   : 실행환경개발팀 JJY
    since    : 2011.08.31 
--%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%><%@
	taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%><%@
	taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%><%@
	taglib prefix="ui" uri="http://egovframework.gov/ctl/ui"%><%@
	taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%><%@
	taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script type="text/javascript">console.log('EgovMainView.jsp');</script>
</head>

			<!-- title 시작 -->
			<div id="mainview_title_img">
				<img src="<c:url value='/'/>images/index/img_maintitle.jpg"
					alt="표준프레임워크 경량환경 내부업무" />
				<!-- //title 끝-->
			</div>
			<!-- 게시판 시작 -->
			<div id="mainview_wrap">
				<div id="main_leftcontent">
					<!-- 최종접속현황 시작 -->
					<div class="left_board01">
						<ul>
							<li><div class="board_title">
									<img src="<c:url value='/'/>images/index/img_subtitle01.gif"
										width="77" height="16" alt="최종접속현황정보" />
								</div>
								<ul>
									<li><b>[기타정보의 메인화면 위치 예시]</b></li>
									<li>innovate님의 최종접속정보는 2011. 06. 07 19:30 입니다.</li>
								</ul></li>
						</ul>
					</div>
					<!-- //최종접속현황 끝 -->

					<!-- 오늘의 할일 시작 -->
					<div class="left_board02">
						<ul>
							<li><div class="board_title">
									<img src="<c:url value='/'/>images/index/img_subtitle02.gif"
										width="71" height="16" alt="오늘의 할일" />
								</div> <c:forEach var="result" items="${bbsList}" varStatus="status">
									<ul>
										<li><div class="dot_bl">
												<a
													href="<c:url value='/cop/bbs/selectBoardList.do?bbsId=BBSMSTR_CCCCCCCCCCCC'/>">
													<c:out value="${result.nttSj}" />
												</a>
											</div></li>
										<li><div class="lcount">
												<c:out value="${result.frstRegisterPnttm}" />
											</div></li>
									</ul>
								</c:forEach> <!-- 
						 	<ul>
						 		<li><div class="dot_bl">직급변경요청접수</div></li>
						 		<li><div class="lcount"><a href="#LINK">113건</a></div></li>
						 	</ul>
						 	<ul>
						 		<li><div class="dot_bl">휴일근무 신청접수</div></li>
						 		<li><div class="lcount"><a href="#LINK">113건</a></div></li>
						 	</ul>
						 	<ul>
						 		<li><div class="dot_bl">미결제 현황</div></li>
						 		<li><div class="lcount"><a href="#LINK">113건</a></div></li>
						 	</ul>
						 	<ul>
						 		<li><div class="dot_bl">미결제 현황</div></li>
						 		<li><div class="lcount"><a href="#LINK">113건</a></div></li>
						 	</ul>
						 	<ul>
						 		<li><div class="dot_bl">미결제 현황</div></li>
						 		<li><div class="lcount"><a href="#LINK">113건</a></div></li>
						 	</ul>
						 	 --></li>
						</ul>
					</div>
					<!-- 오늘의 할일 끝 -->
				</div>
				<div id="main_rightcontent_wrap">
					<!-- 최신업무공지 시작 -->
					<div id="main_rightcontent">
						<ul>
							<li>
								<div class="board_title2">
									<div class="t2_leftdiv">
										<img src="<c:url value='/'/>images/index/img_subtitle03.gif"
											width="107" height="17" alt="최신 업무공지 정보" />
									</div>
									<div class="t2_rightdiv">
										<a
											href="<c:url value='/cop/bbs/selectBoardList.do?bbsId=BBSMSTR_AAAAAAAAAAAA'/>"
											onclick="javascript:goMenuPage('1000000');"> more+ </a>
									</div>
								</div>
							</li>
						</ul>
						<c:forEach var="result" items="${notiList}" varStatus="status">
							<ul>
								<li><div class="dot_bl2">
										<a
											href="<c:url value='/cop/bbs/selectBoardList.do?bbsId=BBSMSTR_CCCCCCCCCCCC'/>"><c:out
												value="${result.nttSj}" /></a>
									</div></li>
								<li><div class="new">
										<img src="<c:url value='/'/>images/index/img_new.gif"
											alt="new" />
									</div></li>
								<li><div class="rwriter">
										<c:out value="${result.frstRegisterNm}" />
									</div></li>
								<li><div class="rdate">
										<c:out value="${result.frstRegisterPnttm}" />
									</div></li>
							</ul>
						</c:forEach>
					</div>
					<!-- //최신업무공지 끝 -->
				</div>
			</div>