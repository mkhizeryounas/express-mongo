const path = require('path');
const connection = require('@/config/db');

const filePath = process.argv[2];

if (!filePath) {
  console.error('Please provide a file path');
  process.exit(1);
}

const absoluteFilePath = path.resolve(filePath);

(async () => {
  try {
    const runScript = require(absoluteFilePath);
    if (typeof runScript !== 'function') {
      throw new Error('Script must be a function');
    }
    await runScript();
    console.log('Script executed successfully');
  } catch (error) {
    console.error(`Error executing script: ${error.message}`);
  }
  connection.close();
})();
