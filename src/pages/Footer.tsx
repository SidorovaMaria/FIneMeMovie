import React from "react";

const Footer = () => {
  return (
    <>
      <div className="h-[2px] w-dull bg-white my-3"></div>
      <div className=" w-full">
        <h1 className="text-center p-2 font-bold tracking-wide text-lg my-5">
          Created as a test project for Bokus
        </h1>
        <div
          className="flex 
        items-center justify-around"
        >
          <ul className="flex flex-col gap-3 text-lg font-medium">
            <li>
              <a href="">Terms and Conditions</a>
            </li>
            <li>
              <a href="">Privacy Policy</a>
            </li>
            <li>
              <a href="">
                Learn more about{" "}
                <span className="underline font-extrabold underline-offset-2 text-accent-1">
                  Bokus
                </span>
              </a>
            </li>
          </ul>
          <h1>Created by Maria Sidorova</h1>
        </div>
      </div>
    </>
  );
};

export default Footer;
