import React from "react";
import { UserAuth } from "../context/store";
import { useRouter } from "next/navigation";

export function withPublic(Component) {
  return function WithPublic(props) {
    const auth = UserAuth();
    const router = useRouter();

    console.log("User from Public router: ", auth.user);

    if (auth.user) {
      router.push("/");
      return <h1>Loading</h1>;
    }
    return <Component />;
  };
}

export function withProtected(Component) {
  return function WithProtected(props) {
    const auth = UserAuth();
    const router = useRouter();

    console.log("User from Protected router: ", auth.user);

    if (!auth.user) {
      router.push("/login");
      return <h1>Loading</h1>;
    }
    return <Component />;
  };
}
