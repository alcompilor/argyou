import { AboutHero } from "@/components/AboutHero";
import { Meta } from "@/components/Meta";
import { TeamGrid } from "@/components/TeamGrid";

export const About = () => {
    return (
        <>
            <Meta
                title={"Argyou | About Us"}
                desc={
                    "Argyou is a leading platform offering top-notch services. Learn more about our team, our story, and why we're the best at what we do."
                }
                imgUrl={`${import.meta.env.VITE_SITE_URL}/default.png`}
            />
            <AboutHero />
            <TeamGrid />
        </>
    );
};
