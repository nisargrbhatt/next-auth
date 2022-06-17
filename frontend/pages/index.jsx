import styles from "../styles/Home.module.css";
import { useFormik } from "formik";
import { signIn, getCsrfToken, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home({ csrfToken }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const loginHandler = async (values, { setSubmitting }) => {
    // console.log(values);
    const res = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: `${window.location.origin}/profile`,
    });
    if (res?.error) {
      setError(res.error);
    } else {
      setError(null);
    }
    if (res.url) router.push(res.url);
    setSubmitting(false);
  };
  // const signupHandler = (values) => {
  //   console.log(values);
  // };

  // const signupForm = useFormik({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },
  //   onSubmit: signupHandler,
  // });

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginHandler,
  });

  return (
    <div className={styles.container}>
      <form className={styles.loginForm} onSubmit={loginForm.handleSubmit}>
        <h1>Login Form</h1>
        {/* <input name="csrfToken" type="hidden" defaultValue={csrfToken} /> */}
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          onChange={loginForm.handleChange}
          value={loginForm.values.email}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={loginForm.handleChange}
          value={loginForm.values.password}
        />
        <button type="submit">Submit</button>
      </form>
      {/* <form className={styles.signupForm} onSubmit={signupForm.handleSubmit}>
        <h1>Signup Form</h1>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          onChange={signupForm.handleChange}
          value={signupForm.values.email}
        />
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={signupForm.handleChange}
          value={signupForm.values.password}
        />
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = getSession(context);
  if (session) {
    return {
      redirect: {
        permenent: false,
        destination: "/profile",
      },
      props: {},
    };
  }
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}
