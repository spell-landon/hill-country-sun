import type { MetaFunction } from '@remix-run/node';
import { useSearchParams } from '@remix-run/react';
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '~/components/ui/Container';
import { MultiSelect } from '~/components/ui/MultiSelect';
import { ArticleCard } from '~/components/articles/ArticleCard';
import {
  mockArticles,
  getUniqueAuthors,
  getUniqueCategories,
  getArticleYears,
  getAllPublications,
} from '~/lib/mock-data';

const ARTICLES_PER_PAGE = 9;

export const meta: MetaFunction = () => {
  return [
    { title: 'Articles | Hill Country Sun' },
    {
      name: 'description',
      content:
        'Read the latest news, features, and stories from Wimberley and the Texas Hill Country region.',
    },
  ];
};

// Get filter options
const categories = getUniqueCategories();
const authors = getUniqueAuthors();
const years = getArticleYears();
const publications = getAllPublications();

// Build options for MultiSelect
const categoryOptions = categories.map((c) => ({ value: c, label: c }));
const authorOptions = authors.map((a) => ({ value: a.slug, label: a.name }));
const yearOptions = years.map((y) => ({
  value: y.toString(),
  label: y.toString(),
}));
const publicationOptions = publications.map((p) => ({
  value: p.slug,
  label: p.shortName,
}));

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Parse comma-separated URL param into array
function parseMultiParam(param: string | null): string[] {
  if (!param) return [];
  return param.split(',').filter(Boolean);
}

// Convert array to comma-separated string for URL
function toMultiParam(values: string[]): string {
  return values.join(',');
}

