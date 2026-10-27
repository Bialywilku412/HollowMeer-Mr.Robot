import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router';
import "../styles/navbar.css";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (navRef.current && e.target instanceof Node && !navRef.current.contains(e.target)) {
                setMenuOpen(false);
                setProfileOpen(false);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <header ref={navRef} className='header'>
            <nav className="navbar navbar--active">
                <button className="dropdown-btn" onClick={() => setMenuOpen(!menuOpen)}>
                    Menu
                </button>
                <ul className={`navbar-list ${menuOpen ? 'show' : ''}`}>
                    <li><NavLink className='btn' to="/beastiary">Beastiary</NavLink></li>
                    <li><NavLink className='btn' to="/locations">Locations</NavLink></li>
                    <li><NavLink className='btn' to="/armoury">Armoury</NavLink></li>
                    <li><NavLink className='btn' to="/quests">Quests</NavLink></li>
                    <li><NavLink className='btn' to="/archive">Archive</NavLink></li>
                    <li><NavLink className='btn' to="/yard">The Yard</NavLink></li>
                    <li><NavLink className='btn' to="login.html">Over us</NavLink></li>
                    <li><NavLink className='btn' to="register.html">Members</NavLink></li>
                </ul>
            </nav>
            <nav className="profile">
                <button className="dropdown-btn" onClick={() => setProfileOpen(!profileOpen)}>
                    Profile
                </button>
                <ul className={`profile-list ${profileOpen ? 'show' : ''}`}>
                    <li><NavLink className='btn' to="login.html">Login</NavLink></li>
                    <li><NavLink className='btn' to="register.html">Register</NavLink></li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;