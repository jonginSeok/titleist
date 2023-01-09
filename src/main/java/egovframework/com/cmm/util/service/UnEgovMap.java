/**
 * 
 */
package egovframework.com.cmm.util.service;

import org.apache.commons.collections.map.ListOrderedMap;

import egovframework.com.cmm.util.CamelUtil;


/**
 * Camel Case 표기법 변환 처리를 포함하는 Map 확장 클래스
 * <p>
 * <b>NOTE</b>: commons Collections 의 ListOrderedMap 을 extends 하고 있으며 Map 의 key 를 입력 시 Camel Case 표기법으로
 * 변경한 것에 대한 역처리하는 Map 의 구현체이다. (iBatis 의 경우 egovMap (<typeAlias alias="egovMap" type="egovframework.rte.psl.dataaccess.util.EgovMap" />) 으로 결과 조회 시 
 * 별도의 alias 없이 DB 칼럼명 그대로 조회하는 것 만으로도 일반적인 VO 의 attribute (camel case) 에 대한 resultMap 과 같은 효과를 낼 수 있도록 추가하였음)
 * </p>
 * @author 다임정보 SI사업부 석종인(ngins)
 * @since 2023.01.09
 * @version 1.0
 * @see <pre>
 *  == 개정이력(Modification Information) ==
 *
 *   수정일		수정자	수정내용
 *  ----------- -----   ---------------------------
 *   2023.01.09	석종인	최초 생성
 *
 * </pre>
 */
public class UnEgovMap extends ListOrderedMap {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = -4660968699119669012L;

	/**
	 * key 에 대하여 EgovMap에서 Camel Case변환한 것에 대하여 역변환하여 super.put (ListOrderedMap) 을 호출한다.
	 * 
	 * @param key   - '_' 가 재거된 변수명
	 * @param value - 명시된 key 에 대한 값 (변경 없음)
	 * @return previous value associated with specified key, or null if there was no
	 *         mapping for key
	 */
	@Override
	public Object put(Object key, Object value) {
		return super.put(CamelUtil.convert2UnCamelCase((String) key), value);
	}

}
