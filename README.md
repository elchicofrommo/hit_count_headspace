# hit_count_headspace
a scalable logger for hit logs. the app is only for the /log route that allows caller to indicate to the server to log a hit. For simplicity it's at the GET route, but easily switched to PUT if desired (see routes/log.js). 

<b>Running</b><br>
Start with a system where node.js is installed. Download the project and cd into hit_count_headspace and execute

<pre>npm-init</pre>

This will start a server at http://localhost:3000 <br>

In this prototype I am asynchronously outputing the log count between seconds. For now it is writing to combined.log, but could just as easily be a network call to a report engine (see diagram below) <br>

When running load tests against this you may watch error.log for how many times the system obseves it wasn't able to send the count within a second of the last send. This could be modified to still send one request for each second by taking the count and dividing it by the number of seconds missed (on my lap top I only ever saw 2 second lapses). <p>


<b>Testing</b> I've done preliminary load tests and was able to get 50k hits counted over 2 minutes on my laptop, limiting the node instance to 50 concurrent request at a time. The load tool I used was not the best as it sent huge bunches at a time and not really spread out like user traffic would be expected. In any case, the code batches hit counts and sends out the count report (right now just to the log, but could be to an asyc network call like the diagram shows) every second and keeps track of the time since last report to write a system error if it misses a tick. This means you could scale up to 100 machines and reliably count 5m hits in 2 minutes. If you really want to get to superbow level, you could do more optimizations like throttling on the LB to spread it out a bit more and spin up more Data Collectors if the request per instance exceeds 50 concurrent. The Aggregator/Reporter can easliy manage the load of 100-500 Data Collectors sending data to it. These test resutls were just on my lap top and with other applications running. Given how little I did to optmize the code and how much it was able to scale with 98% accuracy with unrealistic loads i'm confident it could be optimized to acheieve 99.999998% accuracy. 


![System Diagram](/Screen%20Shot%202019-05-08%20at%206.50.32%20PM.png)
