import { useState } from "react";
import styled from "styled-components";
import StarIcon from "./icons/StarIcon";
import Button from "./Button";

const StyledReview = styled.div`
  margin-top: 2rem;
  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    label {
      font-weight: bold;
    }
    input, textarea {
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 0.5rem;
      font-size: 1rem;
    }
    textarea {
      resize: none;
      height: 100px;
    }
  }
  button {
    max-width: 100px;
  }
`
const Stars = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: row !important;
`

export default function ReviewForm({ productId }) {

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  
  return (
    <StyledReview>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" />
        </div>
        {/* Stars rating */}
        <div>
          <label>Rating</label>
          <Stars>
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <label key={i}>
                  
                  <input 
                    type="radio" 
                    name="rating" 
                    value={ratingValue} 
                    onClick={(e) => {
                      e.preventDefault();
                      setRating(ratingValue)
                    }}
                    style={{ display: 'none' }}
                  />
                  <div
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(0)}
                  >
                    <StarIcon 
                      fill={ratingValue <= (hover || rating) ? "#ffc107" : "none"}
                    />
                  </div>
                </label>
              );
            })}
          </Stars>
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <textarea id="comment"></textarea>
        </div>
        <Button $white type="submit">Submit</Button>
      </div>
    </StyledReview>
  );
}