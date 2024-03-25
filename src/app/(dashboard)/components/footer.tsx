import DropdownButton from "./buttons/dropdown";
import Button from "./buttons/button";
import ForwardButton from "./buttons/forward";
import IconButton from "./buttons/icon";
import TextButton from "./buttons/text";

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <div className="container mx-auto px-5">
        <div className="py-28 flex flex-col space-y-10">
          <div>
            <div>Dropdown Button</div>
            <DropdownButton />
          </div>
          <div>
            <div>Button</div>
            <Button text="teste" />
          </div>
          <div>
            <div>Forward Button</div>
            <ForwardButton text="label" />
          </div>
          <div>
            <div>Icon Button</div>
            <IconButton direction="left" />
          </div>
          <div>
            <div>Text Button</div>
            <TextButton text="Label" />
          </div>
        </div>
      </div>
    </footer>
  );
}
