import { Link } from 'react-router-dom';
import { Divider, Stack, Typography, keyframes } from '@mui/material';
import type { Theme } from '../../libs/theme';
import { PATH_PROJECTS_ADD } from '../../routes';
import { useEffect, useRef, useState } from 'react';
import { S3_IMAGE_BUCKET } from '../../configs';
import BackgroundLeftPlanet from '@assets/images/backgrounds/background-landing-planet.svg';
import BackgroundRightPlanet from '@assets/images/backgrounds/background-landing-planet-right.svg';
import BackgroundRightAstronaut from '@assets/images/backgrounds/background-landing-astronaut-right.svg';
import BackgroundLeftAstronaut from '@assets/images/backgrounds/background-landing-astronaut-left.svg';
import PlanetLinkGather from '@assets/images/backgrounds/planet-link-gather.svg';
import Comet from '@assets/images/backgrounds/background-comet.svg';
import YellowComet from '@assets/images/backgrounds/background-comet-yellow.svg';
import BlinkStar from '@assets/images/backgrounds/background-blink-star.svg';
import LandingAstronaut from '@assets/images/backgrounds/background-landing-ast.svg';
import SuggestAstronaut from '@assets/images/backgrounds/background-suggest-ast.svg';
import SupermanAstronaut from '@assets/images/backgrounds/background-superman-ast.svg';

const fall = keyframes`
  0% {
    transform: translate(100%,-100%);
    width: 0%;
  }
  5% {
    transform: translate(-100%,100%);
    width: 10%;
  }
  10% {
    transform: translate(-100%,100%);
    width: 10%;
    opacity:0;
  }
  100% {
    transform: translate(-100%,100%);
    width: 10%;
    opacity:0;
  }
`;
const yellowFall = keyframes`
  0% {
    transform: translate(100%,-100%);
    width: 1%;
  }
  5% {
    transform: translate(-300%,100%);
    width: 5%;
  }
  10% {
    transform: translate(-300%,100%);
    width: 5%;
    opacity:0;
  }
  100% {
    transform: translate(-300%,100%);
    width: 5%;
    opacity:0;
  }
`;

