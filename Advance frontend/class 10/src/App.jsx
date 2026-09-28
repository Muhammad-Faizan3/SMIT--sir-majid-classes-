import axios from 'axios'
import { useEffect, useState } from 'react'
import Home from './components/home'
import About from './components/about'
import Contact from './components/contact'

const App = () => {
  // const inputRef = useRef(null)
  // const [name, setName] = useState("")
  // const [errorText,setErrorText] = useState("")
  // const getInputRef = () => {
  //   // console.log("InputRef", inputRef);
  //   inputRef.current.value = "faizan"
  // }

  // useEffect(() => {
  //   if (!name) return
  //   if(name.length < 8) {
  //     console.log("max 8 characters");
  //   }
  //   if(name.length > 8) {
  //     console.log("mim 8 characters");
  //   }
  // }, [name])

  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [search, setSearch] = useState("")

  const filteredJobs = jobs.filter((job) => {
    const term = search.trim().toLowerCase()
    if (!term) return true
    return job.designation?.toLowerCase().includes(term) || job.companyName?.toLowerCase().includes(term)
  })

  useEffect(() => {
    const controller = new AbortController()
    axios
      .get("https://api-v2.hiringmine.com/api/jobAds/all?limit=10&pageNo=1&KeyWord=&category=&isPending=false&skills", { signal: controller.signal })
      .then((res) => setJobs(res.data.data))
      .catch((err) => { if (err.name !== "CanceledError") setError(err.message) })
      .finally(() => setLoading(false))
    return () => controller.abort()
  },[])

  return (
    <>
    <Home/>
    <About/>
    <Contact/>
    {/* <input placeholder='Enter your userName' value={name} type="text" onChange={(e) => {
      setName(e.target.value)
    }} />
    <input ref={inputRef} type='text' />
    <small style={{color: 'red'}}>{errorText}</small>
    <h1>{name}</h1>
    <button onClick={getInputRef}>Submit</button>
    <button onClick={()=> setName("")}>Clear</button> */}

    <h1>Job Ads</h1>

    <input
      className="searchBar"
      type="text"
      placeholder="Search by job title or company..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />

    {loading && <p>Loading...</p>}
    {error && <p style={{color: 'red'}}>{error}</p>}

    {!loading && !error && (
      <div className="jobList">
        {filteredJobs.length === 0 && <p>No jobs found for "{search}"</p>}
        {filteredJobs.map((job) => (
          <div className="jobCard" key={job._id}>
            <h2>{job.designation}</h2>
            <h3>{job.companyName}</h3>
            <p>{job.jobFeseability} | {job.jobType} | {job.experience}</p>
            <p>Salary: {job.payRangeStart} - {job.payRangeEnd} {job.salaryCurrency}</p>
            <p>Location: {job.locationLabel || job.city || "N/A"}</p>
            <p>Category: {job.category?.name}</p>
            <div className="skills">
              {job.skills?.map((skill) => (
                <span className="skill" key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
    </>
  )
}

export default App