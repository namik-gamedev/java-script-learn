const array = [1, 2, 5, 6, 12, 13, 16, 7]

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
console.log('filter: ', filteredArray)

Array.prototype.myMap = function (cb) {
    let finalArray = []
    for (item of this) {
        const res = cb(item)
        finalArray.push(res)
    }
    return finalArray
}
// массив с элементами, возведенными в квадрат
const mapedArray = array.myMap((i) => i ** 2)
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
console.log('reduce: ', reducedNum)

