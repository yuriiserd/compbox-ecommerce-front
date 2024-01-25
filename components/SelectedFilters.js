import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import styled from "styled-components"
import Button from "./Button";
import axios from "axios";
import useUpdateFilters from "@/hooks/useUpdateFilters";
import { useDispatch, useSelector } from "react-redux";
import { selectFilters, updateFilters } from "@/slices/filtersSlice";

export default function SelectedFilters({productsCount, category, filterProducts, setProductsCount}) {

  const Selected = styled.div`
    margin-bottom: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    span {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem;
    }
  `

  const [selectedFilters, setSelectedFilters] = useState(null);

  const filtersState = useSelector(selectFilters);
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {

    setSelectedFilters(filtersState)
  
  }, [productsCount, filtersState])

  if (Object.keys(router.query).length === 0) return;
  

  

  function RemoveFilterItem(filter, item) {

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
    dispatch(updateFilters(filters))

    router.push({
      
      pathname: '/category/' + category._id, 
      query: {
        ...queryFilters,
      }
    },
    undefined,
    { shallow: true },
    )

    getProductsByFilters(queryFilters)
    
  } 

  async function getProductsByFilters(queryFilters) {
    const products = await axios.post('/api/products/', {query: queryFilters, category, all: true})

    filterProducts(products.data.products);
    setProductsCount(products.data.count)
  }

  return (
    <Selected>
      <span>Selected {productsCount} products</span>
      {selectedFilters && Object.keys(selectedFilters).map(filter => (
            <span key={filter}>
              {selectedFilters[filter].map((item, i) => {
                return (
                  <Button key={item + i} $filter onClick={() => RemoveFilterItem(filter, item)}>
                    {item}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Button>
                )
              })}
            </span>
          ))}
    </Selected>
  )
}