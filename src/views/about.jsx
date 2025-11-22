import me from '../assets/imgs/me1op.jpg'
import github from '../assets/imgs/github.png'
import linkedin from '../assets/imgs/linkedin.png'

// splt js 
import anime from 'animejs';

// gsap
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
// icons
import { FaPhoneSquare } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { useEffect, useRef } from 'react';

// New animation components
// import CodeMatrix from './CodeMatrix';

gsap.registerPlugin(ScrollTrigger);

export function About() {
    const gridRef = useRef();
    const aboutContainerRef = useRef();
    const aboutImgRef = useRef();

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.fade-up',
                start: 'top center',
                end: 'top top',
                ease: 'power3.out',
            }
        });

        tl.from('.fade-up', {
            y: 50,
            opacity: 0,
            stagger: 0.2,
            clipPath: 'inset(0 0 0 0)',
            duration: 0.6,

        });

        tl.from('.main-layout', {
        })

    });

    useEffect(() => {
        

        // Grid animation setup
        const gridElements = gridRef.current.children;
        var animation = anime({
            targets: gridElements,
            scale: [
                { value: .1, easing: 'easeOutSine', duration: 500 },
                { value: 1, easing: 'easeInOutQuad', duration: 1000 }
            ],
            delay: anime.stagger(200, { grid: [14, 5], from: 'center' }),
            loop: false,
            autoplay: false,
        });

        const observer = new IntersectionObserver((entries) => {
            console.log(entries);

            const entry = entries[0];

            if (entry.isIntersecting) {
                animation.play();
            } else {
                animation.pause();
            }
        });

        // Assuming gridRef.current is a valid DOM element
        observer.observe(gridRef.current);
    }, []);

    return (
        <section className="main-layout">
            <div className="about-container" id='about' ref={aboutContainerRef}>
                <div className='about-info-container'>
                    <div className="about-me-content">
                        <h1 className='about-title fade-up' >Who Am I?</h1>
                        <div>
                            <p>Nice to meet you! 😊 I'm a passionate full-stack web developer. I love what I do and am always striving to improve.</p>
                            <p>I have strong work ethics, excellent communication skills, attention to detail, and a knack for problem-solving and technical challenges.</p>
                        </div>
                        <br />
                        <div>
                            <p className='contact-title'>Contact Information</p>
                            <div className='contact-information-container '>
                                <p><FaPhoneSquare /> 053-7171650 </p>
                                <p><MdOutlineAlternateEmail /> dorcohen1337@gmail.com</p>
                            </div>
                            <div className="button-container">
                                <a href='https://github.com/Dorcohen777' target='_blank' rel='noreferrer'> <img className='img-contact' src={github} alt='GitHub Profile' /> </a>
                                <a href='https://www.linkedin.com/in/dor-cohen-618745225/' target='_blank' rel='noreferrer'> <img className='img-contact' src={linkedin} alt='LinkedIn Profile' /> </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="about-img-container" ref={aboutImgRef}>
                    <img src={me} className='my-image' alt='Dor Cohen' />
                    <div className='grid-container' ref={gridRef}>
                        {[...Array(14 * 5)].map((_, i) => <div key={i} className='grid-element' />)}
                    </div>
                </div>
            </div>
        </section>
    );
}
