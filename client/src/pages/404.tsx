import Head from "next/head";
import pageNotFound from "../assets/page-not-found.png";
import Image from "next/image";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Page Not Found | UpTask 2023</title>
      </Head>
      <div className="mt-5 mb-5 pt-5 pb-5 text-center">
        <Image
          src={pageNotFound}
          alt="Page Not Found"
          title="Page Not Found"
          priority={true}
        />
        <h4 className="mt-3">It seems that this page does not exist.</h4>
        <h6 className="mt-3">
          <Link href={"/"} className="text-dark text-decoration-none fw-light">
            Go to the main page
          </Link>
        </h6>
      </div>
    </>
  );
}
