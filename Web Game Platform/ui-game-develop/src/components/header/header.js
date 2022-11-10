import React, { useState, useEffect } from 'react'
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import style from "./header.module.css";
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import { Link } from 'react-router-dom';
import axios from '../../utility/axios';


function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [profile, setProfile] = useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    getProfile()
  }, [])
  const getProfile = async () => {
    try {
      const { data } = await axios.get('/user/profile')
      setProfile(data)
    } catch (error) {
      setProfile(null)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('_q')
    window.location.reload()
  }

  return (
    <AppBar position="static" className={style["app-bar"]}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <VideogameAssetIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}/>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none"
            }}
          >
            WAKANDA GAMES
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <div className={style.auth}>
        {profile === null ? (
          <Link to='/auth/login' className={style.link}>
            Sign In
          </Link>
        ) : (
          <>
            <span className={style.nama}>{profile.nama}</span>
            <span className={style.logout} onClick={handleLogout}>
              Logout
            </span>
          </>
        )}
        {profile === null && <Link to="/auth/register" className={style.link}> Register</Link>}
      </div>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none"
            }}
          >
            WAKANDA GAMES
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Link to='/apps/score' style={{textDecoration:'none'}}>
              <Button sx={{ my: 2, color: "white", display: "block"}}>
                Score
              </Button>
              </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
          <div className={style.auth}>
        {profile === null ? (
          <Link to='/auth/login' className={style.link}>
            Sign In
          </Link>
        ) : (
          <>
            <span className={style.nama}>{profile.nama}</span>
            <span className={style.logout} onClick={handleLogout}>
              Logout
            </span>
          </>
        )}
        {profile === null && <Link to="/auth/register" className={style.link}> Register</Link>}
      </div>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
