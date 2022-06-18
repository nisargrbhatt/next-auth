import { useSession, signOut } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();

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
      <pre>{JSON.stringify(session, 2, " ")}</pre>
      <button onClick={logoutHandler}>Signout</button>
    </>
  );
};

export default Profile;
