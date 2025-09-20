import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";

export function Login() {
  const [formData, setFormData] = useState({username: "", password: ""})
  const [userNameError, setUsernameError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const regex = /^[A-Za-z0-9 ]+$/

    if (!formData.username.trim()) {
      setUsernameError("Mandatory field")
    } else if (!regex.test(formData.username)) {
      setUsernameError("Only letters and numbers allowed")
    }

    if (!formData.password.trim()) {
      setPasswordError("Mandatory field")
    }

    

    try {
      const response = await Axios.post(`http://localhost:8080/auth/login`, formData, {
         headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true // if backend sets cookies
      })
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <div class="flex h-screen bg-secondary justify-center">
      <div className="w-full lg:w-1/2 flex rounded-r-3xl items-center justify-center bg-white">
        <form className="w-4/5 max-w-md space-y-6 p6" onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold text-gray-800">Login</h1>
          <div>
            
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            {userNameError && <p className="text-red-500 txt-sm">{userNameError}</p>}
            <input
              name="username"
              type="text"
              value={formData.username}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2  focus:ring-green-500 ${userNameError ? "border-red-500" : "border-black-500"}`}
              onChange={handleChange}
            />
            
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            {passwordError && <p className="text-red-500 txt-sm">{passwordError}</p>}
            <input
              name="password"
              type="password"
              value={formData.password}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${passwordError ? "border-red-500" : "border-black-500"}`}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-200 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}
