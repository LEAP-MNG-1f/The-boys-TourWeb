import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-[100vh] flex justify-center items-center bg-[#151c2c] ">
      {" "}
      <Link href="/api/auth/login">
        <button className="btn btn-primary">Login</button>
      </Link>
    </div>
  );
}
