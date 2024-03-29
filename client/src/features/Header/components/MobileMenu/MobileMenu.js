import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

import { logoutUser } from '../../../../store/actions/user.actions';
import { ChatSvg } from '../../../../components';


export default function MobilMenu({ toggleDisplayMobileMenu, displayMobileMenu }) {

    // Hooks
    const dispatch = useDispatch()


    // State
    const userId = useSelector((state) => state.user.data.id)
    const colorMode = useSelector((state) => state.app.colorMode)


    useEffect(() => {
        if (displayMobileMenu) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset'
        }
        return () => document.body.style.overflow = 'unset';
    }, [displayMobileMenu])

    return (
        <nav id="mobile-menu" className={`mobile-menu ${displayMobileMenu ? 'mobile-menu--open' : 'mobile-menu--close'} ${colorMode === 'dark' ? 'mobile-menu--dark' : ''}`}>
            <ul>
                <li>
                    <NavLink tabIndex={-1} to='/feeds' className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
                        <IconButton
                            color="secondary"
                            aria-label="Posts"
                            onClick={toggleDisplayMobileMenu}
                        >
                            <DynamicFeedIcon fontSize='large' />
                        </IconButton>
                    </NavLink>
                </li>
                <li>
                    <NavLink tabIndex={-1} to='/home' className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
                        <IconButton
                            color="secondary"
                            aria-label="Acceuil"
                            onClick={toggleDisplayMobileMenu}
                        >
                            <HomeIcon fontSize='large' />
                        </IconButton>
                    </NavLink>
                </li>
                <li>
                    <NavLink tabIndex={-1} to={`/profile/${userId}`} className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
                        <IconButton
                            color="secondary"
                            aria-label="Profil"
                            onClick={toggleDisplayMobileMenu}
                        >
                            <PersonIcon fontSize='large' />
                        </IconButton>
                    </NavLink>
                </li>
                <li>
                    <NavLink tabIndex={-1} to={`/chat`} className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
                        <IconButton
                            color="secondary"
                            aria-label="Paramètres"
                            onClick={toggleDisplayMobileMenu}
                        >
                            <ChatSvg />
                        </IconButton>
                    </NavLink>
                </li>
                <li>
                    <NavLink tabIndex={-1} to={`/settings`} className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
                        <IconButton
                            color="secondary"
                            aria-label="Paramètres"
                            onClick={toggleDisplayMobileMenu}
                        >
                            <SettingsIcon fontSize="large" />
                        </IconButton>
                    </NavLink>
                </li>
                <li>
                    <NavLink tabIndex={-1} to={`/chat-tech-dep`} className={(navData) => navData.isActive ? 'navbar__nav-link active' : 'navbar__nav-link'}>
                        <IconButton
                            color="secondary"
                            aria-label="Paramètres"
                            onClick={toggleDisplayMobileMenu}
                        >
                            <HeadsetMicIcon fontSize="large" />
                        </IconButton>
                    </NavLink>
                </li>
                <li>
                    <IconButton
                        color="inactiveLink"
                        onClick={() => dispatch(logoutUser())}
                        className='navbar__nav-link'
                    >
                        <LogoutIcon fontSize="large" />
                    </IconButton>
                </li>
            </ul>
            <div onClick={toggleDisplayMobileMenu} className="bt-overlay" />
        </nav>
    )
}