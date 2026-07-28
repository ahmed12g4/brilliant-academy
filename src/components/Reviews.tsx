"use client";
import { useEffect, useRef } from "react";

export default function Reviews() {
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    function getVisible() {
      const w = window.innerWidth;
      if (w <= 600) return 1;
      if (w <= 900) return 2;
      return 3;
    }

    function updateSlide() {
      if (!track) return;
      const slideWidth = (track.children[0] as HTMLElement).offsetWidth;
      const gap = 20;
      const pxToMove = (slideWidth + gap) * indexRef.current;
      track.style.transform = `translateX(${pxToMove}px)`;
    }

    function goNext() {
      const total = track!.children.length;
      const visible = getVisible();
      if (indexRef.current < total - visible) indexRef.current++;
      else indexRef.current = 0;
      updateSlide();
    }

    function goPrev() {
      const total = track!.children.length;
      const visible = getVisible();
      if (indexRef.current > 0) indexRef.current--;
      else indexRef.current = total - visible;
      updateSlide();
    }

    function resetTimer() {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(goNext, 3800);
    }

    let startX = 0;
    let currentX = 0;
    let isDragging = false;

    function onTouchStart(e: TouchEvent) {
      startX = e.touches[0].clientX;
      isDragging = true;
      track!.style.transition = "none";
    }

    function onTouchMove(e: TouchEvent) {
      if (!isDragging) return;
      currentX = e.touches[0].clientX;
      const diff = currentX - startX;
      const slideWidth = (track!.children[0] as HTMLElement).offsetWidth + 20;
      const base = indexRef.current * slideWidth;
      track!.style.transform = `translateX(${base + diff}px)`;
    }

    function onTouchEnd() {
      isDragging = false;
      track!.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
      const diff = currentX - startX;
      const total = track!.children.length;
      const visible = getVisible();
      if (diff < -50 && indexRef.current < total - visible) indexRef.current++;
      else if (diff > 50 && indexRef.current > 0) indexRef.current--;
      updateSlide();
      resetTimer();
    }

    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd);

    const prevBtn = document.getElementById("baReviewPrev");
    const nextBtn = document.getElementById("baReviewNext");
    prevBtn?.addEventListener("click", () => { goPrev(); resetTimer(); });
    nextBtn?.addEventListener("click", () => { goNext(); resetTimer(); });

    window.addEventListener("resize", () => { indexRef.current = 0; updateSlide(); });
    resetTimer();

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  const reviews = [
    "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aad483b003fad4ebe5a449.jpg",
    "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aad483b3fc00e2a21f3472.jpg",
    "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aad48336702f2b73148fc6.jpg",
    "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aad483618c8dd3cb256dbb.jpg",
    "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aad484a4f76313b14f6a74.jpg",
    "https://assets.cdn.filesafe.space/lTNn7BkMGcm52L4pwJS0/media/69aad483618c8d4ef4256dbc.jpg",
  ];

  return (
    <>
      <style jsx>{`
        .ba-reviews-section { padding: 90px 5vw; background-color: transparent; font-family: 'Cairo', sans-serif; direction: rtl; position: relative; overflow: hidden; }
        .ba-reviews-container { max-width: 1200px; margin: 0 auto; background: #ffffff; border-radius: 35px; padding: 60px 40px; box-shadow: 0 15px 50px rgba(0,0,0,0.05); border: 2px solid rgba(27,43,107,0.03); position: relative; z-index: 1; }
        .ba-reviews-container::before { content: ''; position: absolute; top: -15px; right: 40px; width: 100px; height: 10px; background: linear-gradient(90deg, #8B1A3A, #be224e); border-radius: 20px; z-index: 0; }
        .ba-reviews-container::after { content: ''; position: absolute; bottom: -15px; left: 40px; width: 150px; height: 10px; background: linear-gradient(90deg, #1B2B6B, #3a4eb3); border-radius: 20px; z-index: 0; }
        .ba-reviews-header { text-align: center; margin-bottom: 40px; }
        .ba-reviews-header h2 { font-size: 38px; font-weight: 900; color: #8B1A3A; line-height: 1.4; margin-bottom: 12px; }
        .ba-reviews-header p { font-size: 18px; font-weight: 600; color: #666; }
        .ba-slider-stage { overflow: hidden; border-radius: 20px; margin-top: 20px; padding: 10px 0; position: relative; }
        .ba-track { display: flex; gap: 16px; transition: transform 0.6s cubic-bezier(0.25,1,0.5,1); cursor: grab; }
        .ba-track:active { cursor: grabbing; }
        .ba-slide { min-width: calc(33.333% - 11px); max-width: calc(33.333% - 11px); flex-shrink: 0; background: #fdfdfd; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 15px rgba(27,43,107,0.05); border: 2px solid transparent; transition: transform 0.4s ease, border-color 0.4s ease; display: flex; align-items: center; justify-content: center; padding: 8px; }
        .ba-slide:nth-child(odd) { border-bottom: 5px solid #8B1A3A; }
        .ba-slide:nth-child(even) { border-bottom: 5px solid #1B2B6B; }
        .ba-slide:hover { transform: translateY(-5px); }
        .ba-slide img { width: 100%; max-height: 380px; object-fit: contain; display: block; border-radius: 10px; }
        .ba-controls-wrapper { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 35px; }
        .ba-arrow-btn { width: 44px; height: 44px; border-radius: 50%; background: #ffffff; border: 2px solid #1B2B6B; color: #1B2B6B; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: bold; transition: all 0.3s ease; box-shadow: 0 4px 10px rgba(27,43,107,0.05); }
        .ba-arrow-btn:hover { background: #1B2B6B; color: #ffffff; transform: scale(1.08); }
        @media (max-width: 900px) { .ba-reviews-header h2 { font-size: 28px; } .ba-reviews-header p { font-size: 16px; } .ba-slide { min-width: calc(50% - 8px); max-width: calc(50% - 8px); } .ba-slide img { max-height: 320px; } }
        @media (max-width: 600px) { .ba-reviews-section { padding: 50px 4vw; } .ba-reviews-container { padding: 30px 16px; border-radius: 20px; } .ba-slide { min-width: calc(85% - 10px); max-width: calc(85% - 10px); padding: 6px; } .ba-slide img { max-height: 280px; } }
      `}</style>
      <section className="ba-reviews-section">
        <div className="ba-reviews-container">
          <div className="ba-reviews-header">
            <h2>شنو قالوا عنا؟</h2>
            <p>نفخر بثقة طلابنا وأولياء أمورهم في مسيرتهم التعليمية</p>
          </div>
          <div className="ba-slider-stage">
            <div className="ba-track" ref={trackRef}>
              {reviews.map((src, i) => (
                <div className="ba-slide" key={i}>
                  <img src={src} alt={`تقييم ${i + 1}`} />
                </div>
              ))}
            </div>
          </div>
          <div className="ba-controls-wrapper">
            <button className="ba-arrow-btn" id="baReviewPrev">&#8594;</button>
            <button className="ba-arrow-btn" id="baReviewNext">&#8592;</button>
          </div>
        </div>
      </section>
    </>
  );
}
