import React from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import icon from "../assets/icon.png";
import NavDropdown from "react-bootstrap/NavDropdown";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useRouter } from "next/router";
import { useUserContext } from "../context/UserContext";

export const Header = (props: { user: any; token: string }) => {
  const router = useRouter();
  const { logout } = useUserContext();

  const handleClickToHome = () => {
    router.push("/");
  };

  const handleClickToNewProyect = () => {
    router.push("/new-project");
  };

  const handleClickLogOut = () => {
    logout();
  };

  return (
    <header id="header">
      <div className="container">
        <div>
          <Image
            src={logo}
            alt="UpTask 2023"
            className="mt-3 mb-3 full-logo"
            onClick={() => handleClickToHome()}
            priority={true}
          />
          <Image
            src={icon}
            alt="UpTask 2023"
            className="mt-3 mb-3 icon-logo"
            onClick={() => handleClickToHome()}
            priority={true}
          />
        </div>
        <div className="settings">
          <button
            type="button"
            className="btn btn-warning mt-3 mb-3 text-uppercase"
            onClick={() => handleClickToNewProyect()}
          >
            <strong>Add new project</strong>
            <span>
              <IoMdAddCircleOutline size={22} />
            </span>
          </button>
          <NavDropdown
            title={
              <img
                src={
                  props.user.img
                    ? props.user.img
                    : process.env.NEXT_PUBLIC_USER_PIC
                }
                alt="Profile img"
                className="user-icon"
              />
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="/settings">My Account</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/" onClick={() => handleClickLogOut()}>
              Log out
            </NavDropdown.Item>
          </NavDropdown>
        </div>
      </div>
    </header>
  );
};
