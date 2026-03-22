import { useRef, useState } from "react";
import { Box, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import HeroSection1 from "./HeroSection1";
import HeroSection2 from "./HeroSection2";


export default function HeroCarousel({
  heroSections = [
    <HeroSection1 />,
    <HeroSection2 />
  ],
}) {
  const swiperRef = useRef(null);   //remote control
  const [activeIndex, setActiveIndex] = useState(0);    //the channel that currently at

  // Pagination click handler
  const handleBulletClick = (index) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  return (
    <Box sx={{ width: "100%", mx: "auto" }}>
      <Container disableGutters maxWidth="lg">
        {/* Carousel */}
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}   //save swiper instance in swiperRef (to use method and control swiper)
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 30000, disableOnInteraction: false }}
        >
          {heroSections.map((hero, index) => (
            <SwiperSlide key={index} style={{display: 'flex', justifyContent: 'center', padding: '8px'}}>
                <Box>
                    {hero}
                </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom pagination bullets */}
        <Box
          className="custom-pagination"
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: '8px',
            mt: '20px',
          }}
        >
          {heroSections.map((_, index) => (
            <Box
              key={index}
              onClick={() => handleBulletClick(index)}
              sx={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                border: "0.5px solid #6E5044",
                backgroundColor: activeIndex === index ? "primary.brown" : "primary.main",
                transition: "all 0.3s",
                cursor: "pointer",
              }}
            ></Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
