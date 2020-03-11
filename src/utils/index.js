/**
 * 生成uuid方法
 * @returns {string}
 */
export const createUUID = function () {
	return Math.random().toString(36).substr(2);
}
