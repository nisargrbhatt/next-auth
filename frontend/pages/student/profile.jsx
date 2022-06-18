import { useSession, signOut } from "next-auth/react";
import Navbar from "../../components/shared/Navbar";
import { useRouter } from "next/router";

import en from "../../locale/en";
import es from "../../locale/es";

const Profile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { locale } = router;
  const t = locale === "en" ? en : es;

  const logoutHandler = (e) => {
    signOut({
      callbackUrl: "/",
      redirect: true,
    }).then(() => {});
  };

  if (!session) {
    return <h1>Unauthorized</h1>;
  }

  return (
    <>
      <Navbar />
      <pre>{JSON.stringify(session, 2, " ")}</pre>
      <button onClick={logoutHandler}>Signout</button>
      <h1>{t["test.welcome"]}</h1>
    </>
  );
};

export default Profile;
