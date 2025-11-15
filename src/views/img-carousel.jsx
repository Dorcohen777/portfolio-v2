import { useEffect, useState } from 'react'
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs'

import trell1 from '../assets/imgs/trelluxe/trell1.png'
import trell2 from '../assets/imgs/trelluxe/trell2.png'
import trell3 from '../assets/imgs/trelluxe/trell3.png'

import cripto1 from '../assets/imgs/cripto/cripto1.png'
import cripto2 from '../assets/imgs/cripto/cripto2.png'
import cripto3 from '../assets/imgs/cripto/cripto3.png'

import amazonlp1 from '../assets/imgs/amazonlp/amazonlp1.png'
import amazonlp2 from '../assets/imgs/amazonlp/amazonlp2.png'

import amazon1 from '../assets/imgs/amazon/amazon1.png'
import amazon2 from '../assets/imgs/amazon/amazon2.png'

import appsus1 from '../assets/imgs/appsus/appsus1.png'
import appsus2 from '../assets/imgs/appsus/appsus2.png'
import appsus3 from '../assets/imgs/appsus/appsus3.jpg'

import cemex1 from '../assets/imgs/cemex/cemex1.png'

import medtonru1 from '../assets/imgs/medtonru/medtonru1.png'
import medtonru2 from '../assets/imgs/medtonru/medtonru2.png'

import medtonk1 from '../assets/imgs/medtonk/medtonk1.png'
import medtonk2 from '../assets/imgs/medtonk/medtonk2.png'
import medtonk3 from '../assets/imgs/medtonk/medtonk3.png'

import mine1 from '../assets/imgs/mine/mine1.png'

import trade1 from '../assets/imgs/tradesmart/trade1.png'
import trade2 from '../assets/imgs/tradesmart/trade2.jpg'
import trade3 from '../assets/imgs/tradesmart/trade3.png'

import seekapa1 from '../assets/imgs/seekapa/seekapa1.png'
import seekapa2 from '../assets/imgs/seekapa/seekapa2.png'
import seekapa3 from '../assets/imgs/seekapa/seekapa3.png'

import hex0 from '../assets/imgs/hexlyn/hex0.png'
import hex1 from '../assets/imgs/hexlyn/hex1.png'
import hex2 from '../assets/imgs/hexlyn/hex2.png'

import tra1 from '../assets/imgs/trader_academy/tra1.png'
import tra2 from '../assets/imgs/trader_academy/tra2.png'
import tra3 from '../assets/imgs/trader_academy/tra3.png'
import tra4 from '../assets/imgs/trader_academy/tra4.png'
import tra5 from '../assets/imgs/trader_academy/tra5.png'

import trackflare1 from '../assets/imgs/trackflare/trackflare1.png'
import trackflare2 from '../assets/imgs/trackflare/trackflare2.png'
import trackflare3 from '../assets/imgs/trackflare/trackflare3.png'

import shadcnIcon from '../assets/imgs/icons/shadcn.png'
import mongooseIcon from '../assets/imgs/icons/mongoose.png'

export function ImgCarousel({ img }) {
   const [slide, setSlide] = useState(0);
   const [currImage, setCurrImage] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   
   // Check if this is a mobile app project (trader academy)
   const isMobileApp = img.some(imgName => imgName.startsWith('tra'));

   useEffect(() => {
      setIsLoading(true);
      switch (img[slide]) {
         case 'trell1':
            setCurrImage(trell1);
            break;
         case 'trell2':
            setCurrImage(trell2);
            break;
         case 'trell3':
            setCurrImage(trell3);
            break;
         case 'cripto1':
            setCurrImage(cripto1);
            break;
         case 'cripto2':
            setCurrImage(cripto2);
            break;
         case 'cripto3':
            setCurrImage(cripto3);
            break;
         case 'amazonlp1':
            setCurrImage(amazonlp1);
            break;
         case 'amazonlp2':
            setCurrImage(amazonlp2);
            break;
         case 'amazon1':
            setCurrImage(amazon1);
            break;
         case 'amazon2':
            setCurrImage(amazon2);
            break;
         case 'appsus1':
            setCurrImage(appsus1);
            break;
         case 'appsus2':
            setCurrImage(appsus2);
            break;
         case 'appsus3':
            setCurrImage(appsus3);
            break;
         case 'cemex1':
            setCurrImage(cemex1);
            break;
         case 'medtonru1':
            setCurrImage(medtonru1);
            break;
         case 'medtonru2':
            setCurrImage(medtonru2);
            break;
         case 'medtonk1':
            setCurrImage(medtonk1);
            break;
         case 'medtonk2':
            setCurrImage(medtonk2);
            break;
         case 'medtonk3':
            setCurrImage(medtonk3);
            break;
         case 'mine1':
            setCurrImage(mine1);
            break;
         case 'trade1':
            setCurrImage(trade1);
            break;
         case 'trade2':
            setCurrImage(trade2);
            break;
         case 'trade3':
            setCurrImage(trade3);
            break;
         case 'seekapa1':
            setCurrImage(seekapa1);
            break;
         case 'seekapa2':
            setCurrImage(seekapa2);
            break;
         case 'seekapa3':
            setCurrImage(seekapa3);
            break;
         case 'hex0':
            setCurrImage(hex0);
            break;
         case 'hex1':
            setCurrImage(hex1);
            break;
         case 'hex2':
            setCurrImage(hex2);
            break;
         case 'tra1':
            setCurrImage(tra1);
            break;
         case 'tra2':
            setCurrImage(tra2);
            break;
         case 'tra3':
            setCurrImage(tra3);
            break;
         case 'tra4':
            setCurrImage(tra4);
            break;
         case 'tra5':
            setCurrImage(tra5);
            break;
         case 'trackflare1':
            setCurrImage(trackflare1);
            break;
         case 'trackflare2':
            setCurrImage(trackflare2);
            break;
         case 'trackflare3':
            setCurrImage(trackflare3);
            break;
         default:
            setCurrImage(null);
            break;
      }
      // Simulate image loading
      setTimeout(() => setIsLoading(false), 300);
   }, [img, slide]);

   const nextSlide = () => {
      setSlide((slide + 1) % img.length);
   };

   const prevSlide = () => {
      setSlide((slide - 1 + img.length) % img.length);
   };

   return (
      <section className={`carousel-container ${isMobileApp ? 'mobile-app-carousel' : ''}`}>
         <BsArrowLeftCircleFill
            className="arrow arrow-left"
            onClick={prevSlide}
            aria-label="Previous slide"
         />
         
         {img.map((_, idx) => (
            <div key={idx} className={slide === idx ? 'slide' : 'slide-hidden'}>
               {isLoading && <div className="loading-spinner" />}
               <img
                  src={currImage}
                  alt={`Slide ${idx + 1}`}
                  className={slide === idx ? `slide ${isMobileApp ? 'mobile-app-image' : ''}` : 'slide-hidden'}
                  style={{ opacity: isLoading ? 0 : 1 }}
                  onLoad={() => setIsLoading(false)}
               />
            </div>
         ))}

         <BsArrowRightCircleFill
            className="arrow arrow-right"
            onClick={nextSlide}
            aria-label="Next slide"
         />

         <div className="slide-counter">
            {slide + 1} / {img.length}
         </div>

         <div className="indicators">
            {img.map((_, idx) => (
               <button
                  key={idx}
                  className={`indicator ${slide === idx ? 'active' : ''}`}
                  onClick={() => setSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
               />
            ))}
         </div>
      </section>
   );
}

export { shadcnIcon, mongooseIcon }