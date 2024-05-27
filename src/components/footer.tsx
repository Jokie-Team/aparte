import React from "react";
import BorderedList from "./list/bordered-list";
import Newsletter from "./newsletter";
import AccordionButton from "./buttons/forward";

const Info = [
  { title: "Terça - Sábado: 11h - 14h / 14h30 - 19h" },
  { title: "Rua de Miguel Bombarda 221, 4050-381 Porto" },
  { title: "+351 220 120 184 chamada para rede fixa nacional" },
  { title: "Facebook" },
];

const Menu = [
  { title: "Página Inicial" },
  { title: "Exposições" },
  { title: "Artistas" },
  { title: "Contactos" },
];

export default function Footer() {
  return (
    <footer className="absolute w-full bottom-0 h-4/6 border-t-1 bg-accent-1 border-t border-accent-2 text-center p-4  mt-auto">
      <h1 className="font-neue font-extrabold text-5xl text-left mb-10">
        Expomos Singularidade
      </h1>
      <div className="h-full flex ">
        <Newsletter />
        <div className="flex flex-col flex-1 justify-around">
          <BorderedList items={Info} bulleted listClassName="font-sm" />
          <BorderedList
            classNames="mt-15"
            items={Menu}
            bulleted={false}
            listClassName="font-lg font-bold"
          />
        </div>
      </div>
      <div className="text-left text-xs">
        <span className="pr-10 py-5">
          © 2010 AP'ARTE Galeria de Arte Contemporânea
        </span>
        <span>Todos os Direitos Reservados</span>
      </div>
    </footer>
  );
}
