import type { Config } from "tailwindcss";
<<<<<<< HEAD
import daisyui from "daisyui"
import typography from '@tailwindcss/typography';
=======
import daisy from "daisyui"

>>>>>>> develop
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
<<<<<<< HEAD
  plugins: [typography,daisyui],
=======
  plugins: [require('daisyui'),],
>>>>>>> develop
};
export default config;
