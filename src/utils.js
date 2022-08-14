function formatDate(dateTime) {
    let date = new Date(dateTime)
    let YYYY = date.getFullYear() + '-'
    let mm = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-'
    let dd = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
    return YYYY + mm + dd
}

// var formatDate1 = formatDate('Sun Aug 28 2022 00:00:00 GMT+0800 (中国标准时间)')
// console.log(formatDate1)
export default formatDate