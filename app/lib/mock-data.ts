// Mock data for development - will be replaced with Sanity CMS data

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  mainImage: string;
  author: {
    name: string;
    image: string;
  };
  category: string;
  publishedAt: string;
  featured: boolean;
  publication: string; // "hill-country-sun" | "welcome-to-wimberley" | "river-region-guide" | "hunting-guide"
}

export interface MagazineIssue {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  issuuEmbedUrl: string;
  publishedAt: string;
  isCurrent: boolean;
  publicationSlug: string; // Links issue to publication
}

export interface GuideSection {
  title: string;
  content: string;
  image?: string;
}

export interface Publication {
  id: string;
  slug: string;
  name: string;
  shortName: string; // "HCS", "WTW", "RRG", "HG"
  description: string;
  heroImage: string;
  logo?: string;
  sections?: GuideSection[];
}

// Publications data
export const mockPublications: Publication[] = [
  {
    id: "1",
    slug: "hill-country-sun",
    name: "Hill Country Sun",
    shortName: "HCS",
    description: "Your trusted source for Hill Country news, events, and community stories since 1992. Covering the people, places, and culture that make the Texas Hill Country special.",
    heroImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
    sections: [
      {
        title: "About Hill Country Sun",
        content: "For over three decades, Hill Country Sun has been the definitive voice of the Texas Hill Country. Our quarterly magazine and daily online coverage bring you in-depth stories about the people, places, and events that shape our community.",
        image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80",
      },
      {
        title: "What We Cover",
        content: "From local news and community events to food, arts, and outdoor adventures, we cover everything that matters to Hill Country residents and visitors. Our award-winning journalists and photographers capture the essence of life in this beautiful region.",
        image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80",
      },
      {
        title: "Our Community",
        content: "Hill Country Sun is more than a publication—it's a community hub. We connect neighbors, celebrate local achievements, and shine a light on the stories that bring us together. Join thousands of readers who call Hill Country Sun their hometown paper.",
      },
    ],
  },
  {
    id: "2",
    slug: "welcome-to-wimberley",
    name: "Welcome to Wimberley",
    shortName: "WTW",
    description: "Your complete guide to Wimberley, Texas – the charming village in the heart of the Hill Country known for its natural beauty, thriving arts scene, and warm community spirit.",
    heroImage: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
    sections: [
      {
        title: "Things to Do",
        content: "From swimming at Blue Hole to browsing unique shops on the square, Wimberley offers endless opportunities for exploration. Don't miss Market Days on the first Saturday of the month, or take a scenic drive along the Devil's Backbone.",
        image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
      },
      {
        title: "Where to Eat",
        content: "Wimberley's culinary scene ranges from casual cafes to fine dining. Try local favorites like Wimberley Cafe for breakfast, or enjoy craft cocktails and elevated cuisine at one of the newer restaurants in town.",
        image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      },
      {
        title: "Where to Stay",
        content: "Choose from cozy bed and breakfasts, luxury vacation rentals, or scenic campgrounds. Many accommodations offer stunning views of the Hill Country landscape and easy access to local attractions.",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      },
      {
        title: "Local Tips",
        content: "Wimberley is best experienced at a leisurely pace. Allow extra time for wandering the shops, and consider visiting during the week to avoid weekend crowds. Don't forget to bring cash – some smaller vendors don't accept cards.",
      },
    ],
  },
  {
    id: "3",
    slug: "river-region-guide",
    name: "River Region Guide",
    shortName: "RRG",
    description: "Explore the beautiful waterways and communities along the Blanco, San Marcos, and Guadalupe rivers. Your guide to water recreation, riverside dining, and natural attractions.",
    heroImage: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=1200&q=80",
    sections: [
      {
        title: "Rivers & Swimming",
        content: "The region's spring-fed rivers offer crystal-clear water perfect for swimming, tubing, and kayaking. Popular spots include Blue Hole, Jacob's Well, and numerous access points along the Guadalupe River.",
        image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
      },
      {
        title: "Water Activities",
        content: "Whether you prefer a lazy float down the river or an adventurous kayak trip, the River Region has options for every skill level. Several outfitters offer equipment rentals and guided trips.",
        image: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80",
      },
      {
        title: "Riverside Dining",
        content: "Enjoy a meal with a view at one of the region's riverside restaurants. From casual fish camps to upscale patios, you'll find great food with beautiful water views.",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      },
      {
        title: "Safety & Conservation",
        content: "Help preserve our rivers by following Leave No Trace principles. Always check water conditions before swimming, and be aware of flash flood risks during rainy periods.",
      },
    ],
  },
  {
    id: "4",
    slug: "hunting-guide",
    name: "Hunting Guide",
    shortName: "HG",
    description: "The Texas Hill Country offers exceptional hunting opportunities. Your comprehensive guide to seasons, regulations, hunting ranches, and the best outdoor experiences in the region.",
    heroImage: "https://images.unsplash.com/photo-1516655855035-d5215bcb5604?w=1200&q=80",
    sections: [
      {
        title: "Hunting Seasons",
        content: "Texas hunting seasons vary by species and region. White-tailed deer season typically runs from early November through mid-January, while spring turkey season occurs in April and May. Always check current regulations with Texas Parks & Wildlife.",
        image: "https://images.unsplash.com/photo-1516655855035-d5215bcb5604?w=800&q=80",
      },
      {
        title: "Hunting Ranches",
        content: "The Hill Country is home to numerous hunting ranches offering guided hunts, lodging, and processing services. Many ranches specialize in trophy deer management, while others offer exotic game hunting year-round.",
        image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80",
      },
      {
        title: "Licenses & Regulations",
        content: "All hunters must possess a valid Texas hunting license. Additional stamps may be required depending on the species you're hunting. Youth hunters have special licensing options and seasons.",
      },
      {
        title: "Processing & Taxidermy",
        content: "Local meat processors can handle your harvest, offering everything from basic processing to specialty sausages. Several taxidermists in the area can preserve your trophy for display.",
      },
    ],
  },
];

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  link?: string;
  image?: string;
  category: string;
}

