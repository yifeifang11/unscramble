import React from "react";
import "../index.css";

const Header = () => {
  return (
    <div className="daniels text-center pt-10 flex flex-col items-center">
      <h1 id="title" className="text-5xl mb-5">
        EKREB
      </h1>
      <p>
        Ekreb is having an identity crisis and can't figure out his name! Help
        him unscramble his name by unscrambling the words he gives you.
      </p>
      <p>
        Every time you guess correctly, you restore some of his sanity. Make his
        sanity reach 100 to unscramble his name!
      </p>
    </div>
  );
};

export default Header;
