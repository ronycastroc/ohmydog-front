import { useEffect, useState } from "react";
import styled from "styled-components";
import { getDogFact, getDogPic } from "../../services";


export const CardFacts = () => {
  const [dogPic, setDogPic] = useState();
  const [dogFact, setDogFact] = useState();

  const getPicsFacts = async () => {
    try {      
      const pictures = await getDogPic();
      const facts = await getDogFact();

      setDogPic(pictures.message);
      setDogFact(facts.facts[0]);        
    } catch (error) {
      console.log(error.message);
    }
  };
    
  useEffect(() => {
    getPicsFacts();
    const intervalId = setInterval(() => {
      getPicsFacts();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Wrapper>
      <img src={dogPic} alt="dog-picture" />
      <h1>Did you know?</h1>
      <p>{dogFact}</p>
    </Wrapper>
  );
};


const Wrapper = styled.div`
  background-color: var(--white-color);
  width: 25vw;
  max-height: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 50px;

  h1 {
    font-weight: 700;
    font-size: 1.2rem;
    padding-top: 20px;
    padding-left: 20px;
    color: var(--dark-color);
  }

  p {
    padding: 15px 20px;
    color: var(--dark-color);
    font-size: 1.1rem;
  }

  img {
    width: 22vw;
    height: 45vh;
    object-fit: cover;
    border-radius: 10px;
    margin: 0 auto;
    margin-top: 20px;    
  }
`;
