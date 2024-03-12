import DropdownButton from "./buttons/dropdown";
import Button from "./buttons/button";
import ForwardButton from "./buttons/forward";

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <div className="container mx-auto px-5">
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <DropdownButton />
          <Button text="teste" />
          <ForwardButton text="label" />
        </div>
      </div>
    </footer>
  );
}
