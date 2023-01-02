/**
 * 
 */
package titleist;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * @author ngins
 *
 */
public class Test {

	/**
	 * 
	 */
	public Test() {
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		
		SimpleDateFormat dtFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		// String 타입을 Date 타입으로 변환
		Date date =  new Date();
		String formatDate = dtFormat.format(date);
		System.out.println("포맷  : " + formatDate);
		
	}

}
