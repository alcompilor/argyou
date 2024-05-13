import notFoundImage from '../assets/imgs/404.jpg'; 
import { Navbar } from "../components/clientUI/Navbar.jsx";



export const ErrorContent = () => {
  return (
      <>
          <Navbar />
          <div>
              <img src={notFoundImage} alt="404 Not Found" className="mx-auto w-auto max-w-md h-auto my-6" />
          </div>
      </>
  );
};