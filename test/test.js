import AlarmController from "../src/alarmcontroller.js"
import Alarm from '../src/alarm.js'
import AlarmApp from "../src/alarmapp.js"

describe("AlarmClock", function () {

    describe('AlarmController', function () {
        const alarmControllerInstance = new AlarmController()
        describe('isValid function', function () {
            it('should return number when input is number', function () {
                assert.equal(3, alarmControllerInstance.isValid(3))
            })
            it('should return an integer when input is a float number', function () {
                assert.equal(3, alarmControllerInstance.isValid(3.4))
            })
            it('should return number when input is a number character', function () {
                assert.equal(3, alarmControllerInstance.isValid("3"))
            })
            it('should return integer when input is float character', function () {
                assert.equal(3, alarmControllerInstance.isValid("3.5"))
            })
            it('should raise error when input is a character', function () {
                assert.isUndefined(alarmControllerInstance.isValid("A"))
            })
            it('should raise error when input is blanked', function () {
                assert.isNaN(alarmControllerInstance.isValid(""))
            })
        })

    })

    describe('Alarm', function () {
        describe('constructor', function () {
            it('should create an 24-hour format alarm with valid data (no specical time) - AM time', function () {
                const alarmInstance = new Alarm(2, 24, "AM")
            })
            it('should create an 24-hour format alarm with valid data (no specical time) - PM time', function () {
                const alarmInstance = new Alarm(2, 24, "PM")
                assert.equal(14, alarmInstance.time.getHours())
                assert.equal(24, alarmInstance.time.getMinutes())
                assert.equal(0, alarmInstance.time.getSeconds())
            })
            it('should convert 12:- AM to 00:- (24 hour format', function () {
                const alarmInstance = new Alarm(12, 12, "AM")
                assert.equal(0, alarmInstance.time.getHours())
                assert.equal(12, alarmInstance.time.getMinutes())
                assert.equal(0, alarmInstance.time.getSeconds())
            })
            it('should convert 12:- PM to 12:- (24 hour format', function () {
                const alarmInstance = new Alarm(12, 12, "PM")
                assert.equal(12, alarmInstance.time.getHours())
                assert.equal(12, alarmInstance.time.getMinutes())
                assert.equal(0, alarmInstance.time.getSeconds())
            })
        })
        describe('isValid function', function () {
            it('should return true when all the input is valid', function () {
                const alarmInstance = new Alarm(2, 24, "AM")
                assert.isTrue(alarmInstance.isValid())
            })
            it('should return false when hour is less than 1', function () {
                const alarmInstance = new Alarm(0, 35, "AM")
                assert.isFalse(alarmInstance.isValid())
            })
            it('should return false when hour is greater than 12', function () {
                const alarmInstance = new Alarm(13, 30, "AM")
                assert.isFalse(alarmInstance.isValid())
            })
            it('should return false when minutes is less than 0', function () {
                const alarmInstance = new Alarm(8, -40, "PM")
                assert.isFalse(alarmInstance.isValid())
            })
            it('should return false when minutes is greater than 59', function () {
                const alarmInstance = new Alarm(8, 69, "PM")
                assert.isFalse(alarmInstance.isValid())
            })
            it('should return false when period is not AM nor PM', function () {
                const alarmInstance = new Alarm(8, 35, "DM")
                assert.isFalse(alarmInstance.isValid())
            })
            it('should return false when period is not AM nor PM', function () {
                const alarmInstance = new Alarm(8, 35, "DM")
                assert.isFalse(alarmInstance.isValid())
            })
        })

        describe("matches function", function () {
            const alarm = new Alarm(4, 25, "PM")
            it('should return index of matched alarm when meet', function () {
                const time = new Date(2021, 6, 10, 16, 25, 0)
                assert.isTrue(alarm.matches(time))
            })
        })
    })

    describe('AlarmApp', function () {

        // Initialize one valid alarm
        const alarmAppInstance = new AlarmApp()
        const firstAlarm = new Alarm(4, 25, "PM")
        alarmAppInstance.addAlarm(firstAlarm)

        describe('addAlarm function', function () {
            it('should return true when alarm is added', function () {
                assert.isTrue(alarmAppInstance.alarmList.includes(firstAlarm))
            })
        })

        describe('isUnique function', function () {
            it('should return false when adding an existed alarm', function () {
                const secondAlarm = Object.assign({}, firstAlarm)
                assert.isFalse(alarmAppInstance.isUnique(secondAlarm))
            })

            it('should return true when add an unexisted alarm', function () {
                const secondAlarm = new Alarm(4, 25, "AM")
                assert.isTrue(alarmAppInstance.isUnique(secondAlarm))
            })
        })

        describe('checkAlarm function', function () {
            it('should return index of matched alarm when meet', function () {
                const time = new Date(2021, 6, 10, 16, 25, 0)
                assert.equal(alarmAppInstance.alarmList.indexOf(firstAlarm), alarmAppInstance.checkAlarms(time))
            })
        })

        describe('alertAlarm function', function () {
            let alert
            this.beforeEach(function () {
                alert = sinon.spy(alarmAppInstance, 'alertAlarm')
            })
            it('should alert alarm', function () {
                alarmAppInstance.alertAlarm(firstAlarm)
                expect(alert.calledOnce).to.be.true
            })
        })

        describe('removeAlarm function', function () {
            // Initialize more alarm
            const secondAlarm = new Alarm(8, 40, "AM")
            const thirdAlarm = new Alarm(1, 45, "PM")
            alarmAppInstance.addAlarm(secondAlarm)
            alarmAppInstance.addAlarm(thirdAlarm)

            it('should return false when removed alarm not included in alarm list', function () {
                // Remove the third alarm
                alarmAppInstance.removeAlarm(2)
                expect(alarmAppInstance.alarmList).to.not.include(thirdAlarm)
            })

            it('should return false when remove an unexisted alarm', function () {
                const previouseLength = alarmAppInstance.alarmList.length
                alarmAppInstance.removeAlarm(5)
                expect(alarmAppInstance.alarmList.length).to.equal(previouseLength)
            })

            it('should return empty when remove an empty alarm list', function () {
                alarmAppInstance.alarmList = []
                alarmAppInstance.removeAlarm(0)

                expect(alarmAppInstance.alarmList.length).to.be.equal(0)
            })
        })
    })
})




