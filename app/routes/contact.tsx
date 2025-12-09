import type { MetaFunction, ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useNavigation, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { Container } from "~/components/ui/Container";
import { Button } from "~/components/ui/Button";
import { CopyEmail, CopyPhone } from "~/components/ui/CopyEmail";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";
import { getContactPage, getPublications } from "~/lib/sanity.server";

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

// Default data (fallbacks if Sanity data not available)
const defaultContactInfo = [
  { type: "email" as const, label: "Email", value: "info@hillcountrysun.com", href: "mailto:info@hillcountrysun.com" },
  { type: "phone" as const, label: "Phone", value: "(512) 555-1234", href: "tel:+15125551234" },
  { type: "location" as const, label: "Location", value: "Wimberley, Texas" },
  { type: "hours" as const, label: "Hours", value: "Mon-Fri: 9am - 5pm" },
];

const defaultInquiryTypes = [
  { value: "general", label: "General Contact" },
  { value: "event", label: "Submit Event" },
  { value: "advertising", label: "Advertising Inquiry" },
  { value: "other", label: "Other" },
];

const iconMap = {
  email: Mail,
  phone: Phone,
  location: MapPin,
  hours: Clock,
};

export async function loader({ request }: LoaderFunctionArgs) {
  const [contactPage, publications] = await Promise.all([
    getContactPage(),
    getPublications(),
  ]);

  return json({
    contactPage,
    publications: publications.map((pub) => ({
      value: pub.slug.current,
      label: pub.name,
    })),
  });
}

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

export default function Contact() {
  const { contactPage, publications } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [inquiryType, setInquiryType] = useState("general");

  // Use Sanity data or fall back to defaults
  const heroTitle = contactPage?.heroTitle || "Contact Us";
  const heroSubtitle = contactPage?.heroSubtitle || "Have a question, story tip, event to submit, or want to advertise with us? We'd love to hear from you.";
  const formTitle = contactPage?.formTitle || "Send a Message";
  const contactInfo = contactPage?.contactInfo || defaultContactInfo;
  const inquiryTypes = contactPage?.inquiryTypes || defaultInquiryTypes;
  const successTitle = contactPage?.successTitle || "Message Sent!";
  const successMessage = contactPage?.successMessage || "Thank you for reaching out. We'll get back to you as soon as possible.";

  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary py-16 md:py-24">
        <Container size="wide">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-serif font-bold text-display-sm md:text-display-md text-white mb-4">
              {heroTitle}
            </h1>
            <p className="text-primary-200 text-body-lg">
              {heroSubtitle}
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
                {contactInfo.map((item, index) => {
                  const Icon = iconMap[item.type] || Mail;

                  return (
                    <div key={item._key || index} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-5 w-5 text-secondary" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-body-sm text-text-muted">{item.label}</p>
                        {item.type === "email" ? (
                          <CopyEmail
                            email={item.value}
                            className="text-body-md text-text font-medium hover:text-primary"
                            showIcon={false}
                          />
                        ) : item.type === "phone" ? (
                          <CopyPhone
                            phone={item.value}
                            className="text-body-md text-text font-medium hover:text-primary"
                            showIcon={false}
                          />
                        ) : (
                          <p className="text-body-md text-text font-medium">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Publications Info */}
              <div className="mt-10 p-6 bg-surface rounded-xl">
                <h3 className="font-serif font-bold text-heading-sm text-primary mb-3">
                  Our Publications
                </h3>
                <p className="text-body-sm text-text-muted mb-4">
                  We publish regional magazines serving the Hill Country community:
                </p>
                <ul className="text-body-sm text-text space-y-2">
                  {publications.map((pub) => (
                    <li key={pub.value}>• {pub.label}</li>
                  ))}
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
                      {successTitle}
                    </h3>
                    <p className="text-text-muted text-body-md mb-6">
                      {successMessage}
                    </p>
                    <Button to="/" variant="primary" size="md">
                      Return Home
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="font-serif font-bold text-heading-lg text-primary mb-6">
                      {formTitle}
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
