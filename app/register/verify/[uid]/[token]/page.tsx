"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { authService } from "@/lib/http";

const VerifyAccountPage = () => {
  const { uid, token } = useParams() as { uid: string; token: string };
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const verifyUser = async () => {
      try {
        await authService.activate(uid, token);
        setStatus("success");
        // Redirect after 2 seconds
        setTimeout(() => router.push("/login"), 2000);
      } catch (error) {
        setStatus("error");
      }
    };

    if (uid && token) verifyUser();
  }, [uid, token, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-base-200 text-base-content">
      <div className="card bg-base-100 shadow-xl w-full max-w-md p-8 text-center">
        {status === "loading" && (
          <>
            <h2 className="text-xl font-semibold mb-2">
              Activating your account...
            </h2>
            <p className="text-sm text-gray-500">Please wait a moment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <h2 className="text-xl font-semibold mb-2 text-green-600">
              Account activated successfully!
            </h2>
            <p className="text-sm text-gray-500">
              Redirecting to login page...
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h2 className="text-xl font-semibold mb-2 text-error">
              Activation failed!
            </h2>
            <p className="text-sm text-gray-500">
              The link may have expired or is invalid. Please try again.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyAccountPage;
