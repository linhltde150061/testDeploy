import React from "react";
import { Paper } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function SwiperLogin({ dataImage }) {
  console.log("dataImage", dataImage);
  return (
    <>
      <Swiper
        style={{ height: "100%" }}
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}>
        {dataImage?.map((item) => (
          <SwiperSlide>
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={item}
              alt={item}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
