WoWKTM Marketplace
A modern, vibrant, Etsy-inspired e-commerce platform with a React/Vite/Tailwind CSS frontend and a Java Spring Boot backend, ready for AWS deployment.

🛠️ Tools & Technologies
Frontend:

React 18+

Vite

TypeScript

Tailwind CSS v4.x

Framer Motion (for animations)

Axios (API requests)

React Router (Routing)

Backend:

Java 17+

Spring Boot 3+

Spring Data JPA

Spring Security

JWT (Authentication)

MySQL/PostgreSQL, H2 (local dev)

DevOps / Cloud:

AWS EC2 (servers)

AWS S3 (static/image storage)

AWS RDS (managed database)

GitHub Actions (CI/CD)

Docker (optional for containers)

📁 Project Structure
plaintext
Copy
Edit
wowktm/
│
├── wowktm-frontend/            # React + Vite Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── api/                # Axios clients, API functions
│   │   │   └── axiosClient.ts
│   │   │   └── productApi.ts
│   │   ├── components/         # Reusable UI components
│   │   │   └── Navbar.tsx
│   │   │   └── ProductCard3D.tsx
│   │   ├── features/           # Feature-based folders (eg: products, cart)
│   │   │   └── products/
│   │   │       └── ProductGrid.tsx
│   │   ├── hooks/              # Custom React hooks
│   │   │   └── useInfiniteScroll.ts
│   │   ├── pages/              # Route-based pages
│   │   │   └── LandingPage.tsx
│   │   │   └── ProductsPage.tsx
│   │   ├── routes/             # Routing setup
│   │   │   └── index.tsx
│   │   ├── types/              # TypeScript type definitions
│   │   │   └── product.ts
│   │   ├── index.css           # Tailwind CSS imports
│   │   ├── main.tsx            # Entry point
│   │   └── App.tsx             # Root component
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── package.json
│
├── wowktm-backend/             # Java Spring Boot Backend
│   ├── src/main/java/com/wowktm/
│   │   ├── controller/         # REST controllers
│   │   ├── service/            # Business logic
│   │   ├── repository/         # JPA repositories
│   │   ├── model/              # JPA Entities (Product, User, Order, etc)
│   │   └── config/             # Security/configuration
│   ├── src/main/resources/
│   │   ├── application.yml     # Spring Boot config
│   │   └── static/             # Static files, if needed
│   ├── pom.xml                 # Maven build file
│   └── Dockerfile
│
└── README.md                   # (This file)
🧩 Key Class/Folder Purposes
Path	Purpose/Classes
src/api/	API calls, Axios configs, endpoints
src/components/	Shared, reusable UI components (Navbar, buttons, cards)
src/features/products/	Product-related features, grids, modals
src/hooks/	Custom React hooks (ex: infinite scroll, auth, etc.)
src/pages/	Page-level components mapped to routes
src/routes/	Route definitions using React Router
src/types/	TypeScript types/interfaces (Product, User, etc.)
src/index.css	Tailwind base/components/utilities imports
tailwind.config.js	Tailwind config, custom colors, animations, etc.
postcss.config.js	PostCSS plugins (Tailwind, autoprefixer)
backend/controller/	Spring REST controllers (ProductController, UserController)
backend/service/	Business logic/services (ProductService, etc)
backend/repository/	Spring Data JPA Repositories
backend/model/	Entities (Product, User, Order)
backend/config/	Security/JWT/AWS/other configs

🖌️ Main Tailwind Classes Used
Layout: relative, absolute, flex, items-center, justify-center, container, mx-auto, px-4, py-16, min-h-screen

Typography: text-5xl, font-extrabold, text-lg, text-white, text-indigo-700, drop-shadow-lg

Buttons: rounded-xl, bg-white, bg-indigo-700, shadow, hover:bg-indigo-800

Backgrounds/Effects: bg-[conic-gradient(...)], opacity-80, blur-2xl, animate-gradient-move

Spacing: gap-4, mb-4, mb-6, px-6, py-3

Custom animations/configs are in tailwind.config.js under theme.extend.animation and theme.extend.keyframes.

🚀 How to Run Locally
Frontend:

bash
Copy
Edit
cd wowktm-frontend
npm install
npm run dev
# Visit http://localhost:5173/
Backend:

bash
Copy
Edit
cd wowktm-backend
./mvnw spring-boot:run
# Or use your IDE to run the main Application class
☁️ AWS Deployment (Overview)
Frontend: Build with npm run build, then deploy /dist to AWS S3 (static hosting) or serve via EC2 (Node server, Nginx, etc.).

Backend: Package as a JAR/WAR and deploy to AWS EC2, Elastic Beanstalk, or containerize with Docker and deploy to ECS.

Database: Use AWS RDS for managed MySQL/PostgreSQL.

CI/CD: Configure GitHub Actions, AWS CodePipeline, or similar for auto-deploys.