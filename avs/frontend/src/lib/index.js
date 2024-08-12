// place files you want to import through the `$lib` alias in this folder.
// index.js
/**
 * @param {() => void} callback
 * @param {number | undefined} delayTime
 */
export function delay(callback, delayTime) {
	return /** @type {Promise<void>} */ (
		new Promise((resolve) => {
			setTimeout(() => {
				callback();
				resolve();
			}, delayTime);
		})
	);
}

/**
 * @param {string} inputString
 * @param {{(): void;(): void;}} callback
 * @param {string} targetVariable
 */
export function setCharactersWithDelay(inputString, targetVariable, callback) {
	let index = 0;

	const intervalId = setInterval(() => {
		if (index < inputString.length) {
			targetVariable += inputString.charAt(index);
			index++;
		} else {
			clearInterval(intervalId);
			if (typeof callback === 'function') {
				callback();
			}
		}
	}, 1000);
}

/**
 * @param {{ getTime: () => number; }} startDate
 */
export function getTimeAgo(startDate) {
	// 差分 = 現在の日時 - 投稿日時
	let diff = new Date().getTime() - startDate.getTime();

	// 経過時間をDateに変換
	let progress = new Date(diff);

	let result;

	if (progress.getUTCFullYear() - 1970) {
		result = progress.getUTCFullYear() - 1970 + '年前';
	} else if (progress.getUTCMonth()) {
		result = progress.getUTCMonth() + 'ヶ月前';
	} else if (progress.getUTCDate() - 1) {
		result = progress.getUTCDate() - 1 + '日前';
	} else if (progress.getUTCHours()) {
		result = progress.getUTCHours() + '時間前';
	} else if (progress.getUTCMinutes()) {
		result = progress.getUTCMinutes() + '分前';
	} else {
		result = '1分未満';
	}

	return result;
}
