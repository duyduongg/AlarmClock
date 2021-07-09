import AlarmController from "../src/alarmcontroller.js";
import Alarm from '../src/alarm.js'
import AlarmApp from "../src/alarmapp.js";
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
            // it.skip('should raise error when input number is too long', function() {
            //     should.throw(alarmControllerInstance.isValid(10000000000000000000), Error('Input is too long'))
            // })
            it('should raise error when input is a character', function () {
                assert.isUndefined(alarmControllerInstance.isValid("A"))
            })
            it('should raise error when input is blanked', function () {
                assert.isNaN(alarmControllerInstance.isValid(""))
            })
        })
    })

    describe('Alarm', function () {
        describe('isValid function', function () {
            it('should return true when all the input is valid', function () {
                const alarmInstance = new Alarm(2, 24, "AM")
                assert.equal(true, alarmInstance.isValid())
            })
            it('should return false when hour is less than 1', function () {
                const alarmInstance = new Alarm(0, 35, "AM")
                assert.equal(false, alarmInstance.isValid())
            })
            it('should return false when hour is greater than 12', function () {
                const alarmInstance = new Alarm(13, 30, "AM")
                assert.equal(false, alarmInstance.isValid())
            })
            it('should return false when minutes is less than 0', function() {
                const alarmInstance = new Alarm(8, -40, "PM")
                assert.equal(false, alarmInstance.isValid())
            })
            it('should return false when minutes is greater than 59', function() {
                const alarmInstance = new Alarm(8, 69, "PM")
                assert.equal(false, alarmInstance.isValid())
            })
            it('should return false when period is not AM nor PM', function() {
                const alarmInstance = new Alarm(8, 35, "DM")
                assert.equal(false, alarmInstance.isValid())
            })
        })
    })

    describe('AlarmApp', function() {

        // Initialize one valid alarm
        const alarmAppInstance = new AlarmApp()
        const firstAlarm = new Alarm(4, 25, "PM")
        alarmAppInstance.addAlarm(firstAlarm)

        describe('isUnique function', function() {
            it('should return false when adding an existed alarm', function() {
                const secondAlarm = Object.assign({}, firstAlarm)
                assert.equal(false, alarmAppInstance.isUnique(secondAlarm))
            })

            it('should return true when add an unexisted alarm', function() {
                const secondAlarm = new Alarm(4, 25, "AM")
                assert.equal(true, alarmAppInstance.isUnique(secondAlarm))
            })
        })
        
    })

    describe('Alarm', function() {

        // Initialize one valid alarm
        const alarmAppInstance = new AlarmApp()
        const firstAlarm = new Alarm(4, 25, "PM")
        alarmAppInstance.addAlarm(firstAlarm)

        
    })
})




