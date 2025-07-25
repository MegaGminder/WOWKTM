import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Thumbs, FreeMode, EffectCoverflow } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import 'swiper/css/free-mode';
import 'swiper/css/effect-coverflow';

interface ProductImageGalleryProps {
  images: Array<{
    src: string;
    alt: string;
    thumb?: string;
  }>;
  className?: string;
  showThumbs?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
  effect?: 'slide' | 'coverflow';
  autoplay?: boolean;
  centeredSlides?: boolean;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  className = '',
  showThumbs = true,
  showNavigation = true,
  showPagination = true,
  effect = 'slide',
  autoplay = false,
  centeredSlides = false,
}) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const mainSwiperRef = useRef<SwiperType | null>(null);

  const swiperModules = [Navigation, Pagination, Thumbs, FreeMode];
  if (effect === 'coverflow') {
    swiperModules.push(EffectCoverflow);
  }

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleThumbnailClick = (index: number) => {
    if (mainSwiperRef.current) {
      mainSwiperRef.current.slideTo(index);
    }
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-gray-100 flex items-center justify-center rounded-lg">
        <div className="text-center text-gray-400">
          <svg className="mx-auto w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`product-image-gallery ${className}`}>
      {/* Main Image Swiper */}
      <div className="relative">
        <Swiper
          onSwiper={(swiper) => {
            mainSwiperRef.current = swiper;
          }}
          modules={swiperModules}
          spaceBetween={10}
          slidesPerView={1}
          navigation={showNavigation}
          pagination={showPagination ? { clickable: true } : false}
          thumbs={showThumbs ? { swiper: thumbsSwiper } : undefined}
          onSlideChange={handleSlideChange}
          className="main-swiper aspect-square rounded-lg overflow-hidden"
          effect={effect}
          centeredSlides={centeredSlides}
          coverflowEffect={
            effect === 'coverflow'
              ? {
                  rotate: 50,
                  stretch: 0,
                  depth: 100,
                  modifier: 1,
                  slideShadows: true,
                }
              : undefined
          }
          autoplay={
            autoplay
              ? {
                  delay: 3000,
                  disableOnInteraction: false,
                }
              : false
          }
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full bg-gray-100">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
                
                {/* Image counter for mobile */}
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs md:hidden">
                  {activeIndex + 1} / {images.length}
                </div>

                {/* Zoom indicator */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        {showNavigation && images.length > 1 && (
          <>
            <button
              onClick={() => mainSwiperRef.current?.slidePrev()}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 hidden md:flex items-center justify-center"
              aria-label="Previous image"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => mainSwiperRef.current?.slideNext()}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 hidden md:flex items-center justify-center"
              aria-label="Next image"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Swiper */}
      {showThumbs && images.length > 1 && (
        <div className="mt-4 hidden md:block">
          <Swiper
            onSwiper={setThumbsSwiper}
            modules={[FreeMode, Thumbs]}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            className="thumb-swiper"
            breakpoints={{
              640: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 5,
              },
              1024: {
                slidesPerView: 6,
              },
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <button
                  onClick={() => handleThumbnailClick(index)}
                  className={`w-full aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    index === activeIndex
                      ? 'border-wowktm-primary shadow-lg'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image.thumb || image.src}
                    alt={`${image.alt} thumbnail`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Mobile dots indicator */}
      {images.length > 1 && (
        <div className="flex justify-center mt-4 md:hidden">
          <div className="flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === activeIndex ? 'bg-wowktm-primary' : 'bg-gray-300'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
