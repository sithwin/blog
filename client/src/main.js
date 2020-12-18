const simpleGit = require('simple-git');

// Function to make a commit and push for a specific date
async function makeCommit(date, commits) {
  const git = simpleGit();
  const dateString = date.toISOString();
  
  // Set the environment variable GIT_AUTHOR_DATE and GIT_COMMITTER_DATE
  // to the specified date before making the commit
  process.env['GIT_AUTHOR_DATE'] = dateString;
  process.env['GIT_COMMITTER_DATE'] = dateString;

  try {
    // Make the commits
    const commit = commits[Math.floor(Math.random() * commits.length)];
      await git.add('./*').commit(commit, {'--allow-empty': null});
    // Push the commits to the remote repository
    await git.push();
    console.log(`Committed and pushed ${commits.length} commits for ${dateString} successfully!`);
  } catch (err) {
    console.error(`Failed to commit and push for ${dateString}:`, err);
  }
}

// Function to make commits and push for a date range
async function makeCommitsForDateRange(startDate, endDate, commits) {
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    await makeCommit(currentDate, commits);
    // Increment the current date by one day
    currentDate.setDate(currentDate.getDate() + 1);
  }
}

// Usage example
const startDate = new Date('2020-12-18T12:00:00Z');
const endDate = new Date('2020-12-26T12:00:00Z');
const commits = [
  'Added new feature for user authentication',
  'Fixed bug causing incorrect display of search results',
  'Refactored code for improved readability and maintainability',
  'Implemented caching for faster page load times',
  'Updated documentation to reflect latest changes',
  'Resolved conflict in merge of development branch',
  'Added unit tests for increased code coverage',
  'Improved error handling for more informative error messages',
  'Optimized database queries for better performance',
  'Removed deprecated code to streamline application functionality',
  'Implemented responsive design for better mobile compatibility',
  'Fixed security vulnerability by updating library version',
  'Updated third-party API integration to support latest version',
  'Implemented user feedback feature to gather user suggestions',
  'Refactored CSS for more efficient stylesheets',
  'Added feature to allow users to reset their passwords',
  'Improved logging for easier debugging',
  'Added validation for user input to prevent data corruption',
  'Fixed cross-browser compatibility issues for better user experience',
  'Added feature to allow users to upload profile pictures'
];

makeCommitsForDateRange(startDate, endDate, commits);

// const json = require('jsonfile');
// const path = require('./data.json');
// const simpleGit = require('simple-git')();

// const commits = {
//   "commits": [
//     {
//       "commit": "Added new feature for user authentication"
//     },
//     {
//       "commit": "Fixed bug causing incorrect display of search results"
//     },
//     {
//       "commit": "Refactored code for improved readability and maintainability"
//     },
//     {
//       "commit": "Implemented caching for faster page load times"
//     },
//     {
//       "commit": "Updated documentation to reflect latest changes"
//     },
//     {
//       "commit": "Resolved conflict in merge of development branch"
//     },
//     {
//       "commit": "Added unit tests for increased code coverage"
//     },
//     {
//       "commit": "Improved error handling for more informative error messages"
//     },
//     {
//       "commit": "Optimized database queries for better performance"
//     },
//     {
//       "commit": "Removed deprecated code to streamline application functionality"
//     },
//     {
//       "commit": "Implemented responsive design for better mobile compatibility"
//     },
//     {
//       "commit": "Fixed security vulnerability by updating library version"
//     },
//     {
//       "commit": "Updated third-party API integration to support latest version"
//     },
//     {
//       "commit": "Implemented user feedback feature to gather user suggestions"
//     },
//     {
//       "commit": "Refactored CSS for more efficient stylesheets"
//     },
//     {
//       "commit": "Added feature to allow users to reset their passwords"
//     },
//     {
//       "commit": "Improved logging for easier debugging"
//     },
//     {
//       "commit": "Added validation for user input to prevent data corruption"
//     },
//     {
//       "commit": "Fixed cross-browser compatibility issues for better user experience"
//     },
//     {
//       "commit": "Added feature to allow users to upload profile pictures"
//     }
//   ]
// }

// const makeCommit = (x, y) => {
//   const date = new Date(x, y, 1);
//   const dateStr = date.toISOString();
//   const commit = commits.commits[Math.floor(Math.random() * commits.commits.length)];
//   return {
//     ...commit,
//     date: dateStr
//   } 
// }

// makeCommit(2018, 1);

// simpleGit().add('./*')
//   .commit(JSON.stringify(commits), {'--date'})