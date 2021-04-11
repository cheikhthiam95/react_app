import React, { useContext } from 'react'
import { UidContext } from "../UserIdConnect";
import styled, { css } from "styled-components/macro"
import {Link}  from 'react-router-dom'
import { menuData, menuDataLocaitaire } from '../../data/MenuData';
import { Button } from './Button';
import { FaBars } from 'react-icons/fa';
import Logout from '../Log/Logout';
import { useSelector } from 'react-redux';


const Nav = styled.nav`
    color: #fff;
    height : 60px;
    display: flex;
    justify-content: space-between;
    padding: 1rem 2rem;
    z-index: 100;
    position: fixed;
    width: 100%;
    background-color:#f39200;
`;

const NavLink = css`
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 1rem;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        transform: translateY(-2px);
        color: #17233e;
        font-weight: bold;
    }
`


const Logo = styled(Link)`
    ${NavLink}
    

`

const MenuBars = styled(FaBars)`
    display: none;
    cursor: pointer;

    @media screen and (max-width: 1007px){
        display: block;
    }
`;

const NavMenu = styled.div`
    display : flex;
    align-items: center;
    margin-right: -48px;

    @media screen and (max-width: 1007px){
        display: none;
    }
`;

const NavMenuLinks = styled(Link)`
    ${NavLink}
    
`;

const NavBtn = styled.div`
    display: flex;
    align-items: center;
    margin-right: 24px;

    @media screen and (max-width: 768px){
        display: none;
    }
`;

const NavBar = ({toggle}) => {

    const uid = useContext(UidContext);
    const userData = useSelector((state) => state.userReducer);

    return (
        <Nav>
            <Logo to='/accueil'><h3 style={{ color: 'white', fontFamily: 'fantasy' }}>AtypikHouse</h3></Logo>
            {uid &&
                <NavMenuLinks to='profil'>
                    <img height="40" width="40" style={{ borderRadius: "50%" }}
                    src={userData.picture}     
                    alt="poster-pic"
                    />
                </NavMenuLinks>
            }
            <MenuBars onClick={toggle}/>
            <NavMenu>
            {uid ? (
                menuDataLocaitaire.map((item, index) => (
                <NavMenuLinks to= {item.link}  key={index}>
                    {item.title}
                </NavMenuLinks>
                ))) : (
                menuData.map((item, index) => (
                    <NavMenuLinks to= {item.link}  key={index}>
                        {item.title}
                    </NavMenuLinks>
                ))) }
                {uid ? (
                    <Logout />
                ) : (
                    <div></div>
                )}
            </NavMenu>
            <NavBtn>
                <Button to="/home" primary='true'>Accueil</Button>
            </NavBtn>
        </Nav>
    )
}

export default NavBar
