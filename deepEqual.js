const deepEqual = (value1, value2) => {
  if (typeof value1 !== typeof value2) return false;

  if (isPrimaryType(value1)) return handlePrimaryType(value1, value2);

  if (isArrayType(value1)) return handleArrayType(value1, value2);

  if (isObjectType(value1)) return handleObjectType(value1, value2);
};

const isPrimaryType = (value) =>
  ["string", "number", "boolean"].includes(typeof value);

const isArrayType = (value) => Array.isArray(value);

const isObjectType = (value) => typeof value === "object";

const handlePrimaryType = (value1, value2) => value1 === value2;

const handleArrayType = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;

  for (let i = 0; i < arr1.length; i++) {
    const value1 = arr1[i];
    const value2 = arr2[i];

    const result = deepEqual(value1, value2);

    if (!result) return false;
  }

  return true;
};

const handleObjectType = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    const value1 = obj1[key];
    const value2 = obj2[key];

    const result = deepEqual(value1, value2);
    if (!result) return false;
  }
  return true;
};

module.exports = deepEqual;
