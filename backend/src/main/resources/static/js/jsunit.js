/**
 * 断言实际值和期望值是否一致
 * @param {Object} expected 期望值
 * @param {Object} actual 实际值
 */
function assertEquals(expected, actual, error){
	if(error == undefined || error == null){
		error = 'not equal!';
	}
	if(expected == null && actual == null){
		return true;
	}
	if(expected != null && expected == actual){
		if(expected === actual){
			return true;
		}else{
			var msg = ('expected:' + expected + ' actual:' + actual ) + ' cause:' + error;
			throw msg;
		}
	}
	if(expected != null && expected != actual){
		var msg = ('expected:' + expected + ' actual:' + actual ) + ' cause:' + error;
		throw msg;
	}
}
