 
//TO Show the Job posted By Creator
import JobCard from "./JobCard"
  
export default function ShowJobs({ jobs, setJobs }) {
 
   
    return (
            <div>
                {jobs?.length === 0 ? (
                    <div className="section_bg flex items-center justify-center">
                        <h3>No Jobs Found</h3>
                    </div>
                ) : (
                    jobs.map((job) => (
                        <div key={job._id} 
                            className="flex flex-col gap-2">
                        <JobCard key={job._id} job={job} setJobs={setJobs}/>
                        </div>
                    ))
                )}
            </div>
 
    );
}

 