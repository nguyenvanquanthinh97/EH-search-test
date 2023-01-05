const fs = require("./static.js");

const searchWithCallback = (callback) => {
  const result = [];

  const doSearch = (dir) => {
    dir.content.forEach((file) => {
      if (file.isDir) {
        const folder = file;
        doSearch(folder);
      }

      if (callback(file)) result.push(file);
    });
  };

  doSearch(fs);

  return result;
};

const searchFilename = (filename) => {
  return (file) => file.filename === filename;
};

const searchExtension = (extension) => {
  return (file) => file.extension === extension;
};

// compare: lg/lge/sm/sme/eq
const searchBySize = (compare, value) => {
  switch (compare) {
    case "lg":
      return (file) => file.size > value;
    case "lge":
      return (file) => file.size >= value;
    case "sm":
      return (file) => file.size < value;
    case "sme":
      return (file) => file.size <= value;
    case "eq":
      return (file) => file.size === value;
  }
};

const searchBySizeOrExtension = (compare, value, extension) => (file) => {
  if (compare && value && extension)
    return (
      searchBySize(compare, value)(file) && searchExtension(extension)(file)
    );
  if (compare && value) return searchBySize(compare, value)(file);
  if (extension) return searchExtension(extension)(file);
};

const searchFilenameByRegex = (regex) => {
  return (file) => regex.test(file.filename);
};

module.exports = {
  searchWithCallback,
  searchBySize,
  searchExtension,
  searchBySizeOrExtension,
  searchFilenameByRegex,
  searchFilename,
};
