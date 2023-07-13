import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Cookies from "universal-cookie";

// ----------------------------------------------------------------------------------------
export default function HeaderHome() {
  const handleClick = () => {
    const cookies = new Cookies();
    cookies.remove("tokenAdmin", { path: "/" });
    window.location.reload();
  };

  return (
    <div id="home-headerHome">
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className="main-title">
            UpTask 2023 - Admin
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="logout" onClick={() => handleClick()}>
              Logout
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
