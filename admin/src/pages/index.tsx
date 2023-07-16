import React, { useState } from "react";
import { decodeToken } from "@/helpers/jws";
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
    <div className="pb-5">
      <HeaderHome />
      <Categories
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        recall={recall}
        setRecall={setRecall}
        tokenAdmin={tokenAdmin}
      />
      <EditCategory
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        tokenAdmin={tokenAdmin}
        setRecall={setRecall}
      />
    </div>
  );
}

// ----------------------------------------------------------------------------------------
export const getServerSideProps = async (context: any) => {
  let tokenAdmin;
  let decodeTokenAdmin;
  if (typeof context.req.headers.cookie !== "string") {
    tokenAdmin = null;
  } else {
    const parsedCookies = cookie.parse(context.req.headers.cookie);
    decodeTokenAdmin = decodeToken(parsedCookies.tokenAdmin);
    tokenAdmin = parsedCookies.tokenAdmin;
  }
  if (!tokenAdmin) {
    tokenAdmin = null;
  }

  if (!decodeTokenAdmin || !decodeTokenAdmin.admin) {
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
