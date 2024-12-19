import Footer from "@/components/Homepage/components/Footer";
import { HeaderPart } from "@/components/Homepage/components/Header";
import Link from "next/link";

export default function Success() {
  return (
    <div>
      <HeaderPart />
      <div className="pt-40 flex justify-center">
        <div style={{ textAlign: "center", padding: "20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <svg
              width="200"
              height="100"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 11.25L11.25 13.5L15 9.75"
                stroke="#4CAF50"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.25 12C2.25 6.75 6.75 2.25 12 2.25C17.25 2.25 21.75 6.75 21.75 12C21.75 17.25 17.25 21.75 12 21.75C6.75 21.75 2.25 17.25 2.25 12Z"
                stroke="#4CAF50"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="text-[40px] font-bold">Payment Successful!</h1>
          <p className="mt-10">
            Thank you for your payment. Your transaction has been completed
            successfully.
          </p>
          <p>If you have any questions, please contact our support team.</p>
          <Link href={`/`}>
            <button className="text-[22px] mt-10 text-white font-bold rounded-xl bg-orange-500 w-[300px] h-[40px]">
              Go back to Home Page
            </button>
          </Link>
        </div>
      </div>
      <h1 className="pt-20">
        <Footer />
      </h1>
    </div>
  );
}
