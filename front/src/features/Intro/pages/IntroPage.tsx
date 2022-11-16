import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  background-color: #232323;
  font-family: 'NeoDunggeunmo';

  .Intro {
    position: relative;
    width: 100%;
    height: 100%;
    .introImg {
      position: relative;
      height: 100vh;
      width: 100%;
      filter: blur(3px);
    }
    .introWrapper {
      position: absolute;
      top: 50%;
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
      text-shadow: -5px 0 #000000, 0 5px #000000, 5px 0 #000000, 0 5px #000000;
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
      color: #ffffff;
      font-size: 30px;
      font-weight: 700;
    }
    .goOffice {
      color: #232323;
      text-shadow: -1px 0 #ffffff, 0 1px #ffffff, 1px 0 #ffffff, 0 -1px #ffffff;
      font-size: 24px;
      cursor: pointer;
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
      :hover {
        cursor: pointer;
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
  }

  .inner {
    max-width: 1100px;
    height: 100%;
    margin: 0 auto;
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

    .title {
      font-size: 36px;
      margin-bottom: 1rem;
    }
    .content {
      font-size: 50px;
    }
  }
  .fix_motion .fix_wrap {
    position: relative;
  }
  .fix_motion .fix_wrap:after {
    clear: both;
    display: block;
    content: '';
  }
  .fix_motion .fix_wrap .textBox {
    float: left;
    width: 50%;
    padding-top: 300px;
  }
  .fix_motion .fix_wrap .textBox div {
    color: #333;
    transition: color 0.5s;
  }
  .fix_motion .fix_wrap .textBox div.active {
    color: #fff;
  }
  .fix_motion .fix_wrap .textBox div.txt02 {
    margin-top: 400px;
  }
  .fix_motion .fix_wrap .textBox div.txt03 {
    margin-top: 400px;
  }
  .fix_motion .fix_wrap .textBox div.txt04 {
    margin-top: 400px;
    margin-bottom: 500px;
  }
  .fix_motion .fix_wrap .imgFix {
    position: sticky;
    position: -webkit-sticky;
    top: calc(50vh - 200px);
    left: 0;
    z-index: 40;
    float: left;
    width: 50%;
    height: 100%;
  }
  .fix_motion .fix_wrap .imgFix .officeImg {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .fix_motion .fix_wrap .imgFix .officeImg .imgOffice {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    opacity: 0;
    transform: translateY(-40px);
    transition: opacity 0.5s, transform 0.5s;
  }
  .fix_motion .fix_wrap .imgFix .imgOffice2 {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    opacity: 0;
    transform: translateY(-40px);
    transition: opacity 0.5s, transform 0.5s;
    .img {
      transition: transform 0.5s ease;
    }
  }
  .fix_motion .fix_wrap .imgFix .imgOffice3 {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 50;
    opacity: 0;
    transform: translateY(-40px);
    transition: opacity 0.5s, transform 0.5s;
    .img {
      transition: transform 0.5s ease;
    }
  }
  .fix_motion .fix_wrap .imgFix .imgOffice4 {
    position: absolute;
    left: -5rem;
    top: -5rem;
    right: 0;
    bottom: 0;
    z-index: 50;
    opacity: 0;
    transform: translateY(-40px);
    transition: opacity 0.5s, transform 0.5s;
    .img {
      transition: transform 0.5s ease;
    }
  }
  .fix_motion .fix_wrap .active .officeImg .imgOffice {
    opacity: 1;
    transform: translateY(0px);
    transition-delay: 0.1s;
  }
  .fix_motion .fix_wrap .active .officeImg .imgOffice .active {
    opacity: 0;
  }
  .fix_motion .fix_wrap .active .active {
    opacity: 1;
    transform: translateY(0px);
    transition-delay: 0.1s;
  }
  .lastTitle {
    margin-top: 5rem;
    font-size: 50px;
    color: #fff;
    text-align: end;
    margin-right: 20%;
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
    if (percent >= 0 && percent < 29) {
      txt01ref.current?.classList.add('active');
      officeImgRef.current?.classList.remove('active');
      officeImg2Ref.current?.classList.remove('active');
      officeImg3Ref.current?.classList.remove('active');
    } else if (percent >= 29 && percent < 60) {
      txt02ref.current?.classList.add('active');
      officeImgRef.current?.classList.add('active');
      officeImg2Ref.current?.classList.add('active');
    } else if (percent >= 60 && percent < 80) {
      txt03ref.current?.classList.add('active');
      officeImg2Ref.current?.classList.remove('active');
      officeImg3Ref.current?.classList.add('active');
      officeImg4Ref.current?.classList.remove('active');
    } else if (percent >= 80 && percent < 100) {
      txt04ref.current?.classList.add('active');
      officeImg3Ref.current?.classList.remove('active');
      officeImg4Ref.current?.classList.add('active');
    } else if (percent >= 100) {
      officeImg4Ref.current?.classList.remove('active');
    } else if (percent < 0) {
      txt01ref.current?.classList.remove('active');
      txt02ref.current?.classList.remove('active');
      txt03ref.current?.classList.remove('active');
      txt04ref.current?.classList.remove('active');
    }
  };

  const scrollFunc = () => {
    setProperty();
    contentIn();
    moveSection();
  };

  useEffect(() => {
    scrollFunc();
  }, []);

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
        <img src="/img/Intro/Intro1.jpg" alt="Intro" className="introImg" />
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
          <div className="goOffice" onClick={goLogin}>
            Go Office
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
          <div className="textBox">
            <div ref={txt01ref}>
              <p className="title">알고리즘 배틀</p>
              <p className="content">친구와 함께 풀고</p>
            </div>
            <div ref={txt02ref} className="txt02">
              <p className="title">CS 배틀</p>
              <p className="content">퀴즈로 배우며</p>
            </div>
            <div ref={txt03ref} className="txt03">
              <p className="title">타이핑 배틀</p>
              <p className="content">
                타이핑으로 <br />
                친숙해지자!
              </p>
            </div>
            <div ref={txt04ref} className="txt04">
              <p className="content">
                역량을 강화할수록 <br />
                달라지는 내 오피스
              </p>
            </div>
          </div>
          <div ref={imgBoxRef} className="imgFix">
            <div className="officeImg">
              <figure className="imgOffice">
                <img ref={officeImgRef} src="/img/Intro/computer.png" />
                {/* <img src="/img/Intro/computer.png" /> */}
              </figure>
            </div>
            <div ref={officeImg2Ref} className="imgOffice2">
              <figure>
                <img src="/img/Intro/computer.png" />
              </figure>
            </div>
            <div ref={officeImg3Ref} className="imgOffice3">
              <figure>
                <img src="/img/Intro/computer.png" />
              </figure>
            </div>
            <div ref={officeImg4Ref} className="imgOffice4">
              <figure>
                <img src="/img/Intro/IntroRoom.png" />
              </figure>
            </div>
          </div>
        </article>
        <div className="lastTitle">화장실부터 대기업까지!</div>
        <div>
          <img src="" alt="" />
          <img src="" alt="" />
          <img src="" alt="" />
        </div>
      </div>
      <div className="introBox"></div>
      {/* <div className="introBox"></div> */}
    </Wrapper>
  );
};

export default IntroPage;
