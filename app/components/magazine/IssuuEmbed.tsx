interface IssuuEmbedProps {
  embedUrl: string;
  title: string;
}

export function IssuuEmbed({ embedUrl, title }: IssuuEmbedProps) {
  // Note: In production, you would use the actual Issuu embed URL
  // For demo purposes, we're showing a placeholder
  return (
    <div className="aspect-[3/4] md:aspect-[4/3] lg:aspect-video w-full bg-surface rounded-xl overflow-hidden shadow-lg">
      <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-10 h-10 text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>
        <h3 className="font-serif font-bold text-heading-md text-primary mb-2">
          {title}
        </h3>
        <p className="text-text-muted text-body-md mb-6 max-w-md">
          The digital flipbook will be embedded here using Issuu. Connect your
          Issuu account in Sanity to display the interactive magazine.
        </p>
        <a
          href={embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary btn-md"
        >
          View on Issuu
        </a>
        <p className="text-text-light text-body-sm mt-4">
          Opens in a new window
        </p>
      </div>
      {/*
        When you have a real Issuu embed URL, replace the above with:
        <iframe
          src={embedUrl}
          title={`${title} - Digital Magazine`}
          className="w-full h-full border-0"
          allowFullScreen
        />
      */}
    </div>
  );
}
