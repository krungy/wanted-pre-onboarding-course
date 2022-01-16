import {
  Career,
  Data,
  Github,
  Guide,
  Knowhow,
  Law,
  Marketer,
  Md,
  Onboarding,
  Starbucks,
  Ux,
} from '@assets/Image';
import { CarouselContent } from '@components/domain';
import styled from '@emotion/styled';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import useResize from '@hooks/useResize';
import PropTypes from 'prop-types';

const CAROUSEL_LIST = [
  {
    title: '나도 개발자 되고 싶다',
    subtitle: '프론트엔드 무료 교육과정 참여하기',
    src: Onboarding,
    alt: 'Onboarding',
  },
  {
    title: '요즘 MD가 일하는 방법',
    subtitle: '실무자가 공개하는 MD 커리어의 모든 것!',
    src: Md,
    alt: 'Md',
  },
  {
    title: '스타벅스 굿즈 좋아하세요?',
    subtitle: '사랑받는 디자인의 비밀',
    src: Starbucks,
    alt: 'Starbucks',
  },
  {
    title: '믿을 것은 데이터 뿐!',
    subtitle: '요즘 데이터팀은 어떻게 일할까?',
    src: Data,
    alt: 'Data',
  },
  {
    title: '유저 경험을 설계하라!',
    subtitle: '문제를 해결하는 프로덕트 디자인',
    src: Ux,
    alt: 'Ux',
  },
  {
    title: '리크루터 커리어 가이드',
    subtitle: '싼마이 리크루터가 되지 않기 위해',
    src: Guide,
    alt: 'Guide',
  },
  {
    title: '개발자 성장 비결 공개!',
    subtitle: '글 쓰는 개발자들의 이야기',
    src: Knowhow,
    alt: 'Knowhow',
  },
  {
    title: 'Git? GitHub?',
    subtitle: '협업 필수 도구 마스터하기',
    src: Github,
    alt: 'Github',
  },
  {
    title: '마케터를 위한 데이터',
    subtitle: '잘 나가는 마케터는 무엇이 다를까!?',
    src: Marketer,
    alt: 'Marketer',
  },
  {
    title: '아는 만큼 보인다!',
    subtitle: "노동법 '채용' 시리즈",
    src: Law,
    alt: 'Law',
  },
  {
    title: '해, 커리어 EP 02 공개',
    subtitle: '최종 발표를 위한 마지막 관문 2라운드의 승자는?',
    src: Career,
    alt: 'Career',
  },
];

CAROUSEL_LIST.unshift(CAROUSEL_LIST[CAROUSEL_LIST.length - 1]);
CAROUSEL_LIST.push(CAROUSEL_LIST[1]);

const CarouselContainer = styled.div`
  width: 100%;
  padding: 0;
  overflow: hidden;
`;

const ContentContainer = styled.div`
  display: flex;
  margin: 0 auto;
  box-sizing: border-box;
  width: ${({ width }) => width}px;
  gap: ${({ gap }) => gap}px;
`;

const Carousel = ({ carouselGap, imageWidth, ...props }) => {
  const [activeContent, setActiveContent] = useState(1);
  const initialLocation = imageWidth + carouselGap;
  const [currentLocation, setCurrentLocation] = useState(initialLocation);
  // const [cursorPointX, setCursorPointX] = useState(null);
  // const [isDrag, setIsDrag] = useState(false);

  const carouselRef = useRef(null);
  const windowWidth = useResize();
  const totalContent = CAROUSEL_LIST.length;
  const fullWidth =
    imageWidth * totalContent + (totalContent - 1) * carouselGap;
  const lastContentWidth =
    imageWidth * (totalContent - 2) + (totalContent - 2) * carouselGap;

  const moveCarousel = useCallback(
    (duration) => {
      carouselRef.current.style.transitionDuration = `${duration}ms`;
      carouselRef.current.style.transform = `translateX(-${currentLocation}px)`;
    },
    [currentLocation],
  );

  const handleNextContent = () => {
    return activeContent >= totalContent - 2
      ? (setCurrentLocation(initialLocation), setActiveContent(1))
      : (setCurrentLocation(
          (prevLocation) => (prevLocation += imageWidth + carouselGap),
        ),
        setActiveContent((prevContent) => prevContent + 1));
  };

  const handlePrevContent = () => {
    return activeContent > 1
      ? (setCurrentLocation(
          (prevLocation) => (prevLocation -= imageWidth + carouselGap),
        ),
        setActiveContent((prevContent) => prevContent - 1))
      : (setCurrentLocation(lastContentWidth),
        setActiveContent(totalContent - 2));
  };

  useEffect(() => {
    moveCarousel(300);
  }, [moveCarousel]);

  const handleCarouselList = (list) =>
    list.map(({ src, alt, title, subtitle }, index) => (
      <CarouselContent
        src={src}
        alt={alt}
        title={title}
        subtitle={subtitle}
        width={imageWidth}
        isActive={activeContent === index}
        key={index}
      />
    ));

  const initialStyle = {
    paddingLeft: Math.ceil(windowWidth / 2 - imageWidth / 2),
    boxSizing: 'content-box',
  };

  return (
    <CarouselContainer style={{ ...props.style }}>
      <ContentContainer
        gap={carouselGap}
        ref={carouselRef}
        width={fullWidth}
        style={{ ...initialStyle }}
      >
        {handleCarouselList(CAROUSEL_LIST)}
      </ContentContainer>
      <button onClick={handlePrevContent}>prev</button>
      <button onClick={handleNextContent}>next</button>
    </CarouselContainer>
  );
};

Carousel.propTypes = {
  carouselGap: PropTypes.number,
  imageWidth: PropTypes.number,
};

Carousel.defaultProps = {
  carouselGap: 20,
  imageWidth: 1060,
};

export default Carousel;