//splt js
import splitFunction from 'spltjs';
import anime from 'animejs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useEffect, useRef, useState } from 'react';
import heroImg from '../assets/imgs/hero-img-nobg-op.png'

// views
import { About } from './about'
import { Projects } from './projects'
import FloatingParticles from './FloatingParticles';
import ThreeDDivider from './ThreeDDivider';


// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const revealRef = useRef();
    const heroImgRef = useRef();
    const bioContentRef = useRef();
    const scrollIndicatorRef = useRef();
    const [hasHeroAnimated, setHasHeroAnimated] = useState(false);


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
                    setHasHeroAnimated(true); 
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

    // Parallax effect with GSAP ScrollTrigger
    useEffect(() => {
        // Parallax for hero image (moves slower, creating depth)
        if (heroImgRef.current) {
            gsap.to(heroImgRef.current, {
                y: 150,
                opacity: 0.3,
                scale: 1.1,
                scrollTrigger: {
                    trigger: '.hero-container',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1.5,
                }
            });
        }

        // Parallax for bio content (moves faster, stays in focus longer)
        if (bioContentRef.current) {
            gsap.to(bioContentRef.current, {
                y: -80,
                opacity: 0,
                scrollTrigger: {
                    trigger: '.hero-container',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1,
                }
            });
        }

        // Parallax for scroll indicator (fades and moves quickly)
        if (scrollIndicatorRef.current) {
            gsap.to(scrollIndicatorRef.current, {
                y: 100,
                opacity: 0,
                scrollTrigger: {
                    trigger: '.hero-container',
                    start: 'top top',
                    end: '50% top',
                    scrub: 0.5,
                }
            });
        }

        // Cleanup ScrollTrigger instances
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);
    return (

        <>
            <AnimationComponent />
            <section className="hero-container">
                <div className="my-bio-container">
                    <div className='my-bio-content' ref={bioContentRef}>
                        <h2 className='hero-title heroani' ref={revealRef}>Hi, I'm Dor a Passionate Full Stack Web Developer</h2>
                        <p className='hero-info'></p>
                    </div>
                    <div className="hero-img-container" ref={heroImgRef}>
                        <img src={heroImg} className='hero-img' alt="Dor Cohen - Full Stack Web Developer" />
                    </div>
                    <div className='scroll-container' ref={scrollIndicatorRef}>
                        <div className="dot"></div>
                    </div>
                </div>
            </section>

            <section>
                <About />
            </section>

            <ThreeDDivider />

            <section>
                <Projects />
            </section>
        </>
    )
}