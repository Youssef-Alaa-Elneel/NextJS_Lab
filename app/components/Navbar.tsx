import Link from "next/link";
import { auth, signOut } from "../_lib/auth";
import NavClint from "./NavClint";
import Image from "next/image";

async function Navbar() {
  const userInfo = await auth();
  console.log(userInfo);

  return (
    <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-center">
      <ul className="flex flex-row items-center ">
        <li>
          <NavClint />
        </li>
        <li className="flex flex-row items-center gap-4">
          {userInfo?.user ? (
            <>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button>Logout</button>
              </form>

              <Image
                src={userInfo!.user!.image as string}
                width={50}
                height={50}
                alt="user Image"
                className="w-10 h-10 rounded-full "
              />
            </>
          ) : (
            <li>
              <Link href="/api/auth/signin" className={`mx-4`}>
                Login
              </Link>
            </li>
          )}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
