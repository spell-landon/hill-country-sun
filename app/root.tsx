import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";

import "./tailwind.css";
import { Header } from "~/components/layout/Header";
import { Footer } from "~/components/layout/Footer";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
  { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
  { rel: "apple-touch-icon", href: "/logo192.png" },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Hill Country Sun | Wimberley & River Region News" },
    {
      name: "description",
      content:
        "Your source for local news, events, and stories from Wimberley and the Texas Hill Country region.",
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Error | Hill Country Sun</title>
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            {isRouteErrorResponse(error) ? (
              <>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
                  {error.status} {error.statusText}
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  {error.status === 404
                    ? "The page you're looking for doesn't exist."
                    : "Something went wrong."}
                </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Oops!</h1>
                <p className="text-lg text-gray-600 mb-8">
                  Something unexpected happened. Please try again.
                </p>
              </>
            )}
            <a href="/" className="btn-primary btn-md">
              Return Home
            </a>
          </div>
        </main>
        <Footer />
        <Scripts />
      </body>
    </html>
  );
}
