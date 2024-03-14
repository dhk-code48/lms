import Image from "next/image";

export const Logo = () => {
  return (
    <div className="flex items-center justify-center gap-x-2">
      <Image height={50} width={50} alt="logo" src="/logo.jpg" className="rounded-full" />
      <h1 className="font-bold tracking-wide">Swarnim Publisher</h1>
    </div>
  );
};
