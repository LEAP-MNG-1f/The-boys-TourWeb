import ViewAllPicture from "../viewallpage/components/ViewAllPicture";

const AboutUsText = () => {
  return (
    <div className="w-full h-screen px-[540px]">
      <div className="">
        <div className="flex justify-end gap-5">
          {[
            { text: "Company", isBold: true },
            { text: "Our Team", isBold: false },
          ].map((item, index) => (
            <button
              key={index}
              className={`
                text-gray-800
                hover:text-[#FC8233]
                font-semibold
                hover:underline
                transition-all
                duration-300
                ease-in-out
                transform
                hover:scale-105
              `}
            >
              {item.text}
            </button>
          ))}
        </div>
        <div className="mt-[70px] flex justify-around gap-28">
          <h2 className="font-bold w-[300px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five
          </h2>
          <h2 className="font-bold w-[300px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five
          </h2>
          <h2 className="font-bold w-[300px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five
          </h2>
        </div>
        <ViewAllPicture />
        <div>
          <h2 className="font-bold w-[800px]">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five
          </h2>
        </div>
      </div>
    </div>
  );
};
export default AboutUsText;
