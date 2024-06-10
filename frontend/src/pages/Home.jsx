import { CardsGrid } from "@/components/Home/CardsGrid";
import { DetailedQuote } from "@/components/Home/DetailedQuote";
import { HomeHero } from "@/components/Home/HomeHero";
import { Meta } from "@/components/Meta";

export const Home = () => {
    return (
        <>
            <Meta title={"Argyou | Home"} desc={"Welcome to Argyou. Explore and participate in engaging debates on our platform."} imgUrl={`${import.meta.env.VITE_SITE_URL}/default.png`}/>
            <HomeHero />
            <DetailedQuote />
            <CardsGrid />
        </>
    );
};
