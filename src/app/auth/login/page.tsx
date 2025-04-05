"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BackgroundBeams } from "@/components/ui/background-beams"
import { Eye, EyeOff, Package, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const userData = localStorage.getItem("userData")
    if (userData) {
      router.push("/auth/home")
    }
  }, [router])

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      setError("Email and password are required")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // In a real app, you would make an API call here
      // For this example, we'll simulate a successful login with any credentials

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data
      const userData = {
        id: "user123",
        email: email,
        name: email.split("@")[0], // Use part of email as name
        role: "developer",
        avatar: null,
        createdAt: new Date().toISOString(),
      }

      // Store user data in localStorage
      localStorage.setItem("userData", JSON.stringify(userData))

      // Redirect to home page
      router.push("/auth/home")
    } catch (err) {
      console.error("Login error:", err)
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white relative">
      {/* Background Beams */}
      <BackgroundBeams className="opacity-40" colors={["#0a2463", "#3e92cc", "#2a628f", "#13293d", "#16324f"]} />

      <Card className="w-[350px] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-lg bg-blue-500 flex items-center justify-center text-white">
              <Package className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-xl text-center">Login to ChainPack</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Enter your credentials to access your account
          </p>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md text-red-600 dark:text-red-400 flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-400">
                    Remember me
                  </label>
                </div>
                <a href="#" className="text-sm text-blue-500 hover:text-blue-600">
                  Forgot password?
                </a>
              </div>
            </div>
            <Button onClick={handleLogin} className="w-full bg-blue-500 hover:bg-blue-600" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-blue-500 hover:text-blue-600">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

