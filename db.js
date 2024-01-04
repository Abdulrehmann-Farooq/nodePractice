const fs = require('fs'); // Import the File System module

// Read data from the JSON file
try {
  const data = fs.readFileSync('data.json', 'utf8');
  const jsonData = JSON.parse(data);

  // Use jsonData in your application
  console.log('Data from the file:', jsonData);
} catch (error) {
  console.error(error);
}
 