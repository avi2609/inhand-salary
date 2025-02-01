export default function Home() {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-1/2 h-full bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold">Responsive Card</h2>
          <p className="text-gray-600 mt-2">
            This card takes up half the screen width and the full screen height.
          </p>
        </div>
      </div>
    </>
  );
}
