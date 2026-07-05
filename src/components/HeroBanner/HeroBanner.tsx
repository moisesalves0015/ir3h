import { useState, useEffect, useRef } from 'react';
import './HeroBanner.css';
import { ChevronRight } from 'lucide-react';
import { heroBanners } from '../../data/mockData';

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % heroBanners.length);
    }, 3500);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrent(idx);
    startTimer();
  };

  return (
    <div className="hero">
      <div
        className="hero__track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {heroBanners.map(banner => (
          <div key={banner.id} className="hero__slide">
            <img src={banner.image} alt={banner.label} className="hero__img" />
            <div className="hero__overlay" style={{ background: banner.bgGradient.replace('linear-gradient', 'linear-gradient') + '99' }}>
              <p className="hero__label">{banner.label}</p>
              <button className="hero__cta">
                Ver Ofertas <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hero__dots">
        {heroBanners.map((_, i) => (
          <button
            key={i}
            className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Banner ${i + 1}`}
          />
        ))}
      </div>

      <div className="hero__counter">
        {current + 1}/{heroBanners.length}
      </div>
    </div>
  );
}
