import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";


export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-8 py-10 text-center border-t border-white/10 mt-10">
      <p className="text-white/60 text-sm font-normal leading-normal">
        © 2025 SpendWise. All rights reserved.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 ">
        <p className="text-white/60 hover:text-white transition-colors text-sm font-normal leading-normal">
          Made by Nicole Fernandez 💜
        </p>
      </div>

      <div className="flex justify-center gap-6">

        <a
          href="https://www.linkedin.com/in/nicole-fernandez-5896592b2/"
          aria-label="LinkedIn"
          className="text-white/60 hover:text-white transition-colors"
        >
          <svg
            className="h-6 w-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
          </svg>
        </a>
        <a href="https://github.com/nicolefdz07">
          <FaGithub className="text-white/60 hover:text-white transition-colors text-2xl"/>
        </a>
        <a href="mailto:nicolefdz7@outlook.com?">
          <MdEmail className="text-white/60 hover:text-white transition-colors text-2xl"/>
        </a>
      </div>
    </footer>
  );
}
