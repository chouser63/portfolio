import { StaggeredGallery } from "@/components/ui/staggered-gallery";

export default function Experience() {

    const galleryData = {
        title: "Projects & Experience",
        items: [
            {
                title: {
                    text: "Odyssey - Full-Stack Development",
                    link: "https://khouryodyssey.org",
                    github: "https://github.com/KhourySpecialProjects/odyssey",
                },
                description:
                    "Contributed to Odyssey, a learning platform for asynchronous skill-building courses. Developed and launched 12+ major features including note-taking, text highlighting, due dates, dark mode, and a personalized activity feed. Built a responsive UI with Next.js and Tailwind, and architected dev and prod deployments on AWS using ECS Fargate, RDS, S3, etc. Fun fact! I designed the features page of Odyssey as a reusable component which is what makes up this page!",
                image_urls: [
                    "/images/odyssey-explore.png",
                    "/images/odyssey-architecture.png",
                    "/images/odyssey-feed.png",
                    "/images/odyssey-group.png",
                    "/images/odyssey-note.png",
                    "/images/odyssey-features.png",
                ],
            },
            {
                title: {
                    text: "Home Automation & Embedded Systems, Complete Home Technology",
                    link: "http://www.completehometechnology.com"
                },
                description:
                    "Installed and programmed premium home automation systems using Crestron and RTI processors, integrating network, audio/visual, and security technologies for residential clients. Managed complex $30k–$50k system setups and provided technical support and maintenance to multiple clients weekly.",
            },
            {
                title: {
                    text: "Local League Legends",
                    github: "https://github.com/maxn990/24s-project-awesome-big-money",
                },
                description:
                    "Collaborated with a four-person team to build a sports league management application in a containerized environment. Designed and implemented a Flask REST API with 59 routes supporting CRUD operations on a MySQL database, integrated with an Appsmith front-end, and established role-based access control with four permission tiers.",
            },
            {
                title: "Database Design Teaching Assistant",
                description:
                    "Served as a teaching assistant for Introduction to Databases at Northeastern University. Conducted weekly office hours to support students, clarified relational model concepts, and graded over 120 submissions per assignment. Focused on improving student understanding of SQL, schema design, and query optimization.",
            },
        ],
    };


    return (
        <div className="w-full h-full flex flex-col items-center justify-center pt-6">
            <StaggeredGallery gallery={galleryData} />;
        </div>
    )
}
