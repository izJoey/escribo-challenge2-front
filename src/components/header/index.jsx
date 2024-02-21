import "./styles.scss";
import reactlogo from "../../assets/React-Symbol.png";
import { SignOut } from "@phosphor-icons/react";

export function Header() {
  return (
    <>
      <div className="container-header">
        <img src={reactlogo} alt="" />
        <a href="/">
          <SignOut size={32} color="#fff5f5" />
        </a>
      </div>
    </>
  );
}
