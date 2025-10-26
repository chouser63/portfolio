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
                    "Contributed to Odyssey, a new Northeastern University learning platform for asynchronous skill-building courses. Developed and launched 12+ major features including note-taking, text highlighting, due dates, dark mode, and a personalized activity feed. Built a responsive UI with Next.js and Tailwind, and architected dev and prod deployments on AWS using ECS Fargate, RDS, S3, etc. Fun fact! I designed the features page of Odyssey as a reusable component which is what makes up this page!",
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
                    text: "DubOps - 1st Place AWS Track Winner at DubHacks (University of Washington)",
                    link: "https://devpost.com/software/dubops"
                },
                description:
                    "Developed an AI-powered DevOps automation platform using AWS Bedrock (Claude 3 Sonnet) to analyze Github repositories and automatically generate AWS Infrastructure as Code (IAC) configurations with Terraform and Docker. DubOps is a full-stack application with a Next.js/Typescript frontend and a Python Flask backend, implementing Github OAuth to allow for automated pull request creation to seamlessly add IAC to your codebase.",
                image_urls: [
                    "/images/DubOpsLogoSquare.png",
                ],
            },
            {
                title: {
                    text: "Odyssey - Chancellor Presentations",
                },
                description:
                    "Delivered two presentations pitching Odyssey to Northeastern University leadership, including Chancellor Ken Henderson, Vice Chancellors, Deans, and members of the Khoury College advising team, highlighting the project’s potential campus-wide applications.",
                image_urls: [
                    "/images/odyssey-presentation-1.jpg",
                    "/images/odyssey-presentation-2.jpg",
                    "/images/odyssey-presentation-3.png",
                ],
            },
            {
                title: {
                    text: "Local League Legends",
                    github: "https://github.com/maxn990/24s-project-awesome-big-money",
                },
                description:
                "Built a Dockerized three-tier web app for managing local sports leagues with a Flask REST API, MySQL database, and Appsmith frontend. Implemented RESTful API endpoints and SQL queries to support player registration, scheduling, and team management."
            },
            {
                title: "Database Design Teaching Assistant",
                description:
                    "Served as a teaching assistant for Introduction to Databases at Northeastern University. Conducted weekly office hours to support students, clarified relational model concepts, and graded over 120 submissions per assignment. Focused on improving student understanding of SQL, schema design, and query optimization.",
            },
            {
                title: {
                    text: "Home Automation & Embedded Systems, Complete Home Technology",
                    link: "http://www.completehometechnology.com"
                },
                description:
                    "Installed and programmed premium home automation systems using Crestron and RTI processors, integrating network, audio/visual, and security technologies for residential clients. Managed complex $30k–$50k system setups and provided technical support and maintenance to multiple clients weekly.",
            },
        ],
    };


    return (
        <div className="w-full h-full flex flex-col items-center justify-center pt-6">
            <StaggeredGallery gallery={galleryData} />
        </div>
    )
}
