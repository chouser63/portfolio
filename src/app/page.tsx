import { ProgressClicker } from "@/components/progress-clicker";
import ProfilePicture from "@/components/ui/profile-picture";
import { SocialIcon } from 'react-social-icons'

export default function Home() {


  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-12 space-y-12">
      <div className="w-2/3 flex flex-col sm:flex-row items-center justify-center space-y-12 sm:space-y-0 sm:space-x-12">
        <ProfilePicture src="/images/profile-photo.JPG" size={300} />
        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          Hi, I&apos;m Chase.
        </h1>
      </div>
      <div className="w-3/4 sm:w-1/2 space-y-6 text-xl text-slate-700 dark:text-white">
        <div className="flex flex-row space-x-6">
          <SocialIcon url="https://www.github.com/chouser63" target="_blank" rel="noopener noreferrer"/>
          <SocialIcon url="https://www.linkedin.com/in/chase-houser/" target="_blank" rel="noopener noreferrer"/>
        </div>
        <p>
          I&apos;m a third-year Computer Science and Business Administration student at Northeastern University with a deep passion for learning new things and a belief in having a wide breadth of experiences.
        </p>
        <p>
          In the past, I&apos;ve worked as a bike mechanic, a home automation technician, and co-managed a local charity that donated refurbished bicycles.
        </p>
        <p>
          Most recently, I worked at Northeastern University as a full-stack software engineer, contributing to a learning platform called <a href="https://khouryodyssey.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">Odyssey</a>.
        </p>
        <p>
          I&apos;m particularly interested in using AWS to build full-stack applications using services like ECS, S3, and RDS.
        </p>
      </div>

      <div className="w-3/4 sm:w-1/2 space-y-4 text-xl text-slate-700 dark:text-white">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Contact
        </h1>
        <p>
          houser.ch@northeastern.edu
          <br />
          +1(847)-284-5315
        </p>
      </div>

      <div className="w-3/4 sm:w-1/2">
        <ProgressClicker />
      </div>

    </div>
  );
}
