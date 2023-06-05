import styled from "styled-components";
import bgDayTime from "../assets/mobile/bg-image-daytime.jpg";
import bgNightTime from "../assets/mobile/bg-image-nighttime.jpg";
import bgDayTimeDesktop from "../assets/desktop/bg-image-daytime.jpg";
import bgNightTimeDesktop from "../assets/desktop/bg-image-nighttime.jpg";
import sunIcon from "../assets/desktop/icon-sun.svg";
import moonIcon from "../assets/desktop/icon-moon.svg";
import arrowUpIcon from "../assets/desktop/icon-arrow-up.svg"
import { useState } from "react";

export default function Clock(props: ClockPropsType) {

const [isDark , setIsDark] = useState(false);
const [additional , setAdditional] = useState(false);

const datetimeString = props.clockData?.datetime;
const datetime = datetimeString ? new Date(datetimeString) : new Date(); 
const timeOptions: Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
const formattedTime = datetime.toLocaleTimeString([], timeOptions);



// const formattedTimezone = new Date().toLocaleString('en-US', {
//   timeZone: props.clockData?.timezone,
// });

// const [city, region] = formattedTimezone.split(', ');



  return (
    <>
    <StyledContainer isDark={isDark} additional={additional}>
      <div className="relative">
        <div className="greetings" onClick={() => {
            setIsDark(!isDark)
        }}>
            <img src={isDark ? moonIcon : sunIcon} />
            <p className="morning">{isDark ? "good evening" : "good morning"}</p>
            {/* <p className="currently morning">it's currently</p> */}
        </div>
      <p className="time">{formattedTime}</p>
      {/* <p>in {city}, {region}</p> */}
      <div className="less-more">
        <p>{additional ? "less" : "more"}</p>
        <div className="arrow" onClick={() => {
          setAdditional(!additional)
        }}>
            <img src={arrowUpIcon } />
        </div>
      </div>
      </div>

        {additional ? <AdditionalInfoContainer isDark={isDark}>
      <div className="additionalInfo">
        <p className="additional">current timezone</p>
        <p className="info">{props.clockData?.timezone}</p>
      </div>
      <div className="additionalInfo">
        <p className="additional">day of the year</p>
        <p className="info">{props.clockData?.day_of_year}</p>
      </div>
      <div className="additionalInfo">
        <p className="additional">day of the week</p>
        <p className="info">{props.clockData?.day_of_week}</p>
      </div>
      <div className="additionalInfo">
        <p className="additional">week number</p>
        <p className="info">{props.clockData?.week_number}</p>
      </div>
     </AdditionalInfoContainer> : null }

    </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div<{isDark:boolean , additional:boolean}> `
  width: 100%;
  height: 100vh;
  padding:  ${(props)=> props.additional ? "100px 0 0 26px" :  "350px 0 0 26px"}  ;
  background-image: url(${props => props.isDark ? bgNightTime : bgDayTime});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  z-index: 1;
  &::after {
    content: '';
    display: block;
    width: 100%;
    height: 100vh;
    background: #272626;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
    z-index: 2;
  }
  .relative {
    position: relative;
    z-index: 3;
  }
  .greetings{
    width: 200px;
    display: flex;
    align-items: center;
    gap: 16px;
    /* background-color: black; */
  }
  .morning{
    font-weight: 400;
font-size: 15px;
line-height: 25px;
display: flex;
align-items: flex-end;
letter-spacing: 3px;
text-transform: uppercase;
color: #FFFFFF;
/* background-color: yellow; */
  }
  /* .currently{
    display: none;
  } */
  .time {
    font-weight: 700;
    font-size: 100px;
    line-height: 100px;
    letter-spacing: -2.5px;
    color: #ffffff;
    margin: 16px 0 ;
  }
  .less-more {
    width: 116px;
    height: 40px;
    background: #FFFFFF;
    border-radius: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 4px 0 18px;
     margin-bottom: 40px;
  }
  .less-more p {
    font-weight: 700;
font-size: 12px;
line-height: 14px;
letter-spacing: 3.75px;
text-transform: uppercase;
color: #000000;
mix-blend-mode: normal;
opacity: 0.5;
  }
  .arrow {
    width: 32px;
    height: 32px;
    border-radius: 50%;
   background: #303030;
  }
  .arrow img {
    width: 100%;
    transform: ${props => !props.additional && "rotate(180deg)" } ;
    transform-style: preserve-3d;
  }

  @media only screen and (min-width: 1440px){
    padding:  ${(props)=> props.additional ? "152px 0 0 64px" :  "500px 0 0 64px"}  ;
  background-image: url(${props => props.isDark ? bgNightTimeDesktop : bgDayTimeDesktop});
  .greetings{
    width: 320px;
  }
  .morning{
font-size: 18px;
line-height: 28px;
letter-spacing: 3.6px;
  }
  /* .currently{
    display: block;
  } */
  }
`;


const AdditionalInfoContainer = styled.div<{isDark:boolean}>`
  width: 100%;
  height: 256px;
  background: ${(props)=> props.isDark ? "rgba(0, 0, 0, 0.75)" :  "rgba(255, 255, 255, 0.75)"} ;
backdrop-filter:   blur(20.3871px);
display: flex;
flex-direction: column;
gap: 16px;
padding: 48px 26px 0 26px;
position: absolute;
bottom: 0;
left: 0;
z-index: 3;
.additionalInfo{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.additional{
  font-weight: 400;
font-size: 10px;
line-height: 28px;
letter-spacing: 2px;
text-transform: uppercase;
color: ${(props)=> props.isDark ? "#FFFFFF" :  "#303030"}
}
.info {
  font-weight: 700;
font-size: 20px;
line-height: 24px;
display: flex;
align-items: flex-end;
text-align: right;
color: ${(props)=> props.isDark ? "#FFFFFF" :  "#303030"} ;
}

@media only screen and (min-width: 1440px){
  
}
`