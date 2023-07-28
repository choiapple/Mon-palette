import React from 'react';
import './NavigationBarBottom.css'
import { Link } from 'react-router-dom';


import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FireIcon from '@mui/icons-material/LocalFireDepartmentOutlined';
import PhotoSizeIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';



function NavigationBarBottom() {
  const ScrollToTop = () => {
    window.scrollTo({top: 0, behavior: "smooth"})
  }
  return (
    <div className="navigationbar_bottom">
      
      <div className="nav_bottom_icons" onClick={ScrollToTop}>
        <Link to="/challenge">
          <FireIcon sx={{ fontSize: 30 }}/>
        </Link>
      </div>

      <div className="nav_bottom_icons" onClick={ScrollToTop}>
        <Link to="/feed">
          <PhotoSizeIcon sx={{ fontSize: 30 }}/>
        </Link>
      </div>

      <div className="nav_bottom_icons" onClick={ScrollToTop}>
        <Link to="/home">
          <HomeOutlinedIcon sx={{ fontSize: 30 }}/>
        </Link>
      </div>

      <div className="nav_bottom_icons" onClick={ScrollToTop}>
        <Link>
          <LocalMallOutlinedIcon sx={{ fontSize: 30 }}/>
        </Link>
      </div>

      <div className="nav_bottom_icons" onClick={ScrollToTop}>
        <Link>
          <PermIdentityOutlinedIcon sx={{ fontSize: 30 }}/>
        </Link>
      </div>
    </div>
  );
}

export default NavigationBarBottom;