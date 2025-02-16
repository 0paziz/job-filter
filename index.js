document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.job-categories button');
  const jobList = document.querySelectorAll('.job');
  const jobFilter = document.getElementById('job-filter');
  const clearButton = document.getElementById('clear');
  const selectedJobsContainer = document.querySelector('.selected-jobs');
  const jobsContainer = jobList;

  let selectedCategories = [];

  // Handle category button clicks
  filterButtons.forEach(button => {
      button.addEventListener('click', () => {
          const category = button.textContent.trim();

          if (selectedCategories.includes(category)) {
              selectedCategories = selectedCategories.filter(item => item !== category);
              button.classList.remove('selected');
          } else {
              selectedCategories.push(category);
              button.classList.add('selected');
          }

          updateSelectedJobs();
          filterJobs();
      });
  });

  // Update the selected jobs filter UI
  function updateSelectedJobs() {
      selectedJobsContainer.innerHTML = '';

      selectedCategories.forEach(category => {
          const selectedButton = document.createElement('button');
          selectedButton.classList.add('icon-button');
          selectedButton.textContent = category;

          const removeIcon = document.createElement('div');
          removeIcon.classList.add('remove-icon');
          removeIcon.innerHTML = '<img id="close" src="images/icon-remove.svg" alt="remove">';
          selectedButton.appendChild(removeIcon);

          selectedButton.addEventListener('click', () => {
              selectedCategories = selectedCategories.filter(item => item !== category);
              updateSelectedJobs();
              filterJobs();
          });

          selectedJobsContainer.appendChild(selectedButton);
      });

      jobFilter.style.display = selectedCategories.length > 0 ? 'flex' : 'none';
  }

  // Filter jobs based on selected categories
  function filterJobs() {
      jobList.forEach(job => {
          const jobCategories = job.getAttribute('data-categories').split(',').map(cat => cat.trim());
          const isMatching = selectedCategories.every(category => jobCategories.includes(category));

          job.style.display = (isMatching || selectedCategories.length === 0) ? 'flex' : 'none';
      });

      updateJobLayout();
  }

  // Update job layout based on screen size
  function updateJobLayout() {
      jobsContainer.style.display = window.innerWidth <= 430 ? 'block' : 'flex';
  }

  // Event listeners for window load and resize
  window.addEventListener('load', updateJobLayout);
  window.addEventListener('resize', updateJobLayout);

  // Clear all filters
  clearButton.addEventListener('click', () => {
      selectedCategories = [];
      updateSelectedJobs();
      filterJobs();
  });
});
