import { BiSolidMessageDots } from "react-icons/bi";

export default function TextRegister({ style }) {
  return (
    <div className={`${style} flex items-end perspective`}>
      <span className="text-[95px] font-bold text-black hidden lg:flex">
        <BiSolidMessageDots className="absolute -translate-y-[4px] translate-x-[4px]" />
        <BiSolidMessageDots className="text-gray-600" />
      </span>
      <div
        className={`flex flex-col uppercase justify-center text-white leading-snug w-[122px] lg:w-[200px]`}
      >
        <span className="text-[45px] font-bold flex justify-end text-black translate-y-5 lg:hidden">
          <BiSolidMessageDots className="absolute -translate-y-[2px] " />
          <BiSolidMessageDots className="text-gray-600" />
        </span>
        <div className="font-bold flex gap-3 items-end translate-y-4">
          <span className="relative text-4xl lg:text-7xl">
            <p className="absolute -translate-y-[2px] lg:-translate-y-[4px] lg:translate-x-[4px]">
              Join
            </p>
            <p className=" text-gray-600">Join</p>
          </span>
          <span className="relative text-xl lg:text-3xl">
            <p className=" absolute -translate-y-[2px] lg:-translate-y-[4px] lg:translate-x-[4px]">
              to
            </p>
            <p className=" text-gray-600">to</p>
          </span>
        </div>

        <div className="relative text-lg lg:text-4xl font-bold tracking-wider lg:tracking-tight translate-y-2">
          <span className=" absolute -translate-y-[2px] lg:-translate-y-[4px] lg:translate-x-[4px]">
            thousands
          </span>
          <span className=" text-gray-600">thousands</span>
        </div>
        <div className="font-bold flex gap-1 items-end ">
          <span className="relative text-xl lg:text-3xl">
            <p className=" absolute -translate-y-[2px] lg:-translate-y-[4px] lg:translate-x-[4px]">
              of
            </p>
            <p className=" text-gray-600">of</p>
          </span>
          <span className="relative text-3xl lg:text-6xl lg:tracking-tight">
            <p className="absolute -translate-y-[2px] lg:-translate-y-[4px] lg:translate-x-[4px]">
              Users
            </p>
            <p className=" text-gray-600">Users</p>
          </span>
        </div>
      </div>
    </div>
  );
}
