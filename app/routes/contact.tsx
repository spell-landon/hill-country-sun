import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export const meta: MetaFunction = () => {
  return [
    { title: "Contact Us | Hill Country Sun" },
    {
      name: "description",
      content:
        "Get in touch with the Hill Country Sun team. Contact us for advertising, story tips, event submissions, or general inquiries.",
    },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const inquiryType = formData.get("inquiryType");
  const publications = formData.getAll("publications");
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const subject = formData.get("subject");
  const message = formData.get("message");

  // Event-specific fields
  const eventName = formData.get("eventName");
  const eventDate = formData.get("eventDate");
  const eventLocation = formData.get("eventLocation");
  const eventWebsite = formData.get("eventWebsite");

  // In production, you would send an email or save to database
  console.log("Contact form submission:", {
    inquiryType,
    publications,
    name,
    email,
    phone,
    subject,
    message,
    eventName,
    eventDate,
    eventLocation,
    eventWebsite
  });

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return json({ success: true });
};

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "info@hillcountrysun.com",
    href: "mailto:info@hillcountrysun.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "(512) 555-1234",
    href: "tel:+15125551234",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Wimberley, Texas",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon-Fri: 9am - 5pm",
  },
];

const inquiryTypes = [
  { value: "general", label: "General Contact" },
  { value: "event", label: "Submit Event" },
  { value: "advertising", label: "Advertising Inquiry" },
  { value: "other", label: "Other" },
];

const publications = [
  { value: "hcs", label: "Hill Country Sun" },
  { value: "wtw", label: "Welcome to Wimberley" },
  { value: "rrg", label: "River Region Guide" },
  { value: "hg", label: "Hunting Guide" },
];

