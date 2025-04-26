import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

interface AgencyPhotosImg {
  id: string;
  imgUrl: string;
}

interface Props {
  agencyPhotos: AgencyPhotosImg[];
}

function AgencyPhotos({ agencyPhotos }: Props) {
  return (
    <section className="agency-photos py-5 bg-light">
      <div className="container">
        <h2 className="text-center mb-4 fw-bold display-4">Our Works</h2>
        
        <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
                576: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                992: { slidesPerView: 4 },
                1200: { slidesPerView: 5 },
            }}
            loop={true}
            speed={3000} 
            autoplay={{
                delay: 0, 
                disableOnInteraction: false,
            }}
            navigation={{
                nextEl: '.agency-next',
                prevEl: '.agency-prev',
            }}
            className="pb-4"
        >
          {agencyPhotos.map((photo) => (
            <SwiperSlide key={photo.id}>
              <div className="agency-photo-container">
                <img 
                  src={photo.imgUrl} 
                  alt={'Agency work'} 
                  className="agency-image"
                />
                <div className="agency-overlay">
                  <div className="overlay-content">
                
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default AgencyPhotos;