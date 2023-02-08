import { useEffect, useState } from "react";
import { MdMale, MdFemale } from "react-icons/md";
import { BsPencilFill, BsTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AdoptCard, Button, Logo } from "../../components";
import { getDogs } from "../../services";

export const AdoptDog = () => {
  const [dogs, setDogs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const getDogsFunc = async () => {
    try {
      const response = await getDogs();

      setDogs(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDogsFunc();
  }, []);


  return (
    <>
      <Logo />
      
      <Wrapper>
        <Dogs>
          {dogs.map((value, index) => (
            <Dog key={index}>
              <img src={value.urlImage} alt="dog-image" />
              {user?.accountType === "Supporter" ? 
                (<div className="div-icons">
                  <BsPencilFill className="icon"/>
                  <BsTrashFill className="icon"/>
                </div>) : ("")}
              <h1>{value.name}</h1>
              <h2>{value.age}</h2>
              {value.genre === "Male" ? (<MdMale className="io-male" />) : (<MdFemale className="io-female" />)}
              <p>{value.description}</p>

              <div onClick={() => {
                navigate(`/adopt-dog/${value.id}`);
              }}>
                <Button>
                  I Want To Adopt
                </Button>
              </div>
            </Dog>
          ))}
        </Dogs>

        <AdoptCard />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
display: flex;
justify-content: space-around;
`;

const Dogs = styled.div`
  width: 60vw;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  column-gap: 20px;
`;

const Dog = styled.div`
  background-color: var(--white-color);
  width: 270px;
  margin-bottom: 30px;
  border-radius: 10px;
  position: relative;

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  .div-icons {
    position: absolute;
    top: 5px;
    right: 5px;
  }

  .icon {
    color: var(--white-color);
    margin-left: 5px;
    cursor: pointer;
  }

  h1 {
    margin-top: 10px;
    margin-left: 10px;
    font-weight: 700;
  }

  h2 {
    margin-left: 10px;
  }

  p {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .io-male {
    font-size: 2rem;
    position: absolute;
    top: 260px;
    right: 15px;
    color: blue;
  }

  .io-female {
    font-size: 2rem;
    position: absolute;
    top: 260px;
    right: 15px;
    color: #e520f2;
  }  
`;


