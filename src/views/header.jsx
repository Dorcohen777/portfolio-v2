// import { Link, useLocation } from 'react-router-dom'

export function Header() {

    return (
        <section className='header-container'>
            <div className='header-content-container'>
                
                <ul className='links-container'>
                    <li><a href='#about'>About</a></li>
                    <li><h1 className='logo'>Dor.c</h1></li>
                    <li><a href='#projects'>Projects</a></li>
                </ul>
            </div>
        </section>
    )
}