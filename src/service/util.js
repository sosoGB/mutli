import CryptoJS from 'crypto-js'
const Utils = {
	// aes加密
	encrypt(str) {
		let key = CryptoJS.enc.Utf8.parse('QBAESROBOTTECHENCRYPTION');
		let password = CryptoJS.enc.Utf8.parse(str);
		let encrypted = CryptoJS.AES.encrypt(password, key, {mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7});
		return encrypted.toString();
	},
	//uuid生成
	idGenerator() {
		var d = new Date().getTime();
		if (window.performance && typeof window.performance.now === "function") {
				d += performance.now(); 
		}
		var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
				var r = (d + Math.random() * 16) % 16 | 0;
				d = Math.floor(d / 16);
				return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
		return uuid;
	}
}
export default Utils