function TypingText(props: { text: string[]; className?: string }) {
  // prop destruction
  const { text, className } = props;
  // lib hooks
  // state, ref hooks
  const [isVisible, setIsVisible] = useState(false);
  const [completed, setCompleted] = useState(text.map(() => false));
  const [currentTyped, setCurrentTyped] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  // query hooks
  // calculated values
  // effects
  useEffect(() => {
    const interval = setInterval(() => {
      if (isVisible && currentTextIndex <= text.length - 1) {
        if (count <= text[currentTextIndex].length - 1) {
          setCurrentTyped((prev) => prev + (text[currentTextIndex][count] || ' '));
          setCount((prev) => prev + 1);
        } else {
          setCompleted((prev) => prev.map((v, i) => (i === currentTextIndex ? true : v)));
          setCurrentTextIndex((prev) => prev + 1);
          setCount(0);
          setCurrentTyped('');
        }
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [count, currentTextIndex, isVisible, text]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });
    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // handlers
  return (
    <Stack direction='column' spacing='2.5vw' className={className} ref={ref}>
      {text.map((t, i) => {
        return completed[i] ? (
          <Typography
            key={t}
            variant='h3'
            css={{
              fontSize: '2.83vw',
              fontWeight: 500,
              fontFamily: 'Montserrat',
              color: '#fff',
            }}
          >
            {t}
          </Typography>
        ) : null;
      })}
      {currentTyped && (
        <Typography
          variant='h3'
          css={{
            fontSize: '2.83vw',
            fontWeight: 500,
            fontFamily: 'Montserrat',
            color: '#fff',
            '&::after': {
              content: '""',
              marginLeft: '2px',
              borderRight: '3px solid #fff',
            },
          }}
        >
          {currentTyped}
        </Typography>
      )}
    </Stack>
  );
}

function HomeScreen() {
  // prop destruction
  // lib hooks
  // state, ref hooks
  // form hook
  // query hooks
  // calculated values
  // effects
  // handlers

  return (
    <Stack direction='column' css={{ position: 'relative' }}>
      <img src={`${S3_IMAGE_BUCKET}/background-landing.png`} alt='background' css={{ aspectRatio: '1920/5989' }} />
      {Array.from({ length: 150 }).map((_, i) => (
        <BlinkStar
          key={i}
          css={{
            position: 'absolute',
            top: `${Math.random() * 30}%`,
            left: `${Math.random() * 101}%`,
            width: '1%',
            animation: `${keyframes`
            0% {
              opacity: 0;
              width:0
            }
            50% {
              opacity: 1;
              width: ${Math.random() * 0.6 + 0.1}%;
            }
            100% {
              opacity: 0;
              width:0
            }
            `} ${Math.random() * 7 + 2}s infinite`,
          }}
        />
      ))}
      <YellowComet
        css={{ position: 'absolute', top: '1%', left: '30%', width: '5%', animation: `${yellowFall} 5s infinite` }}
      />
      <Comet
        css={{ position: 'absolute', top: '4.5%', right: '50%', width: '10%', animation: `${fall} 10s infinite` }}
      />
      <BackgroundRightPlanet css={{ position: 'absolute', top: '4.5%', right: '5%', width: '40%' }} />
      <BackgroundRightAstronaut css={{ position: 'absolute', top: '4%', right: '15%', width: '20%' }} />
      <TypingText
        text={['또 삽질만 하다가 탈주한 동료들...', '지독히 외롭다...']}
        css={{ position: 'absolute', top: '3.5%', left: '10%' }}
      />
      <Comet
        css={{ position: 'absolute', top: '15%', right: '45%', width: '10%', animation: `${fall} 10s infinite` }}
      />
      <YellowComet
        css={{ position: 'absolute', top: '23%', left: '80%', width: '5%', animation: `${yellowFall} 7s infinite` }}
      />
      <BackgroundLeftPlanet css={{ position: 'absolute', top: '18%', left: '-10%', width: '47%' }} />
      <BackgroundLeftAstronaut css={{ position: 'absolute', top: '16.5%', left: '5%', width: '18%' }} />
      <TypingText
        text={['나는 동료를 구할 수 없는 걸까..?']}
        css={{ position: 'absolute', top: '17.5%', left: '55%' }}
      />
      <TypingText text={['어... 저 빛은 뭐지?']} css={{ position: 'absolute', top: '45%', left: '43%' }} />
      <PlanetLinkGather css={{ position: 'absolute', top: '53%', right: '42%', color: '#fff', width: '15%' }} />
      <Stack direction='column' spacing='11%' css={{ margin: '12% 6.25vw 13%' }}>
        <Stack direction='row' spacing='4.17vw'>
          {/* TODO: 사진으로 변경 */}
          <div css={{ border: '1px solid #000', width: '47.55vw', height: '26.77vw', flexShrink: 0 }} />
          <Stack direction='column' spacing='16px'>
            <Typography variant='h3' css={{ fontSize: '2.83vw', fontWeight: 600, fontFamily: 'Montserrat' }}>
              동료 찾기
            </Typography>
            <Typography variant='h3' css={{ fontSize: '2.83vw', fontWeight: 500, fontFamily: 'Montserrat' }}>
              나에게 딱맞는 동료를 찾고,
              <br />
              프로젝트 제안하기
            </Typography>
            <SuggestAstronaut css={{ width: '7.55vw', marginTop: '2.5vw !important' }} />
          </Stack>
        </Stack>
        <Stack direction='row' spacing='4.17vw'>
          {/* TODO: 사진으로 변경 */}
          <div css={{ border: '1px solid #000', width: '47.55vw', height: '26.77vw', flexShrink: 0 }} />
          <Stack direction='column' spacing='16px'>
            <Typography variant='h3' css={{ fontSize: '2.83vw', fontWeight: 600, fontFamily: 'Montserrat' }}>
              프로젝트 관리
            </Typography>
            <Typography variant='h3' css={{ fontSize: '2.83vw', fontWeight: 500, fontFamily: 'Montserrat' }}>
              목표를 공유하며 함께 관리하는 프로젝트
            </Typography>
          </Stack>
        </Stack>
        <Stack direction='row' spacing='4.17vw'>
          {/* TODO: 사진으로 변경 */}
          <div css={{ border: '1px solid #000', width: '47.55vw', height: '26.77vw', flexShrink: 0 }} />
          <Stack direction='column' spacing='16px' css={{ position: 'relative' }}>
            <Typography variant='h3' css={{ fontSize: '2.83vw', fontWeight: 600, fontFamily: 'Montserrat' }}>
              프로젝트 구경가기
            </Typography>
            <Typography variant='h3' css={{ fontSize: '2.83vw', fontWeight: 500, fontFamily: 'Montserrat' }}>
              다른 프로젝트는 어떻게 진행하는지 구경하기
              <Typography variant='body2' css={{ fontSize: '1.67vw', fontWeight: 500, fontFamily: 'Montserrat' }}>
                *공개 설정한 프로젝트에 한해
              </Typography>
            </Typography>
            <SupermanAstronaut css={{ width: '11vw', position: 'absolute', right: '5%', top: '-30%' }} />
          </Stack>
        </Stack>
        <Divider />
        <Stack direction='column' css={{ marginLeft: '6.25vw !important' }}>
          <Typography variant='h2' css={{ fontSize: '3.33vw', fontWeight: 600 }}>
            링크게더와 함께 하고 싶다면?
          </Typography>
          <Typography variant='h5' css={{ fontWeight: 400, margin: '1.25vw 0 2.83vw 0' }}>
            아직도 혼자 프로젝트 하세요?
            <br />
            마음이 맞는 동료와 함께 하세요!
          </Typography>
          <Link
            css={(theme: Theme) => ({
              width: '14.7vw',
              height: '3.33vw',
              backgroundColor: theme.palette.primary.main,
              borderRadius: '6px',
              color: '#fff',
              padding: '1.04vw 0',
              textAlign: 'center',
              fontSize: '1.04vw',
              fontWeight: 700,
              fontFamily: 'Noto Sans',
            })}
            to={PATH_PROJECTS_ADD}
          >
            프로젝트 생성
          </Link>
        </Stack>
      </Stack>
      <LandingAstronaut css={{ width: '28.33vw', position: 'absolute', bottom: 0, right: '10%' }} />
    </Stack>
  );
}

export { HomeScreen };
