/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
		colors:{
			'--clr-dark':'#070a13',
			'--clr-light':'#f1f5f9',
			'--clr-slate400':'#94a3b8',
			'--clr-slate600':'#475569',
			'--clr-slate800':'#1e293b',
			'--clr-sky':'#00abf0',
			'--clr-orange':'#ea580c',
			'--clr-red':'#ef4444',
			'--clr-lightmode':'#f1f5f9',
			'--clr-darkmode':'#070a13',
			
		  },
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
		  screens:{   
			"xs":"475px",
			"sm":"640px",
			"md":"768px",
			"lg":"1024px",
			"xl":"1280px",
			"2xl":"1536px",
		},
		  fontSize:{
			'size-xxs':'0.5rem',
			'size-xs':'0.75rem',
			'size-sm':'0.875rem',
			'size-base':'1rem',
			'size-lg':'1.125rem',
			'size-xl':'1.25rem',
			'size-2xl':'1.5rem',
			'size-3xl':'1.875rem',
			'size-4xl':'2.25rem',
			'size-4.5xl':'2.5rem',
			'size-5xl':'3rem',
			'size-6xl':'3.75rem',
			'size-7xl':'4.5rem',
			'size-8xl':'6rem',
			'size-9xl':'8rem',
			'size-10xl':'10rem',
		  },
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
