import React from "react";
import { youtube } from "./Icons.jsx";
import { github, instagram, twitter } from "./Icons.jsx";

const FooterSocialLink = ({ name, href, svg }) => {
  return (
    <a href={href} className="text-gray-400 hover:text-gray-500">
      <span className="sr-only">{name}</span>
      {svg}
    </a>
  );
};
export default function footer() {
  return (
    <footer className="bg-white">
      <div className="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
        
        <div className="flex justify-center mt-8 space-x-6">
          <FooterSocialLink
            name="Instagram"
            href="https://instagram.com/pottenwalder"
            svg={instagram}
          />
          <FooterSocialLink
            name="Twitter"
            href="https://twitter.com/pottenwalder"
            svg={twitter}
          />
          <FooterSocialLink
            name="Github"
            href="https://github.com/activox"
            svg={github}
          />
        </div>
        <p className="mt-8 text-base leading-6 text-center text-gray-400">
          2022 Paul Ottenwalder
        </p>
      </div>
    </footer>
  );
}
