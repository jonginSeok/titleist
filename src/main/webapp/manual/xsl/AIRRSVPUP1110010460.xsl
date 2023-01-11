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
						<caption>조회결과</caption>
						<colgroup>
							<col style="" />
							<col style="" />
							<col style="" />
							<col style="" />
							<col style="" />
							<col style="" />
							<col style="" />
							<col style="" />
							<col style="" />
							<col style="" />
							<col style="" />
							<col style="" />
							<col style="" />
							<col style="" />
							<col style="" />
							<col style="" />
						</colgroup>
						<thead>
							<tr>
								<th scope="col" rowspan="3">NO</th>
								<th scope="col">탑승객명</th>
								<th scope="col">구분</th>
								<th scope="col">판매NET</th>
								<th scope="col">할인금액</th>
								<th scope="col">H판매NET</th>
								<th scope="col" colspan="2">판매금액</th>
								<th scope="col" colspan="3">선지급컴(%,COM,VAT)</th>
								<th scope="col">카드</th>
								<th scope="col">발권NET</th>
								<th scope="col">UP발권금액</th>
								<th scope="col" colspan="2">발권금액</th>
								<th scope="col" class="last">카드</th>
							</tr>
							<tr>
								<th scope="col"></th>
								<th scope="col">VOID</th>
								<th scope="col">판매Q</th>
								<th scope="col">UP판매금액</th>
								<th scope="col">H판매Q</th>
								<th scope="col" colspan="2">판매COM</th>
								<th scope="col" colspan="3">후지급컴(%,COM,VAT)</th>
								<th scope="col">현금</th>
								<th scope="col">발권Q</th>
								<th scope="col">UP발권제외</th>
								<th scope="col" colspan="2">발권COM</th>
								<th scope="col" class="last">현금</th>
							</tr>
							<tr>
								<th scope="col">티켓번호</th>
								<th scope="col">CONJ</th>
								<th scope="col">판매TAX</th>
								<th scope="col"></th>
								<th scope="col">H판매VAT</th>
								<th scope="col" colspan="2">판매VAT</th>
								<th scope="col" colspan="2">TASF현금</th>
								<th scope="col">TASF카드</th>
								<th scope="col">기타</th>
								<th scope="col">발권TAX</th>
								<th scope="col"></th>
								<th scope="col" colspan="2">발권VAT</th>
								<th scope="col" class="last">수익</th>
							</tr>
						</thead>
						<tfoot class="noncolor">
							<tr>
								<th scope="col" colspan="3" rowspan="3">소계</th>
								<td class="tar">20,000,000</td>
								<td class="tar">100,000</td>
								<td class="tar">100,000</td>
								<td class="tar" colspan="2">100,000</td>
								<td class="tar" colspan="3"></td>
								<td class="tar">100,000</td>
								<td class="tar">100,000</td>
								<td class="tar">100,000</td>
								<td class="tar" colspan="2">100,000</td>
								<td class="tar last">100,000</td>
							</tr>
							<tr>
								<td class="tar">20,000,000</td>
								<td class="tar">100,000</td>
								<td class="tar">100,000</td>
								<td class="tar" colspan="2">100,000</td>
								<td class="tar" colspan="3"></td>
								<td class="tar">100,000</td>
								<td class="tar">100,000</td>
								<td class="tar">100,000</td>
								<td class="tar" colspan="2">100,000</td>
								<td class="tar last">100,000</td>
							</tr>
							<tr>
								<td class="tar">20,000,000</td>
								<td class="tar">100,000</td>
								<td class="tar">100,000</td>
								<td class="tar" colspan="2">100,000</td>
								<td class="tar" colspan="3"></td>
								<td class="tar">100,000</td>
								<td class="tar">100,000</td>
								<td class="tar">100,000</td>
								<td class="tar" colspan="2">100,000</td>
								<td class="tar last">100,000</td>
							</tr>
						</tfoot>

		<tbody>

			<xsl:for-each select="$eachForList">
					<tr>
						<td rowspan="3">1</td>
						<td rowspan="2">
						<xsl:value-of select="paxengfmnm"/>/<xsl:value-of select="paxengnm"/>
						</td>
						<td class="bg_blue">BSP</td>
						<td class="tar bg_blue">
						판매네트금액
						<xsl:value-of select="salenetamt"/>
						</td>
						<td class="tar bg_blue">
						판매할인금액
						<xsl:value-of select="saledscntamt"/>
						</td>
						<td class="tar bg_blue">
						HIDDEN판매네트금액
						<xsl:value-of select="hiddensalenetamt"/>
						</td>
						<td class="tar bg_blue" colspan="2">
						판매총금액
						<xsl:value-of select="saletotamt"/>
						</td>
						<td class="tar bg_blue">9%</td>
						<td class="tar bg_blue">100,000</td>
						<td class="tar bg_blue">100,000</td>
						<td class="tar bg_blue">100,000</td>
						<td class="tar bg_yellow">100,000</td>
						<td class="tar bg_yellow">0</td>
						<td class="tar bg_yellow" colspan="2">100,000</td>
						<td class="last tar bg_yellow">0</td>
					</tr>
					<tr>
						<td class="bg_blue">VOID</td>
						<td class="tar bg_blue">
						판매Q금액
						<xsl:value-of select="saleqamt"/>
						</td>
						<td class="tar bg_blue">
						판매UP금액
						<xsl:value-of select="saleupamt"/>
						</td>
						<td class="tar bg_blue">
						HIDDEN판매Q금액
						<xsl:value-of select="hiddensaleqamt"/>
						</td>
						<td class="tar bg_blue">9%</td>
						<td class="tar bg_blue">100,000</td>
						<td class="tar bg_blue"></td>
						<td class="tar bg_blue"></td>
						<td class="tar bg_blue"></td>
						<td class="tar bg_blue">
						현금결제금액
						<xsl:value-of select="cashpayamt"/>
						</td>
						<td class="tar bg_yellow">100,000</td>
						<td class="tar bg_yellow">Y</td>
						<td class="tar bg_yellow">9%</td>
						<td class="tar bg_yellow">100,000</td>
						<td class="last tar bg_yellow">
						현금결제금액
						<xsl:value-of select="cashpayamt"/>
						</td>
					</tr>
					<tr>
						<td>KE1156784351352</td>
						<td class="bg_blue">C</td>
						<td class="tar bg_blue">
						판매세금금액
						<xsl:value-of select="saletaxamt"/>
						</td>
						<td class="tar bg_blue"></td>
						<td class="tar bg_blue">
						HIDDEN판매세금금액
						<xsl:value-of select="hiddensaletaxamt"/>
						</td>
						<td class="tar bg_blue" colspan="2"></td>
						<td class="tar bg_blue" colspan="2">0</td>
						<td class="tar bg_blue">0</td>
						<td class="tar bg_blue">100,000</td>
						<td class="tar bg_yellow">1,000,000</td>
						<td class="tar bg_yellow"></td>
						<td class="tar bg_yellow" colspan="2">100,000</td>
						<td class="last tar bg_yellow">0</td>
					</tr>
			</xsl:for-each>
      	</tbody>
	</table>

	</xsl:template>

	</xsl:stylesheet>