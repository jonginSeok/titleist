<?xml version="1.0" encoding="UTF-8"?>
	<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html"/>

<!-- 	 <xsl:param name="qsVariableName" /> -->
<!-- 	 <xsl:param name="section" /> -->
<!-- 	 <xsl:param name="comp">kb</xsl:param> -->

<!-- 	<xsl:template match="/page/div"> -->
	<xsl:template match="/">
<!-- 	- qsVariableName : <xsl:value-of select="$qsVariableName"/><br/> -->
<!-- 	- section : <xsl:value-of select="$section"/><br/> -->
<!-- 	- comp : <xsl:value-of select="$comp"/><br/> -->


<!-- 	<xsl:value-of select="result/data/airRsv_Controller_AIRRSVPUP111011033001_RS/gridRoot/proRoot1/affectedrow"/> -->





<!-- <script type="text/javascript"> -->
<!-- </script> -->

<!-- 	<xsl:variable name="head"> -->
<!-- 	<xsl:for-each select="table/owner[site=$comp]"> -->
<!-- 		<xsl:value-of select="title"/> -->
<!-- 	</xsl:for-each> -->
<!-- 	</xsl:variable> -->

<!-- 		<xsl:apply-templates select="table" > -->
<!-- 		<xsl:with-param name="pHead" select="$head"/> -->
<!-- 		</xsl:apply-templates> -->

<!-- <script type="text/javascript"> -->
<!-- </script> -->
<!-- 	</xsl:template> -->

<!-- <xsl:template match="table"> -->
<!-- <xsl:param name="pHead"/> -->

	<table>

<!-- 		<xsl:attribute name="id" ><xsl:value-of select="id"/></xsl:attribute> -->
<!-- 		<xsl:attribute name="class" ><xsl:value-of select="class"/></xsl:attribute> -->

<!-- 		<thead> -->
<!-- 			<xsl:attribute name="class" ><xsl:value-of select="thead/class"/>_<xsl:value-of select="$comp"/></xsl:attribute> -->
<!-- 			<xsl:for-each select="thead/columns/column">  -->

<!-- 				<xsl:if test="contains($pHead,substring(@id,4))"> -->
<!-- 				<th> -->
<!-- 				kk -->
<!-- 					<xsl:attribute name="id" ><xsl:value-of select="@id"/></xsl:attribute> -->
<!-- 					<xsl:value-of select="text()"/> -->
<!-- 				</th> -->
<!-- 				</xsl:if> -->

<!-- 			</xsl:for-each>     -->
<!--       	</thead> -->

			<caption>현재 스케쥴 리스트</caption>
			<colgroup>
				<col style="width:;" />
				<col style="width:;" />
				<col style="width:;" />
				<col style="width:;" />
				<col style="width:;" />
				<col style="width:;" />
				<col style="width:;" />
				<col style="width:;" />
				<col style="width:;" />
				<col style="width:;" />
			</colgroup>
			<thead>
				<tr>
					<th scope="col" rowspan="2">NO</th>
					<th scope="col">영문성</th>
					<th scope="col">영문이름</th>
					<th scope="col">성인구분</th>
					<th scope="col">성별</th>
					<th scope="col">생년월일</th>
					<th scope="col">여권발행국</th>
					<th scope="col">여권번호</th>
					<th scope="col">여권유효기간</th>
					<th scope="col" class="last">국적</th>
				</tr>
				<tr>
					<th scope="col">비자국가</th>
					<th scope="col">비자만료일</th>
					<th scope="col" colspan="2">체류지 우편번호</th>
					<th scope="col" colspan="5" class="last">체류지 주소</th>
				</tr>
			</thead>

		<tbody>
<!-- 			<xsl:for-each select="tbody/row"> -->
			<xsl:for-each select="result/data/airRsv_Controller_AIRRSVPUP111011033001_RS/gridRoot/proRoot1/voairrv110">
<!-- 			<tr> -->
<!-- 			<xsl:attribute name="class" ><xAIRRSVPUP1110110330sl:value-of select="@class"/></xsl:attribute> -->
<!-- 			<xsl:attribute name="id" ><xsl:value-of select="@id"/></xsl:attribute> -->
<!-- 			<xsl:attribute name="style" ><xsl:value-of select="@style"/></xsl:attribute> -->

