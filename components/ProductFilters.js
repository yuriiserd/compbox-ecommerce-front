import { primary } from "@/lib/colors"
import { useEffect, useState } from "react"
import styled from "styled-components"

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

export default function ProductFilters({properties, category}) {

  
  const [categoryName, setCategoryName] = useState('')
  const [filters, setFilters] = useState({});

  useEffect(() => {
    setCategoryName(category.name)
  },[category])

  useEffect(() => {
    setFilters({})
    Object.keys(properties).forEach(property => {
      setFilters(filters => {
        const arr = properties[property];
        let updatedFilter = {}
        if (arr.length > 10) {
          updatedFilter = {main: arr.slice(0, 10), other: arr.slice(10, arr.length), hidden: true};
        } else {
          updatedFilter = {main: arr, hidden: false};
        }
        console.log(property, updatedFilter)
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

  return (
    <StyledFilters>
      {Object.keys(filters).map(filter => (
        <Filter key={filter}>
          <h4>{filter}</h4>
          {filters[filter].main.map((item, i) => (
            <Checkbox key={item + i}>
              <input type="checkbox" id={item + i}/>
              <label htmlFor={item + i}>{item}</label>
            </Checkbox>
          ))} 
          {!filters[filter].hidden && filters[filter]?.other && filters[filter].other.map(item => (
            <Checkbox key={item}>
              <input type="checkbox" id={item}/>
              <label htmlFor={item}>{item}</label>
            </Checkbox>
          ))}
          {filters[filter].hidden && (
            <MoreBtn onClick={() => showOthers(filter)}>show more</MoreBtn>
          )}
        </Filter>
      ))}
      
    </StyledFilters>
  )
}