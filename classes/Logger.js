import chalk from 'chalk'

var winston = require('winston');
var expressWinston = require('express-winston');

var winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

var expressMiddlewareLogger = function (req, res, next) {
  winstonLogger.info(req)
  next()
}
 
let fmt_class = chalk.green
let fmt_info = chalk.cyan
let fmt_error = chalk.bold.red
let fmt_warning = chalk.yellow
let fmt_verbose = chalk.magenta
let verbose = false
let rootDir = 'hit_counter_app/'

class Logger{

	info(output){
		if(verbose)
			output = output + this.getCallSource()

		// now log async so it doesn't hold up thread execution
		//this.logAsync(fmt_info(output))
		//winstonLogger.info( fmt_info(output))
		winstonLogger.info( output)
	}

	error(output){
		if(verbose)
			output = output + this.getCallSource()
		winstonLogger.error(output )
		//winstonLogger.error(fmt_error(output ))
		//winston.error(fmt_error(output))
	}
	warning(output){
		if(verbose)
			output = output + this.getCallSource()
		winstonLogger.warn(output)
		//winstonLogger.warn(fmt_warning(output))
	}
	verbose(output){
		if(verbose)
			output = output + this.getCallSource()
		winstonLogger.verbose(output)
		//winstonLogger.verbose(fmt_verbose(output))
	}

	logAsync(output){
		 var p = new Promise(function(resolve, reject) {
	    	// Do async job
	        console.log(output)
	        resolve("logged")
    	})

		
	}

	getExpressLogger(){


		return expressMiddlewareLogger
	}
	
	getCallSource() {
	  // this does not work on all javascript engines. Its very hacky and
	  // should never be done on a productoin level ... something like this 
	  // might work but would need more tightening like tightening the app locaiton
	  var orig = new Error().stack;
	  var stack = orig.split('\n');
	  var fileLocation = stack[3].substring(rootDir)
	  
	  return fmt_verbose( fileLocation) 

	}	
}
let logger = new Logger()



export default logger

