import { Form } from "@remix-run/react";
import { Mail } from "lucide-react";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";

export function Newsletter() {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <Container size="narrow" className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-full mb-6">
          <Mail className="h-8 w-8 text-secondary" aria-hidden="true" />
        </div>

        <h2 className="font-serif font-bold text-display-sm md:text-display-md text-white mb-4">
          Stay Connected
        </h2>

        <p className="text-primary-200 text-body-lg mb-8 max-w-xl mx-auto">
          Get the latest Hill Country news, events, and stories delivered straight
          to your inbox. Join our community of readers.
        </p>

        <Form method="post" action="/newsletter" className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-white text-text placeholder:text-text-light
                         focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary"
            />
            <Button type="submit" variant="secondary" size="md">
              Subscribe
            </Button>
          </div>
          <p className="text-primary-300 text-body-sm mt-4">
            No spam, unsubscribe anytime. We respect your privacy.
          </p>
        </Form>
      </Container>
    </section>
  );
}
