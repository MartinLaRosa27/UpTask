import React, { useState } from "react";
import * as cookie from "cookie";
import HeaderHome from "@/components/Home/HeaderHome";
import Categories from "@/components/Home/Categories";
import EditCategory from "@/components/Home/EditCategory";

interface HomeProps {
  tokenAdmin: any;
}

// ----------------------------------------------------------------------------------------
export default function Home({ tokenAdmin }: HomeProps) {
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [recall, setRecall] = useState<boolean>(false);

  return (
    <>
      <HeaderHome />
      <Categories
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        recall={recall}
        setRecall={setRecall}
      />
      <EditCategory
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        tokenAdmin={tokenAdmin}
        setRecall={setRecall}
      />
    </>
  );
}

// ----------------------------------------------------------------------------------------
export const getServerSideProps = async (context: any) => {
  let tokenAdmin;
  if (typeof context.req.headers.cookie !== "string") {
    tokenAdmin = null;
  } else {
    const parsedCookies = cookie.parse(context.req.headers.cookie);
    tokenAdmin = parsedCookies.tokenAdmin;
  }
  if (!tokenAdmin) {
    tokenAdmin = null;
  }
  if (
    !tokenAdmin ||
    tokenAdmin !=
      `${process.env.NEXT_PUBLIC_USER} ${process.env.NEXT_PUBLIC_PASS}`
  ) {
    return {
      redirect: {
        destination: "/welcome",
        permanent: false,
      },
    };
  } else {
    return {
      props: {
        tokenAdmin,
      },
    };
  }
};
