import { useEffect, useState, useRef } from 'react'
import { mainService } from '../services/main-service'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ImgCarousel } from './img-carousel'
import TechTooltip from './TechTooltip'
import { shadcnIcon, mongooseIcon } from './img-carousel'
// import SkillConstellation from './SkillConstellation'
// import ProjectCardEffect from './ProjectCardEffect'

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger)

export function Projects() {
   const [projects, setProjects] = useState([]) // Initialize projects as an empty array
   const titleRef = useRef(null)
   const projectCardsRef = useRef([])

   useEffect(() => {
      setProjects(mainService.projectsData)
   }, [])

   // Simple fade-up animation for "Projects." title
   useEffect(() => {
      const titleElement = titleRef.current
      if (!titleElement) return

      // Simple, reliable fade-up animation
      gsap.fromTo(titleElement,
         {
            opacity: 0,
            y: 50,
            scale: 0.95,
         },
         {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
               trigger: titleElement,
               start: 'top 85%',
               toggleActions: 'play none none none',
            }
         }
      )

      // Cleanup
      return () => {
         ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars.trigger === titleElement) {
               trigger.kill()
            }
         })
      }
   }, [])

   // Parallax animations for project cards
   useEffect(() => {
      if (projectCardsRef.current.length === 0) return

      const cards = projectCardsRef.current.filter(card => card !== null)

      cards.forEach((card, index) => {
         const isEven = index % 2 === 0

         // Entrance animation - staggered reveal
         gsap.fromTo(card,
            {
               opacity: 0,
               y: 100,
               rotateX: 15,
               scale: 0.9,
            },
            {
               opacity: 1,
               y: 0,
               rotateX: 0,
               scale: 1,
               duration: 1.2,
               ease: 'power3.out',
               scrollTrigger: {
                  trigger: card,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
               }
            }
         )

         // Parallax effect while scrolling
         const projectInfo = card.querySelector('.project-info')
         const projectImages = card.querySelector('.project-images')

         if (projectInfo && projectImages) {
            // Info moves slower (creates depth)
            gsap.to(projectInfo, {
               y: isEven ? -50 : -80,
               scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1.5,
               }
            })

            // Images move faster (foreground effect)
            gsap.to(projectImages, {
               y: isEven ? 80 : 50,
               scrollTrigger: {
                  trigger: card,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1,
               }
            })
         }
      })

      // Cleanup
      return () => {
         ScrollTrigger.getAll().forEach(trigger => {
            if (cards.some(card => trigger.vars.trigger === card)) {
               trigger.kill()
            }
         })
      }
   }, [projects])

   function addSpace(desc) {
      const descriptionWithLineBreaks = desc.split('.').join('.<br/> <br/>')
      return (
         <span
            dangerouslySetInnerHTML={{ __html: descriptionWithLineBreaks }}
         />
      )
   }

   if (projects.length === 0) return <div>loading...</div> // Check the length of projects array instead of the truthiness

   return (
      <section className='projects-section main-layout' id='projects'>
         <div>
            <h2 ref={titleRef} className='projects-title underline-style'> Projects. </h2>
            <p className='project-note'>Note that there are more projects I have developed, these are just a few.</p>
         </div>
         <div className='projects-container' id='projects'>
            {projects.map((project, idx) => {
               return (
                  <article
                     key={idx}
                     className='project-card'
                     ref={el => projectCardsRef.current[idx] = el}
                  >
                     <div className='project-info'>
                        <p className='project-tag'>{project.tag}</p>
                        <h2>{project.title}</h2>
                        <p className='project-desc'>
                           {addSpace(project.description)}
                        </p>
                        <div className='project-btns-container'>
                           <a href={project.links[0]} target='_blank' rel='noreferrer'>
                              <button className='try-live-btn pointer hover-effect'>
                                 Try Live
                              </button>
                           </a>
                           {project.links[1] && (
                              <a href={project.links[1]} target='_blank' rel='noreferrer'>
                                 <button className='github-btn pointer hover-effect'>
                                    GitHub
                                 </button>
                              </a>
                           )}
                           {project.links[2] && (
                              <a href={project.links[2]} target='_blank' rel='noreferrer'>
                                 <button className='youtube-btn pointer hover-effect'>
                                    Watch In Youtube
                                 </button>
                              </a>
                           )}
                        </div>
                        <div className='tech-container'>
                           {project.tech.map((skill, idx) => {
                              if (!skill) return null; // Skip empty skills
                              
                              let iconSrc = '';
                              
                              // Set icon source based on skill
                              if (skill === 'react') iconSrc = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg';
                              else if (skill === 'html') iconSrc = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg';
                              else if (skill === 'javascript') iconSrc = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg';
                              else if (skill === 'mongodb') iconSrc = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-plain-wordmark.svg';
                              else if (skill === 'sass') iconSrc = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg';
                              else if (skill === 'css') iconSrc = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain-wordmark.svg';
                              else if (skill === 'wordpress') iconSrc = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg';
                              else if (skill === 'nodejs') iconSrc = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg';
                              else if (skill === 'php') iconSrc = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg';
                              else if (skill === 'nextjs') iconSrc = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg';
                              else if (skill === 'azure') iconSrc = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg';
                              else if (skill === 'redis') iconSrc = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg';
                              else if (skill === 'typescript') iconSrc = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg';
                              else if (skill === 'tailwindcss') iconSrc = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg';
                              else if (skill === 'dart') iconSrc = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dart/dart-original.svg';
                              else if (skill === 'firebase') iconSrc = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg';
                              else if (skill === 'moongosh') iconSrc = mongooseIcon;
                              else if (skill === 'shadcn') iconSrc = shadcnIcon;
                              
                              if (!iconSrc) return null; // Skip if no icon found
                              
                              return (
                                 <div
                                    className='tech-inner-container'
                                    key={idx}
                                 >
                                    <TechTooltip skill={skill}>
                                       <img src={iconSrc} alt={skill} />
                                    </TechTooltip>
                                 </div>
                              )
                           })}
                        </div>
                     </div>
                     <div className='project-images'>
                        <ImgCarousel img={project.imgs} />
                     </div>

                  </article>

               )
            })}

         </div>
      </section>
   )
}