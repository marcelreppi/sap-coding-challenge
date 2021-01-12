export const shuffle = (array: any[]): any[] => {
  let remaining = array.length
  
  while (remaining !== 0) {
    const i = Math.floor(Math.random() * remaining)
    remaining -= 1

    // Swap in-place
    const tmp = array[remaining]
    array[remaining] = array[i]
    array[i] = tmp
  }

  return array
}