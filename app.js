
// Get the JSON data (from a file or an API)
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    // Sort data alphabetically by nameLatin field
    const sortedData = data.sort((a, b) => {
      const nameA = a.nameLatin.toLowerCase();
      const nameB = b.nameLatin.toLowerCase();
      
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    
    // Build the table from the sorted data
    buildTable(sortedData);
  })
  .catch(error => console.error('Error loading data:', error));

function buildTable(tableData) {
  // Clear the existing table content
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';
  
  // Loop through the data and create table rows
  for (let i = 0; i < tableData.length; i++) {
    const row = `<tr>
      <td>${tableData[i].nameLatin}</td>
      <td>${tableData[i].nameEst}</td>
      <td>${tableData[i].sort}</td>
      <td>${tableData[i].konteinerL}</td>
      <td>${tableData[i].hind}</td>
    </tr>`;
    
    // Append row to the table body
    tableBody.innerHTML += row;
  }
}

// If you want to enable sorting when clicking column headers
function setupSortingListeners() {
  const headers = document.querySelectorAll('th[data-sort]');
  
  headers.forEach(header => {
    header.addEventListener('click', () => {
      const sortField = header.getAttribute('data-sort');
      
      // Get the data again and sort by the clicked field
      fetch('data.json')
        .then(response => response.json())
        .then(data => {
          const sortedData = data.sort((a, b) => {
            const valA = a[sortField].toLowerCase();
            const valB = b[sortField].toLowerCase();
            
            if (valA < valB) return -1;
            if (valA > valB) return 1;
            return 0;
          });
          
          buildTable(sortedData);
        });
    });
  });
}

// Initialize the sorting listeners
document.addEventListener('DOMContentLoaded', () => {
  setupSortingListeners();
});