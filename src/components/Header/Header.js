import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import UserContext from "../../contexts/UserContext";

export const Header = () => {
  const { showLogout, setShowLogout } = useContext(UserContext);

  const auth = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();

  const logout = () => {
    setShowLogout(false);
    localStorage.clear();
    navigate("/");
  };
  return (
    <Wrapper>
      <div className="pages">
        <Link to="/adopt-dog">
          AdoptDog
        </Link>
        <h2></h2>
      </div>
      <div className="pages">
        <Link to="/posts-mydog">
          PostsMyDog
        </Link>
      </div>
      <div className="pages">
        <Link to="/be-a-supporter">
          Be a Supporter
        </Link>
      </div>
      <div className="pages">
        <Link to="/stories">
          Stories
        </Link>
      </div>
      <div>
        {auth ?
          (<p onClick={() => setShowLogout(!showLogout)}>Hello, {user?.name} </p>) :
          (<Link to="/auth/sign-in">
            Login
          </Link>)}
      </div>

      <LogoutBar showLogout={showLogout} onClick={logout}>
        <p>Logout</p>
      </LogoutBar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 45px;
  background-color: var(--dark-color);
  border-bottom-left-radius: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 3;
  opacity: 0.9;

  a {
    color: var(--white-color);
    font-size: 1.1rem;
    font-weight: 500;
    text-decoration: none;
    transition: all linear .2s;

    &:hover {
      text-shadow: 3px 5px 6px #000000;
    }
  }

  p {
    color: var(--button-color);
    font-size: 1.1rem;
    font-weight: 500;
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translate(0, -50%);
    transition: all linear .2s;

    &:hover {
      text-shadow: 3px 5px 6px #000000;
    }
  }
`;

const LogoutBar = styled.div`
  width: 120px;
  height: 45px;
  background-color: var(--dark-color);
  top: 45px;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 50px;
  position: fixed;
  transition: all ease .5s;
  transform: ${(props) => (props.showLogout ? "translateX(0)" : "translateX(150px)")};    
  cursor: pointer;
  z-index: 3;

  p {
    color: var(--white-color);
  }
`;