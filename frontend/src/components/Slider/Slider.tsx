import React from 'react'
import { Scrollbar, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'

/* import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/pagination"
import "swiper/css/navigation" */

import styled from 'styled-components';
import { breakpoints } from 'components/Theme/config';
import { SwiperModule } from 'swiper/types';

export interface SlideProps {
  imageUri: string;
  title: string;
  details: string;
}

const StyledSwiper = styled(Swiper)`
  & .swiper-scrollbar {
    background: #fff4;
  }

  & .swiper-scrollbar-drag {
    background: ${p => p.theme.gradients.primaryGradientHorizontal}
  }

  & .styled-slide {
    padding: 2.5rem;
  }
 
  & .swiper-wrapper {
      & > div:nth-child(2n) > div {
        border-color: ${p => p.theme.colors.primary};
        & > div > div {
          color: ${p => p.theme.colors.primary};
        }
      }
    }
`



const sliderBreakpoints = {
  [breakpoints.s * 16]: {
    slidesPerView: 1,
  },
  [breakpoints.m * 16]: {
    slidesPerView: 2
  },
  [breakpoints.l * 16]: {
    slidesPerView: 3
  }
}

interface SliderProps {
  slides: React.ReactElement[];
  centeredSlides?: boolean
  nav?: boolean
  pagination?: boolean
  scrollbar?: boolean
}

const Slider: React.FC<SliderProps> = ({ slides, centeredSlides, nav = false, pagination = false, scrollbar = false }) => {
  const swiperSlides = slides.map((slide) => {
    return (
      <SwiperSlide className='styled-slide' key={slide.props.imageUri}>
        {slide}
      </SwiperSlide>
    )
  }
  )

  const modules: SwiperModule[] = []
  if (nav) modules.push(Navigation)
  if (pagination) modules.push(Pagination)
  if (scrollbar) modules.push(Scrollbar)

  return (
    <StyledSwiper
      modules={modules}
      scrollbar={scrollbar && { draggable: true, hide: false }}
      pagination={pagination && { type: 'bullets', clickable: true, dynamicBullets: true, dynamicMainBullets: 3 }}
      grabCursor
      spaceBetween={20}
      breakpoints={sliderBreakpoints}
      centeredSlides={centeredSlides}
      centerInsufficientSlides
    >
      {swiperSlides}
    </StyledSwiper>
  )
}

export default Slider