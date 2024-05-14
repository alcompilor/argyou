import notFoundImage from '../assets/imgs/404.jpg'; 


export const Error404 = () => {
    return (
        <>
            <div className="flex items-center justify-center h-screen" style={{ marginTop: '-50px'}}>
                <img src={notFoundImage} alt="404 Not Found" className="mx-auto max-w-md h-auto" />
            </div>
        </>
    );
};