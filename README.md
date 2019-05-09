# hit_count_headspace
a scalable logger for hit logs

I've done preliminary load tests and was able to get 50k hits counted over 2 minutes on my laptop, limiting the node instance to 50 concurrent request at a time. The load tool I used was not the best as it sent huge bunches at a time and not really spread out like user traffic would be expected. In any case, the code batches hit counts and sends out the count report (right now just to the log, but could be to an asyc network call like the diagram shows) every second and keeps track of the time since last report to write a system error if it misses a tick. This means you could scal;e up to 100 machines and reliably count 5m hits in 2 minutes. If you really want to get to superbow level, you could do more optimizations like throttling on the LB to spread it out a bit more and spin up more Data Collectors if the request per instance exceeds 50 concurrent. The Aggregator/Reporter can easliy manage the load of 100-500 Data Collectors sending data to it. 


![System Diagram](/Screen%20Shot%202019-05-08%20at%206.50.32%20PM.png)
