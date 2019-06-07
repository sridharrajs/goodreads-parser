'use strict';

const xlsx = require('xlsx');
const fs = require('fs');

const FILENAME_WITH_PATH = './goodreads_library_export.csv';

assertFile();

const excelsheet = xlsx.readFile(FILENAME_WITH_PATH, {
  type: 'file'
});

let books;

for (let sheetName of Object.keys(excelsheet.Sheets)) {
  let sheet = excelsheet.Sheets[sheetName];

  books = xlsx.utils.sheet_to_json(sheet).map(row => {
    return {
      title: row['Title'],
      author_name: row['Author'],
      my_rating: row['My Rating'],
      date_read: row['Date Read'],
      bookshelves: row['Exclusive Shelf'],
    };
  });

}

console.log('Total books ', books.length);
console.log('Total read books ', books.filter(book => book.bookshelves === 'read').length);

function assertFile() {
  if (!fs.existsSync(FILENAME_WITH_PATH)) {
    console.error(Error(`${FILENAME_WITH_PATH} doesnt exist`));
    process.exit(0);
  }
  console.log(`Reading file from ${FILENAME_WITH_PATH}`)
}
