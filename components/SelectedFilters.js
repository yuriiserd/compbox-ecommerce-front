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

    // if (router?.query) {
    //   const filters = router?.query;
    //   delete filters.id;
    //   const readyFilters = {}
    //   Object.keys(filters).forEach(key => {
    //     if(filters[key].includes(',')) {
    //       if (key.includes('.')) {
    //         readyFilters[key.split('.')[1]] = filters[key].split(',')
    //       } else {
    //         readyFilters[key] = filters[key].split(',')
    //       }
    //     } else {
    //       if (key.includes('.')) {
    //         readyFilters[key.split('.')[1]] = filters[key]
    //       } else {
    //         readyFilters[key.split('.')[1]] = filters[key].split(',')
    //       }
    //     }
    //   })
      
    // }
  
  }, [productsCount, filtersState])

  if (Object.keys(router.query).length === 0) return;
  

  

  async function removeFilterItem(filter, item) {

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

    const products = await axios.post('/api/products/', {query: queryFilters, category})
    const allProductsCount = await axios.post('/api/products/', {query: queryFilters, category, all: true})

    filterProducts(products.data);
    setProductsCount(allProductsCount.data)
    
  } 

  return (
    <Selected>
      <span>Selected {productsCount} products</span>
      {selectedFilters && Object.keys(selectedFilters).map(filter => (
            <span key={filter}>
              {selectedFilters[filter].map(item => {
                return (
                  <Button $filter onClick={() => removeFilterItem(filter, item)}>
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