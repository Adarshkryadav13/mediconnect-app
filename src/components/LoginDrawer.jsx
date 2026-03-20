import Login from "../pages/Login";

function LoginDrawer({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-40"
        onClick={onClose}
      />

      {/* DRAWER */}
      <div className="
        fixed top-0 right-0 h-full
        w-full md:w-[420px]
        bg-white z-50
        shadow-xl
        transition-transform
      ">
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Sign In</h2>
          <button
            onClick={onClose}
            className="text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          <Login onSuccess={onClose} />
        </div>
      </div>
    </>
  );
}

export default LoginDrawer;
