import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const UNAUTHENTICATED_ROUTES = ["/", "/login", "/register", "/test"];

const Role = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    const user = session.user.details;
    const role = session.user.details.role;
    let allowed = true;

    if (router.pathname.startsWith("/student") && role !== "Student") {
      allowed = false;
    }

    if (router.pathname.startsWith("/tutor") && role !== "Tutor") {
      allowed = false;
    }

    if (UNAUTHENTICATED_ROUTES.includes(router.pathname)) {
      return <>{children}</>;
    }
    if (!allowed) {
      router.push("/");
    }
  }

  return <>{children}</>;
};

export default Role;
