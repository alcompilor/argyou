import { Meta } from '@/components/Meta';
import notFoundImage from '../assets/imgs/404.jpg'; 


export const Error404 = () => {
    return (
        <>
            <Meta title={"Argyou | Page not found"} desc={"The page you're looking for was not found on Argyou. Please check the URL or go back to the home page."} imgUrl={`${import.meta.env.VITE_SITE_URL}/default.png`}/>
            <div className="flex items-center justify-center h-screen" style={{ marginTop: '-50px'}}>
                <img src={notFoundImage} alt="404 Not Found" className="mx-auto max-w-md h-auto" />
            </div>
        </>
    );
};