export default function ArticlesIndex() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get filter values from URL (comma-separated for multi-select)
  const selectedCategories = parseMultiParam(searchParams.get('category'));
  const selectedAuthors = parseMultiParam(searchParams.get('author'));
  const selectedYears = parseMultiParam(searchParams.get('year'));
  const selectedPublications = parseMultiParam(searchParams.get('publication'));
  const searchQuery = searchParams.get('q') || '';
  const currentPage = Math.max(
    1,
    parseInt(searchParams.get('page') || '1', 10)
  );

  // Helper to update a single param while preserving others (resets page to 1)
  const updateParam = (key: string, values: string[]) => {
    const newParams = new URLSearchParams(searchParams);
    if (values.length > 0) {
      newParams.set(key, toMultiParam(values));
    } else {
      newParams.delete(key);
    }
    // Reset to page 1 when filters change
    newParams.delete('page');
    setSearchParams(newParams);
  };

  const updateSearch = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('q', value);
    } else {
      newParams.delete('q');
    }
    // Reset to page 1 when search changes
    newParams.delete('page');
    setSearchParams(newParams);
  };

  const goToPage = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    if (page > 1) {
      newParams.set('page', page.toString());
    } else {
      newParams.delete('page');
    }
    setSearchParams(newParams);
    // Scroll to top of articles
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  // Check if any filters are active
  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedAuthors.length > 0 ||
    selectedYears.length > 0 ||
    selectedPublications.length > 0 ||
    searchQuery;

  // Sort articles by date, newest first
  const sortedArticles = [...mockArticles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Apply all filters
  let filteredArticles = sortedArticles;

  if (selectedCategories.length > 0) {
    filteredArticles = filteredArticles.filter((a) =>
      selectedCategories.includes(a.category)
    );
  }

  if (selectedAuthors.length > 0) {
    filteredArticles = filteredArticles.filter((a) =>
      selectedAuthors.includes(slugify(a.author.name))
    );
  }

  if (selectedYears.length > 0) {
    filteredArticles = filteredArticles.filter((a) =>
      selectedYears.includes(new Date(a.publishedAt).getFullYear().toString())
    );
  }

  if (selectedPublications.length > 0) {
    filteredArticles = filteredArticles.filter((a) =>
      selectedPublications.includes(a.publication)
    );
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredArticles = filteredArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.excerpt.toLowerCase().includes(query)
    );
  }

  // Pagination calculations
  const totalArticles = filteredArticles.length;
  const totalPages = Math.ceil(totalArticles / ARTICLES_PER_PAGE);
  const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages));
  const startIndex = (validCurrentPage - 1) * ARTICLES_PER_PAGE;
  const endIndex = startIndex + ARTICLES_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (validCurrentPage > 3) {
        pages.push('ellipsis');
      }

      // Show pages around current
      const start = Math.max(2, validCurrentPage - 1);
      const end = Math.min(totalPages - 1, validCurrentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (validCurrentPage < totalPages - 2) {
        pages.push('ellipsis');
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <>
      {/* Hero Section */}
      <section className='bg-primary py-16 md:py-24'>
        <Container size='wide'>
          <div className='text-center max-w-3xl mx-auto'>
            <h1 className='font-serif font-bold text-display-sm md:text-display-md text-white mb-4'>
              Articles & Stories
            </h1>
            <p className='text-primary-200 text-body-lg'>
              Discover the latest news, features, and stories from across the
              Hill Country. From local events to outdoor adventures, we cover
              what matters to our community.
            </p>
          </div>
        </Container>
      </section>

      {/* Filters */}
      <section className='border-b border-surface sticky top-16 md:top-20 bg-white z-20'>
        <Container size='wide'>
          <div className='py-4 space-y-4'>
            {/* Search Bar */}
            <div className='relative'>
              <Search
                className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted'
                aria-hidden='true'
              />
              <input
                type='search'
                placeholder='Search articles...'
                value={searchQuery}
                onChange={(e) => updateSearch(e.target.value)}
                className='w-full pl-10 pr-4 py-2.5 rounded-lg border border-surface bg-surface/50 text-body-md placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'
              />
            </div>

            {/* Filter Dropdowns */}
            <div className='flex flex-wrap items-center gap-3'>
              <MultiSelect
                options={publicationOptions}
                selected={selectedPublications}
                onChange={(values) => updateParam('publication', values)}
                placeholder='All Publications'
              />

              <MultiSelect
                options={categoryOptions}
                selected={selectedCategories}
                onChange={(values) => updateParam('category', values)}
                placeholder='All Categories'
              />

              <MultiSelect
                options={authorOptions}
                selected={selectedAuthors}
                onChange={(values) => updateParam('author', values)}
                placeholder='All Authors'
              />

              <MultiSelect
                options={yearOptions}
                selected={selectedYears}
                onChange={(values) => updateParam('year', values)}
                placeholder='All Years'
              />

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className='inline-flex items-center gap-1 px-3 py-2 text-body-sm font-medium text-primary hover:text-primary-600 transition-colors'>
                  <X className='h-4 w-4' aria-hidden='true' />
                  Clear all
                </button>
              )}

              {/* Result count */}
              <span className='text-body-sm text-text-muted ml-auto'>
                {filteredArticles.length}{' '}
                {filteredArticles.length === 1 ? 'article' : 'articles'}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Articles Grid */}
      <section className='py-12 md:py-16'>
        <Container size='wide'>
          {totalArticles === 0 ? (
            <div className='text-center py-12'>
              <p className='text-text-muted text-body-lg mb-4'>
                No articles found matching your filters.
              </p>
              <button
                onClick={clearFilters}
                className='text-primary hover:text-primary-600 font-medium'>
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
                {paginatedArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <nav
                  className='flex items-center justify-center gap-1 mt-12'
                  aria-label='Pagination'>
                  {/* Previous Button */}
                  <button
                    onClick={() => goToPage(validCurrentPage - 1)}
                    disabled={validCurrentPage === 1}
                    className='inline-flex items-center justify-center w-10 h-10 rounded-lg border border-surface text-text-muted hover:text-primary hover:border-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-text-muted disabled:hover:border-surface transition-colors'
                    aria-label='Previous page'>
                    <ChevronLeft className='h-5 w-5' aria-hidden='true' />
                  </button>

                  {/* Page Numbers */}
                  <div className='flex items-center gap-1'>
                    {getPageNumbers().map((page, index) =>
                      page === 'ellipsis' ? (
                        <span
                          key={`ellipsis-${index}`}
                          className='w-10 h-10 flex items-center justify-center text-text-muted'>
                          ...
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`w-10 h-10 rounded-lg text-body-sm font-medium transition-colors ${
                            page === validCurrentPage
                              ? 'bg-primary text-white'
                              : 'border border-surface text-text-muted hover:text-primary hover:border-primary/30'
                          }`}
                          aria-label={`Page ${page}`}
                          aria-current={
                            page === validCurrentPage ? 'page' : undefined
                          }>
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(validCurrentPage + 1)}
                    disabled={validCurrentPage === totalPages}
                    className='inline-flex items-center justify-center w-10 h-10 rounded-lg border border-surface text-text-muted hover:text-primary hover:border-primary/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:text-text-muted disabled:hover:border-surface transition-colors'
                    aria-label='Next page'>
                    <ChevronRight className='h-5 w-5' aria-hidden='true' />
                  </button>
                </nav>
              )}

              {/* Page info */}
              {totalPages > 1 && (
                <p className='text-center text-body-sm text-text-muted mt-4'>
                  Showing {startIndex + 1}–{Math.min(endIndex, totalArticles)}{' '}
                  of {totalArticles} articles
                </p>
              )}
            </>
          )}
        </Container>
      </section>
    </>
  );
}
