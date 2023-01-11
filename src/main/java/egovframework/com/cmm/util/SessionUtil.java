/**
 * 
 */
package egovframework.com.cmm.util;

import javax.servlet.http.HttpServletRequest;

/**
 * @author ngins
 *
 */
public class SessionUtil {

	/**
	 * 
	 */
	public SessionUtil() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

	public static Object getSessionAttribute(HttpServletRequest request, String string) {
		
		return request.getSession().getAttribute(string);
	}

}
