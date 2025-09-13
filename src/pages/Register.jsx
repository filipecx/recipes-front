export function Register() {
  return (
    <div class="flex h-screen bg-secondary">
      <div className="w-1/2 lg:w-1/2 flex rounded-r-3xl items-center justify-center bg-white">
        <form className="w-4/5 max-w-md space-y-6">
          <h1 className="text-2x1 font-bold text-gray-800">Login</h1>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              E-mail
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-lime-200 text-gray-700 py-2 rounded-lg hover:bg-green-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
