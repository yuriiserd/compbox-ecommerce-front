import { blue, primary, primaryLight, url } from "@/lib/colors"
import { useEffect, useReducer, useRef, useState } from "react"
import ReactSlider from "react-slider"
import styled from "styled-components"
import css from "@/components/Range.module.css"

const StyledRange = styled.div`
  max-width: 200px;
  input {
    max-width: 50px;
    border: 1px solid ${primaryLight};
    padding: 0.2rem 0.4rem;
    border-radius: 0.4rem;
    &:focus {
      outline: 2px solid ${primaryLight};
    }
  }
`
const Ok = styled.input`
  color: #ffffff;
  cursor: pointer;
  margin-left: auto;
  background: ${primary};
`
const Flex = styled.div`
  display: flex;
  gap: 0.2rem;
  margin-bottom: 1rem;
`



export default function Range({range, filter}) {

  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  const [newMin, setNewMin] = useState(null);
  const [newMax, setNewMax] = useState(null);

  console.log(range, min, max, newMin, newMax)

  useEffect(() => {
    setMin(parseInt(range.split('-')[0]));
    setMax(parseInt(range.split('-')[1]));
  }, [range])

  return (
    <StyledRange>
      <Flex>
        <input 
          onChange={(event) => {
            setNewMin(parseInt(event.target.value))
          }}
          type="text" value={newMin ? newMin : min}
        />
          -
        <input 
          onChange={(event) => {
            setNewMax(parseInt(event.target.value))
          }}
          type="text" value={newMax ? newMax : max}
        />
        <Ok type="button" value="ok" onClick={() => {
          
          filter("Range", `${newMin || min}-${newMax || max}`);
        }}/>
      </Flex>
      {!!min && (
        <ReactSlider
          className={css["slider"]}
          thumbClassName={css["slider-thumb"]}
          trackClassName={css["slider-track"]}
          defaultValue={[min, max]}
          min={min}
          max={max}
          withTracks
          ariaLabel={['Lower thumb', 'Upper thumb']}
          ariaValuetext={state => `Thumb value ${state.valueNow}`}
          renderThumb={(props, state) =>  <div {...props}></div>}
          minDistance={10}
          onChange={(event) => {
            setNewMin(event[0]);
            setNewMax(event[1]);
          }}
        />
      )}
    </StyledRange>
  )
}