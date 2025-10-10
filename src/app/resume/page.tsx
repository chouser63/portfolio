export default function Resume() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center pt-6">

        <embed
        src="/resume.pdf"
        type="application/pdf"
        className="w-2/3 h-screen mt-12"
      />
      
      
    </div>
  );
}
