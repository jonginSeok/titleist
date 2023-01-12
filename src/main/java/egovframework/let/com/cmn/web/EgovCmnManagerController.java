/**
 * 
 */
package egovframework.let.com.cmn.web;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import egovframework.let.com.cmn.service.EgovCmnManagerService;


/**
 * @author ngins
 *
 */
@Controller(value = "egovCmnManagerController")
public class EgovCmnManagerController {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(EgovCmnManagerController.class);
	/**
	 * 
	 */
	public EgovCmnManagerController() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	
	@Resource(name = "egovCmnManagerService")
	EgovCmnManagerService egovCmnManagerService;
	
	@RequestMapping(value = "/cmn/select.do")
	public String selectData(HttpServletRequest request, HttpServletResponse response) {
		
		LOGGER.debug("#selectData");
		
		return null;
	}
	

}
