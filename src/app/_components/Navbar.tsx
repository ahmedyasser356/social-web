"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";
import ShareIcon from "@mui/icons-material/Share";
import { fetchUserInfo } from "@/libs/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/libs/store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const pages = ["register", "login", "Blog"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  let { userInfo } = useSelector((state: RootState) => {
    return state.user;
  });
  let dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(fetchUserInfo());
  }, [userInfo?.photo]);

  // handle log out ================
  let { push } = useRouter();
  function handleLogout() {
    Cookies.remove("token");
    dispatch(fetchUserInfo());
    push("/login");
  }

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar   disableGutters>
          <ShareIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link href="/">Face</Link>
          </Typography>
          {!Cookies.get('token')&&<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    <Link style={{ color: "black" }} href={`/${page}`}>
                      {page}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>}
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link href="/">Face</Link>
          </Typography>
        {!Cookies.get('token')&&  <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link href={`/${page}`}>{page}</Link>
              </Button>
            ))}
          </Box>}
         
          {Cookies.get("token") && (<>
           <Box sx={{flexGrow:1 ,justifyContent:"end" ,  mr: "10px", display: { xs: "none", md: "flex" } }}>
            <Typography variant="p" sx={{  fontWeight: "600" }}>
              {userInfo?.name}
            </Typography>
          </Box>
            <Box sx={{      flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={userInfo?.photo} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key="Change photo" onClick={handleCloseUserMenu}>
                  <Link href="/changephoto">
                    {" "}
                    <Typography sx={{ color: "black", textAlign: "center" }}>
                      Change photo
                    </Typography>
                  </Link>
                </MenuItem>

                <MenuItem key={"profile"} onClick={handleCloseUserMenu}>
                  <Link href="/profile">
                    {" "}
                    <Typography sx={{ color: "black", textAlign: "center" }}>
                      Profile
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem key={"change password"} onClick={handleCloseUserMenu}>
                  <Link href="/changepassword">
                    {" "}
                    <Typography sx={{ color: "black", textAlign: "center" }}>
                      Change Password
                    </Typography>
                  </Link>
                </MenuItem>

                <MenuItem key="logout" onClick={handleCloseUserMenu}>
                  <p
                    onClick={handleLogout}
                    style={{
                      color: "black",
                      textAlign: "center",
                      margin: "0px",
                    }}
                  >
                    Logout
                  </p>
                </MenuItem>
              </Menu>
            </Box>
          </>)}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
