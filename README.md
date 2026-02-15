# VelcoreTech
📌 Overview

Velcore Tech is a structured, SEO-optimized React application built to support:
	•	Core service marketing
	•	Local SEO city hubs (Santa Cruz & Bay Area)
	•	Structured metadata & Open Graph integration
	•	JSON-LD schema markup
	•	Scalable service architecture
	•	Assessment intake + backend integration

This project is designed for:
	•	Clean information architecture
	•	Controlled SEO growth
	•	Easy expansion of service pages and city pages
	•	Long-term maintainability

  🏗️ Architecture Overview

Tech Stack
	•	React + TypeScript
	•	React Router
	•	React Helmet Async (SEO + metadata)
	•	Framer Motion (animation)
	•	TailwindCSS
	•	Lucide Icons
	•	React Query
	•	Custom UI component system
📁 Project Structure
/pages
  /city
    /santa-cruz
      index.tsx
      managed-it.tsx
      cybersecurity.tsx
      cloud-migration.tsx
      edge-security.tsx

    /bay-area
      index.tsx
      managed-it.tsx
      cybersecurity.tsx
      cloud-migration.tsx
      edge-security.tsx

  Home.tsx
  Services.tsx
  Pricing.tsx
  Industries.tsx
  About.tsx
  Contact.tsx
  Assessment.tsx
  Team.tsx
  
🧭 Routing System
App.tsx
<Route path="/assessment" element={<Assessment />} />
<Route path="/city/santa-cruz/managed-it" element={<SantaCruzManagedIT />} />

✅ Rule:

Every new page must:
	1.	Be created inside /pages
	2.	Be imported into App.tsx
	3.	Be registered as a <Route />

  🌍 Local SEO Architecture

City Hub Model
Each city has:

/city/{city}
/city/{city}/managed-it
/city/{city}/cybersecurity
/city/{city}/cloud-migration
/city/{city}/edge-security

Example:
/city/bay-area
/city/bay-area/managed-it

Why this matters:
	•	Clear URL hierarchy
	•	Proper canonical control
	•	Avoids duplicate keyword cannibalization
	•	Supports geographic ranking expansion
  
🧠 SEO Structure

Each page contains:
1️⃣ Helmet Metadata

<Helmet>
  <title>Managed IT Services Bay Area | Velcore Tech</title>
  <meta name="description" content="..." />
  <link rel="canonical" href="https://velcoretech.com/city/bay-area/managed-it" />
</Helmet>

2️⃣ Open Graph Tags
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:url" content="..." />
<meta property="og:image" content="https://velcoretech.com/og-image.jpg" />

3️⃣ JSON-LD Structured Data

Each city service page includes:
	•	ProfessionalService
	•	BreadcrumbList

Example:
<script type="application/ld+json">
  {JSON.stringify(jsonLdService)}
</script>

🗺️ Sitemap
Located at: /public/sitemap.xml

Whenever you:
	•	Add a new service page
	•	Add a new city page
	•	Add a new core page

You must manually add it to the sitemap.

🧩 Adding a New City

Step-by-Step

1️⃣ Create Folder
/pages/city/new-city

2️⃣ Create Pages
	•	index.tsx
	•	managed-it.tsx
	•	cybersecurity.tsx
	•	cloud-migration.tsx
	•	edge-security.tsx

3️⃣ Copy Existing Structure

Use Bay Area as the template:
	•	Breadcrumbs
	•	Helmet
	•	JSON-LD
	•	Open Graph
	•	Canonical
	•	Related Services block

4️⃣ Register Routes in App.tsx
<Route path="/city/new-city" element={<NewCity />} />


5️⃣ Add to Sitemap
⸻
🛠️ Modifying Services
Global services live in: /pages/Services.tsx
Each service block uses: const services: Service[] = [...]

To add a new global service:
	1.	Add entry to ServiceId
	2.	Add service object
	3.	Ensure anchor ID matches
	4.	Add local SEO mapping if needed

⸻

📊 Assessment System

Location:/pages/Assessment.tsx

Features:
	•	Structured intake
	•	Conditional logic
	•	Edge security section
	•	Honeypot spam protection
	•	POST to /api/contact

If modifying form:
	•	Keep backend payload format intact
	•	Update validation logic
	•	Update required fields logic

⸻

🧭 Breadcrumb System
Reusable component: function Breadcrumbs({ items })


Used in:
	•	City hubs
	•	City service pages

If creating a new page:
Always include breadcrumb JSON-LD + UI breadcrumb.

⸻

🎨 UI System
Core components:

/components/ui/


Includes:
	•	Button
	•	Input
	•	Select
	•	Textarea
	•	SectionHeader
	•	Layout

When modifying styling:
	•	Maintain Tailwind consistency
	•	Keep rounded-3xl structure
	•	Maintain visual hierarchy

⸻

⚠️ Important Conventions
🔒 Canonical Rule

Canonical must match the exact route.
Example Routre: /city/bay-area/managed-it
Example Canonical: https://velcoretech.com/city/bay-area/managed-it


🔤 URL Rules

Always:
	•	lowercase
	•	hyphen-separated
	•	no underscores
	•	no query parameters for SEO pages

⸻

🚀 Deployment Checklist

Before pushing:
	•	Canonicals match route
	•	No spelling errors in URL paths
	•	Sitemap updated
	•	Open Graph tags correct
	•	Breadcrumb JSON-LD correct
	•	No duplicate titles
	•	Assessment route correct (/assessment)
	•	OG image loads properly

⸻

🔮 Scaling Strategy

Future expansion:
	•	Add more cities
	•	Add industry-specific pages
	•	Add blog under /resources
	•	Add comparison pages
	•	Add case studies

Structure already supports scaling without refactor.

⸻

🧠 Philosophy of This Project

This is not a “theme site.”

It is built as:
	•	A structured SEO system
	•	A service architecture
	•	A scalable geographic expansion framework
	•	A defensible marketing platform

⸻

📞 Support Notes

If modifying:
	•	Routes → App.tsx
	•	Metadata → inside each page’s Helmet
	•	Structured data → JSON-LD in each page
	•	Sitemap → public/sitemap.xml
	•	Assessment intake → Assessment.tsx

⸻

✅ Current SEO Targets

Bay Area:
	•	Managed IT Bay Area
	•	Cybersecurity Bay Area
	•	Cloud Migration Bay Area
	•	Edge Security Bay Area

Santa Cruz:
	•	Managed IT Santa Cruz
	•	Cybersecurity Santa Cruz
	•	Cloud Migration Santa Cruz
	•	Edge Security Santa Cruz

⸻


