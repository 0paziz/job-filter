import React, { useState } from "react";
import data from "../data";

function Jobs() {


  const [jobs] = useState(data);
  const [filters, setFilters] = useState([]);

  // Add a filter if it's not already selected
  const addFilter = (filter) => {

    if (!filters.includes(filter)) {
      setFilters([...filters, filter]);
    }
  };

  // Remove a single filter
  const removeFilter = (filterToRemove) => {
    setFilters(filters.filter((filter) => filter !== filterToRemove));
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters([]);
  };

  // Filter jobs by selected filters
  const filterJobs = (job) => {
    const jobTags = [job.role, job.level, ...job.languages];
    return filters.every((filter) => jobTags.includes(filter));
  };

  const visibleJobs = filters.length > 0 ? jobs.filter(filterJobs) : jobs;

  return (
    <>
      <div className="job-list">
        {filters.length > 0 && (
          <>
            <div id="job-filter" className="job-filter">
              <div className="selected-jobs">
                {filters.map((filter, index) => (
                  <div className="icon-button" key={index}>
                    <button id="selectedcat">{filter}</button>
                    <img
                      id="close"
                      className="remove-icon"
                      src="/images/icon-remove.svg"
                      alt="remove"
                      onClick={() => removeFilter(filter)}
                    />
                  </div>
                ))}
              </div>
              <div className="clear">
                <button id="clear" onClick={clearFilters}>
                  clear
                </button>
              </div>
            </div>
          </>
        )}

        {visibleJobs.map((job) => (
          <div
            className={`job ${job.featured ? "sided-border" : ""}`}
            key={job.id}
          >
            <div className="job-info">
              <div className="image">
                <img
                  id="img-overflow"
                  src={job.logo}
                  alt={job.company + " logo"}
                />
              </div>

              <div className="details">
                <div className="info1 margin-remove">
                  <p id="company">{job.company}</p>
                  {job.new && <button id="new">NEW!</button>}
                  {job.featured && <button id="Featured">FEATURED</button>}
                </div>

                <div className="info2 margin-remove">
                  <h3>{job.position}</h3>
                </div>

                <div className="info3 margin-remove">
                  <ul>
                    <li id="first-list">{job.postedAt}</li>
                    <li>{job.contract}</li>
                    <li>{job.location}</li>
                  </ul>
                </div>
              </div>
            </div>

            <hr />

            <div className="job-categories">
              <button  onClick={() => addFilter(job.role)}>{job.role}</button>
              <button onClick={() => addFilter(job.level)}>{job.level}</button>
              {job.languages.map((lang, index) => (
                <button key={index} onClick={() => addFilter(lang)}>
                  {lang}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Jobs;
