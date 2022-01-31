/**
 * Generates a list of numbers starting from start, and ending at end.
 * Start and end are inclusive.
 *
 * @param {number} start Generates From this value till end value.
 * @param {number} end Generates till this value.
 * @returns {number[]} List of numbers from start till end.(inclusive of start and end)
 */
export const range = (start: number, end: number): number[] => {
  const items: number[] = [];
  for (let i = start; i <= end; ++i) {
    items.push(i);
  }

  return items;
};
