import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { FreeMode, Autoplay, Navigation } from "swiper";
import "./Carousel.scss";
import { CardData } from "../../contants/CardData";
const Carousel = () => {
  const [pic, setPic] = useState(CardData[2].imgurl);
  const [cardData, setCardData] = useState(CardData);

  const handleCardStatus = (id, type) => {
    const cardDataCopy = cardData.map((card) => ({ ...card, active: false }));
    if (type !== "hover") {
      if (id >= 6) {
        cardDataCopy[id - 6].active = true;
      } else {
        cardDataCopy[id].active = true;
      }
    } else {
      cardDataCopy[id].active = true;
    }
    setCardData(cardDataCopy);
  };

  useEffect(() => {
    const index = cardData.findIndex((item) => item.active);
    if (index !== -1) {
      setPic(cardData[index].imgurl);
    }
  }, [cardData]);

  return (
    <div className="mainContainer">
      <div className="back-image-slider">
        <img src={pic} alt="" />
      </div>
      <div className="upper-slider-container">
        <Swiper
          slidesPerView={5}
          spaceBetween={2}
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={false}
          modules={[FreeMode, Autoplay, Navigation]}
          className="mySwiper"
          onSlideChange={(e) => {
            handleCardStatus(e.activeIndex);
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 2,
            },
            475: {
              slidesPerView: 1,
              spaceBetween: 2,
            },

            768: {
              slidesPerView: 3,
              spaceBetween: 2,
            },
            // 1024: {
            //   slidesPerView: 5,
            //   spaceBetween: 2,
            // },
          }}
        >
          {cardData.map((card) => (
            <SwiperSlide key={card.id}>
              <div
                className={card.active ? "box box-active" : "box"}
                onMouseEnter={() => handleCardStatus(card.id, "hover")}
              >
                <div className="parent">
                  <div
                    className={
                      card.active ? "headers headers-active" : "headers"
                    }
                  >
                    <h3>{card.heading}</h3>
                  </div>
                  <div
                    className={
                      card.active ? "content content-active" : "content"
                    }
                  >
                    <p>{card.description}</p>
                  </div>
                  <div
                    className={
                      card.active
                        ? "learn-more learn-more-active"
                        : "learn-more"
                    }
                  >
                    <button>{card.learnM}</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
