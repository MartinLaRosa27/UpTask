import React from "react";
import nameLogo from "../../assets/name-logo.png";
import Image from "next/image";

export const Welcome = () => {
  return (
    <div id="home-welcome" className="container text-center pt-5 pb-5">
      <h2>
        Welcome to
        <Image src={nameLogo} alt="UpTask 2023" priority={true} />
      </h2>
      <h4 className="mt-4">
        UpTask is the best place to keep all the projects you are doing and the
        task of the same projects. What are you waiting for
        <strong> register a new project?</strong>
      </h4>
    </div>
  );
};
