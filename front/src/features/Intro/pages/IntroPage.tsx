import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  background-color: #232323;
  font-family: 'NeoDunggeunmo';

  .lastTitle{
    height: 100vh;
  }

  .Intro {
    position: relative;
    width: 100%;
    height: 100%;
    .introImg {
      position: relative;
      height: 100vh;
      width: 100%;
      filter: brightness(50%); 
      /* filter: blur(3px); */
    }
    .introFloor{
      position: absolute;
      bottom: 0;
      height: 19%;
      width: 100%;
      z-index: 1;
      left: 0;
    }

    .introOffice{
      position: absolute;
      width: 14%;
      z-index: 1;
      right: 8%;
      bottom: 16%;
    }
    .characters{
      height: 16%;
      width: 30%;
      position: absolute;
      bottom: 16%;
      z-index: 10;
      left: 10%;

      display: flex;
    align-items: flex-end;
    }

    .goOffice {
      position: absolute;
      bottom: 20%;
      right: 23%;
      z-index: 10;
      color: #232323;
      text-shadow: -1px 0 #ffffff, 0 1px #ffffff, 1px 0 #ffffff, 0 -1px #ffffff;
      font-size: 2rem;
      
      transition: transform 0.3s;
      
      :hover{
        animation-name: scaleUp;
        animation-iteration-count: initial;
        animation-duration: 0.3s;
        z-index: 10;
        transform: scale(1.1);
        
        cursor: url('/img/cursor/hover_cursor.png'), auto;

        @keyframes scaleUp {
        0% {
          transform: scale(1);
        }
        100% {
          transform: scale(1.1);
        }
      }
      }

      display: flex;
      align-items: center;

      .arrowRight{
        width: 2rem;
        margin-left: 0.5rem;
      }


      animation-name: move_right_arrow;
      animation-duration: 0.5s;
      animation-delay: 0s;
      animation-direction: alternate;
      animation-iteration-count: infinite;
      animation-play-state: running;
      animation-timing-function: linear;
      z-index: 10;
      
      }
      @keyframes move_right_arrow {
        0% {
          transform: translateX(-10px);
        }
        100% {
          transform: translateX(0);
        }
      }
    }

  .introWrapper {
    position: absolute;
    top: 35%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
  }
    .introTitle {
      width: 50%;
    }
    .introContent {
      color: #ffffff;
      text-shadow:2px 2px 2px #000000;      
      font-size: 20px;
      font-weight: 700;
      text-align: center;
    }
    .introTextWrapper {
      margin-top: 5rem;
      margin-bottom: 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .introText {
      color: #c4c4c4;
      font-size: 1.6rem;
      font-weight: 700;

      text-shadow:2px 2px 2px #000000;
      text-align: center;
    }

    .pointerDown {
      position: absolute;
      bottom: 30px;
      left: 49%;
      width: 2rem;
      animation-name: move_arrow;
      animation-duration: 0.5s;
      animation-delay: 0s;
      animation-direction: alternate;
      animation-iteration-count: infinite;
      animation-play-state: running;
      animation-timing-function: linear;
      z-index: 10;

      :hover{
        transform: scale(1.1);
        
        cursor: url('/img/cursor/hover_cursor.png'), auto;
      }
    }
    @keyframes move_arrow {
      0% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0);
      }
    }
  

  .inner {
    max-width: 1100px;
    height: 100%;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
  }
  .introBox {
    position: relative;
    height: 500px;
    background-color: #232323;
  }
  .txt01 {
    max-width: 70%;
    margin: 0 auto;
    font-size: 32px;
    color: #fff;
    text-align: center;
  }

  .fix_motion {
    background-color: #232323;
    width: 100%;

    .title {
      font-size: 3rem;
      text-shadow: 4px 5px #6f43ff;
      margin: 0;
      margin-bottom:1rem;
    }
    .content {
      font-size: 2rem;
      line-height: 3rem;

    }
  }
  .fix_motion .fix_wrap2 {
    position: relative;
    display: flex;

    .textBox{
      float: left;
      width: 50%;
      /* padding-top: 300px; */

      .textBoxPage{
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;

        .icon{
          width: 20%;
        }
      }
    }

    &:after{
      clear: both;
      display: block;
      content: '';
    }
  }

  .imgBox{
    width: 50%;

    .imgFix{
      position: sticky;
      position: -webkit-sticky;
      top: calc(50vh - 200px);
    }

    .imgOffice{
      /* display: none; */
      margin: 0;
      width:100%;
      height:86vh;
      align-items: center;
      top: 0;

      opacity: 0;
      transform: translateY(-40px);
      transition: opacity 1s, transition 0.5s;
      display: flex;
      justify-content: center;

      /* height: 50%; */
      
      .computerImg{
        width: 100%;
        transition: transform 0.5s ease;
        height: 56%;
        z-index:5;
      }

      &.active{
        position: sticky;
        
        opacity: 1;
        transform: translateY(0px);
        /* transition-delay: 0.1s; */
      }
      

    }
  }

  .gameCap{
    /* display: none; */
    top: 26%;
    width:92%;
      /* height:86vh; */
      align-items: center;
      /* top: 0; */

      position: absolute;

      opacity: 0;
      /* transform: translateY(-40px); */
      transition: opacity 1s, transition 0.5s;
      
      img{
        width: 90%;
        transition: transform 0.5s ease;
      }
    &.active{
      
      display: flex;
      opacity: 1;
      transform: translateY(0px);
      /* transition-delay: 0.1s; */
    }
  }

  .fix_motion .fix_wrap .textBox div {
    color: #333;
    transition: color 0.5s;

    &.active{
      color: #fff;
    }

    &.infoTxt{
      /* margin-top: 400px; */
    }
    &.txt04{
      /* margin-bottom: 500px; */
    }
  }

  /* .fix_motion .fix_wrap .active .officeImg .imgOffice .active {
    display: none;
  } */

  .lastTitle {
    font-size: 50px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const IntroPage = () => {
  const navigate = useNavigate();
  const IntroImgRef = useRef<HTMLDivElement>(null);
  const fixMotionRef = useRef<HTMLDivElement>(null);
  const imgBoxRef = useRef<HTMLDivElement>(null);
  const officeImgRef = useRef<HTMLImageElement>(null);
  const officeImg2Ref = useRef<HTMLImageElement>(null);
  const officeImg3Ref = useRef<HTMLImageElement>(null);
  const officeImg4Ref = useRef<HTMLImageElement>(null);
  const csCapRef = useRef<HTMLImageElement>(null);
  const typingCapRef = useRef<HTMLImageElement>(null);
  const algorithmCapRef = useRef<HTMLImageElement>(null);
  const txt01ref = useRef<HTMLDivElement>(null);
  const txt02ref = useRef<HTMLDivElement>(null);
  const txt03ref = useRef<HTMLDivElement>(null);
  const txt04ref = useRef<HTMLDivElement>(null);
  let scrollHeight: any;
  let winScrollTop: any;
  let sectionOffsetTop: any;
  let sectionScrollTop: any;
  let scrollRealHeight;
  let scrollPercent;
  let percent: any;

  let sectionMainTop: any;
  let sectionMainBottom: any;
  let sectionIsMoving = false;
  
  const [characterIdx, setCharacterIdx] = useState<any>([0,1,2,4,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]);

  const setProperty = () => {
    if (fixMotionRef) {
      scrollHeight = fixMotionRef.current?.offsetHeight;
    }
    winScrollTop = window.pageYOffset;
    if (fixMotionRef.current?.getBoundingClientRect().top) {
      sectionOffsetTop =
        fixMotionRef.current?.getBoundingClientRect().top + winScrollTop;
    }
    sectionScrollTop = window.pageYOffset - sectionOffsetTop;
    scrollRealHeight = scrollHeight - window.innerHeight;
    scrollPercent = sectionScrollTop / scrollRealHeight;
    percent = scrollPercent * 100;

    if (IntroImgRef.current?.getBoundingClientRect().top) {
      sectionMainTop =
        IntroImgRef.current?.getBoundingClientRect().top + winScrollTop;
    }
    sectionMainBottom = sectionMainTop + IntroImgRef.current?.offsetHeight;
  };

  const moveSection = () => {
    if (winScrollTop > sectionMainTop && winScrollTop < sectionMainBottom) {
      if (!sectionIsMoving) {
        sectionIsMoving = true;
        moveStartRender();
      }
    }

    if (winScrollTop >= sectionMainTop) {
      activeCheck();
    }
  };

  const activeCheck = () => {
    // imgBoxRef.current?.classList.add('active');
  };

  const moveStartRender = () => {
    if (!IntroImgRef.current?.classList.contains('active')) {
      IntroImgRef.current?.classList.add('active');
      imgBoxRef.current?.classList.add('active');
      scrollMove(sectionMainBottom + 1);
    } else {
      IntroImgRef.current?.classList.remove('active');
      imgBoxRef.current?.classList.remove('active');
      scrollMove(sectionMainTop);
    }
  };

  const scrollMove = (moveY: any) => {
    const speed = 3;
    let vy = 0;
    let scrollY = 0;

    const loop = setInterval(() => {
      let dir = moveY > window.pageYOffset ? 1 : -1;
      vy += speed * dir;

      if (dir > 0) {
        scrollY = Math.min(moveY, window.pageYOffset + vy);
      } else {
        scrollY = Math.max(moveY, window.pageYOffset + vy);
      }

      window.scrollTo(0, scrollY);

      if (scrollY >= moveY && dir > 0) {
        sectionIsMoving = false;
        clearInterval(loop);
      } else if (scrollY <= moveY && dir < 0) {
        //업클리어
        sectionIsMoving = false;
        clearInterval(loop);
      }
    }, 10);
  };

  const contentIn = () => {
    console.log(percent);
    if (percent < -0.1) {
      txt01ref.current?.classList.remove('active');
      officeImgRef.current?.classList.remove('active');
      algorithmCapRef.current?.classList.remove('active');

    } else if (percent < 20) {
      txt01ref.current?.classList.add('active');
      officeImgRef.current?.classList.add('active');
      algorithmCapRef.current?.classList.add('active');
      
      txt02ref.current?.classList.remove('active');
      csCapRef.current?.classList.remove('active');
    } else if (percent < 40) {
      txt02ref.current?.classList.add('active');
      csCapRef.current?.classList.add('active');
      
      txt01ref.current?.classList.remove('active');
      txt03ref.current?.classList.remove('active');
      algorithmCapRef.current?.classList.remove('active');
      typingCapRef.current?.classList.remove('active');
    } else if (percent < 60) {
      txt03ref.current?.classList.add('active');
      officeImgRef.current?.classList.add('active');
      typingCapRef.current?.classList.add('active');
      
      txt02ref.current?.classList.remove('active');
      txt04ref.current?.classList.remove('active');
      officeImg4Ref.current?.classList.remove('active');
      csCapRef.current?.classList.remove('active');
    } else if (percent < 80) {
      txt04ref.current?.classList.add('active');
      officeImg4Ref.current?.classList.add('active');
      
      txt03ref.current?.classList.remove('active');
      officeImgRef.current?.classList.remove('active');
      typingCapRef.current?.classList.remove('active');
    } else if (percent >= 100) {
      txt04ref.current?.classList.remove('active');
      officeImg4Ref.current?.classList.remove('active');
    } 
  };

  const scrollFunc = () => {
    setProperty();
    contentIn();
    moveSection();
  };

  useEffect(() => {
    scrollFunc();
    let array=shuffleArray(characterIdx);
    setCharacterIdx(array);
  }, []);

  const shuffleArray = (array:any) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  useEffect(() => {
    window.addEventListener('scroll', scrollFunc);
    return () => {
      window.removeEventListener('scroll', scrollFunc);
    };
  }, []);

  const onClickArrow = () => {
    window.scrollTo({ top: 20, behavior: 'smooth' });
  };

  const goLogin = () => {
    navigate('login');
  };

  return (
    <Wrapper>
      <div className="Intro" ref={IntroImgRef}>
        <img src="/img/Intro/introBg.gif" alt="Intro" className="introImg" />
        <img src="/img/Intro/introFloor.png" alt="Intro" className="introFloor" />
        <img src="/img/Intro/introOffice.png" alt="Intro" className="introOffice" />
        
        <div className='characters'>
          <img
                        style={{ height: '100%'}}
                        src={`${process.env.REACT_APP_S3_URL}/profile/${characterIdx[0]}_walk.gif`}
                      />
          <img
                        style={{ height: '100%'}}
                        src={`${process.env.REACT_APP_S3_URL}/profile/${characterIdx[1]}_walk.gif`}
                      />
          <img
                        style={{ height: '100%'}}
                        src={`${process.env.REACT_APP_S3_URL}/profile/${characterIdx[2]}_walk.gif`}
                      />
        </div>

        <div className="goOffice" onClick={goLogin}>
          <div>
            Go to Office

          </div>
            <img
              className="arrowRight"
              src="/img/intro/arrow_right.png"
            />
          </div>

        <div className="introWrapper">


          <img
            src="/img/Intro/IntroTitle.png"
            alt="IntroTitle"
            className="introTitle"
          />
          <div className="introContent">To Be a Developer</div>
          <div className="introTextWrapper">
            <div className="introText">개발자가 되기 위한 역량,</div>
            <div className="introText">
              개츠비에서 친구와 함께 재밌게 키워봐요!
            </div>
          </div>
          
        </div>
        <img
          onClick={onClickArrow}
          className="pointerDown"
          src="/img/Pointer_Down.png"
        />
      </div>


      <div ref={fixMotionRef} className="fix_motion">
        <article className="fix_wrap inner">
        <div className="fix_wrap2">
          <div className="textBox">
            <div className="textBoxPage" ref={txt01ref}>
              <p className="title">알고리즘 배틀</p>
              <p className="content">알고리즘 함께 풀고</p>
            </div>
            <div className="textBoxPage">

              <div ref={txt02ref} className="infoTxt txt02">
                <p className="title">CS 배틀</p>
                <p className="content">퀴즈풀며 CS를 배우며</p>
              </div>
            </div>
              <div className="textBoxPage">
                <img className="icon" src="/img/Intro/computerIcon.gif"/>
              <div ref={txt03ref} className="infoTxt txt03">
                <p className="title">타이핑 배틀</p>
                <p className="content">
                  타이핑하며 언어와 친해지자!
                </p>
              </div>
            </div>
            <div className="textBoxPage">
              <div ref={txt04ref} className="infoTxt txt04">
                <p className="content">
                  역량을 강화할수록 <br />
                  추가되는 내 오피스
                </p>
              </div>
            </div>
          </div>
          <div ref={imgBoxRef} className="imgBox">

              <div ref={officeImgRef} className="imgOffice">
                  <img className='computerImg' src="/img/Intro/computer.png" />
                  {/* <img src="/img/Intro/computer.png" /> */}
                <img ref={csCapRef} className="gameCap" src="/img/Intro/gamePageCapture/cs.png" />
                <img ref={typingCapRef} className="gameCap" src="/img/Intro/gamePageCapture/typing.png" />
                <img ref={algorithmCapRef} className="gameCap" src="/img/Intro/gamePageCapture/algorithm.png" />
              </div>
              <div ref={officeImg4Ref} className="imgOffice officeRoom">
                  <img className='computerImg' src="/img/Intro/IntroRoom.png" />
              </div>
          </div>
            
          </div>
          <div className="lastTitle">
            지금부터 즐겨보세요!
          </div>
        </article>

      </div>
      {/* <div className="introBox"></div> */}
      {/* <div className="introBox"></div> */}
    </Wrapper>
  );
};

export default IntroPage;
