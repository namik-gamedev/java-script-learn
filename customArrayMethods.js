// custom array methods

const array = [1, 5, 2, 13, 16, 6, 12, 7]

Array.prototype.myFilter = function (cb) {
	let finalArray = []
	for (item of this) {
		const res = cb(item)
		if (res) finalArray.push(item)
	}
	return finalArray
}
// массив из нечетных чисел
const filteredArray = array.myFilter((i) => i % 2)
console.log('filter: ', filteredArray) // [1, 5, 13, 7]

Array.prototype.myMap = function (cb) {
	let finalArray = []
	for (item of this) {
		const res = cb(item)
		finalArray.push(res)
	}
	return finalArray
}
// массив с элементами, возведенными в квадрат
const mapedArray = array.myMap((i) => i ** 2) // [1, 4, 25, 36, 144, 169, 256, 49]
console.log('map: ', mapedArray)

Array.prototype.myReduce = function (cb, startAmount) {
	let total = startAmount
	for (item of this) {
		total = cb(total, item)
	}
	return total
}
// сумма квадратов всех элементов массива
const reducedNum = array.myReduce((total, i) => total += i ** 2, 0)
console.log('reduce: ', reducedNum) // 684

Array.prototype.myReverse = function () {
	const finalArray = []
	for (let i = this.length - 1; i >= 0; i--) {
		finalArray.push(this[i])
	}
	return finalArray
}
// реверснутый массивв
const reversedNum = array.myReverse()
console.log('reverse: ', reversedNum) // [7, 12, 6, 16, 13, 2, 5, 1]


