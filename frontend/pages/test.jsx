const test = () => {
  return <h1>Test</h1>;
};

export default test;

export async function getServerSideProps(context) {
  // if (2 === 2) {
  //   return {
  //     redirect: {
  //       permenent: false,
  //       destination: "/",
  //     },
  //     props: {},
  //   };
  // }
  return {
    props: {},
  };
}
