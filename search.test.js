const { searchWithCallback, searchBySizeOrExtension } = require("./search");
const deepEqual = require("./deepEqual");

const inputCase01 = ["lg", 1024, "js"];
const expectedOutputCase01 = [
  {
    filename: "test01.js",
    size: 2048,
    extension: "js",
  },
];
console.log(
  "DEBUG: check searchBySizeOrExtension",
  deepEqual(
    searchWithCallback(searchBySizeOrExtension(...inputCase01)),
    expectedOutputCase01
  )
);

const inputCase02 = ["lg", 1024, undefined];
const expectedOutputCase02 = [
  { filename: "test01.js", size: 2048, extension: "js" },
  { filename: "test03.db", size: 2048, extension: "db" },
];
console.log(
  "DEBUG: check searchBySizeOrExtension with Only by size",
  deepEqual(
    searchWithCallback(searchBySizeOrExtension(...inputCase02)),
    expectedOutputCase02
  )
);

const inputCase03 = [undefined, undefined, "js"];
const expectedOutputCase03 = [
  { filename: "test01.js", size: 2048, extension: "js" },
  { filename: "test02.js", size: 512, extension: "js" },
];
console.log(
  "DEBUG: check searchBySizeOrExtension with Only extension",
  deepEqual(
    searchWithCallback(searchBySizeOrExtension(...inputCase03)),
    expectedOutputCase03
  )
);
