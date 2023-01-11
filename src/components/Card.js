import { createPortal } from "react-dom";
import { useEffect } from "react";

function Card({ name, img }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, []);
  return createPortal(
    <div>
      <div className="fixed inset-0 bg-gray-300 opacity-80"></div>
      <div className="fixed inset-10 md:inset-40 xl:inset-72 p-6 md:p-10 bg-white opacity-100 flex justify-between">
        <h3 className="text-2xl font-black">{name}</h3>
        <div className="self-end">
          <img src={img} alt="" width={240} height={240} />
        </div>
      </div>
    </div>,
    document.querySelector(".card__container")
  );
}

export default Card;
