import { primary } from "@/lib/colors"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styled from "styled-components"
import Range from "./Range"

const StyledFilters = styled.div`
  background-color: #f4f4f4;
  border-radius: 1rem;
  padding: 1rem;
  h4 {
    margin-bottom: 0.5rem;
    color: ${primary};
    font-size: 1.2rem;
  }
`
const Filter = styled.div`
  position: relative;
  padding-bottom: 1rem;
`
const Checkbox = styled.div`
  display: flex;
  label {
    position: relative;
    cursor: pointer;
    padding-left: 1.3rem;
  }
  label::before,
  label::after {
    transition: all 0.1s;
  }
  label::before {
    content: '';
    position: absolute;
    width: 0.7rem;
    border-radius: 0.15rem;
    height: 0.7rem;
    border: 1px solid ${primary};
    left: 0.1rem;
    top: 50%;
    transform: translateY(-50%);
  }
  label::after {
    content: '';
    opacity: 0;
    position: absolute;
    width: 0.2rem;
    height: 0.4rem;
    border-radius: 0.01rem;
    border-bottom: 0.15rem solid #fff;
    border-right: 0.15rem solid #fff;
    left: 0.35rem;
    top: 45%;
    transform: translateY(-50%) rotate(35deg);
  }
  input {
    display: none;
    &:checked + label::before {
      background: ${primary};
    } 
    &:checked + label::after {
      opacity: 1;
    }
    &:checked + label {
      color: ${primary}
    }
  }
`
const MoreBtn = styled.button`
  border: none;
  background: none;
  position: absolute;
  right: 0;
  bottom: -0.5rem;
  padding: 0.5rem;
  opacity: 0.7;
  cursor: pointer;
`

export default function ProductFilters({properties, range, category, filterProducts}) {

  
  const [categoryName, setCategoryName] = useState('')
  const [filters, setFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});

  const router = useRouter();


  useEffect(() => {
    setCategoryName(category.name);
    setSelectedFilters({});
  },[category])

  useEffect(() => {
    
    setSelectedFilters((prev) => {
      const newQuery = router.query;

      Object.keys(newQuery).forEach(key => {
        if (key.split('.')[1]) {
          const newKey = key.split('.')[1];
          newQuery[newKey] = newQuery[key].join(',');
          delete newQuery[key];
        }
        if (newQuery.id) {
          delete newQuery.id
        }
      })
      return newQuery
    })
  }, []);

  

  useEffect(() => {
    setFilters({});
    Object.keys(properties).forEach(property => {
      setFilters(filters => {
        const arr = properties[property];
        let updatedFilter = {}
        if (arr.length > 10) {
          updatedFilter = {main: arr.slice(0, 10), other: arr.slice(10, arr.length), hidden: true};
        } else {
          updatedFilter = {main: arr, hidden: false};
        }
        return {
          ...filters,
          [property]: updatedFilter
        }
      })
    }) 
    
  },[categoryName])
 
  function showOthers(filter) {
    setFilters(old => {
      const updatedFilter = {
        ...old[filter],
        hidden: false
      }
      return {
        ...old,
        [filter]: updatedFilter
      }
    })
  }

  function getUpdatedFilters(selected, filter, item) {
    if(!selected[filter] || filter === "Range") { // add if not exist
      selected[filter] = item
    } else if (!selected[filter].includes(item)) { // add new item
      selected[filter] += ',' + item
    } else if (selected[filter].includes(item)) { // remove item
      selected[filter] = selected[filter].split(',').filter(curentItem => curentItem !== item).join(',')
    }
    if (selected[filter].length === 0) { // remove filter if have no items 
      delete selected[filter] 
    }
    return selected
  }

  async function runFilter(filter, item) {
    
    console.log(filter, item);

    const filters = getUpdatedFilters(selectedFilters, filter, item);
    
    setSelectedFilters(filters);

    router.push({
      ...router,
      pathname: '/category/' + category._id, 
      query: {
        ...filters
      }
    },
    undefined,
    { shallow: true },
    )


    const products = await axios.post('/api/products/', {query: filters, category})

    filterProducts(products.data)
  } 
  return (
    <StyledFilters>
      <Filter>
        <h4>Price</h4>
        <Range range={range} filter={runFilter}/>
      </Filter>
      {Object.keys(filters).map(filter => (
        <Filter key={filter}>
          <h4>{filter}</h4>
          {filters[filter].main.map((item, i) => {
            let checked = false;
            if (selectedFilters[filter]) {
              checked = selectedFilters[filter].split(',').includes(item);
            } 
            // const checked = false;
            return (
              <Checkbox key={item + i}>
                <input type="checkbox" checked={checked} onChange={() => runFilter(filter, item)} id={item + i}/>
                <label htmlFor={item + i}>{item}</label>
              </Checkbox>
            )
          })} 
          {!filters[filter].hidden && filters[filter]?.other && filters[filter].other.map(item => {
            // const checked = query[filter].split(',').includes(item);
            return (
              <Checkbox key={item}>
                <input type="checkbox" checked={checked} onChange={() => runFilter(item)} id={item}/>
                <label htmlFor={item}>{item}</label>
              </Checkbox>
            )
          })}
          {filters[filter].hidden && (
            <MoreBtn onClick={() => showOthers(filter)}>show more</MoreBtn>
          )}
        </Filter>
      ))}
      
    </StyledFilters>
  )
}