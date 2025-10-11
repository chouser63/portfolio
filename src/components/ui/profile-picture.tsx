import Image from "next/image";

export default function ProfilePicture({ src, size }: { src: string, size: number }) {
  return (
    <div className="rounded-full overflow-hidden"
      style={{ width: size, height: size }}>
      <Image
        src={src}
        alt="Profile"
        width={size}
        height={size}
        className="object-cover w-full h-full"
      />
    </div>
  );
}
