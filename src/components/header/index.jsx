import "./styles.scss";
import img from "../../assets/escribo.png";
import { SignOut } from "@phosphor-icons/react";

export function Header() {
  return (
    <>
      <div className="container-header">
        <img src={img} alt="" />
        <a href="/">
          <SignOut size={32} color="#fff5f5" />
        </a>
      </div>
    </>
  );
}