// Mock Articles
export const mockArticles: Article[] = [
  {
    id: "1",
    slug: "wimberley-market-days-what-to-expect",
    title: "Wimberley's Annual Market Days: What to Expect This Season",
    excerpt:
      "The beloved Wimberley Market Days return with over 400 vendors, live music, and the best of Hill Country craftsmanship. Here's everything you need to know.",
    content: `
      <p>Wimberley Market Days, one of the most anticipated events in the Texas Hill Country, returns this spring with a spectacular lineup of artisans, craftspeople, and local vendors. Now in its 32nd year, the market has grown from a small gathering of local makers into a destination event that draws visitors from across Texas and beyond.</p>

      <p>Whether you're a longtime attendee or planning your first visit, this guide will help you make the most of your Market Days experience.</p>

      <h2>What's New This Season</h2>
      <p>This year brings over 475 vendors to Lion's Field — the largest lineup in Market Days history. The expansion includes a dedicated artisan food hall, an expanded children's activity zone, and a new "Emerging Artists" section showcasing first-time vendors.</p>

      <figure>
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80" alt="Vendors and shoppers at outdoor market" />
        <figcaption>Over 475 vendors fill Lion's Field during Market Days, making it one of the largest outdoor markets in Texas</figcaption>
      </figure>

      <h3>Featured Vendor Categories</h3>
      <ul>
        <li><strong>Handcrafted Jewelry:</strong> From Hill Country silverwork to artisan beadwork</li>
        <li><strong>Pottery & Ceramics:</strong> Functional ware and decorative pieces from local kilns</li>
        <li><strong>Woodwork:</strong> Custom furniture, cutting boards, and turned pieces</li>
        <li><strong>Textiles:</strong> Handwoven rugs, quilts, and artisan clothing</li>
        <li><strong>Gourmet Foods:</strong> Local honey, jams, salsas, olive oils, and baked goods</li>
        <li><strong>Plants & Garden:</strong> Native plants, succulents, and garden art</li>
        <li><strong>Vintage & Antiques:</strong> Curated collections from regional dealers</li>
      </ul>

      <blockquote>
        "Market Days isn't just shopping — it's a community gathering. I've been coming for 15 years, and I still discover something new every single time." — Sarah Mitchell, Austin resident
      </blockquote>

      <h2>Live Entertainment</h2>
      <p>The main stage features live music from 9 AM to 4 PM, with a carefully curated lineup that celebrates the Hill Country's rich musical heritage.</p>

      <h3>December Music Schedule</h3>
      <ol>
        <li><strong>9:00 AM - 10:30 AM:</strong> The Blanco River Boys (Bluegrass)</li>
        <li><strong>11:00 AM - 12:30 PM:</strong> Maria Santos & the Hill Country Band (Conjunto/Country)</li>
        <li><strong>1:00 PM - 2:30 PM:</strong> Cypress Creek Collective (Folk/Americana)</li>
        <li><strong>3:00 PM - 4:00 PM:</strong> Texas Thunder (Classic Country)</li>
      </ol>

      <figure>
        <img src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80" alt="Live band performing on outdoor stage" />
        <figcaption>Local musicians provide the soundtrack for Market Days, playing throughout the event</figcaption>
      </figure>

      <h2>Food & Refreshments</h2>
      <p>With all that walking and shopping, you'll need fuel. The market offers an impressive array of food options:</p>

      <h3>Food Trucks & Vendors</h3>
      <ul>
        <li>Authentic Texas BBQ</li>
        <li>Wood-fired pizza</li>
        <li>Gourmet tacos and Tex-Mex</li>
        <li>Fresh-squeezed lemonade and agua fresca</li>
        <li>Hill Country winery tastings</li>
        <li>Local craft beer garden</li>
        <li>Homemade ice cream and frozen treats</li>
      </ul>

      <h3>New This Year: Artisan Food Hall</h3>
      <p>The expanded food section now includes a covered seating area with picnic tables, making it easier to enjoy a meal without leaving the market. Look for the yellow tent near the east entrance.</p>

      <h2>Tips for a Perfect Visit</h2>
      <p>Veteran Market Days visitors know that a little planning goes a long way. Here's how to make the most of your trip:</p>

      <h3>Before You Go</h3>
      <ol>
        <li><strong>Check the weather:</strong> Markets happen rain or shine, but weather affects the experience</li>
        <li><strong>Get cash:</strong> While many vendors take cards, some are cash-only. ATMs on site have long lines.</li>
        <li><strong>Dress for comfort:</strong> Wear comfortable walking shoes — you'll cover a lot of ground</li>
        <li><strong>Bring supplies:</strong> Reusable bags, sunscreen, hat, and a water bottle</li>
        <li><strong>Plan for parking:</strong> Arrive early or use the shuttle from Wimberley High School</li>
      </ol>

      <h3>At the Market</h3>
      <ul>
        <li><strong>Do a lap first:</strong> Walk the entire market before buying to see all your options</li>
        <li><strong>Talk to the makers:</strong> Vendors love sharing their process and inspiration</li>
        <li><strong>Note booth numbers:</strong> If you want to come back to a vendor, remember their location</li>
        <li><strong>Take breaks:</strong> Find a shady spot, grab a cold drink, and rest your feet</li>
        <li><strong>Ship large items:</strong> Many vendors offer shipping for bulky purchases</li>
      </ul>

      <h2>Practical Information</h2>

      <h3>2025 Market Dates</h3>
      <p>Market Days runs on the first Saturday of each month, April through December:</p>
      <ul>
        <li>April 5, 2025</li>
        <li>May 3, 2025</li>
        <li>June 7, 2025</li>
        <li>July 5, 2025</li>
        <li>August 2, 2025</li>
        <li>September 6, 2025</li>
        <li>October 4, 2025</li>
        <li>November 1, 2025</li>
        <li>December 6, 2025</li>
      </ul>

      <h3>Hours & Admission</h3>
      <ul>
        <li><strong>Hours:</strong> 7 AM to 4 PM</li>
        <li><strong>Admission:</strong> Free</li>
        <li><strong>Parking:</strong> $10 at Lion's Field, free shuttle from Wimberley High School</li>
        <li><strong>Location:</strong> Lion's Field, Ranch Road 2325, Wimberley, TX</li>
      </ul>

      <h3>Accessibility</h3>
      <p>The market grounds are ADA accessible, with designated parking near the entrance. Wheelchair-accessible restrooms are available. The terrain is mostly flat grass, though it can be uneven in some areas. Consider bringing a wagon for purchases if mobility is a concern.</p>

      <h2>Beyond Market Days</h2>
      <p>While you're in Wimberley, take time to explore the town. The downtown square is just a few minutes away and features year-round galleries, boutiques, and restaurants. Consider extending your visit to enjoy swimming at Blue Hole, wine tasting at local vineyards, or a scenic drive along the Devil's Backbone.</p>

      <p>Market Days has been bringing the Hill Country community together for over three decades. Whether you find the perfect handcrafted gift, discover a new favorite artist, or simply enjoy a beautiful day surrounded by good food and great music, you'll understand why this event has become a cherished tradition for so many.</p>

      <p>We'll see you at the market!</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    author: {
      name: "Julie Harrington",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    category: "Events",
    publishedAt: "2025-12-01",
    featured: true,
    publication: "welcome-to-wimberley",
  },
  {
    id: "2",
    slug: "best-swimming-holes-hill-country",
    title: "Best Swimming Holes in the Hill Country",
    excerpt:
      "From Jacob's Well to Blue Hole, discover the most refreshing natural swimming spots the Texas Hill Country has to offer.",
    content: `
      <p>The Texas Hill Country is blessed with some of the most beautiful natural swimming holes in the state. Fed by crystal-clear spring water, these swimming spots offer a refreshing escape from the summer heat. Whether you're looking for a quick dip or a full day of aquatic adventure, these destinations should be at the top of your list.</p>

      <h2>1. Jacob's Well Natural Area</h2>
      <p>Perhaps the most famous swimming hole in Texas, Jacob's Well is a perpetual artesian spring that plunges 140 feet into the earth. The crystal-clear water maintains a constant 68°F year-round, making it refreshing even on the hottest summer days.</p>

      <figure>
        <img src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80" alt="Crystal clear spring water at Jacob's Well" />
        <figcaption>The crystal-clear waters of Jacob's Well reveal the limestone depths below</figcaption>
      </figure>

      <h3>What Makes It Special</h3>
      <p>The well itself is actually a karstic spring, formed when water dissolved underground limestone over thousands of years. The result is an otherworldly blue pool that seems to glow from within.</p>

      <blockquote>
        "There's no place quite like Jacob's Well. The moment you see that impossibly blue water, you understand why it's been drawing visitors for generations." — Local historian Martha Chen
      </blockquote>

      <h3>Visitor Information</h3>
      <ul>
        <li><strong>Reservations required:</strong> Book online at least two weeks in advance during summer</li>
        <li><strong>Hours:</strong> 8 AM to 6 PM daily (last entry at 5 PM)</li>
        <li><strong>Entry fee:</strong> $9 for Hays County residents, $15 for non-residents</li>
        <li><strong>Amenities:</strong> Restrooms, picnic areas, hiking trails</li>
        <li><strong>Pro tip:</strong> Arrive early for the best parking and calmer waters</li>
      </ul>

      <h2>2. Blue Hole Regional Park</h2>
      <p>Located in the heart of Wimberley, Blue Hole Regional Park offers a scenic swimming experience surrounded by towering bald cypress trees, some of which are hundreds of years old. The park sits along Cypress Creek, creating a natural swimming area that feels miles away from civilization.</p>

      <figure>
        <img src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80" alt="Cypress trees along the water" />
        <figcaption>Ancient cypress trees create a cathedral-like canopy over Blue Hole's swimming area</figcaption>
      </figure>

      <h3>Planning Your Visit</h3>
      <ol>
        <li>Make reservations online — walk-ups are rarely available during peak season</li>
        <li>Bring water shoes for the rocky creek bottom</li>
        <li>Pack a picnic lunch to enjoy at the shaded tables</li>
        <li>Explore the hiking trails before or after your swim</li>
        <li>Consider visiting on weekdays for smaller crowds</li>
      </ol>

      <h2>3. Krause Springs</h2>
      <p>This family-owned property near Spicewood has been welcoming swimmers since 1955. Fed by 32 natural springs, the swimming area features both a man-made pool and natural creek swimming. It's one of the few spots where you can camp overnight right next to the water.</p>

      <h3>Why Locals Love It</h3>
      <ul>
        <li>Natural spring-fed pool stays cool all summer</li>
        <li>Stunning waterfall creates a natural shower</li>
        <li>Rope swings for the adventurous</li>
        <li>Primitive camping available on-site</li>
        <li>Less crowded than state-managed parks</li>
      </ul>

      <h2>4. Hamilton Pool Preserve</h2>
      <p>A true natural wonder, Hamilton Pool was formed when the dome of an underground river collapsed thousands of years ago. The result is a grotto-style pool with a 50-foot waterfall cascading into jade-green waters.</p>

      <figure>
        <img src="https://images.unsplash.com/photo-1476611338391-6f395a0dd82a?w=800&q=80" alt="Waterfall cascading into natural pool" />
        <figcaption>The iconic 50-foot waterfall at Hamilton Pool flows year-round, fed by natural springs</figcaption>
      </figure>

      <h3>Important Notes</h3>
      <p>Swimming is dependent on water quality testing and is not always available. The quarter-mile trail to the pool can be strenuous, with a steep descent. Reservations are absolutely required and often book up weeks in advance.</p>

      <h2>Essential Packing List</h2>
      <p>No matter which swimming hole you visit, come prepared with these items:</p>
      <ol>
        <li><strong>Water shoes:</strong> Most natural swimming holes have rocky bottoms</li>
        <li><strong>Reef-safe sunscreen:</strong> Protect yourself and the ecosystem</li>
        <li><strong>Plenty of water:</strong> Dehydration happens quickly in Texas heat</li>
        <li><strong>Snacks:</strong> Many locations don't have food vendors nearby</li>
        <li><strong>Towels and dry bag:</strong> For storing electronics and valuables</li>
        <li><strong>Cash:</strong> Some locations are cash-only for entry fees</li>
      </ol>

      <h2>Respecting Our Natural Treasures</h2>
      <p>These swimming holes have survived for centuries, but they need our help to stay pristine. Follow Leave No Trace principles, pack out everything you bring in, and avoid disturbing wildlife. The clear waters we enjoy today are the result of careful conservation efforts — let's keep them that way for future generations.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
    author: {
      name: "Melissa Ball",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    category: "Outdoors",
    publishedAt: "2025-11-28",
    featured: true,
    publication: "river-region-guide",
  },
  {
    id: "3",
    slug: "local-artist-spotlight-gallery-walk",
    title: "Local Artist Spotlight: Gallery Walk Downtown",
    excerpt:
      "Wimberley's thriving arts scene comes alive during the monthly Gallery Walk. Meet the artists and discover unique works.",
    content: `
      <p>Wimberley has long been known as an artist's haven, and the monthly Gallery Walk is the perfect opportunity to experience the town's creative spirit firsthand.</p>

      <h2>Featured Galleries</h2>
      <p>From the Wimberley Valley Art League to private studios, over a dozen galleries open their doors during each event. You'll find everything from contemporary paintings to handblown glass and sculptural works.</p>

      <h2>Meet the Artists</h2>
      <p>Many artists attend in person during Gallery Walk, offering visitors the rare chance to discuss their creative process and inspiration. It's an intimate experience you won't find in larger cities.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
    author: {
      name: "Julie Harrington",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    category: "Arts & Culture",
    publishedAt: "2025-11-25",
    featured: false,
    publication: "welcome-to-wimberley",
  },
  {
    id: "4",
    slug: "farm-to-table-hill-country-food-scene",
    title: "Farm-to-Table: Hill Country's Growing Food Scene",
    excerpt:
      "The Hill Country's culinary landscape is thriving with farm-to-table restaurants and local producers leading the way.",
    content: `
      <p>The Texas Hill Country has become a destination for food lovers seeking authentic farm-to-table dining experiences. What began as a handful of pioneering chefs has blossomed into a full-fledged culinary movement, with local restaurants partnering directly with nearby farms and ranches to bring the freshest ingredients to your plate.</p>

      <p>This isn't just a trend — it's a return to the way food was meant to be enjoyed. When your salad greens were harvested that morning and your steak came from a ranch you can actually visit, the dining experience becomes something more meaningful.</p>

      <h2>The Farmers Behind the Food</h2>
      <p>At the heart of the farm-to-table movement are the dedicated farmers and ranchers who have committed to sustainable, small-scale agriculture. These aren't industrial operations — they're family-run businesses with deep roots in the community.</p>

      <figure>
        <img src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&q=80" alt="Local farmer in field with fresh vegetables" />
        <figcaption>Third-generation farmer Sarah Mitchell tends to her organic vegetable rows at Cypress Valley Farm</figcaption>
      </figure>

      <h3>Featured Local Farms</h3>
      <ul>
        <li><strong>Cypress Valley Farm:</strong> Organic vegetables, herbs, and edible flowers grown using regenerative practices</li>
        <li><strong>Hill Country Heritage Ranch:</strong> Pasture-raised beef and lamb from heritage breeds</li>
        <li><strong>Blanco River Goat Dairy:</strong> Award-winning artisan cheeses and fresh chevre</li>
        <li><strong>Wimberley Valley Mushrooms:</strong> Specialty mushrooms grown in climate-controlled facilities</li>
        <li><strong>Johnson's Family Orchard:</strong> Stone fruits and heirloom apples, plus seasonal cider</li>
      </ul>

      <blockquote>
        "When you know where your food comes from, every meal becomes a celebration of community. We're not just feeding people — we're preserving a way of life." — Chef Marcus Rivera, The Cypress Table
      </blockquote>

      <h2>Must-Try Restaurants</h2>
      <p>These restaurants have made farm-to-table dining their mission, crafting menus that change with the seasons and showcase the best of what local producers have to offer.</p>

      <h3>The Cypress Table</h3>
      <p>Located in a renovated 1920s farmhouse, The Cypress Table offers refined Texas cuisine with a focus on local ingredients. Chef Marcus Rivera's tasting menu is a journey through the region's agricultural landscape.</p>
      <ul>
        <li><strong>Signature dish:</strong> 48-hour braised short rib with root vegetable purée</li>
        <li><strong>Price range:</strong> $$$</li>
        <li><strong>Reservations:</strong> Essential, especially weekends</li>
      </ul>

      <figure>
        <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80" alt="Elegant farm-to-table dish presentation" />
        <figcaption>The Cypress Table's seasonal tasting menu features ingredients sourced within 50 miles</figcaption>
      </figure>

      <h3>Leaning Pear Cafe</h3>
      <p>This beloved Wimberley cafe proves that farm-to-table doesn't have to mean fine dining. Their casual menu features creative comfort food made with locally sourced ingredients.</p>
      <ul>
        <li><strong>Signature dish:</strong> Fried green tomato BLT with house-made aioli</li>
        <li><strong>Price range:</strong> $$</li>
        <li><strong>Best for:</strong> Lunch, weekend brunch</li>
      </ul>

      <h3>Creek Road Cafe</h3>
      <p>A neighborhood favorite that has quietly built relationships with local farmers for over a decade. The breakfast tacos alone are worth the drive.</p>

      <h2>What to Look For</h2>
      <p>How can you tell if a restaurant is truly committed to farm-to-table practices? Here are some signs:</p>
      <ol>
        <li><strong>Seasonal menus:</strong> Look for menus that change regularly based on what's available</li>
        <li><strong>Named sources:</strong> Authentic farm-to-table restaurants credit their suppliers</li>
        <li><strong>Limited menu:</strong> Smaller menus often indicate a focus on quality and freshness</li>
        <li><strong>Staff knowledge:</strong> Servers should be able to tell you where ingredients come from</li>
        <li><strong>Higher prices:</strong> Quality local ingredients cost more — be wary of "farm-to-table" claims with rock-bottom prices</li>
      </ol>

      <h2>Farm Tours and Direct Sales</h2>
      <p>Want to go straight to the source? Many local farms welcome visitors and sell directly to the public.</p>

      <figure>
        <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80" alt="Farmers market produce display" />
        <figcaption>The Wimberley Farmers Market brings local producers and consumers together every Saturday</figcaption>
      </figure>

      <h3>Farmers Markets</h3>
      <ul>
        <li><strong>Wimberley Farmers Market:</strong> Saturdays 9 AM - 1 PM at the Community Center</li>
        <li><strong>Dripping Springs Farmers Market:</strong> Saturdays 9 AM - 1 PM, seasonal</li>
        <li><strong>San Marcos Farmers Market:</strong> Saturdays 9 AM - 1 PM at the downtown square</li>
      </ul>

      <h3>On-Farm Experiences</h3>
      <p>Several farms offer tours, workshops, and farm dinners that bring you even closer to the source of your food. Hill Country Heritage Ranch hosts monthly farm dinners where guests dine in the pasture, surrounded by the animals that will eventually become future meals — a powerful reminder of the connection between land, livestock, and plate.</p>

      <h2>The Future of Hill Country Food</h2>
      <p>The farm-to-table movement in the Hill Country shows no signs of slowing down. New farms are launching, restaurants are deepening their commitment to local sourcing, and consumers are increasingly demanding transparency about where their food comes from.</p>

      <p>For visitors, this means an ever-growing array of exceptional dining experiences. For the community, it means a more resilient local food system and the preservation of agricultural traditions that might otherwise be lost to development and industrial farming.</p>

      <p>The next time you sit down for a meal in the Hill Country, take a moment to consider the journey your food took to reach your plate. Chances are, it didn't travel far — and that makes all the difference.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    author: {
      name: "Melissa Ball",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    category: "Food & Drink",
    publishedAt: "2025-11-20",
    featured: true,
    publication: "hill-country-sun",
  },
  {
    id: "5",
    slug: "river-safety-tips-summer-adventures",
    title: "River Safety Tips for Summer Adventures",
    excerpt:
      "Before you hit the water, make sure you're prepared. Our essential safety guide for tubing and kayaking on Hill Country rivers.",
    content: `
      <p>The Hill Country's rivers offer endless opportunities for summer fun, but safety should always come first. Every year, preventable accidents occur on our waterways — and most could be avoided with proper preparation and awareness. Whether you're tubing on the San Marcos or kayaking on the Guadalupe, this comprehensive guide will help ensure a safe and enjoyable experience.</p>

      <h2>Understanding Hill Country Rivers</h2>
      <p>Our rivers are fed by springs and rainfall, which means conditions can change rapidly. What looks like a calm creek in the morning can become a dangerous torrent by afternoon if storms roll through upstream. This unpredictability is part of what makes Hill Country rivers special — but it also demands respect.</p>

      <figure>
        <img src="https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80" alt="Kayakers on calm river water" />
        <figcaption>Even on calm days, proper safety precautions are essential for a good day on the water</figcaption>
      </figure>

      <h2>Before You Go: The Pre-Trip Checklist</h2>
      <p>Never hit the water without completing these essential steps:</p>
      <ol>
        <li><strong>Check water levels:</strong> Visit the USGS Water Resources website or call local outfitters for current conditions</li>
        <li><strong>Monitor weather:</strong> Check forecasts for your area AND areas upstream — storms 50 miles away can affect your river</li>
        <li><strong>Tell someone your plans:</strong> Let a friend or family member know where you'll be and when you expect to return</li>
        <li><strong>Know your route:</strong> Familiarize yourself with put-in and take-out points, rapids, and potential hazards</li>
        <li><strong>Check local regulations:</strong> Rules vary by location and can change seasonally</li>
      </ol>

      <blockquote>
        "The river doesn't care how good a swimmer you are or how many times you've floated before. Respect the water, check the conditions, and never assume yesterday's safe float means today will be the same." — Hays County Water Safety Coordinator
      </blockquote>

      <h2>Essential Safety Gear</h2>
      <p>Proper equipment can mean the difference between a minor incident and a tragedy. Here's what you should always have:</p>

      <h3>Non-Negotiable Items</h3>
      <ul>
        <li><strong>Life jacket (PFD):</strong> Required by law for children under 13, strongly recommended for everyone. Make sure it fits properly and is Coast Guard approved.</li>
        <li><strong>Water shoes:</strong> River bottoms are rocky and slippery. Flip-flops will come off; proper water shoes won't.</li>
        <li><strong>Whistle:</strong> Attach one to your life jacket for emergency signaling</li>
        <li><strong>Waterproof phone case:</strong> For emergencies — keep your phone accessible but protected</li>
      </ul>

      <h3>Highly Recommended Items</h3>
      <ul>
        <li>Dry bag for valuables (keys, wallet, extra clothes)</li>
        <li>Reef-safe sunscreen (SPF 30+, reapply every 2 hours)</li>
        <li>Polarized sunglasses with a retention strap</li>
        <li>Hat with chin strap</li>
        <li>At least 1 liter of water per person per hour on the river</li>
        <li>First aid kit in a waterproof container</li>
      </ul>

      <figure>
        <img src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=800&q=80" alt="River safety equipment laid out" />
        <figcaption>A properly stocked dry bag and Coast Guard-approved PFD are essentials for every river trip</figcaption>
      </figure>

      <h2>Flash Flood Safety</h2>
      <p>Flash floods are the most serious danger on Hill Country rivers. They can occur with little warning and turn a peaceful float into a life-threatening situation.</p>

      <h3>Warning Signs of Rising Water</h3>
      <ul>
        <li>Water changing from clear to murky brown</li>
        <li>Sudden increase in current speed</li>
        <li>Debris floating downstream (sticks, leaves, trash)</li>
        <li>Sound of rushing water increasing</li>
        <li>Water level rising against rocks or banks</li>
      </ul>

      <h3>What to Do If Water Rises</h3>
      <ol>
        <li><strong>Get out immediately:</strong> Head to the nearest bank as quickly and safely as possible</li>
        <li><strong>Go high:</strong> Move to high ground, at least 20 feet above the water line</li>
        <li><strong>Stay put:</strong> Wait for water to recede — do not attempt to cross flooded areas</li>
        <li><strong>Call for help:</strong> If you're trapped, call 911 and stay visible</li>
        <li><strong>Never drive through flooded roads:</strong> "Turn around, don't drown" — just 6 inches of moving water can knock you down</li>
      </ol>

      <h2>River Etiquette and Rules</h2>
      <p>Being a responsible river user protects you, others, and the environment we all enjoy.</p>

      <h3>Do's</h3>
      <ul>
        <li>Pack out everything you bring in — including food waste</li>
        <li>Use designated put-in and take-out points</li>
        <li>Yield to kayaks and canoes when tubing (they're harder to maneuver)</li>
        <li>Keep noise levels reasonable — others are there for peace and nature</li>
        <li>Help other river users in distress when safe to do so</li>
      </ul>

      <h3>Don'ts</h3>
      <ul>
        <li>Bring glass containers — they break and injure future visitors</li>
        <li>Exceed legal alcohol limits (many areas are dry or have strict limits)</li>
        <li>Leave equipment or coolers in the river</li>
        <li>Trespass on private property along the banks</li>
        <li>Feed or disturb wildlife</li>
      </ul>

      <h2>Special Considerations for Families</h2>
      <p>Bringing kids on the river can be a wonderful experience with the right preparation:</p>
      <ol>
        <li>Children under 13 MUST wear a life jacket at all times — no exceptions</li>
        <li>Choose calm, shallow sections appropriate for your children's ages</li>
        <li>Maintain a 1:1 adult-to-child ratio for children under 8</li>
        <li>Practice what to do if someone falls off or gets separated</li>
        <li>Set clear rules before entering the water and review them frequently</li>
        <li>Take breaks often — kids get cold and tired faster than adults</li>
      </ol>

      <h2>Emergency Contacts</h2>
      <p>Save these numbers before your trip:</p>
      <ul>
        <li><strong>Emergency:</strong> 911</li>
        <li><strong>Hays County Sheriff:</strong> (512) 393-7896</li>
        <li><strong>Comal County Sheriff:</strong> (830) 620-3400</li>
        <li><strong>Texas Parks & Wildlife:</strong> (800) 792-1112</li>
        <li><strong>USGS Water Info:</strong> waterdata.usgs.gov</li>
      </ul>

      <p>The rivers of the Hill Country are a precious resource that provides recreation, relaxation, and connection with nature. By following these safety guidelines, you help ensure that you — and everyone who comes after you — can continue to enjoy these waters for generations to come. Stay safe, have fun, and respect the river.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80",
    author: {
      name: "Julie Harrington",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    category: "Outdoors",
    publishedAt: "2025-11-15",
    featured: false,
    publication: "river-region-guide",
  },
  {
    id: "6",
    slug: "historic-landmarks-river-region",
    title: "Historic Landmarks of the River Region",
    excerpt:
      "Take a journey through time with our guide to the most significant historic sites in the Wimberley and River Region area.",
    content: `
      <p>The River Region is rich with history, from early settlement days to the present. These landmarks tell the story of the people who shaped our community.</p>

      <h2>Pioneer Village</h2>
      <p>Step back in time at Pioneer Village, where preserved buildings from the 1800s show what life was like for early settlers in the Hill Country.</p>

      <h2>Historic Downtown</h2>
      <p>Many of Wimberley's downtown buildings date back to the early 1900s. A walking tour reveals the stories behind these charming structures.</p>

      <h2>The Old Mill</h2>
      <p>The historic mill on the Blanco River served as the community's grain processing center for decades. Today it stands as a testament to the area's agricultural heritage.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80",
    author: {
      name: "Melissa Ball",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    category: "History",
    publishedAt: "2025-11-10",
    featured: false,
    publication: "river-region-guide",
  },
  {
    id: "7",
    slug: "wildflower-season-guide",
    title: "Your Guide to Wildflower Season in the Hill Country",
    excerpt:
      "Bluebonnets, Indian paintbrush, and more – discover the best spots and times to experience the Hill Country's legendary wildflower displays.",
    content: `
      <p>Every spring, the Texas Hill Country transforms into a canvas of vibrant colors as wildflowers bloom across meadows, roadsides, and fields.</p>

      <h2>When to Visit</h2>
      <p>Peak wildflower season typically runs from late March through mid-April, though timing varies year to year based on rainfall and temperatures.</p>

      <h2>Best Viewing Spots</h2>
      <p>The Willow City Loop near Fredericksburg offers some of the most spectacular displays. Closer to Wimberley, the roads around Devil's Backbone provide stunning views.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    author: {
      name: "Julie Harrington",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    category: "Outdoors",
    publishedAt: "2025-11-05",
    featured: false,
    publication: "hill-country-sun",
  },
  {
    id: "8",
    slug: "live-music-venues-wimberley",
    title: "The Best Live Music Venues in Wimberley",
    excerpt:
      "From intimate acoustic sets to lively outdoor concerts, Wimberley's music scene offers something for every taste.",
    content: `
      <p>Wimberley has long been a haven for musicians and music lovers alike. The town's intimate venues and outdoor stages create unforgettable experiences.</p>

      <h2>Indoor Venues</h2>
      <p>Several restaurants and bars feature regular live music, offering everything from solo acoustic performers to full bands.</p>

      <h2>Outdoor Concerts</h2>
      <p>During warmer months, outdoor venues come alive with concerts under the stars. The natural amphitheaters of the Hill Country provide perfect acoustics.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80",
    author: {
      name: "Melissa Ball",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    category: "Arts & Culture",
    publishedAt: "2025-10-28",
    featured: false,
    publication: "welcome-to-wimberley",
  },
  {
    id: "9",
    slug: "local-wineries-tour-guide",
    title: "A Tour of Hill Country Wineries",
    excerpt:
      "Texas wine country is closer than you think. Explore the award-winning wineries just a short drive from Wimberley.",
    content: `
      <p>The Texas Hill Country has emerged as one of America's premier wine destinations, with over 50 wineries within easy reach of Wimberley.</p>

      <h2>Must-Visit Wineries</h2>
      <p>From boutique family operations to grand estates, each winery offers a unique experience. Many feature stunning views, live music, and picnic areas.</p>

      <h2>Wine Trail Tips</h2>
      <p>Plan to visit 3-4 wineries per day maximum. Many offer food pairings, and some require reservations on weekends.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",
    author: {
      name: "Julie Harrington",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    category: "Food & Drink",
    publishedAt: "2025-10-20",
    featured: false,
    publication: "hill-country-sun",
  },
  {
    id: "10",
    slug: "fall-festivals-hill-country",
    title: "Fall Festivals You Can't Miss in the Hill Country",
    excerpt:
      "Oktoberfest, harvest celebrations, and more – your guide to the best fall festivals in the region.",
    content: `
      <p>As temperatures cool and leaves begin to change, the Hill Country comes alive with festivals celebrating the season's bounty.</p>

      <h2>Oktoberfest Celebrations</h2>
      <p>Fredericksburg's German heritage shines during Oktoberfest, with traditional music, food, and of course, plenty of beer.</p>

      <h2>Harvest Festivals</h2>
      <p>Local farms and orchards host harvest festivals featuring apple picking, pumpkin patches, and hayrides.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1508997449629-303059a039c0?w=800&q=80",
    author: {
      name: "Melissa Ball",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    category: "Events",
    publishedAt: "2025-10-15",
    featured: false,
    publication: "hill-country-sun",
  },
  {
    id: "11",
    slug: "hiking-trails-beginners",
    title: "Best Hiking Trails for Beginners Near Wimberley",
    excerpt:
      "New to hiking? These easy-to-moderate trails offer beautiful scenery without the intense challenge.",
    content: `
      <p>The Hill Country's diverse terrain offers hiking opportunities for all skill levels. These beginner-friendly trails are perfect for families and newcomers.</p>

      <h2>Easy Trails</h2>
      <p>Blue Hole Regional Park offers gentle paths along Cypress Creek, while Jacob's Well Natural Area has well-maintained trails with minimal elevation change.</p>

      <h2>What to Bring</h2>
      <p>Even on easy hikes, bring plenty of water, wear sturdy shoes, and check weather conditions before heading out.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
    author: {
      name: "Julie Harrington",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    category: "Outdoors",
    publishedAt: "2025-10-10",
    featured: false,
    publication: "hill-country-sun",
  },
  {
    id: "12",
    slug: "pottery-classes-wimberley",
    title: "Where to Take Pottery Classes in Wimberley",
    excerpt:
      "Discover your creative side with hands-on pottery classes offered by local artists and studios.",
    content: `
      <p>Wimberley's artistic community includes talented potters who share their craft through classes and workshops.</p>

      <h2>Local Studios</h2>
      <p>Several studios offer classes for beginners through advanced students, teaching wheel throwing, hand building, and glazing techniques.</p>

      <h2>One-Day Workshops</h2>
      <p>Perfect for visitors, one-day workshops let you create a piece to take home while learning the basics of this ancient art form.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    author: {
      name: "Melissa Ball",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    category: "Arts & Culture",
    publishedAt: "2025-10-05",
    featured: false,
    publication: "welcome-to-wimberley",
  },
  {
    id: "13",
    slug: "breakfast-spots-wimberley",
    title: "The Best Breakfast Spots in Wimberley",
    excerpt:
      "Start your day right at these local favorites serving up everything from hearty Tex-Mex to fresh-baked pastries.",
    content: `
      <p>Whether you're fueling up for a day of adventure or enjoying a leisurely morning, Wimberley has breakfast options to satisfy every craving.</p>

      <h2>Classic Diners</h2>
      <p>For traditional breakfast fare with generous portions and friendly service, the town's diners have been serving locals for decades.</p>

      <h2>Cafés and Bakeries</h2>
      <p>Coffee lovers will find excellent espresso alongside fresh pastries and light breakfast options at several charming cafés.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&q=80",
    author: {
      name: "Julie Harrington",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    category: "Food & Drink",
    publishedAt: "2025-09-28",
    featured: false,
    publication: "welcome-to-wimberley",
  },
  {
    id: "14",
    slug: "community-volunteer-opportunities",
    title: "How to Get Involved: Volunteer Opportunities in Wimberley",
    excerpt:
      "Make a difference in your community. Here's where your time and talents are needed most.",
    content: `
      <p>Wimberley's tight-knit community thrives because of volunteers who give their time to help neighbors and preserve what makes this place special.</p>

      <h2>Environmental Conservation</h2>
      <p>Help protect local waterways and natural areas through cleanup events and conservation projects.</p>

      <h2>Community Services</h2>
      <p>Food banks, animal shelters, and senior services always need helping hands. Even a few hours a month makes a difference.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80",
    author: {
      name: "Melissa Ball",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    category: "Community",
    publishedAt: "2025-09-20",
    featured: false,
    publication: "welcome-to-wimberley",
  },
  {
    id: "15",
    slug: "stargazing-hill-country",
    title: "Stargazing in the Hill Country: Best Dark Sky Spots",
    excerpt:
      "Escape the city lights and discover the Milky Way at these prime stargazing locations.",
    content: `
      <p>The Hill Country's rural character means less light pollution and better views of the night sky. Several areas are known for exceptional stargazing.</p>

      <h2>Dark Sky Parks</h2>
      <p>Enchanted Rock and South Llano River State Park have earned International Dark Sky Park designations for their pristine night skies.</p>

      <h2>Best Viewing Times</h2>
      <p>New moon nights offer the darkest skies. Check astronomical calendars for meteor showers and planet viewing opportunities.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
    author: {
      name: "Julie Harrington",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    category: "Outdoors",
    publishedAt: "2025-09-15",
    featured: false,
    publication: "hunting-guide",
  },
  {
    id: "16",
    slug: "antique-shopping-guide",
    title: "Antique Shopping Guide: Hidden Treasures in the Hill Country",
    excerpt:
      "From rustic farmhouse finds to rare collectibles, explore the best antique shops and markets in the region.",
    content: `
      <p>The Hill Country is a treasure trove for antique hunters, with shops ranging from curated boutiques to sprawling markets.</p>

      <h2>Wimberley Square</h2>
      <p>Several antique shops surround the historic square, offering everything from vintage jewelry to restored furniture.</p>

      <h2>Regional Markets</h2>
      <p>Larger antique markets in nearby towns host hundreds of dealers under one roof, perfect for a full day of hunting.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    author: {
      name: "Melissa Ball",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    category: "Shopping",
    publishedAt: "2025-09-10",
    featured: false,
    publication: "hill-country-sun",
  },
  {
    id: "17",
    slug: "cypress-creek-paddle-guide",
    title: "Paddling Cypress Creek: A Complete Guide",
    excerpt:
      "Everything you need to know about kayaking and paddleboarding on Wimberley's scenic Cypress Creek.",
    content: `
      <p>Cypress Creek offers a peaceful paddling experience through some of the Hill Country's most beautiful scenery.</p>

      <h2>Launch Points</h2>
      <p>Several public access points allow paddlers to choose routes of varying lengths. Blue Hole is a popular starting point.</p>

      <h2>Rental Options</h2>
      <p>Local outfitters offer kayak and paddleboard rentals, including delivery to launch sites for convenience.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    author: {
      name: "Julie Harrington",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    category: "Outdoors",
    publishedAt: "2025-09-05",
    featured: false,
    publication: "river-region-guide",
  },
  {
    id: "18",
    slug: "local-artisan-cheese-makers",
    title: "Meet the Local Artisan Cheese Makers",
    excerpt:
      "From goat cheese to aged cheddar, discover the craft cheese makers calling the Hill Country home.",
    content: `
      <p>A growing number of artisan cheese makers have set up shop in the Hill Country, taking advantage of local dairy farms and ideal aging conditions.</p>

      <h2>Farm Visits</h2>
      <p>Several cheese makers welcome visitors for tours and tastings, offering a glimpse into the craft of cheese making.</p>

      <h2>Where to Buy</h2>
      <p>Find local cheeses at farmers markets, specialty food shops, and directly from the farms themselves.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=800&q=80",
    author: {
      name: "Melissa Ball",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    category: "Food & Drink",
    publishedAt: "2025-08-28",
    featured: false,
    publication: "hill-country-sun",
  },
  {
    id: "19",
    slug: "holiday-light-trails",
    title: "Hill Country Holiday Light Trails and Displays",
    excerpt:
      "Make your season bright with these spectacular holiday light displays across the region.",
    content: `
      <p>The Hill Country sparkles during the holiday season, with communities large and small putting on impressive light displays.</p>

      <h2>Drive-Through Displays</h2>
      <p>Several parks and venues offer drive-through experiences where you can enjoy millions of lights from the comfort of your car.</p>

      <h2>Walking Tours</h2>
      <p>Downtown areas feature walkable light displays, often combined with holiday markets and seasonal treats.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&q=80",
    author: {
      name: "Julie Harrington",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    category: "Events",
    publishedAt: "2025-08-20",
    featured: false,
    publication: "hill-country-sun",
  },
  {
    id: "20",
    slug: "wedding-venues-hill-country",
    title: "Dream Wedding Venues in the Texas Hill Country",
    excerpt:
      "Say 'I do' with stunning Hill Country views. Our guide to the most beautiful wedding venues in the region.",
    content: `
      <p>The Texas Hill Country has become one of the most sought-after wedding destinations, offering breathtaking venues for every style and budget.</p>

      <h2>Ranch Venues</h2>
      <p>Historic ranches offer rustic elegance with sprawling grounds, vintage barns, and panoramic views.</p>

      <h2>Vineyard Weddings</h2>
      <p>Say your vows among the vines at one of the region's picturesque wineries, many of which offer full wedding services.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    author: {
      name: "Melissa Ball",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    category: "Events",
    publishedAt: "2025-08-15",
    featured: false,
    publication: "hill-country-sun",
  },
  {
    id: "21",
    slug: "bird-watching-hotspots",
    title: "Bird Watching Hotspots Around Wimberley",
    excerpt:
      "The Hill Country is a birder's paradise. Discover where to spot rare and beautiful species year-round.",
    content: `
      <p>Located along the Central Flyway, the Hill Country sees an incredible diversity of bird species throughout the year.</p>

      <h2>Spring Migration</h2>
      <p>March through May brings waves of colorful warblers, tanagers, and other neotropical migrants passing through the region.</p>

      <h2>Resident Species</h2>
      <p>Golden-cheeked warblers and black-capped vireos nest in the Hill Country, making it a destination for birders seeking these endangered species.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1444464666168-49d633b86797?w=800&q=80",
    author: {
      name: "Julie Harrington",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    category: "Outdoors",
    publishedAt: "2025-08-10",
    featured: false,
    publication: "hunting-guide",
  },
  {
    id: "22",
    slug: "summer-camp-guide-kids",
    title: "Summer Camp Guide for Hill Country Kids",
    excerpt:
      "From nature adventures to arts programs, find the perfect summer camp for your children.",
    content: `
      <p>The Hill Country offers exceptional summer camp experiences that combine outdoor adventure with learning and creativity.</p>

      <h2>Day Camps</h2>
      <p>Local day camps offer convenient options for families, with programs focused on everything from swimming to science.</p>

      <h2>Overnight Camps</h2>
      <p>Traditional overnight camps provide immersive experiences in nature, building independence and lasting friendships.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1472898965229-f9b06b9c9bbe?w=800&q=80",
    author: {
      name: "Melissa Ball",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    category: "Community",
    publishedAt: "2025-08-05",
    featured: false,
    publication: "hill-country-sun",
  },
  {
    id: "23",
    slug: "texas-bbq-trail",
    title: "The Ultimate Texas BBQ Trail Near Wimberley",
    excerpt:
      "Brisket, ribs, and sausage – your guide to the best barbecue joints within an hour's drive.",
    content: `
      <p>Central Texas is the heart of American barbecue, and you don't have to go far from Wimberley to find world-class smoked meats.</p>

      <h2>Legendary Spots</h2>
      <p>Lockhart, the official BBQ Capital of Texas, is just 30 minutes away and home to several legendary pitmasters.</p>

      <h2>Hidden Gems</h2>
      <p>Smaller towns throughout the region have their own beloved BBQ joints, often with shorter lines and equally delicious food.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=800&q=80",
    author: {
      name: "Julie Harrington",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    },
    category: "Food & Drink",
    publishedAt: "2025-07-28",
    featured: false,
    publication: "hill-country-sun",
  },
  {
    id: "24",
    slug: "historic-dance-halls",
    title: "Historic Texas Dance Halls of the Hill Country",
    excerpt:
      "Two-step into history at these legendary dance halls that have been hosting live music for generations.",
    content: `
      <p>The Hill Country is home to some of the oldest and most beloved dance halls in Texas, where live music and dancing continue traditions dating back over a century.</p>

      <h2>Living History</h2>
      <p>Gruene Hall, Luckenbach, and other historic venues offer authentic Texas experiences with live music every week.</p>

      <h2>Dance Lessons</h2>
      <p>Many halls offer two-step and waltz lessons before the main event, perfect for newcomers to Texas dance culture.</p>
    `,
    mainImage:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80",
    author: {
      name: "Melissa Ball",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    },
    category: "History",
    publishedAt: "2025-07-20",
    featured: false,
    publication: "hill-country-sun",
  },
];

// Mock Magazine Issues
export const mockIssues: MagazineIssue[] = [
  // Hill Country Sun Issues
  {
    id: "1",
    slug: "hcs-holiday-2025-26",
    title: "Holiday 2025-26",
    coverImage:
      "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&q=80",
    issuuEmbedUrl: "https://issuu.com/hillcountrysun/docs/holiday2025",
    publishedAt: "2025-12-01",
    isCurrent: true,
    publicationSlug: "hill-country-sun",
  },
  {
    id: "2",
    slug: "hcs-fall-2025",
    title: "Fall 2025",
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    issuuEmbedUrl: "https://issuu.com/hillcountrysun/docs/fall2025",
    publishedAt: "2025-09-01",
    isCurrent: false,
    publicationSlug: "hill-country-sun",
  },
  {
    id: "3",
    slug: "hcs-summer-2025",
    title: "Summer 2025",
    coverImage:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
    issuuEmbedUrl: "https://issuu.com/hillcountrysun/docs/summer2025",
    publishedAt: "2025-06-01",
    isCurrent: false,
    publicationSlug: "hill-country-sun",
  },
  {
    id: "4",
    slug: "hcs-spring-2025",
    title: "Spring 2025",
    coverImage:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    issuuEmbedUrl: "https://issuu.com/hillcountrysun/docs/spring2025",
    publishedAt: "2025-03-01",
    isCurrent: false,
    publicationSlug: "hill-country-sun",
  },
  // Welcome to Wimberley Issues
  {
    id: "5",
    slug: "wtw-2025",
    title: "2025 Edition",
    coverImage:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80",
    issuuEmbedUrl: "https://issuu.com/hillcountrysun/docs/wtw2025",
    publishedAt: "2025-03-01",
    isCurrent: true,
    publicationSlug: "welcome-to-wimberley",
  },
  {
    id: "6",
    slug: "wtw-2024",
    title: "2024 Edition",
    coverImage:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
    issuuEmbedUrl: "https://issuu.com/hillcountrysun/docs/wtw2024",
    publishedAt: "2024-03-01",
    isCurrent: false,
    publicationSlug: "welcome-to-wimberley",
  },
  {
    id: "7",
    slug: "wtw-2023",
    title: "2023 Edition",
    coverImage:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    issuuEmbedUrl: "https://issuu.com/hillcountrysun/docs/wtw2023",
    publishedAt: "2023-03-01",
    isCurrent: false,
    publicationSlug: "welcome-to-wimberley",
  },
  // River Region Guide Issues
  {
    id: "8",
    slug: "rrg-summer-2025",
    title: "Summer 2025",
    coverImage:
      "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80",
    issuuEmbedUrl: "https://issuu.com/hillcountrysun/docs/rrg-summer2025",
    publishedAt: "2025-05-01",
    isCurrent: true,
    publicationSlug: "river-region-guide",
  },
  {
    id: "9",
    slug: "rrg-summer-2024",
    title: "Summer 2024",
    coverImage:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    issuuEmbedUrl: "https://issuu.com/hillcountrysun/docs/rrg-summer2024",
    publishedAt: "2024-05-01",
    isCurrent: false,
    publicationSlug: "river-region-guide",
  },
  {
    id: "10",
    slug: "rrg-summer-2023",
    title: "Summer 2023",
    coverImage:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
    issuuEmbedUrl: "https://issuu.com/hillcountrysun/docs/rrg-summer2023",
    publishedAt: "2023-05-01",
    isCurrent: false,
    publicationSlug: "river-region-guide",
  },
  // Hunting Guide Issues
  {
    id: "11",
    slug: "hg-2025-26",
    title: "2025-26 Season",
    coverImage:
      "https://images.unsplash.com/photo-1516655855035-d5215bcb5604?w=800&q=80",
    issuuEmbedUrl: "https://issuu.com/hillcountrysun/docs/hg-2025",
    publishedAt: "2025-09-01",
    isCurrent: true,
    publicationSlug: "hunting-guide",
  },
  {
    id: "12",
    slug: "hg-2024-25",
    title: "2024-25 Season",
    coverImage:
      "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80",
    issuuEmbedUrl: "https://issuu.com/hillcountrysun/docs/hg-2024",
    publishedAt: "2024-09-01",
    isCurrent: false,
    publicationSlug: "hunting-guide",
  },
  {
    id: "13",
    slug: "hg-2023-24",
    title: "2023-24 Season",
    coverImage:
      "https://images.unsplash.com/photo-1516655855035-d5215bcb5604?w=800&q=80",
    issuuEmbedUrl: "https://issuu.com/hillcountrysun/docs/hg-2023",
    publishedAt: "2023-09-01",
    isCurrent: false,
    publicationSlug: "hunting-guide",
  },
];

// Mock Events
export const mockEvents: Event[] = [
  {
    id: "1",
    title: "Wimberley Market Days",
    description:
      "Shop from over 400 vendors featuring handmade crafts, antiques, art, and more at Lion's Field.",
    date: "2025-12-07",
    location: "Lion's Field, Wimberley",
    link: "https://shopmarketdays.com",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    category: "Shopping",
  },
  {
    id: "2",
    title: "Hill Country Wine Trail",
    description:
      "Visit participating wineries along the Hill Country Wine Trail for tastings and special events.",
    date: "2025-12-14",
    endDate: "2025-12-15",
    location: "Various Hill Country Wineries",
    link: "https://texaswinetrail.com",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80",
    category: "Food & Drink",
  },
  {
    id: "3",
    title: "Live Music at the Square",
    description:
      "Enjoy live performances from local and regional artists at the Wimberley town square.",
    date: "2025-12-20",
    location: "Wimberley Square",
    category: "Music",
  },
  {
    id: "4",
    title: "Wimberley Farmers Market",
    description:
      "Fresh produce, artisan goods, and local products every Saturday morning.",
    date: "2025-12-21",
    location: "Wimberley Community Center",
    image:
      "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80",
    category: "Shopping",
  },
  {
    id: "5",
    title: "Holiday Art Walk",
    description:
      "Special holiday edition of the monthly gallery walk featuring seasonal art and refreshments.",
    date: "2025-12-21",
    location: "Downtown Wimberley Galleries",
    category: "Arts & Culture",
  },
  {
    id: "6",
    title: "New Year's Eve Celebration",
    description:
      "Ring in the new year with live music, food, and fireworks at the community center.",
    date: "2025-12-31",
    location: "Wimberley Community Center",
    category: "Community",
  },
];


// Helper functions
export function getFeaturedArticles(): Article[] {
  return mockArticles.filter((article) => article.featured);
}

export function getLatestArticles(limit: number = 6): Article[] {
  return [...mockArticles]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
    .slice(0, limit);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return mockArticles.find((article) => article.slug === slug);
}

export function getCurrentIssue(publicationSlug?: string): MagazineIssue | undefined {
  if (publicationSlug) {
    return mockIssues.find(
      (issue) => issue.isCurrent && issue.publicationSlug === publicationSlug
    );
  }
  // Default to Hill Country Sun if no publication specified
  return mockIssues.find(
    (issue) => issue.isCurrent && issue.publicationSlug === "hill-country-sun"
  );
}

export function getIssueBySlug(slug: string): MagazineIssue | undefined {
  return mockIssues.find((issue) => issue.slug === slug);
}

export function getUpcomingEvents(limit: number = 6): Event[] {
  const today = new Date();
  return mockEvents
    .filter((event) => new Date(event.date) >= today)
    .sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    )
    .slice(0, limit);
}

// Publication helper functions
export function getPublicationBySlug(slug: string): Publication | undefined {
  return mockPublications.find((pub) => pub.slug === slug);
}

export function getAllPublications(): Publication[] {
  return mockPublications;
}

export function getIssuesByPublication(publicationSlug: string): MagazineIssue[] {
  return mockIssues
    .filter((issue) => issue.publicationSlug === publicationSlug)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getCurrentIssueByPublication(publicationSlug: string): MagazineIssue | undefined {
  return mockIssues.find(
    (issue) => issue.publicationSlug === publicationSlug && issue.isCurrent
  );
}

export function getArticlesByPublication(publicationSlug: string): Article[] {
  return mockArticles
    .filter((article) => article.publication === publicationSlug)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
}

export function getUniquePublications(): string[] {
  return [...new Set(mockArticles.map((a) => a.publication))];
}

// Author types and helpers
export interface Author {
  name: string;
  slug: string;
  image: string;
  bio: string;
  role: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getUniqueAuthors(): Author[] {
  const authorMap = new Map<string, Author>();

  mockArticles.forEach((article) => {
    if (!authorMap.has(article.author.name)) {
      authorMap.set(article.author.name, {
        name: article.author.name,
        slug: slugify(article.author.name),
        image: article.author.image,
        bio: "Contributing writer for Hill Country Sun, covering local news, events, and community stories from the Wimberley area.",
        role: "Contributing Writer",
      });
    }
  });

  return Array.from(authorMap.values());
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return getUniqueAuthors().find((author) => author.slug === slug);
}

export function getArticlesByAuthor(authorName: string): Article[] {
  return mockArticles.filter((article) => article.author.name === authorName);
}

export function getUniqueCategories(): string[] {
  return [...new Set(mockArticles.map((a) => a.category))];
}

export function getArticleYears(): number[] {
  const years = mockArticles.map((a) => new Date(a.publishedAt).getFullYear());
  return [...new Set(years)].sort((a, b) => b - a);
}
