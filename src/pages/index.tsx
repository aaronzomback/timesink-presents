import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "@/utils/api";
import { LOGO, OGSANS } from "@/utils/_fonts";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const example = api.example.getExample.useQuery();
  console.log({ example });
  return (
    <>
      <Head>
        <title>TimeSink presents</title>
        <meta name="description" content="Discover cinema" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start bg-dark-theater-primary">
        <div className="container flex flex-col items-center justify-center gap-32 px-4 py-16">
          <div className="flex flex-col items-center justify-center">
            <h1
              className={`${LOGO.variable} text-center font-logo text-5xl text-mystery-white sm:text-[4rem]`}
            >
              TimeSink
            </h1>
            <h1
              className={`${LOGO.variable} text-center font-logo text-5xl text-mystery-white sm:text-[4rem]`}
            >
              presents
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-4 text-mystery-white sm:grid-cols-2 md:gap-8 ">
            <Link
              className="flex max-w-xs flex-col items-center justify-center gap-4 rounded border-2 border-mystery-white p-4"
              href="https://create.t3.gg/en/usage/first-steps"
              target="_blank"
            >
              <h3 className={`${OGSANS.variable} font-OGSans text-md`}>
                Cinema →
              </h3>
              {/* <div className={`${OGSANS.variable} font-OGSans text-md`}>
                Discover new films made by some of the freshest talent today.
              </div> */}
            </Link>
            <Link
              className="flex max-w-xs flex-col items-center justify-center gap-4 rounded border-2 border-mystery-white p-4  text-mystery-white drop-shadow-2xl"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className={`${OGSANS.variable} font-OGSans text-md`}>
                Lounge →
              </h3>
              {/* <div className={`${OGSANS.variable} font-OGSans text-md`}>
                Read articles written by our featured and guest writers
              </div> */}
            </Link>
            <Link
              className="flex max-w-xs flex-col items-center justify-center gap-4 rounded border-2 border-mystery-white  p-4 text-mystery-white"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className={`${OGSANS.variable} font-OGSans text-md`}>
                Submit film →
              </h3>
              {/* <div className={`${OGSANS.variable} font-OGSans text-md`}>
                Attract audiences by giving your film a chance to be featured in
                the next release!
              </div> */}
            </Link>
            <Link
              className="flex max-w-xs flex-col items-center justify-center gap-4 rounded border-2 border-mystery-white  p-4 text-mystery-white"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className={`${OGSANS.variable} font-OGSans text-md`}>
                Backroom →
              </h3>
              {/* <div className={`${OGSANS.variable} font-OGSans text-md`}>
                Great question. Let us start by telling you what it is not...
              </div> */}
            </Link>
          </div>
          <div
            className={`${OGSANS.variable} flex flex-col items-center gap-2 font-OGSans`}
          >
            {/* <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p> */}
            <AuthShowcase />
          </div>
        </div>
        <div
          className={`${OGSANS.variable} flex flex-col items-center justify-center font-OGSans text-sm text-neon-blue-heavy`}
        >
          <span>Already a member?</span>
          <span className="underline">Sign in</span>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-neon-blue-heavy px-10 py-3 font-semibold text-dark-theater-primary no-underline transition hover:bg-neon-blue-primary"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Join the waiting list"}
      </button>
    </div>
  );
};
