
const { calculateDate, formatTimes } = require('../lib/timeUtils')

function Sprint(day, weekModifier, startDate, name) {
	this.api = {
		start: {
			timeZone: 'America/Denver'
		},
		end: {
			timeZone: 'America/Denver'
		}
	}
    
	this.csv = {
	}

	this.name = name
	this.weekModifier = weekModifier
	
	setStartDate(this, calculateDate(startDate, weekModifier, day))
	setEndDate(this, calculateDate(startDate, weekModifier, day))
	setSubject(this, name)
}

Sprint.prototype.updateEndDate = function(endDay) {
	setEndDate(this, calculateDate(this.startDate, this.weekModifier, endDay))
	setStartAndEndTime(this, formatTimes({Time: "9:00AM-5:30PM"}))
}

function setStartDate(event, date) {
	event.csv['Start Date'] = date.toLocaleDateString()
	event.api.start.dateTime = `${date.getFullYear()}-${date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate()}T`
}

function setEndDate(event, date) {
	event.csv['End Date'] = date.toLocaleDateString()
	event.api.end.dateTime = `${date.getFullYear()}-${date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate()}T`

}

function setStartAndEndTime(event, times) {
	event.csv['Start Time'] = times.start.short
	event.csv['End Time'] = times.end.short

	event.api.start.dateTime += times.start.long
	event.api.end.dateTime += times.end.long
}

function setSubject(event, subject) {
	event.api['summary'] = subject
	event.csv['Subject'] = subject
}

module.exports = Sprint