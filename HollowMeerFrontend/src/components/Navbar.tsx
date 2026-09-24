import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';

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
        <header ref={navRef}>
            <nav className="navbar navbar--active">
                <button className="dropdown-btn" onClick={() => setMenuOpen(!menuOpen)}>
                    Menu
                </button>
                <ul className={`navbar-list ${menuOpen ? 'show' : ''}`}>
                    <li><a href="login.html">Beastiary</a></li>
                    <li><a href="register.html">Locations</a></li>
                    <li><Link to="/armoury">Armoury</Link></li>
                    <li><a href="login.html">Over us</a></li>
                    <li><a href="register.html">Members</a></li>
                </ul>
            </nav>
            <nav className="profile">
                <button className="dropdown-btn" onClick={() => setProfileOpen(!profileOpen)}>
                    Profile
                </button>
                <ul className={`profile-list ${profileOpen ? 'show' : ''}`}>
                    <li><a href="login.html">Login</a></li>
                    <li><a href="register.html">Register</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;