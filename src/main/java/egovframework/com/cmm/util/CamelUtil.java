/*
 * Copyright 2008-2009 MOPAS(Ministry of Public Administration and Security).
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package egovframework.com.cmm.util;

import java.util.regex.Pattern;

/**
 * egovframework.rte.psl.dataaccess.util.CamelUtil(EgovMap)에 반하여 만든 Class
 * 
 * 입력 문자열에 대하여 Camel 표기법으로 변환을 역지원하는 Utility Class 이다.
 * 
 * @author 다임정보 SI사업부 석종인(ngins)
 * @see
 * 
 *      <pre>
 *  == 개정이력(Modification Information) ==
 *
 *   수정일		수정자	수정내용
 *  ----------- -----   ---------------------------
 *   2023.01.09	석종인	최초 생성
 *
 *      </pre>
 */
public final class CamelUtil {

	/**
	 * 
	 */
	private CamelUtil() {
	}

	/**
	 * convert2CamelCase의 역으로 변환하는 메소드. key가 CamelCase 인 것을 under인 형태로 변환.
	 * 
	 * @param score
	 * @return userName => USER_NAME 으로
	 */
	public static String convert2UnCamelCase(String score) {

		char underBar = '_';

		// 0. 언더바가 있거나 대문자로 시작하면 변경한 것으로 가정.
		if (score.indexOf(underBar) > 0 && Character.isUpperCase(score.charAt(0))) {
			return score;
		}

		StringBuilder result = new StringBuilder();
		boolean isAlphabet = false;
		boolean isHangle = false;
		int len = score.length();

		// 1. key 의 한글과 알파벳 대문자와 소문자를 구분한다.
		for (int i = 0; i < len; i++) {

			char currentChar = score.charAt(i);
			isAlphabet = Pattern.matches("^[a-zA-Z]*$", String.valueOf(currentChar));
			isHangle = Pattern.matches("^[ㄱ-ㅎ가-힣]*$", String.valueOf(currentChar));

			if (isHangle) {
				result.append(currentChar);

			} else if (isAlphabet) {
				if (String.valueOf(currentChar).equals(String.valueOf(Character.toUpperCase(currentChar)))) {
					// 2. 대문자인 것 앞에 언버바를 add 한다.
					result.append(underBar).append(currentChar);
				} else {
					// 3. 소문자를 대문자로 변경한다.
					result.append(Character.toUpperCase(currentChar));
				}
			} else {
				result.append(currentChar);
			}
		}
		return result.toString();
	}

//	public static void main(String[] agrs) {
//		String score = "_userName가나아, postNumber";
//		System.out.println(convert2UnCamelCase(score));
//	}

}
