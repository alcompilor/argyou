import whiteLogo from "../../assets/imgs/default-monochrome-white.svg";
import blackLogo from "../../assets/imgs/default-monochrome-black.svg";
import logo from "../../assets/imgs/default-monochrome.svg";

function selectLogo(logoType) {
    if (logoType === "black") {
        return blackLogo;
    } else if (logoType === "white") {
        return whiteLogo;
    } else if (logoType === "colored") {
        return logo;
    }
}

export const Logo = ({ width, height, className, logoType }) => (
    <img
        src={selectLogo(logoType)}
        alt="ArgYou Logo"
        width={width}
        height={height}
        className={className}
    />
);
