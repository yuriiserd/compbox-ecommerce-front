
//INFO
// update filters 
//add or remove filter item
export default function useUpdateFilters(filters, filter, item) {
  const newFilters = JSON.parse(JSON.stringify(filters))
  // console.log(newFilters) // on in
  if(!newFilters[filter]) { // add if not exist / replace Range - not add new value to it
    newFilters[filter] = [item]
  } else if (newFilters[filter].includes(item)) { // remove item
    newFilters[filter] = newFilters[filter].filter(curentItem => curentItem !== item)
  } else if (filter === "Range") { // for Range always replays 
    newFilters[filter] = [item]
  } else if (!newFilters[filter].includes(item)) { // add new item
    newFilters[filter].push(item)
  }
  if (newFilters[filter].length === 0) { // remove filter if have no items 
    delete newFilters[filter] 
  }
  // console.log(newFilters) // on out
  return newFilters
}