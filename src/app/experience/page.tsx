import { StaggeredGallery } from "@/components/ui/staggered-gallery";

export default function Experience() {

    const galleryData = {
        title: "Projects & Experience",
        items: [
            {
                title: "Odyssey — Full-Stack Development, Khoury College",
                description:
                    "Contributed to Odyssey, a learning platform for asynchronous skill-building courses. Developed and launched 12 major features including note-taking, text highlighting, due dates, dark mode, and a personalized activity feed. Built a responsive UI with Next.js 15 and Tailwind CSS, maintained a cohesive design system, and implemented CI/CD pipelines on AWS using ECS Fargate, RDS, and S3. Refactored storage modules to optimize API performance and achieved 95% test coverage through over 200 Jest unit tests.",
                image_urls: [
                    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=800&q=80",
                ],
            },
            {
                title: "Home Automation & Embedded Systems, Complete Home Technology",
                description:
                    "Installed and programmed premium home automation systems using Crestron and RTI processors, integrating network, audio/visual, and security technologies for residential clients. Managed complex $30k–$50k system setups and provided technical support and maintenance to multiple clients weekly.",
                image_urls: [
                    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1612832021044-ccfdf2d9c5db?auto=format&fit=crop&w=800&q=80",
                ],
            },
            {
                title: "Local League Legends, Northeastern University",
                description:
                    "Collaborated with a four-person team to build a sports league management application in a containerized environment. Designed and implemented a Flask REST API with 59 routes supporting CRUD operations on a MySQL database, integrated with an Appsmith front-end, and established role-based access control with four permission tiers.",
                image_urls: [
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
                    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
                ],
            },
            {
                title: "Database Teaching Assistant, Northeastern University",
                description:
                    "Served as a Teaching Assistant for Introduction to Databases at Northeastern University. Conducted weekly office hours to support students, clarified relational model concepts, and graded over 120 submissions per assignment. Focused on improving student understanding of SQL, schema design, and query optimization.",
                image_urls: [
                    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
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
