import { useEffect, useRef, useState } from "react";
import config from "../core/config";
import theme from "../core/theme";
import assets from "../core/assets";
import hexToRgba from "../util/hexToRGBA";
interface HeroProps {
  scrollIndex: number;
  setScrollIndex: (index: number) => void;
  isMobile: boolean;
}
const Hero: React.FC<HeroProps> = ({
  scrollIndex,
  setScrollIndex,
  isMobile,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const heroTextRef = useRef<HTMLHeadingElement>(null);
  const heroSubTextRef = useRef<HTMLHeadingElement>(null);

  const [animate, setAnimate] = useState<boolean>(false);
  const [firstRender, setFirstRender] = useState<boolean>(true);
  const [zeros, setZeros] = useState<number>(0);

  useEffect(() => {
    setZeros((e) => e + 1);
    if (zeros > 1) {
      setFirstRender(false);
    }
    if (scrollIndex > 0) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }, [scrollIndex]);

  return (
    <>
      <style>
        {`
            @keyframes fadeInLeft {
                0% {
                    opacity: 0;
                    transform: translateX(150px);
                }
                50% {
                    opacity: 0.3;
                }
                100% {
                    opacity: 1;
                    transform: translateX(0);
                }
            }        
            .frc-landing__hero-container {
                position: fixed;
                left: 0px;
                top: 0px;
                display: flex;
                width: 100%;
                height: 100%;
                background-size: cover !important;
                background-repeat: no-repeat !important;
                background-position: center !important;
            
                display: flex;
                flex-direction: column;
                padding-left: 2rem;
                justify-content: center;
            }
            .frc-landing__hero-header-text {
                font-family: 'Oswald', sans-serif;
                color: ${theme.textColor};
                text-transform: uppercase;
                font-size: 6rem;
                margin: 0;
                line-height: 6rem;
                margin-bottom: 1rem;
                animation: fadeInLeft 1s ease-out forwards;

                text-shadow: 
                -1px -1px 0 #000,
                1px -1px 0 #000,  
                -1px  1px 0 #000,  
                1px  1px 0 #000;  

                user-select: none;
            }
            .frc-landing__hero-subheader-text {
                font-family: 'Oswald', sans-serif;
                font-weight: 400;
                color: ${theme.textColor};
                text-transform: uppercase;
                font-size: 1.2rem;
                animation: fadeInLeft 0.75s ease-out forwards;
                margin: 0;

                text-shadow: 
                -1px -1px 0 #000,
                1px -1px 0 #000,
                -1px  1px 0 #000,
                1px  1px 0 #000;

                user-select: none;
            }

            .frc-landing__hero-cta-button-wrapper {
                margin-top: 12px;
                width: 180px;
                height: 60px;
                background-color: ${hexToRgba(theme.accent, 1)};
                border: none;
                cursor: pointer;
                animation: fadeInLeft 0.5s ease-out forwards;
                border: 3px solid ${hexToRgba(theme.primary, 0.3)};

                user-select: none;
                z-index: 4;
            }
            .frc-landing__hero-cta-button {
                user-select: none;
                font-family: 'Oswald', sans-serif;
                font-weight: 400;
                color: ${theme.textColor};
                letter-spacing: 0.7px;
                font-size: 18px;
                padding-top: 2px;

                padding-bottom: 1px;
                background-image: linear-gradient(#fff 0 0);
                background-position: 0 100%;
                background-size: 0% 1px;
                background-repeat: no-repeat;
                transition: background-size 0.3s, background-position 0s 0.3s;

                text-shadow: 
                -1px -1px 0 #000,
                1px -1px 0 #000,
                -1px  1px 0 #000,
                1px  1px 0 #000;
            }
            .frc-landing__hero-cta-button-wrapper:hover .frc-landing__hero-cta-button {
                background-position: 100% 100%;
                background-size: 100% 1px;
            }

            @keyframes fadeOffScreenAnimation {
                from { 
                    opacity: 1; 
                }
                to { 
                    transform: translateX(-100vw);
                    opacity: 0;
                }
            }
            @keyframes fadeInScreenAnimation {
                from { 
                    transform: translateX(-60vw);
                    opacity: 0; 
                }
                to { 
                    opacity: 1;
                }
            }
            .fadeOffScreen {
                animation: fadeOffScreenAnimation ${
                  config.scrollAnimationTimingMs
                }ms ease-in forwards;
            }
            .fadeInScreen {
                animation: fadeInScreenAnimation ${
                  config.scrollAnimationTimingMs
                }ms ease-out forwards;
            }
            .frc-landing__hero-overlay {
              position: absolute;
              top: 0;
              right: 0;
              bottom: 0;
              left: 0;
              z-index: 3;
              overflow: hidden;
              transition: opacity ${config.scrollAnimationTimingMs}ms linear;
              background: linear-gradient(225deg, rgba(200, 200, 200, 0) 0%, rgba(80, 80, 80, 0) 80%);
            }
            .frc-landing__hero-overlay::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              transition: opacity ${config.scrollAnimationTimingMs}ms linear;
              opacity: 0;
          }
          
          .darkenOverlay::before {
              opacity: 1;
              background: linear-gradient(225deg, rgba(200, 200, 200, 0.8) 0%, rgba(80, 80, 80, 0.8) 80%);
          }
          
          .lightenOverlay::before {
              background: linear-gradient(225deg, rgba(200, 200, 200, 0.8) 0%, rgba(80, 80, 80, 0.8) 80%);
              transition: opacity ${
                config.scrollAnimationTimingMs
              }ms ease-in forwards;
          }

          .frc-landing__hero-container > *:not(.frc-landing__hero-overlay):not(.frc-landing__hero-cta-button-wrapper) {
            position: relative;
            z-index: 2;
          }
        `}
      </style>

      <div
        className={`frc-landing__hero-container`}
        style={isMobile ? {} : { background: `url("${assets.home.heroGif}")` }}
      >
        {isMobile && (
          <div
            style={{
              position: "fixed",
              left: "0px",
              width: "100vw",
              height: "100vh",
            }}
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            >
              <source src={assets.home.mobileBgMp4} />
              <source src={assets.home.mobileBgWebm} />
            </video>
          </div>
        )}
        <h1
          className={`frc-landing__hero-header-text ${
            animate ? "fadeOffScreen" : firstRender ? "" : "fadeInScreen"
          }`}
          ref={heroTextRef}
        >
          Race beyond
          <br />
          your limits
        </h1>
        <h3
          className={`frc-landing__hero-subheader-text ${
            animate ? "fadeOffScreen" : firstRender ? "" : "fadeInScreen"
          }`}
          ref={heroSubTextRef}
        >
          Reach new heights with 5th Round Cardio
        </h3>
        <button
          ref={buttonRef}
          className={`frc-landing__hero-cta-button-wrapper ${
            animate ? "fadeOffScreen" : firstRender ? "" : "fadeInScreen"
          }`}
          onClick={() => {
            setScrollIndex(1);
          }}
        >
          <span className="frc-landing__hero-cta-button">Shop Equipment</span>
        </button>
        <div
          className={`frc-landing__hero-overlay ${
            scrollIndex > 0
              ? "darkenOverlay"
              : firstRender
              ? ""
              : "lightenOverlay"
          }`}
        ></div>
      </div>
    </>
  );
};

export default Hero;
