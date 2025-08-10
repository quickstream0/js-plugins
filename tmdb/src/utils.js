// Random item select from list
export function getRandomItem(list) {
  // Generate a random number between 0 (inclusive) and 1 (exclusive)
  const randomIndex = Math.floor(Math.random() * list.length);

  // Return the data at the randomly generated index
  return list[randomIndex];
}
