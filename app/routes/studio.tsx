import { redirect } from "@remix-run/node";
import type { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  return redirect("https://hill-country-sun.sanity.studio", 302);
};
