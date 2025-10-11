import { ProgressClicker } from "@/components/progress-clicker";
import ProfilePicture from "@/components/ui/profile-picture";
import { Progress } from "@/components/ui/progress";
import Image from "next/image";


export default function Home() {



  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-6 space-y-6">
      <div className="w-2/3 flex flex-row items-center justify-center space-x-12">
        <ProfilePicture src="/images/profile-photo.jpg" size={300}/>

        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
          Hi, I'm Chase.
        </h1>
      </div>

      <div className="w-1/2">
        <ProgressClicker />
      </div>

    </div>
  );
}
