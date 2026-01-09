import Image from "next/image";

const Logo = () => {
  return (
    <div className="flex items-center gap-1 text-2xl font-bold text-white">
      <Image width={75} height={50} src="/icons/logo.svg" alt="" />
    </div>
  );
};
export default Logo;
