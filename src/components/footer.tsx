import DropdownButton from "./buttons/dropdown";

export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <div className="container mx-auto px-5">
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <DropdownButton />
        </div>
      </div>
    </footer>
  );
}
