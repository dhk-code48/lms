import Image from "next/image";

export const Logo = ({ lgSize: size }: { lgSize: boolean }) => {
  return (
    <div className="flex items-center justify-center gap-x-2">
      <Image
        height={size ? 200 : 130}
        width={size ? 200 : 130}
        alt="logo"
        src="https://swarnimpublication.com.np/frontend/img/logo.png"
      />
    </div>
  );
};
