<?xml version="1.0" encoding="UTF-8"?>
	<xsl:stylesheet version="2.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">


	<xsl:param name="elementsNameList"/>

	<xsl:output method="html"/>

	<xsl:template match="result">
		<xsl:call-template name="rvlist">
			<xsl:with-param name="eachForList" select="//*[local-name()=$elementsNameList]"/>
		</xsl:call-template>

	</xsl:template>

	<xsl:template name="rvlist">
		<xsl:param name="eachForList"/>
	<table>
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


			<xsl:for-each select="$eachForList">
				<tr>
					<td rowspan="2">
						<xsl:value-of select="paxno"/>
					</td>
					<td>
						<input type="text" readonly="readonly">
							<xsl:attribute name="id" >paxengfmnm</xsl:attribute>
							<xsl:attribute name="name" >paxengfmnm</xsl:attribute>
							<xsl:attribute name="size">50</xsl:attribute>
							<xsl:attribute name="style">
							  <xsl:text>width:70px;</xsl:text>
							  <xsl:text>text-align: center;</xsl:text>
<!-- 							  <xsl:text>border: 0px;</xsl:text> -->
							</xsl:attribute>
							<xsl:attribute name="value" ><xsl:value-of select="paxengfmnm"/></xsl:attribute>
						</input>
					</td>
					<td>
						<input type="text" readonly="readonly">
							<xsl:attribute name="id" >paxengnm</xsl:attribute>
							<xsl:attribute name="name" >paxengnm</xsl:attribute>
							<xsl:attribute name="size">50</xsl:attribute>
							<xsl:attribute name="style">
							  <xsl:text>width:70px;</xsl:text>
							  <xsl:text>text-align: center;</xsl:text>
							  <xsl:text>-align: center;</xsl:text>
<!--   							  <xsl:text>border: 0px;</xsl:text> -->
							</xsl:attribute>
							<xsl:attribute name="value" ><xsl:value-of select="paxengnm"/></xsl:attribute>
						</input>
					</td>
					<td>
					<select class="k1_select_border" style="width:50px;" title="성인구분" >
							<option>MR</option>
					</select>
					</td>
					<td>
							<xsl:call-template name="comboBox1">
								<xsl:with-param name="val" select="paxsex" />
							</xsl:call-template>
					</td>
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
					<td>
						<select class="k1_select_border" style="width:70px;" title="비자국가" >
							<option>미국</option>
						</select></td>
					<td>2013-11-29</td>
					<td colspan="2">1234567</td>
					<td colspan="5" class="last tal">
						<input type="text" readonly="readonly">
							<xsl:attribute name="id" >tempplaceaddr</xsl:attribute>
							<xsl:attribute name="name" >tempplaceaddr</xsl:attribute>
							<xsl:attribute name="size">50</xsl:attribute>
							<xsl:attribute name="style">
							  <xsl:text>width:99%;</xsl:text>
							  <xsl:text>text-align: left;</xsl:text>
							  <xsl:text>-align: center;</xsl:text>
<!--   							  <xsl:text>border: 0px;</xsl:text> -->
							</xsl:attribute>
							<xsl:attribute name="value" ><xsl:value-of select="tempplaceaddr"/></xsl:attribute>
						</input>
					</td>
				</tr>

			</xsl:for-each>

		<xsl:if test="$eachForList = 0">
	      <!--검색결과없음 B-->
					<tr>
						<td rowspan="2"><xsl:value-of select="paxno"/></td>
						<td>
							<input type="text" readonly="readonly">
								<xsl:attribute name="id" >paxengfmnm</xsl:attribute>
								<xsl:attribute name="name" >paxengfmnm</xsl:attribute>
								<xsl:attribute name="size">50</xsl:attribute>
								<xsl:attribute name="style">
								  <xsl:text>width:70px;</xsl:text>
								  <xsl:text>text-align: center;</xsl:text>
<!-- 								  <xsl:text>border: 0px;</xsl:text> -->
								</xsl:attribute>
								<xsl:attribute name="value" ><xsl:value-of select="paxengfmnm"/></xsl:attribute>
							</input>
						</td>
						<td>
							<input type="text" readonly="readonly">
								<xsl:attribute name="id" >paxengnm</xsl:attribute>
								<xsl:attribute name="name" >paxengnm</xsl:attribute>
								<xsl:attribute name="size">50</xsl:attribute>
								<xsl:attribute name="style">
								  <xsl:text>width:70px;</xsl:text>
								  <xsl:text>text-align: center;</xsl:text>
								  <xsl:text>-align: center;</xsl:text>
<!-- 	  							  <xsl:text>border: 0px;</xsl:text> -->
								</xsl:attribute>
								<xsl:attribute name="value" ><xsl:value-of select="paxengnm"/></xsl:attribute>
							</input>
						</td>
						<td>
						<select class="k1_select_border" style="width:50px;" title="성인구분" >
								<option>MR</option>
						</select>
						</td>
						<td>
							<xsl:call-template name="comboBox1">
								<xsl:with-param name="val" select="paxsex" />
							</xsl:call-template>
						</td>
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
						<td>
							<select class="k1_select_border" style="width:70px;" title="비자국가" >
								<option>미국</option>
							</select></td>
						<td>2013-11-29</td>
						<td colspan="2">1234567</td>
						<td colspan="5" class="last tal">


							<input type="text" readonly="readonly">
								<xsl:attribute name="id" >tempplaceaddr</xsl:attribute>
								<xsl:attribute name="name" >tempplaceaddr</xsl:attribute>
								<xsl:attribute name="size">50</xsl:attribute>
								<xsl:attribute name="style">
								  <xsl:text>width:99%;</xsl:text>
								  <xsl:text>text-align: left;</xsl:text>
								  <xsl:text>-align: center;</xsl:text>
<!-- 	  							  <xsl:text>border: 0px;</xsl:text> -->
								</xsl:attribute>
								<xsl:attribute name="value" ><xsl:value-of select="tempplaceaddr"/></xsl:attribute>
							</input>

						</td>
					</tr>
	      <!--검색결과없음 E-->
     	</xsl:if>



      	</tbody>
	</table>

	</xsl:template>

	<xsl:template name="comboBox1">
		<xsl:param name="val" />
							<select id="paxsex" name="paxsex" class="k1_select_border" style="width:40px;" title="성별" >
							<xsl:for-each select="//paxsexselct/sex">
								<xsl:element name="option">
									<xsl:attribute name="value"><xsl:value-of select="@key" /></xsl:attribute>
									<xsl:if test="@key=$val">
										<xsl:attribute name="selected">selected</xsl:attribute>
									</xsl:if>
									<xsl:value-of select="@value" />
								</xsl:element>
							</xsl:for-each>
							</select>
	</xsl:template>

	</xsl:stylesheet>