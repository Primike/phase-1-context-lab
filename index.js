/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */


function createEmployeeRecord(x) {
    return {firstName: x[0], familyName: x[1], title: x[2], payPerHour: x[3],
    timeInEvents: [], timeOutEvents: []}
}

function createEmployeeRecords(nested) {
    let array = []
    for (let element of nested) {
        array.push(createEmployeeRecord(element))
    }
    return array
}

function createTimeInEvent (dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

function createTimeOutEvent (dateStamp){
    let [date, hour] = dateStamp.split(' ')

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })

    return this
}

function hoursWorkedOnDate (date) {
    let x = this.timeInEvents.find(x => x.date == date).hour
    let y = this.timeOutEvents.find(x => x.date == date).hour
    return (y-x)/100
}

function wagesEarnedOnDate(date) {
    let hours = hoursWorkedOnDate.call(this, date)
    return hours*this.payPerHour
}

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(array, name) {
    let employee = array.find(x => x.firstName == name)
    return employee
}

function calculatePayroll(array) {
    return array.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}