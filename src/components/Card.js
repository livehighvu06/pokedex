import { createPortal } from "react-dom";
import { useEffect } from "react";

function Card({ name, img, onClose, bgImage, types, genus }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);
  return createPortal(
    <div>
      <div
        className="fixed inset-0 bg-gray-300 opacity-80 cursor-pointer"
        onClick={onClose}
      ></div>
      <div
        className="fixed flex flex-col justify-between top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 m-auto text-white p-6 md:p-10 bg-white border-4 rounded-lg opacity-100 shadow-2xl"
        style={bgImage}
      >
        <div className="rounded-full -mt-20 mb-6 bg-white border-8">
          <img src={img} alt="" width={240} height={240} />
        </div>
        <div className="flex flex-col">
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-black mb-6 text-center">
            {name}
          </h3>
          <div className="mt-auto ">
            <p>{genus}</p>
            <ol className="flex">
              {types.map((type) => {
                return <li className="mr-4">{type.type.name}</li>;
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>,
    document.querySelector(".card__container")
  );
}

export default Card;
