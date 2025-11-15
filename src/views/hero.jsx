//splt js
import splitFunction from 'spltjs';
import anime from 'animejs';

import { useEffect, useRef, useState } from 'react';
import heroImg from '../assets/imgs/hero-img-nobg-op.png'

// views
import { About } from './about'
import { Projects } from './projects'
import FloatingParticles from './FloatingParticles';
// import Interactive3D from './Interactive3D';
// import GeometricGrid from './GeometricGrid';
// import SectionDivider from './SectionDivider';
// import PhysicsDemo from './PhysicsDemo';

export function Hero() {
    const revealRef = useRef();
    const [hasHeroAnimated, setHasHeroAnimated] = useState(false);
    
    // Choose your preferred animation:
    // 1. FloatingParticles - Recommended: Modern, minimal, performs well
    // 2. Interactive3D - 3D geometric shapes with mouse interaction
    // 3. GeometricGrid - Ultra-minimal grid pattern
    const AnimationComponent = FloatingParticles;

    useEffect(() => {

        // IntersectionObserver setup
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !hasHeroAnimated) {
                    splitFunction({ target: '.heroani', reveal: true });
                    anime({
                        targets: '.reveal',
                        translateY: [200, 0],
                        opacity: [0, 1],
                        delay: anime.stagger(10),
                        easing: 'easeOutExpo'
                    });
                    setHasHeroAnimated(true); // Set the state to true after the animation
                }
            });
        }, { threshold: 1 });

        const currentRef = revealRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        // Cleanup function to disconnect the observer
        return () => {
            if (currentRef) {
                observer.disconnect();
            }
        };
    }, [hasHeroAnimated]);
    return (

        <>
            <AnimationComponent />
            <section className="hero-container">
                <div className="my-bio-container">
                    <div className='my-bio-content'>
                        <h2 className='hero-title heroani' ref={revealRef}>Hi, I'm Dor a Passionate Full Stack Web Developer</h2>
                        <p className='hero-info'></p>
                    </div>
                    <div className="hero-img-container">
                        <img src={heroImg} className='hero-img' alt="Dor Cohen - Full Stack Web Developer" />
                    </div>
                    <div className='scroll-container'>
                        <div className="dot"></div>
                    </div>
                </div>
            </section>

            <section>
                <About />
            </section>

            <section>
                <Projects />
            </section>
        </>
    )
}