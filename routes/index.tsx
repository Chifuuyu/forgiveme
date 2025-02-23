import { Head } from "$fresh/runtime.ts";
import Forgiveness from "../islands/forgiveness.tsx";


export default function Home() {
  return (
    <>
      <Head>
        <title>Im Sorry</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Forgiveness />
    </>
  );
}
