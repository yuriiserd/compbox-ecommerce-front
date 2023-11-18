
//INFO
// useNormalize to remove properties. from properties.FilterName
// useNormalize for update string values to array for maping render each propery value
export default function useNormalizeFilterQuery(query) {
  const newQuery = {}
  // console.log(query)
  delete query.id;
  delete query.page;
  if (query) {
    Object.keys(query).forEach(key => {
      
      if(query[key].includes(',')) {
        if (key.includes('.')) {
          newQuery[key.split('.')[1]] = query[key].split(',')
        } else {
          newQuery[key] = query[key].split(',')
        }
      } else {
        if (key.includes('.')) {
          newQuery[key.split('.')[1]] = [query[key]]
        } else {
          newQuery[key] = [query[key]]
        }
      }
    })
  }
  // console.log(newQuery)
  return newQuery
}