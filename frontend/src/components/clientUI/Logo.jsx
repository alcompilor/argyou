import whiteLogo from "../../assets/imgs/default-monochrome-white.svg";
import blackLogo from "../../assets/imgs/default-monochrome-white.svg";
import logo from "../../assets/imgs/default-monochrome-white.svg";

function whichLogo(logoType) {
  if (logoType === "black") {
    return blackLogo;
  } else if (logoType === "white") {
    return whiteLogo;
  } else if (logoType === "normal") {
    return logo;
  }
}

export const Logo = ({ width, height, style, logoType }) => (
  <img
    src={whichLogo(logoType)}
    alt="ArgYou Logo"
    width={width}
    height={height}
    className={style}
  />
);
