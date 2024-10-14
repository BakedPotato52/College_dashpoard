'use client'

import { Button } from "@/components/ui/button"
import * as Clerk from "@clerk/elements/common"
import * as SignIn from "@clerk/elements/sign-in"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { EyeIcon, EyeOffIcon } from "lucide-react"

export default function LoginPage() {
  const { isLoaded, isSignedIn, user } = useUser()
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')

  const router = useRouter()

  useEffect(() => {
    const role = user?.publicMetadata.role

    if (role) {
      router.push(`/${role}`)
    }
  }, [user, router])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulating login process
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Add your login logic here
    // For demonstration, we'll just set a random error
    if (Math.random() > 0.5) {
      setError("Invalid username or password")
    } else {
      // Successful login
      router.push('/dashboard')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-lamaSkyLight">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="bg-white p-8 rounded-lg shadow-2xl w-96"
        >
          <div className="mb-6 text-center">
            <Image src="/logo.png" alt="SchooLama Logo" width={48} height={48} className="mx-auto mb-2" />
            <h1 className="text-2xl font-bold">SchooLama</h1>
            <h2 className="text-gray-500 text-sm">Sign in to your account</h2>
          </div>

          <Clerk.GlobalError className="text-sm text-red-500 mb-4" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <Clerk.Field name="identifier" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-gray-700">
                Username
              </Clerk.Label>
              <Clerk.Input
                type="text"
                required
                className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Clerk.FieldError className="text-xs text-red-500" />
            </Clerk.Field>

            <Clerk.Field name="password" className="space-y-2">
              <Clerk.Label className="text-sm font-medium text-gray-700">
                Password
              </Clerk.Label>
              <Clerk.Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"

              >
              </Clerk.Input>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-4 w-4 text-gray-500" />
                ) : (
                  <EyeIcon className="h-4 w-4 text-gray-500" />
                )}
              </Button>
              <Clerk.FieldError className="text-xs text-red-500" />
            </Clerk.Field>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                  Forgot your password?
                </Link>
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <SignIn.Action
              submit
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </SignIn.Action>
          </form>


          <p className="mt-8 text-center text-sm text-gray-600">
            Not a member?{' '}
            <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up now
            </Link>
          </p>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  )
}