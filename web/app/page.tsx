import dynamic from "next/dynamic";

const Home = dynamic(() => import("./client.page"), {
  ssr: false,
});

export default async function Page({ params }: { params: any }) {
  // now we can use the new managed app bridge, so we don't need to
  // worry about checking if the app is installed or not
  return <Home />;
}
