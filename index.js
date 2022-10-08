import express, { json } from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    app.use(cors());
    next();
});

let jobs = [];


app.get("/test/jobs", async (req, res) => {

 const handleData = async () =>{
    try{
        const { data } = await axios.post("https://www.zippia.com/api/jobs/",{
            "companySkills": true,
            "dismissedListingHashes": [],
            "fetchJobDesc": true,
            "jobTitle": "Business Analyst",
            "locations": [],
            "numJobs": 10,
            "previousListingHashes": [] 
        });
        return data.jobs;
    } catch(err){
        console.log(err);
    }
 
}
    const data = await handleData();

    jobs = data;

    res.send(jobs);
}); 


app.get("/test/jobs/:companyName", (req, res) => {
    const { companyName } = req.params;

    const filteredJobs = jobs.filter((job) => job.companyName === companyName);

    res.send(filteredJobs);
});

app.get("/test/jobs/pastWeek", (req, res) => {
    const pastWeekJobs = jobs.filter(job => {
        const jobDate = new Date(job.postingDate);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return jobDate > weekAgo;
      });
  
    res.send(pastWeekJobs);
});


app.listen(process.env.PORT || 3000);