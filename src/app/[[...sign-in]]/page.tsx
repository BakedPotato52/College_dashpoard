'use client'

import * as Clerk from "@clerk/elements/common"
import * as SignIn from "@clerk/elements/sign-in"
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useNavigation } from 'react-router-dom'

export default function LoginPage() {
  const { user, isLoaded } = useUser();
  const router = useNavigation();
  const [isRouting, setIsRouting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      const role = user.publicMetadata.role as string | undefined;
      if (role && !isRouting) {
        setIsRouting(true);
        router(`/${role.toLowerCase()}`);
      } else if (!role) {
        setError("User role is undefined. Please contact support.");
        setIsRouting(false);
      }
    }
  }, [user, isLoaded, router, isRouting]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lamaSkyLight">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
          <h1 className="text-2xl font-bold text-center mb-4">Error</h1>
          <p className="text-red-500 text-center">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 w-full bg-blue-500 text-white rounded-md text-sm p-[10px]"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  if (isRouting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lamaSkyLight">
        <div className="bg-white p-8 rounded-lg shadow-2xl w-96">
          <h1 className="text-2xl font-bold text-center mb-4">Redirecting...</h1>
          <div className="loader"></div>
        </div>
      </div>
    );
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
          <Clerk.Field name="identifier" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Username
            </Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <Clerk.Field name="password" className="flex flex-col gap-2">
            <Clerk.Label className="text-xs text-gray-500">
              Password
            </Clerk.Label>
            <Clerk.Input
              type="password"
              required
              className="p-2 rounded-md ring-1 ring-gray-300"
            />
            <Clerk.FieldError className="text-xs text-red-400" />
          </Clerk.Field>
          <SignIn.Action
            submit
            className="bg-blue-500 text-white my-1 rounded-md text-sm p-[10px] w-full"
          >
            Sign In
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  )
}