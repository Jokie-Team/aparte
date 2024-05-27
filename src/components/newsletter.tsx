import AccordionButton from "./buttons/forward";

const Newsletter = () => {
  return (
    <div className="w-7/12">
      <div className="flex-1">
        <AccordionButton text="Subscrever Newsletter">
          <div>form here</div>
        </AccordionButton>
      </div>
      <div className="text-left my-4 text-sm">
        Manter-se a par das últimas notícias
      </div>
    </div>
  );
};

export default Newsletter;
