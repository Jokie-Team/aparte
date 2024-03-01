import { ArrowBackIcon } from "./icons/arrow-back";
export default function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <div className="container mx-auto px-5">
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <p className="font-neue text-orange">This is a footer</p>
          <ArrowBackIcon />
        </div>
      </div>
    </footer>
  );
}