export default function Contact() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [inquiryType, setInquiryType] = useState("general");

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <Container size="wide">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif font-bold text-display-sm md:text-display-md text-white mb-4">
              Contact Us
            </h1>
            <p className="text-primary-200 text-body-lg">
              Have a question, story tip, event to submit, or want to advertise with us?
              We'd love to hear from you.
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Content */}
      <section className="py-16 md:py-24">
        <Container size="wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="font-serif font-bold text-heading-lg text-primary mb-6">
                Get in Touch
              </h2>
              <div className="space-y-6">
                {contactInfo.map((item) => {
                  const Icon = item.icon;
                  const content = (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-secondary" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-body-sm text-text-muted">{item.label}</p>
                        <p className="text-body-md text-text font-medium">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );

                  if (item.href) {
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block hover:bg-surface rounded-lg p-2 -m-2 transition-colors"
                      >
                        {content}
                      </a>
                    );
                  }

                  return <div key={item.label}>{content}</div>;
                })}
              </div>

              {/* Publications Info */}
              <div className="mt-10 p-6 bg-surface rounded-xl">
                <h3 className="font-serif font-bold text-heading-sm text-primary mb-3">
                  Our Publications
                </h3>
                <p className="text-body-sm text-text-muted mb-4">
                  We publish four regional magazines serving the Hill Country community:
                </p>
                <ul className="text-body-sm text-text space-y-2">
                  <li>• Hill Country Sun</li>
                  <li>• Welcome to Wimberley</li>
                  <li>• River Region Guide</li>
                  <li>• Hunting Guide</li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-surface p-6 md:p-8">
                {actionData?.success ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                      <CheckCircle className="h-8 w-8 text-green-600" aria-hidden="true" />
                    </div>
                    <h3 className="font-serif font-bold text-heading-lg text-primary mb-3">
                      Message Sent!
                    </h3>
                    <p className="text-text-muted text-body-md mb-6">
                      Thank you for reaching out. We'll get back to you as soon as
                      possible.
                    </p>
                    <Button to="/" variant="primary" size="md">
                      Return Home
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif font-bold text-heading-lg text-primary mb-6">
                      Send a Message
                    </h2>

                    <Form method="post" className="space-y-6">
                      {/* Inquiry Type */}
                      <div>
                        <label className="block text-body-sm font-medium text-text mb-3">
                          What can we help you with? <span className="text-accent">*</span>
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {inquiryTypes.map((type) => (
                            <label
                              key={type.value}
                              className={`flex items-center justify-center px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                                inquiryType === type.value
                                  ? "bg-primary text-white border-primary"
                                  : "bg-white text-text border-surface hover:border-primary/30"
                              }`}
                            >
                              <input
                                type="radio"
                                name="inquiryType"
                                value={type.value}
                                checked={inquiryType === type.value}
                                onChange={(e) => setInquiryType(e.target.value)}
                                className="sr-only"
                              />
                              <span className="text-body-sm font-medium">{type.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Publication Selection */}
                      <div>
                        <label className="block text-body-sm font-medium text-text mb-3">
                          Which publication(s) does this relate to?
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          {publications.map((pub) => (
                            <label
                              key={pub.value}
                              className="flex items-center gap-3 px-4 py-3 rounded-lg border border-surface bg-white hover:border-primary/30 cursor-pointer transition-colors"
                            >
                              <input
                                type="checkbox"
                                name="publications"
                                value={pub.value}
                                className="w-4 h-4 text-primary border-surface rounded focus:ring-primary focus:ring-offset-0"
                              />
                              <span className="text-body-sm text-text">{pub.label}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {/* Event-specific fields */}
                      {inquiryType === "event" && (
                        <div className="p-4 bg-surface/50 rounded-lg space-y-4">
                          <p className="text-body-sm font-medium text-primary">Event Details</p>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label
                                htmlFor="eventName"
                                className="block text-body-sm font-medium text-text mb-2"
                              >
                                Event Name <span className="text-accent">*</span>
                              </label>
                              <input
                                type="text"
                                id="eventName"
                                name="eventName"
                                required={inquiryType === "event"}
                                className="w-full px-4 py-3 rounded-lg border border-surface bg-white text-text
                                         placeholder:text-text-light focus:outline-none focus:ring-2
                                         focus:ring-primary focus:border-transparent transition-shadow"
                                placeholder="Name of your event"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="eventDate"
                                className="block text-body-sm font-medium text-text mb-2"
                              >
                                Event Date(s) <span className="text-accent">*</span>
                              </label>
                              <input
                                type="text"
                                id="eventDate"
                                name="eventDate"
                                required={inquiryType === "event"}
                                className="w-full px-4 py-3 rounded-lg border border-surface bg-white text-text
                                         placeholder:text-text-light focus:outline-none focus:ring-2
                                         focus:ring-primary focus:border-transparent transition-shadow"
                                placeholder="e.g., Dec 15, 2025 or Dec 15-17"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="eventLocation"
                                className="block text-body-sm font-medium text-text mb-2"
                              >
                                Event Location <span className="text-accent">*</span>
                              </label>
                              <input
                                type="text"
                                id="eventLocation"
                                name="eventLocation"
                                required={inquiryType === "event"}
                                className="w-full px-4 py-3 rounded-lg border border-surface bg-white text-text
                                         placeholder:text-text-light focus:outline-none focus:ring-2
                                         focus:ring-primary focus:border-transparent transition-shadow"
                                placeholder="Venue and address"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="eventWebsite"
                                className="block text-body-sm font-medium text-text mb-2"
                              >
                                Event Website/Contact
                              </label>
                              <input
                                type="text"
                                id="eventWebsite"
                                name="eventWebsite"
                                className="w-full px-4 py-3 rounded-lg border border-surface bg-white text-text
                                         placeholder:text-text-light focus:outline-none focus:ring-2
                                         focus:ring-primary focus:border-transparent transition-shadow"
                                placeholder="URL or contact info"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Contact Info */}
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-body-sm font-medium text-text mb-2"
                          >
                            Name <span className="text-accent">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-surface bg-white text-text
                                     placeholder:text-text-light focus:outline-none focus:ring-2
                                     focus:ring-primary focus:border-transparent transition-shadow"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-body-sm font-medium text-text mb-2"
                          >
                            Email <span className="text-accent">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-surface bg-white text-text
                                     placeholder:text-text-light focus:outline-none focus:ring-2
                                     focus:ring-primary focus:border-transparent transition-shadow"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label
                            htmlFor="phone"
                            className="block text-body-sm font-medium text-text mb-2"
                          >
                            Phone
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="w-full px-4 py-3 rounded-lg border border-surface bg-white text-text
                                     placeholder:text-text-light focus:outline-none focus:ring-2
                                     focus:ring-primary focus:border-transparent transition-shadow"
                            placeholder="(555) 555-5555"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="subject"
                            className="block text-body-sm font-medium text-text mb-2"
                          >
                            Subject <span className="text-accent">*</span>
                          </label>
                          <input
                            type="text"
                            id="subject"
                            name="subject"
                            required
                            className="w-full px-4 py-3 rounded-lg border border-surface bg-white text-text
                                     placeholder:text-text-light focus:outline-none focus:ring-2
                                     focus:ring-primary focus:border-transparent transition-shadow"
                            placeholder="Brief subject line"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-body-sm font-medium text-text mb-2"
                        >
                          Message <span className="text-accent">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          className="w-full px-4 py-3 rounded-lg border border-surface bg-white text-text
                                   placeholder:text-text-light focus:outline-none focus:ring-2
                                   focus:ring-primary focus:border-transparent transition-shadow resize-none"
                          placeholder={
                            inquiryType === "event"
                              ? "Please include a description of your event..."
                              : "How can we help you?"
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <p className="text-body-sm text-text-muted">
                          <span className="text-accent">*</span> Required fields
                        </p>
                        <Button
                          type="submit"
                          variant="primary"
                          size="lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            "Sending..."
                          ) : (
                            <>
                              Send Message
                              <Send className="ml-2 h-4 w-4" aria-hidden="true" />
                            </>
                          )}
                        </Button>
                      </div>
                    </Form>
                  </>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
