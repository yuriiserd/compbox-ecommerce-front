import { primary } from "@/lib/colors"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styled from "styled-components"
import Range from "./Range"
import { useDispatch, useSelector } from "react-redux"
import { selectFilters, updateFilters } from "@/slices/filtersSlice"
import useUpdateFilters from "@/hooks/useUpdateFilters"

const StyledFilters = styled.div`
  background-color: #f4f4f4;
  border-radius: 1rem;
  padding: 1rem;
  box-sizing: border-box;
  h4 {
    margin-bottom: 0.5rem;
    color: ${primary};
    font-size: 1.2rem;
  }
  @media (max-width: 768px) {
    padding: 4rem 1rem;
    height: 100vh;
    overflow-y: auto;
  }
`
const Filter = styled.div`
  position: relative;
  padding-bottom: 1rem;
`
const Checkbox = styled.div`
  display: flex;
  align-items: center;
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
  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
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

export default function ProductFilters({properties, range, category, filterProducts, setProductsCount, children}) {

  
  const [allFilters, setAllFilters] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({});

  const router = useRouter();

  const dispatch = useDispatch()
  const filtersState = useSelector(selectFilters);

  useEffect(() => {
    setSelectedFilters(filtersState);
  },[filtersState])

  useEffect(() => {
    //set properties as filters AND split in half 
    const initialFilters = {}
    Object.keys(properties).forEach(property => {
      const arr = properties[property];
      let updatedFilter = {}
      if (arr.length > 10) {
        updatedFilter = {main: arr.slice(0, 10), other: arr.slice(10, arr.length), hidden: true};
      } else {
        updatedFilter = {main: arr, hidden: false};
      }
      initialFilters[property] = updatedFilter
    }) 
    setAllFilters(initialFilters)
  }, [properties])
 
  function showOthers(filter) {
    setAllFilters(old => {
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

  function RunFilter(filter, item) {
    
    const filters = useUpdateFilters(selectedFilters, filter, item);

    const queryFilters = {};

    Object.keys(filters).forEach(key => { //key is a filter name
      if (filters[key].length > 1) {
        queryFilters[key] = filters[key].join(',')
      } else {
        queryFilters[key] = filters[key][0]
      }
    })
    
    setSelectedFilters(filters);
    dispatch(updateFilters(filters));

    router.push({
      
      pathname: '/category/' + category._id, 
      query: {
        ...queryFilters,
      }
    },
    undefined,
    { shallow: true },
    )

    getProductsByFilters(queryFilters);
  } 

  async function getProductsByFilters(queryFilters) {
    const products = await axios.post('/api/products/', {query: queryFilters, category, all: true})

    filterProducts(products.data.products);
    setProductsCount(products.data.count)
  }


  return (
    <StyledFilters>
      <Filter>
        <h4>Price</h4>
        <Range range={range} filter={RunFilter}/>
      </Filter>
      {Object.keys(allFilters).map(filter => (
        <Filter key={filter}>
          <h4>{filter}</h4>
          {allFilters[filter].main.map((item, i) => {
            let checked = false;
            if (!!selectedFilters[filter]?.length) {
              checked = selectedFilters[filter].includes(item);
            } 
            return (
              <Checkbox key={item + i}>
                <input type="checkbox" checked={checked} onChange={() => RunFilter(filter, item)} id={item + i}/>
                <label htmlFor={item + i}>{item}</label>
              </Checkbox>
            )
          })} 
          {!allFilters[filter].hidden && allFilters[filter]?.other && allFilters[filter].other.map((item, i) => {
            let checked = false;
            if (selectedFilters[filter]) {
              checked = selectedFilters[filter].includes(item);
            } 
            return (
              <Checkbox key={item + i}>
                <input type="checkbox" checked={checked} onChange={() => RunFilter(filter, item)} id={item + i}/>
                <label htmlFor={item}>{item}</label>
              </Checkbox>
            )
          })}
          {allFilters[filter].hidden && (
            <MoreBtn onClick={() => showOthers(filter)}>show more</MoreBtn>
          )}
        </Filter>
      ))}
      {children}
    </StyledFilters>
  )
}