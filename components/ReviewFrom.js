import { useState } from "react";
import styled from "styled-components";
import StarIcon from "./icons/StarIcon";
import Button from "./Button";
import axios from "axios";
import { red } from "@/lib/colors";
import Spinner from "./Spinner";
import { set } from "mongoose";

const StyledReview = styled.div`
  margin-bottom: 2rem;
  h3 {
    margin-bottom: 1rem;
    color: #333;
  }
  .error {
    margin-top: 1rem;
    color: ${red};
  }
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
export const Stars = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: row !important;
`

export default function ReviewForm({ productId }) {

  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [hover, setHover] = useState(0);

  const [submitted, setSubmitted] = useState(false);

  async function submitReview(e) {
    e.preventDefault();
    if (!name || !rating || !comment) {
      setError("Please fill in all fields");
      return;
    } else {
      setLoading(true);
      setError("");
      await axios.post("/api/reviews", {
        userName: name,
        rating,
        comment,
        productId
      }).then(res => {
        if (res?.status === 201) {
          setSubmitted(true);
          setLoading(false);
        }
      }).catch(err => {
        console.log(err);
        setSubmitted(false);
        setError("Something went wrong, please try again");
        setLoading(false);
      });
    }
    
  }
  if (submitted) {
    return (
      <StyledReview>
        <h3>Thank you for your review!</h3>
        <p>Your review will be posted once it has been approved by our team.</p>
      </StyledReview>
    )
  }
  
  return (
    <StyledReview>
      <div>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" onChange={(e) => setName(e.target.value)}/>
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
          <textarea id="comment" onChange={(e) => setComment(e.target.value)}></textarea>
        </div>
        {loading ? (
          <Spinner/>
        ) : (
          <Button $white type="submit" onClick={() => {
            submitReview(event);
            
          }}>Submit</Button>
        )}
        
      </div>
      {error && (
        <p className="error">{error}</p>
      )}
    </StyledReview>
  );
}