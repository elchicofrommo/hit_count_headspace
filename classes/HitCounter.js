import logger from "./Logger"

let counter = 0
let lastLog = getDateWithoutMili()
let toleranceViolationCount = 0

class HitCounter {

	incrementCount(){
		//logger.info("count now at " + counter)
		counter++
	} 

	logAndReset(){
		var thisMoment = getDateWithoutMili()
		var msSinceLastLog = thisMoment - lastLog

		// uncomment this to see data
		//logger.info("this moment vs lastLog is " + thisMoment+ ":" + lastLog )


		// internally the logger uses a Promise to write the log so it's alreay async, 
		// but it would be trivial to change this to a request to another collating service
		// that includes timestamp
		logger.info("Log and Reset: count='" + counter + "'' time='" + thisMoment + "' msSinceLastLog='" + msSinceLastLog +"' toleranceViolationCount='" + toleranceViolationCount +"'")

		if(msSinceLastLog  > 1000){
			logger.error("Time between counts is greater than 1 second, the timestamp count is compromised")
			toleranceViolationCount ++
		}

		counter=0;
		lastLog = thisMoment
	}

	


	getCount(){
		return counter
	}

}

//Primary goal is to convert the mils of a current date to a string, chop off the milisecond part and rebuild it to a date
	
function getDateWithoutMili(){
		var thisMoment = new Date()

		// now work magic to eliminate miliseconds and only have seconds
		var momentString = ""+ thisMoment.getTime();

		momentString = momentString.substring(0, momentString.length-3) // chop off the miliseconds
		momentString += "000" // set the miliseconds to 0

		return new Date(momentString*1) // convert the string back to a number and create date

	}

let hitCounter = new HitCounter()
export default hitCounter