<!-- 				<xsl:choose>	  -->
<!-- 				<xsl:when test="@id='row_'"> -->
<!-- 				<xsl:for-each select="col">  -->
<!-- 				<xsl:if test="contains($pHead,substring(@id,4))"> -->
<!-- 				<td> -->
<!-- 					<xsl:attribute name="id" ><xsl:value-of select="@id"/></xsl:attribute> -->
<!-- 					<xsl:attribute name="colspan" ><xsl:value-of select="@colspan"/></xsl:attribute> -->

<!-- 					<xsl:choose>	  -->
<!-- 						<xsl:when test="@href!=''"> -->

<!-- 						<a> -->
<!-- 						<xsl:attribute name="href" ><xsl:value-of select="@href"/></xsl:attribute> -->
<!-- 						<xsl:value-of select="text()"/> -->
<!-- 						</a> -->
<!-- 					</xsl:when> -->
<!-- 					<xsl:otherwise> -->
<!-- 						<xsl:if test="@data='button'"> -->
<!-- 						<xsl:apply-templates select="/page/div/reserveButton/input" /> -->
<!-- 						</xsl:if> -->
<!-- 						<xsl:value-of select="text()"/> -->
<!-- 					</xsl:otherwise> -->
<!-- 					</xsl:choose> -->
<!-- 				</td> -->
<!-- 				</xsl:if> -->
<!-- 				</xsl:for-each> -->
<!-- 				</xsl:when> -->
<!-- 				<xsl:otherwise> -->
<!-- 					<xsl:for-each select="col">  -->
<!-- 				<td> -->
<!-- <td> -->
<!-- sdfsdf -->
<!-- </td> -->
<!-- 					<xsl:attribute name="id" ><xsl:value-of select="@id"/></xsl:attribute> -->
<!-- 					<xsl:attribute name="colspan" ><xsl:value-of select="@colspan"/></xsl:attribute> -->

<!-- 					<xsl:apply-templates select="/page/div/resvDpdate1/input" /> -->
<!-- 					<xsl:apply-templates select="/page/div/schButton/input" /> -->
<!-- 				</td> -->
<!-- 					</xsl:for-each>				 -->
<!-- 				</xsl:otherwise> -->
<!-- 				</xsl:choose> -->
<!-- 			</tr> -->



				<tr>
					<td rowspan="2"><xsl:value-of select="paxno"/></td>
					<td><xsl:value-of select="paxengfmnm"/></td>
					<td><xsl:value-of select="paxengnm"/></td>
					<td><select class="k1_select_border" style="width:50px;" title="성인구분" >
							<option>MR</option>
						</select></td>
					<td><select class="k1_select_border" style="width:40px;" title="성별" >
						<option>남</option>
					</select></td>
					<td>2013-11-29</td>
					<td><select class="k1_select_border" style="width:70px;" title="여권발행국" >
							<option>대한민국</option>
						</select></td>
					<td>M20131290</td>
					<td>2013-11-29</td>
					<td class="last"><select class="k1_select_border" style="width:70px;" title="국적" >
							<option>대한민국</option>
						</select></td>
				</tr>
				<tr>
					<td><select class="k1_select_border" style="width:70px;" title="비자국가" >
							<option>미국</option>
						</select></td>
					<td>2013-11-29</td>
					<td colspan="2">1234567</td>
					<td colspan="5" class="last tal">라라라라라라</td>
				</tr>

			</xsl:for-each>
      	</tbody>
	</table>

<!-- </xsl:template> -->


<!-- <xsl:template match="input"> -->

<!-- <input> -->

<!-- <xsl:attribute name="type" ><xsl:value-of select="type"/></xsl:attribute> -->

<!-- <xsl:attribute name="id" ><xsl:value-of select="id"/></xsl:attribute> -->

<!-- <xsl:attribute name="name" ><xsl:value-of select="name"/></xsl:attribute> -->

<!-- <xsl:attribute name="value" ><xsl:value-of select="value"/></xsl:attribute> -->

<!-- <xsl:if test="type='text'"> -->
<!-- 	<xsl:if test="readonly='true'"> -->
<!-- 		<xsl:attribute name="readonly" ></xsl:attribute> -->
<!-- 	</xsl:if> -->
<!-- </xsl:if> -->

<!-- </input> -->

</xsl:template>

	</xsl:stylesheet>