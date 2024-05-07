import "../../App.css";
import { Logo } from "../../components/clientUI/Logo.jsx";
import {
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandX,
} from "@tabler/icons-react";

const infoStyle =
  "list-none md:flex md:flex-col justify-start items-start md:mt-11 space-y-3";

export const Footer = () => (
  <section className="bg-gray-800 container mx-auto mt-5 py-14 px-8 text-gray-100 font-semibold">
    <section className="md:flex">
      <section className="md:flex md:flex-col">
        <Logo width={200} height={120} logoType={"white"} />
        <section className="mt-4">
          <p>
            A dynamic debating platform of the future. It's designed to
            facilitate
          </p>
          <p>engaging and structured discussions on a wide range of topics.</p>
          <p>Users can create and participate in debates, present arguments,</p>
          <p>and engage with diverse perspectives.</p>
        </section>
        <section className="py-3 md:flex gap-4">
          <a href="#">
            <IconBrandFacebook size={30} />
          </a>
          <a href="#">
            <IconBrandInstagram size={30} />
          </a>
          <a href="#">
            <IconBrandX size={30} />
          </a>
        </section>
      </section>
      <section className="ml-40 text-base">
        <ul className={infoStyle}>
          <li>
            <a href="#">Terms of Service</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">FAQs</a>
          </li>
          <li>
            <a href="#">Community Guidelines</a>
          </li>
        </ul>
      </section>
      <section className="ml-40 text-base">
        <ul className={infoStyle}>
          <li>
            <a href="#">Contact Information</a>
          </li>
          <li>
            <a href="#">Phone: (123) 456-7890</a>
          </li>
          <li>
            <a href="#">Email: argyou@gmail.com</a>
          </li>
          <li>
            <a href="#">Customer Service: available 24/7</a>
          </li>
        </ul>
      </section>
    </section>
    <hr className="py-1" />
    <section>
      <h4>&copy; 2024 ArgYou. All rights reserved.</h4>
    </section>
  </section>
);
