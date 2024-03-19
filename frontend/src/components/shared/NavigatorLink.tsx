// navigator with links to other pages; 'rafce' for react component boiler code
// import React from "react";
import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>; // for logout
};

// customized component where items are defined
const NavigatorLink = (props: Props) => {
  return (
    <Link
      className="navLink"
      onClick={props.onClick}
      to={props.to}
      style={{ background: props.bg, color: props.textColor }}
    >
      {props.text}
    </Link>
  );
};

export default NavigatorLink;
