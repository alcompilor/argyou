import { CardsGrid } from "@/components/Home/CardsGrid";
import { DetailedQuote } from "@/components/Home/DetailedQuote";
import { HomeHero } from "@/components/Home/HomeHero";

export const Home = () => {
    return (
        <>
            <HomeHero />
            <DetailedQuote />
            <CardsGrid />
        </>
    );
};
