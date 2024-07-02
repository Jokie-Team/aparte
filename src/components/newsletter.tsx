"use client";

import { useState } from "react";
import Button from "./buttons/button";
import AccordionButton from "./buttons/forward";
import Input from "./input/input";

const Newsletter = () => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className="w-7/12">
      <div className="flex-1 w-3/5">
        <AccordionButton
          text="Subscrever Newsletter"
          clicked={clicked}
          setClicked={setClicked}
        >
          <>
            <Input id="name" label="Nome" onChange={() => {}} />
            <Input id="email" label="Email" onChange={() => {}} />
          </>
        </AccordionButton>
        <div className="text-left my-4 text-sm flex flex-row justify-between items-center">
          <span> Manter-se a par das últimas notícias</span>
          {clicked && (
            <Button classnames="mt-2 p-1" text="Subscrever" filled={true} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
