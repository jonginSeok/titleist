/**
 * 
 */
package egovframework.let.sym.log.clg.service.impl;

import java.util.List;

import egovframework.let.sym.log.clg.service.LoginLog;
import egovframework.rte.psl.dataaccess.mapper.Mapper;

/**
 * @author ngins
 *
 */
@Mapper("egovLoginLogMapper")
public interface EgovLoginLogMapper {

	public List<LoginLog> selectLoginLogInf(LoginLog loinLog);
}
