import { useRef, useState } from "react";
import { Box, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link as RouterLink } from 'react-router-dom';



export default function ImageCarousel({
  images = [
  "/newAsset/picture/imgSideSpotlight1.svg",
  "/newAsset/picture/imgSideSpotlight2.svg",
  "/newAsset/picture/imgSideSpotlight3.svg",
  "/newAsset/picture/imgSideSpotlight4.svg",
  ],
  imgWidth='240px', imgHeight='332px', gap='12px'
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
    <Box sx={{ width: "100%", maxWidth: 300, mx: "auto" }}>
      <Container disableGutters maxWidth="lg">
        {/* Carousel */}
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => (swiperRef.current = swiper)}   //save swiper instance in swiperRef (to use method and control swiper)
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          spaceBetween={20}
          slidesPerView={1}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} style={{display: 'flex', justifyContent: 'center', padding: '8px'}}>
              <Box
                component={RouterLink}
                to='/'
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: imgWidth,
                  height: imgHeight,
                  boxShadow: '4px 4px 8px 0px rgba(0, 0, 0, 0.25)'
                }}
              >
                <Box
                  component="img"
                  src={img}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
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
            mt: gap,
          }}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              onClick={() => handleBulletClick(index)}
              sx={{
                width: 10,
                height: 10,
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
