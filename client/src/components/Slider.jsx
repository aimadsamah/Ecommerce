import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons"
import { useState } from "react"
import styled from "styled-components"
import {sliderItems} from "../data"
import { mobile } from "../responsive"
import { useEffect } from "react"; // Add useEffect import
import { Link } from "react-router-dom"


const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;
    ${mobile({display:"none"})}
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #fff7f7;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: ${ props=> props.direction === "left" && "10px"};
    right: ${ props=> props.direction === "right" && "10px"};

    margin: auto;
    opacity: 0.5;
    z-index: 2;
`

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
    display: flex;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: #${props=>props.bg};
`
const ImgContainer = styled.div`
    flex:1;
    height: 100%;
    align-items: center;
    justify-content: center;
    display: flex;
`;

const Image = styled.img`
    height: 80%;
`;

const InfoContainer = styled.div`
    flex:1;
    padding: 50px;
`;

const Title = styled.h1`
    font-size: 70px;
`;

const Desc = styled.p`
    margin: 50px 0px;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  border: 2px solid white;
  color: lightgray;
  transition: all 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
  }
`;


const Slider = () => {

    const [slideIndex, setSlideIndex] = useState(0);
    const handleClick= (direction) =>{

        if(direction=== "left"){
            setSlideIndex((prevIndex)=>(prevIndex > 0 ? prevIndex-1 : 2))
        } else {
            setSlideIndex((prevIndex)=>(prevIndex < 2 ? prevIndex+1 : 0))
        }
    };

    // Auto slide transition effect
    useEffect(() => {
        const interval = setInterval(() => {
            setSlideIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : 0));
        }, 4000); // Change the interval duration here (2 seconds)

        return () => clearInterval(interval); // Cleanup function to clear interval on component unmount
    }, []); // Empty dependency array ensures the effect runs only once on component mount

  return (
    <Container>
        <Arrow direction= "left" onClick={()=>handleClick("left")}>
            <ArrowLeftOutlined />
        </Arrow>

        <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item)=>(
            <Slide bg={item.bg} key={item.id}>
                <ImgContainer>
                    <Image src={item.img} />
                </ImgContainer>
                <InfoContainer>
                    <Title>{item.title}</Title>
                    <Desc>{item.desc}</Desc>
                    <Button><Link className="link" to="/productlist">SHOP NOW</Link></Button>
                </InfoContainer>
            </Slide>
        ))};
            

        </Wrapper>

        <Arrow direction= "right" onClick={()=>handleClick("right")}>
            <ArrowRightOutlined />
        </Arrow>
    </Container>
  )
}

export default Slider
