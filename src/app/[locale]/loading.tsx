import Spinner from "@/src/components/spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <Spinner />
    </div>
  );
}
