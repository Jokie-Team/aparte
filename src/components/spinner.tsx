export default function Spinner() {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-gray-800 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-gray-800 rounded-full animate-bounce [animation-delay:0.2s]"></div>
        <div className="w-3 h-3 bg-gray-800 rounded-full animate-bounce [animation-delay:0.4s]"></div>
      </div>
    </div>
  );
}
