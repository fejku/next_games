const initializeArray = (range: number, length: number) => {
  if (range > length) throw new Error("Length is larger then range");

  const arr = [];
  for (let i = 0; i < range; i++) {
    arr[i] = i;
  }

  for (let i = 0; i < length - range; i++) {
    arr[range + i] = Math.floor(Math.random() * range);
  }

  return arr;
};

const checkAndUpdate = (arr: number[], range: number) => {
  const counts: { [key: number]: number } = {};
  arr.forEach((num) => {
    counts[num] = (counts[num] || 0) + 1;
  });

  const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  const mostFrequent = sortedCounts[0][1];
  const secondMostFrequent = sortedCounts[1][1];

  if (mostFrequent === secondMostFrequent) {
    const secondMostFrequentNumber = parseInt(sortedCounts[0][0]);
    const indexToChange = arr.findIndex((v) => v === secondMostFrequentNumber);
    arr[indexToChange] = (secondMostFrequentNumber % range) + 1;
  }
};

export const getArray = (range: number, length: number) => {
  const arr = initializeArray(range, length);
  checkAndUpdate(arr, range);
  return arr.toSorted(() => Math.random() - 0.5);
};

export const getFirstPlaceInArray = (arr: number[]) => {
  const counts: { [key: number]: number } = {};
  arr.forEach((num) => {
    counts[num] = (counts[num] || 0) + 1;
  });

  const sortedCounts = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return parseInt(sortedCounts[0][0]);
};
