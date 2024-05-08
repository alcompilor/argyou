import { TeamCard } from "./TeamCard";
import nourHumeidiAvatar from "@/assets/imgs/nour_humeidi_avatar.jpeg";
import ahmedAbbasiAvatar from "@/assets/imgs/ahmed_abbasi_avatar.jpeg";
import mohammedAlkhatebAvatar from "@/assets/imgs/mohammed_alkhateb_avatar.png";
import shuaybWarsameAvatar from "@/assets/imgs/shuayb_warsame_avatar.jpeg";
import josephHammamiAvatar from "@/assets/imgs/joseph_hammami_avatar.webp";

export const TeamGrid = () => {
    const teamData = [
        {
            id: 1,
            fullName: "Nour Humeidi",
            position: "CEO & Software Developer",
            imageSrc: nourHumeidiAvatar,
            linkedin:
                "https://www.linkedin.com/in/mohamed-nour-humeidi-4b4509214/",
            github: "https://github.com/MoNourH",
        },
        {
            id: 2,
            fullName: "Ahmed Abbasi",
            position: "CTO & Software Developer",
            imageSrc: ahmedAbbasiAvatar,
            linkedin: "https://www.linkedin.com/in/alcompilor/",
            github: "https://github.com/alcompilor",
        },
        {
            id: 3,
            fullName: "Mohammed Al-Kateb",
            position: "Product Manager & Software Developer",
            imageSrc: mohammedAlkhatebAvatar,
            linkedin: "https://www.linkedin.com/in/mohammed-alkateb-09a330233/",
            github: "https://github.com/mohammed-alkateb",
        },
        {
            id: 4,
            fullName: "Joseph Hammami",
            position: "Marketing Expert & Software Developer",
            imageSrc: josephHammamiAvatar,
            linkedin: "https://www.linkedin.com/in/joseph-hammami-a5bbb3276/",
            github: "https://github.com/josephhammami",
        },
        {
            id: 5,
            fullName: "Shuayb Warsame",
            position: "UI/UX Expert & Software Developer",
            imageSrc: shuaybWarsameAvatar,
            linkedin: "https://www.linkedin.com/in/shuayb-warsame/",
            github: "https://github.com/shuaybw",
        },
    ];

    return (
        <div id="team">
            <h2 className="text-4xl font-extrabold text-gray-800 text-center">
                Meet our teem
            </h2>
            <div className="flex flex-wrap justify-center mt-10 gap-10 px-14 mb-20">
                {teamData.map((item) => {
                    return (
                        <TeamCard
                            key={item.id}
                            fullName={item.fullName}
                            position={item.position}
                            imageSrc={item.imageSrc}
                            linkedin={item.linkedin}
                            github={item.github}
                        />
                    );
                })}
            </div>
        </div>
    );
};
