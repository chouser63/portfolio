import { StaggeredGallery } from "@/components/ui/staggered-gallery";

export default function Experience() {

    const galleryData = {
        title: "Project Showcase",
        items: [
            {
                title: "Level 1 — Neural Pathways",
                description:
                    "A visualization of how machine learning models interpret and connect data points. This level introduces the core AI concepts behind my research project, blending interactivity and data visualization.",
                image_urls: [
                    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=800&q=80",
                ],
            },
            {
                title: "Level 2 — Code Architecture",
                description:
                    "An interactive diagram of the system architecture for my full-stack web application project, highlighting API routes, data flows, and deployment pipelines.",
                image_urls: [
                    "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
                ],
            },
            {
                title: "Level 3 — Design Systems",
                description:
                    "A collection of modular UI components designed with Tailwind and ShadCN, showcasing the visual identity and accessibility-first approach of my portfolio.",
                image_urls: [
                    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1612832021044-ccfdf2d9c5db?auto=format&fit=crop&w=800&q=80",
                ],
            },
            {
                title: "Level 4 — Motion & Interaction",
                description:
                    "This level highlights my experience with front-end animations and transitions using Framer Motion, improving user engagement and perceived performance.",
                image_urls: [
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
                ],
            },
        ],
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center pt-6">
            <StaggeredGallery gallery={galleryData} />;
        </div>
    );
}
