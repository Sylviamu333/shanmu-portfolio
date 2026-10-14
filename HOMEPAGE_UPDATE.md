# SHAN MU homepage update

The homepage now uses a compact navigation, a personal introduction, a large work showcase, a short practice section using existing specialties, and a minimal contact/footer. Eleven Oasis remains first. The other four projects use their original artwork and descriptions. No testimonials or fictional side projects are included.

The designer name is SHAN MU, the role is UI/UX Designer · Visual Designer, and the exact requested two-sentence introduction is stored in src/data/personal.ts. Project content and all original assets are preserved. Empty contact fields create no fabricated external links.

Homepage components are under src/components/home/. Its styles are isolated in src/app/homepage.css. Existing case-study layouts retain their current styling. The shared header adapts only its homepage appearance. A locally hosted, Latin-subset Manrope variable font uses font-display: swap; its OFL license is included under public/fonts/.

The homepage has coordinated CSS entrance effects, existing Motion section reveals, restrained image/arrow hover feedback, keyboard-visible focus states, a mobile menu, and reduced-motion support. Images remain replaceable through the existing project data.

Reference access limitation: https://www.eemonroy.com/ was inaccessible through the web reader, and the execution environment returned a network-policy 403. Its exact visual design, spacing, typography, responsive layouts, and animations could not be inspected. This implementation is a polished approximation based on the user's supplied direction, rather than a verified visual match. No reference source code or artwork was copied.

Production target remains https://shanmu-portfolio-mu.vercel.app. The completed, validated change is intended for the existing main branch and its connected Vercel production deployment. No new Vercel project, domain, or hosted preview is created. Deployment success must be checked separately from the Git push; the GitHub Vercel status check is the available verification route.
