import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PortableText } from "@portabletext/react";
import { Container } from "~/components/ui/Container";
import { getPageBySlug } from "~/lib/sanity.server";
import { formatDate } from "~/lib/utils";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;

  if (!slug) {
    throw new Response("Page not found", { status: 404 });
  }

  const page = await getPageBySlug(slug);

  if (!page) {
    throw new Response("Page not found", { status: 404 });
  }

  return json({ page });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.page) {
    return [{ title: "Page Not Found | Hill Country Sun" }];
  }

  return [
    { title: `${data.page.title} | Hill Country Sun` },
    {
      name: "description",
      content: `${data.page.title} for Hill Country Sun.`,
    },
  ];
};

const portableTextComponents = {
  block: {
    normal: ({ children }: any) => (
      <p className="text-body-md text-text-muted mb-4 leading-relaxed">{children}</p>
    ),
    h2: ({ children }: any) => (
      <h2 className="font-serif font-bold text-heading-md text-primary mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="font-serif font-bold text-heading-sm text-primary mt-6 mb-3">{children}</h3>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-text-muted">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-text-muted">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
};

export default function Page() {
  const { page } = useLoaderData<typeof loader>();

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-12 md:py-16">
        <Container size="narrow">
          <div className="text-center">
            <h1 className="font-serif font-bold text-display-sm md:text-display-md text-white mb-4">
              {page.title}
            </h1>
            {page.lastUpdated && (
              <p className="text-primary-200 text-body-sm">
                Last updated: {formatDate(page.lastUpdated)}
              </p>
            )}
          </div>
        </Container>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <Container size="narrow">
          <div className="prose prose-lg max-w-none">
            {page.content && (
              <PortableText value={page.content} components={portableTextComponents} />
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
