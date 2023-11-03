import { TbWorld } from "react-icons/tb";

export default function TextLogin({ style }) {
  return (
    <div className={`${style} flex perspective lg:flex-col`}>
      <div className="flex flex-col uppercase text-white leading-snug w-[122px] lg:w-[200px]">
        <span className="text-[45px] font-bold flex justify-end text-black translate-y-3 lg:hidden">
          <TbWorld className="absolute -translate-y-[2px]" />
          <TbWorld className="text-gray-600" />
        </span>
        <div className="relative font-bold text-2xl lg:text-5xl translate-y-1">
          <span className="  absolute  -translate-y-[2px] lg:-translate-y-[4px] lg:translate-x-[4px]">
            welcome
          </span>
          <span className="  text-gray-600 ">welcome</span>
        </div>
        <div className="font-bold flex gap-2 items-end">
          <span className="relative text-2xl lg:text-6xl">
            <p className=" absolute -translate-y-[2px] lg:-translate-y-[4px] lg:translate-x-[4px]">
              to
            </p>
            <p className=" text-gray-600">to</p>
          </span>
          <span className="relative text-4xl lg:text-3xl">
            <p className="absolute -translate-y-[2px] lg:-translate-y-[4px] lg:translate-x-[4px]">
              our
            </p>
            <p className=" text-gray-600">our</p>
          </span>
        </div>
        <div className="relative text-3xl lg:text-6xl font-bold tracking-[0.06em]">
          <span className=" absolute -translate-y-[2px] lg:-translate-y-[4px] lg:translate-x-[4px]">
            world
          </span>
          <span className=" text-gray-600">world</span>
        </div>
      </div>
      <span className="text-[95px] font-bold text-black hidden lg:flex">
        <TbWorld className="absolute -translate-y-[2px] lg:-translate-y-[4px] lg:translate-x-[4px]" />
        <TbWorld className="text-gray-600" />
      </span>
    </div>
  );
}
