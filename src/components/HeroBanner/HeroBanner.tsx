import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroBanner.css';
import { ChevronRight } from 'lucide-react';
import { heroBanners } from '../../data/mockData';

const bannerLinks = ['/categoria/credits', '/categoria/combos', '/categoria/vip'];

export default function HeroBanner() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(c => (c + 1) % heroBanners.length);
    }, 3800);
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

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const diff = Math.abs(e.touches[0].clientX - startXRef.current);
    if (diff > 8) setIsDragging(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - startXRef.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) goTo((current + 1) % heroBanners.length);
      else goTo((current - 1 + heroBanners.length) % heroBanners.length);
    }
    setIsDragging(false);
  };

  return (
    <div
      className="hero"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="banner"
      aria-label="Banners promocionais"
    >
      <div
        className="hero__track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {heroBanners.map((banner, i) => (
          <div key={banner.id} className="hero__slide" aria-hidden={i !== current}>
            <img src={banner.image} alt={banner.label} className="hero__img" />
            <div
              className="hero__overlay"
              style={{ background: `linear-gradient(to top, rgba(15,10,25,0.9) 0%, rgba(15,10,25,0.3) 60%, transparent 100%)` }}
            >
              <p className="hero__label">{banner.label}</p>
              <button
                className="hero__cta"
                onClick={() => !isDragging && navigate(bannerLinks[i] ?? '/')}
                aria-label={`Ver ofertas: ${banner.label}`}
              >
                Ver Ofertas <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="hero__dots" role="tablist" aria-label="Navegar entre banners">
        {heroBanners.map((_, i) => (
          <button
            key={i}
            role="tab"
            className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Banner ${i + 1}`}
            aria-selected={i === current}
          />
        ))}
      </div>

      <div className="hero__counter" aria-hidden="true">
        {current + 1}/{heroBanners.length}
      </div>
    </div>
  );
}
