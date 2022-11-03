import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  background-color: #232323;

  .introImg {
    position: relative;
    height: 100vh;
    width: 100%;
  }
  .inner {
    max-width: 1100px;
    height: 100%;
    margin: 0 0;
  }
  .introBox {
    position: relative;
    height: 500px;
    background-color: #232323;
  }
  .txt01 {
    max-width: 70%;
    margin: 0 auto;
    font-family: 'NotoR';
    font-size: 32px;
    color: #fff;
    text-align: center;
  }

  .fix_motion {
    background-color: #232323;
    .fix_wrap {
      position: relative;
      .textBox {
        float: left;
        width: 50%;
        padding-top: 300px;
        p {
          max-width: 80%;
          font-size: 36px;
          font-family: 'NotoM';
          color: #333;
          transition: color 0.5s;
          text-align: center;
        }
        p.active {
          color: #fff;
        }
        p.txt02 {
          margin-top: 300px;
        }
        p.txt03 {
          margin-top: 300px;
        }
        p.txt04 {
          margin-top: 300px;
          margin-bottom: 500px;
        }
      }
      .imgFix {
        position: sticky;
        position: -webkit-sticky;
        top: calc(50vh - 350px);
        left: 0;
        z-index: 40;
        float: left;
        width: 50%;
        .officeImg {
          position: relative;
          width: 240px;
          height: 409px;
          margin: 0 auto;
          .imgOffice {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 20;
          }
        }
      }
    }
    .fix_wrap:after {
      clear: both;
      display: block;
      content: '';
    }
  }
  .noCsspositionsticky {
    .fix_motion {
      .fix_wrap {
        .imgFix {
          position: relative;
          top: 600px;
        }
      }
    }
  }
`;

const IntroPage = () => {
  const fixMotionRef = useRef<HTMLDivElement>(null);
  const txt01ref = useRef<HTMLDivElement>(null);
  const txt02ref = useRef<HTMLDivElement>(null);
  const txt03ref = useRef<HTMLDivElement>(null);
  const txt04ref = useRef<HTMLDivElement>(null);
  let scrollHeight: any;
  let winScrollTop;
  let sectionOffsetTop: any;
  let sectionScrollTop;
  let scrollRealHeight;
  let scrollPercent;
  let percent: any;

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
  };

  const contentIn = () => {
    if (percent >= 0 && percent < 31) {
      txt01ref.current?.classList.add('active');
    } else if (percent >= 31 && percent < 63) {
      txt02ref.current?.classList.add('active');
    } else if (percent >= 63 && percent < 88) {
      txt03ref.current?.classList.add('active');
    } else if (percent >= 88) {
      txt04ref.current?.classList.add('active');
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

  useEffect(() => {
    console.log(percent);
  }, [percent]);

  return (
    <Wrapper>
      <div>
        <img src="/img/Intro/Intro1.jpg" alt="Intro" className="introImg" />
      </div>
      <div ref={fixMotionRef} className="fix_motion">
        <article className="fix_wrap inner">
          <div className="textBox">
            <p ref={txt01ref}>뭔데 이건</p>
            <p ref={txt02ref} className="txt02">
              이것
            </p>
            <p ref={txt03ref} className="txt03">
              저것
            </p>
            <p ref={txt04ref} className="txt04">
              일단 씀
            </p>
          </div>
          <div className="imgFix">
            <div className="officeImg">
              <figure className="imgOffice">
                <img src="/img/MyOffice/level2.png" alt="" />
              </figure>
            </div>
          </div>
        </article>
      </div>
      <div className="introBox"></div>
      <div className="introBox"></div>
    </Wrapper>
  );
};

export default IntroPage;
