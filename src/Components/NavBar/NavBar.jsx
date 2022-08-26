import React, { useState } from 'react';
import NavButton from '../NavButton/NavButton';
import ThemeButton from '../ThemeButton/ThemeButton';
import "./NavBar.css";
function NavBar({title,iconClass,imgSrc,navButtonList}){
    const [showSideNav,setShowSideNav]=useState(false);
    const openSideNav=()=> setShowSideNav(true);
    const closeSideNav=()=>setShowSideNav(false);
    const scrollTo=(elementName)=>{
        const element = document.getElementById(elementName);
        element.scrollIntoView({block: "end"});
    }
    const sideNavScrollTo=(elementName)=>{
        const element = document.getElementById(elementName);
        element.scrollIntoView({block: "end"});
        closeSideNav();
    }
    return(
        <>
            <div className='nav-bar'>
                <div className="nav-bar-title-holder">
                    {(iconClass !== '') && <i className={`${iconClass} nav-bar-title-icon`}></i>}
                    {(imgSrc !== '') && <img src={imgSrc} className="nav-title-icon" alt="app icon" />}
                    <h2 className="nav-bar-title">
                        {title}
                    </h2>
                </div>
                <div className="nav-bar-side-container">
                    <ThemeButton/>
                    {
                        navButtonList.map((navButton,index)=>
                            <NavButton navButtonClassName="nav-button-holder" key={index} {...navButton} handleEvent={scrollTo} />
                        )
                    }

                </div>
                <div className="nav-bar-ham-holder">
                    <button className="nav-bar-ham-menu-button" onClick={()=> openSideNav()}>
                        <i className="fa-solid fa-bars"></i>
                    </button>
                </div>
                
            </div>
            <div className={ showSideNav ? 'nav-bar-side-menu-holder' : 'nav-bar-side-menu-holder invisible'}>
                <div className="nav-bar-side-close-button-holder">
                    <button className="nav-bar-side-close-button" onClick={()=>closeSideNav()}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className={showSideNav ? 'nav-bar-side-menu-container': 'nav-bar-side-menu-container translate-left'}>
                    <div className="nav-bar-side-title-holder">
                        <div className="nav-bar-side-title">
                            {(iconClass !== '') && <i className={`${iconClass} nav-bar-title-icon`}></i>}
                            {(imgSrc !== '') && <img src={imgSrc} className="nav-title-icon" alt="app icon" />}
                            <h2 className="nav-bar-title">
                                {title}
                            </h2>
                        </div>
                        <ThemeButton/>
                    </div>
                    <div className="nav-bar-side-menu-links">
                        {
                            navButtonList.map((navButton,index)=>
                                <NavButton key={index} {...navButton} navButtonClassName="nav-button-side-holder"  handleEvent={sideNavScrollTo}/>
                            )
                        }
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default React.memo(NavBar);