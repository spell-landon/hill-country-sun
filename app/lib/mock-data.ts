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
}

export interface MagazineIssue {
  id: string;
  slug: string;
  title: string;
  coverImage: string;
  issuuEmbedUrl: string;
  publishedAt: string;
  isCurrent: boolean;
}

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

export interface GuideSection {
  title: string;
  content: string;
  image?: string;
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  heroImage: string;
  intro: string;
  sections: GuideSection[];
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
      <p>Wimberley Market Days, one of the most anticipated events in the Texas Hill Country, returns this spring with a spectacular lineup of artisans, craftspeople, and local vendors.</p>

      <h2>What's New This Year</h2>
      <p>This season brings over 400 vendors to Lion's Field, featuring handcrafted jewelry, pottery, woodwork, textiles, and gourmet foods from across the region. The market has expanded to include a dedicated area for local food producers and a children's activity zone.</p>

      <h2>Live Entertainment</h2>
      <p>The main stage will feature local musicians throughout the day, with genres ranging from country and bluegrass to folk and rock. Food trucks and local restaurants will be on site to keep you fueled for a full day of shopping.</p>

      <h2>Tips for Visitors</h2>
      <p>Arrive early to beat the crowds and secure parking. Bring cash for smaller vendors, wear comfortable shoes, and don't forget your reusable bags. The market runs from 7 AM to 4 PM on the first Saturday of each month, April through December.</p>
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
  },
  {
    id: "2",
    slug: "best-swimming-holes-hill-country",
    title: "Best Swimming Holes in the Hill Country",
    excerpt:
      "From Jacob's Well to Blue Hole, discover the most refreshing natural swimming spots the Texas Hill Country has to offer.",
    content: `
      <p>The Texas Hill Country is blessed with some of the most beautiful natural swimming holes in the state. Fed by crystal-clear spring water, these swimming spots offer a refreshing escape from the summer heat.</p>

      <h2>Jacob's Well</h2>
      <p>Perhaps the most famous swimming hole in Texas, Jacob's Well is a perpetual artesian spring that plunges 140 feet into the earth. The crystal-clear water maintains a constant 68°F year-round.</p>

      <h2>Blue Hole</h2>
      <p>Located in Wimberley, Blue Hole Regional Park offers a scenic swimming experience surrounded by towering cypress trees. The park requires reservations during peak season.</p>

      <h2>Krause Springs</h2>
      <p>This family-owned property near Spicewood features natural swimming holes fed by 32 springs, plus camping facilities for those who want to extend their stay.</p>
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
  },
  {
    id: "4",
    slug: "farm-to-table-hill-country-food-scene",
    title: "Farm-to-Table: Hill Country's Growing Food Scene",
    excerpt:
      "The Hill Country's culinary landscape is thriving with farm-to-table restaurants and local producers leading the way.",
    content: `
      <p>The Texas Hill Country has become a destination for food lovers seeking authentic farm-to-table dining experiences. Local chefs are partnering with nearby farms and ranches to bring the freshest ingredients to your plate.</p>

      <h2>Local Farms Making a Difference</h2>
      <p>From organic vegetable farms to heritage livestock ranches, the region's agricultural diversity provides chefs with an incredible palette of ingredients. Many farms offer tours and direct sales to the public.</p>

      <h2>Must-Try Restaurants</h2>
      <p>Whether you're looking for upscale dining or casual fare, the Hill Country has options for every palate. Several restaurants have earned recognition for their commitment to local sourcing and sustainable practices.</p>
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
  },
  {
    id: "5",
    slug: "river-safety-tips-summer-adventures",
    title: "River Safety Tips for Summer Adventures",
    excerpt:
      "Before you hit the water, make sure you're prepared. Our essential safety guide for tubing and kayaking on Hill Country rivers.",
    content: `
      <p>The Hill Country's rivers offer endless opportunities for summer fun, but safety should always come first. Whether you're tubing on the San Marcos or kayaking on the Guadalupe, these tips will help ensure a safe and enjoyable experience.</p>

      <h2>Know Before You Go</h2>
      <p>Always check water levels and weather conditions before heading out. Flash floods can occur quickly in the Hill Country, especially during spring and early summer.</p>

      <h2>Essential Gear</h2>
      <p>Life jackets are essential, even for strong swimmers. Bring plenty of water, sunscreen, and a waterproof bag for valuables. Wear shoes that can get wet – river bottoms can be rocky.</p>

      <h2>Respect the River</h2>
      <p>Pack out what you pack in, and never bring glass containers on the river. Many areas have regulations about alcohol, so check local rules before your trip.</p>
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
  },
];

// Mock Magazine Issues
export const mockIssues: MagazineIssue[] = [
  {
    id: "1",
    slug: "holiday-2025-26",
    title: "Holiday 2025-26",
    coverImage:
      "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=800&q=80",
    issuuEmbedUrl: "https://issuu.com/hillcountrysun/docs/holiday2025",
    publishedAt: "2025-12-01",
    isCurrent: true,
  },
  {
    id: "2",
    slug: "fall-2025",
    title: "Fall 2025",
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    issuuEmbedUrl: "https://issuu.com/hillcountrysun/docs/fall2025",
    publishedAt: "2025-09-01",
    isCurrent: false,
  },
  {
    id: "3",
    slug: "summer-2025",
    title: "Summer 2025",
    coverImage:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
    issuuEmbedUrl: "https://issuu.com/hillcountrysun/docs/summer2025",
    publishedAt: "2025-06-01",
    isCurrent: false,
  },
  {
    id: "4",
    slug: "spring-2025",
    title: "Spring 2025",
    coverImage:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    issuuEmbedUrl: "https://issuu.com/hillcountrysun/docs/spring2025",
    publishedAt: "2025-03-01",
    isCurrent: false,
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

// Mock Guides
export const mockGuides: Record<string, Guide> = {
  "welcome-to-wimberley": {
    id: "1",
    slug: "welcome-to-wimberley",
    title: "Welcome to Wimberley",
    heroImage:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1200&q=80",
    intro:
      "Nestled in the heart of the Texas Hill Country, Wimberley is a charming village known for its natural beauty, thriving arts scene, and warm community spirit. Whether you're visiting for a day or planning an extended stay, this guide will help you discover all that Wimberley has to offer.",
    sections: [
      {
        title: "Things to Do",
        content:
          "From swimming at Blue Hole to browsing unique shops on the square, Wimberley offers endless opportunities for exploration. Don't miss Market Days on the first Saturday of the month, or take a scenic drive along the Devil's Backbone.",
        image:
          "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
      },
      {
        title: "Where to Eat",
        content:
          "Wimberley's culinary scene ranges from casual cafes to fine dining. Try local favorites like Wimberley Cafe for breakfast, or enjoy craft cocktails and elevated cuisine at one of the newer restaurants in town.",
        image:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
      },
      {
        title: "Where to Stay",
        content:
          "Choose from cozy bed and breakfasts, luxury vacation rentals, or scenic campgrounds. Many accommodations offer stunning views of the Hill Country landscape and easy access to local attractions.",
        image:
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      },
      {
        title: "Local Tips",
        content:
          "Wimberley is best experienced at a leisurely pace. Allow extra time for wandering the shops, and consider visiting during the week to avoid weekend crowds. Don't forget to bring cash – some smaller vendors don't accept cards.",
      },
    ],
  },
  "river-region-guide": {
    id: "2",
    slug: "river-region-guide",
    title: "River Region Guide",
    heroImage:
      "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=1200&q=80",
    intro:
      "The River Region encompasses the beautiful waterways and communities along the Blanco, San Marcos, and Guadalupe rivers. This guide covers everything from water recreation to riverside dining and natural attractions.",
    sections: [
      {
        title: "Rivers & Swimming",
        content:
          "The region's spring-fed rivers offer crystal-clear water perfect for swimming, tubing, and kayaking. Popular spots include Blue Hole, Jacob's Well, and numerous access points along the Guadalupe River.",
        image:
          "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=800&q=80",
      },
      {
        title: "Water Activities",
        content:
          "Whether you prefer a lazy float down the river or an adventurous kayak trip, the River Region has options for every skill level. Several outfitters offer equipment rentals and guided trips.",
        image:
          "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800&q=80",
      },
      {
        title: "Riverside Dining",
        content:
          "Enjoy a meal with a view at one of the region's riverside restaurants. From casual fish camps to upscale patios, you'll find great food with beautiful water views.",
        image:
          "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      },
      {
        title: "Safety & Conservation",
        content:
          "Help preserve our rivers by following Leave No Trace principles. Always check water conditions before swimming, and be aware of flash flood risks during rainy periods.",
      },
    ],
  },
  "hunting-guide": {
    id: "3",
    slug: "hunting-guide",
    title: "Hunting Guide",
    heroImage:
      "https://images.unsplash.com/photo-1516655855035-d5215bcb5604?w=1200&q=80",
    intro:
      "The Texas Hill Country offers exceptional hunting opportunities, from white-tailed deer to wild turkey and exotics. This guide covers seasons, regulations, and the best hunting experiences in the region.",
    sections: [
      {
        title: "Hunting Seasons",
        content:
          "Texas hunting seasons vary by species and region. White-tailed deer season typically runs from early November through mid-January, while spring turkey season occurs in April and May. Always check current regulations with Texas Parks & Wildlife.",
        image:
          "https://images.unsplash.com/photo-1516655855035-d5215bcb5604?w=800&q=80",
      },
      {
        title: "Hunting Ranches",
        content:
          "The Hill Country is home to numerous hunting ranches offering guided hunts, lodging, and processing services. Many ranches specialize in trophy deer management, while others offer exotic game hunting year-round.",
        image:
          "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=800&q=80",
      },
      {
        title: "Licenses & Regulations",
        content:
          "All hunters must possess a valid Texas hunting license. Additional stamps may be required depending on the species you're hunting. Youth hunters have special licensing options and seasons.",
      },
      {
        title: "Processing & Taxidermy",
        content:
          "Local meat processors can handle your harvest, offering everything from basic processing to specialty sausages. Several taxidermists in the area can preserve your trophy for display.",
      },
    ],
  },
};

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

export function getCurrentIssue(): MagazineIssue | undefined {
  return mockIssues.find((issue) => issue.isCurrent);
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

export function getGuideBySlug(slug: string): Guide | undefined {
  return mockGuides[slug];
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
