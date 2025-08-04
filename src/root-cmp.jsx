import { Routes, Route } from 'react-router-dom'

// cmps
import { Header } from "./views/header";
import { Hero } from './views/hero';
import AnimationSelector from './views/AnimationSelector';
import AnimationShowcase from './views/AnimationShowcase';

export function RootCmp() {

    return (
        <div>
            <section className="hero-section">
                <Header />
                <main >
                    <Routes>
                        <Route path='/new-portfolio' element={<Hero />} />
                        <Route path='/new-portfolio/test-animations' element={<AnimationSelector />} />
                        <Route path='/new-portfolio/showcase' element={<AnimationShowcase />} />
                    </Routes>
                </main>
            </section>
        </div>
    )
}