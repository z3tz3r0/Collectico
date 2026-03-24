const products = [ {
    id: 1,
    image: '/productPicture/Abstract-Painting-Modern-Art-1.jpg',
    title: 'Modern Portrait in Brown',
    artist: 'Sophia Laurent',
    price: 2450.00,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie sem sagittis felis ornare euismod. Proin egestas convallis nisl, in consectetur libero rhoncus at. Integer nec varius felis. Maecenas nec nulla ac neque facilisis fermentum non a elit. In eu sapien eu leo imperdiet maximus. Nulla bibendum congue felis, vulputate auctor dolor venenatis sit amet. Nunc fermentum congue fringilla. Nulla sit amet porta risus. Aliquam id gravida dolor, vitae accumsan erat. Mauris vel ultrices mi. Sed molestie metus laoreet purus pretium gravida. Proin non semper nulla. Praesent vel egestas orci. Sed porttitor nulla eu dolor imperdiet, fermentum cursus ex ultrices. In consectetur sagittis ex a auctor. Nunc varius diam eu viverra pulvinar.',
    dimensions: "45cm x 22cm x 8cm",
    material: "Linen",
    year: "1998",
    startingBid: 2000,
    endDate: "2025-05-07T15:30:00Z",
  },
  {
    id: 2,
    image: '/productPicture/Abstract-Painting-Classic-Art-5.jpg',
    title: 'Faint Shades of Silence',
    artist: 'Marcus Aurelio',
    price: 3870.00,
    description: 'Suspendisse potenti. Nullam facilisis odio in nulla tempus vehicula sed lacinia mi. Nulla facilisi. Suspendisse mauris velit, varius a porta ut, pulvinar sit amet sem. Praesent commodo tincidunt nisl, eget eleifend tellus sagittis vitae. Vivamus ut vestibulum massa, ac porta massa. Integer scelerisque tellus vitae lorem luctus, non varius purus posuere. Etiam sit amet odio sapien. Fusce id est auctor, porta felis in, lobortis tellus. Praesent at dapibus magna, vitae ullamcorper mi. Sed tincidunt sem sit amet massa sagittis, in ultrices massa vestibulum. Cras interdum ante sit amet lacus efficitur finibus. Sed nec vulputate quam, mollis placerat augue. In at semper est, ac posuere mauris. Nullam lorem magna, bibendum id augue vitae, congue vulputate nisl. Proin imperdiet ligula id lacinia tempor.',
    alt: 'Genre Painting Modern Art'
    , tags: ["modern", "dernmo"],
    startingBid: 1000,
    endDate: "2025-05-09T18:25:00Z",
  },
  {
    id: 3,
    image: '/productPicture/Portrait-Painting-Modern-Art-2.jpg',
    title: 'Grace in Elegance',
    artist: 'Isabella Moretti',
    price: 5620.00,
    description: 'Sed at bibendum ligula. Phasellus hendrerit tempus libero, et euismod enim volutpat sit amet. Etiam congue lorem in orci elementum maximus. Aenean dictum mattis erat interdum faucibus. Vivamus vulputate tortor diam, eget tempus ante commodo at. Nullam lobortis nulla ac vestibulum commodo. Sed in iaculis felis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed porttitor dui a vestibulum consequat. Donec ornare mattis quam, eu bibendum enim suscipit ac.',
    alt: 'Genre Painting Classic Art'
    , tags: ["modern", "dernmo"],
    startingBid: 2000,
    endDate: "2025-05-06T19:25:00Z",
  },
  {
    id: 4,
    image: '/productPicture/Historical-Painting-Classic-Art-2.jpg',
    title: 'Wisdom of the Ages',
    artist: 'Jean-François Ducis',
    price: 6350.00,
    alt: 'Abstract Painting Classic Art'
    , tags: ["man", ""],
    startingBid: 1500,
    endDate: "2025-05-08T10:18:00Z",
  },
  {
    id: 5,
    image: '/productPicture/Portrait-Painting-Classic-Art-1.jpg',
    title: 'Woman with Gold Earrings',
    artist: 'Pietro Bernini',
    price: 8270.00,
    alt: 'Abstract Painting Classic Art'
    , tags: ["modern", "man"],
    startingBid: 2000,
    endDate: "2025-05-07T20:25:00Z",
  },
  {
    id: 6,
    image: '/productPicture/Abstract-Painting-Contemporary-Art-4.jpg',
    title: 'Solar Radiance',
    artist: 'Jean-François Ducis',
    price: 2450.00,
    alt: 'Abstract Painting Contemporary Art'
    , tags: ["modern", "dernmo"],
    startingBid: 10000,
    endDate: "2025-05-10T11:13:00Z",
  },
  {
    id: 7,
    image: '/productPicture/Abstract-Painting-Contemporary-Art-3.jpg',
    title: 'Fragmented Woman',
    artist: 'Sophia Laurent',
    price: 8600.00,
    alt: 'Abstract Painting Contemporary Art'
    , tags: ["modern", "dernmo"],
    startingBid: 20000,
    endDate: "2025-05-07T05:26:00Z",
  },
  {
    id: 8,
    image: '/productPicture/Landscape-Painting-Classic-Art-5.jpg',
    title: 'Country Cottage',
    artist: 'James Fletcher-Watson',
    price: 5400.00,
    alt: 'Abstract Painting Contemporary Art'
    , tags: ["Classic", "Portrait"],
    startingBid: 18000,
    endDate: "2025-05-07T12:25:00Z",
  },
  {
    id: 9,
    image: '/productPicture/Abstract-Painting-Classic-Art-1.jpg',
    title: 'Three Figures on Horizon',
    artist: 'Cathy Hegman',
    price: 2450.00,
    description: 'abcd',
    alt: 'Abstract Painting Contemporary Art',
    tags: ["Classic", "Portrait"],
    startingBid: 4500,
    endDate: "2025-05-09T18:25:00Z",
  },
  {
    id: 10,
    image: '/productPicture/Abstract-Painting-Classic-Art-4.jpg',
    title: "The Wanderer's Gaze",
    artist: "Marcus Aurelius",
    price: 2950.00,
    description: "This oil painting portrays a man with flowing hair and a pensive expression, illuminated by dramatic lighting that contrasts golden highlights against deep shadows. His upward gaze suggests contemplation or longing, evoking a sense of mystery and introspection. The bold brushstrokes and rich hues—predominantly reds, yellows, and dark blues—convey raw emotion and depth, blending classical portraiture with an impressionistic touch. The figure's timeless appearance invites viewers to interpret his story: Is he a philosopher, a traveler, or a figure from a distant era? This piece captures the intersection of light and thought, leaving a lasting impression of both strength and vulnerability.",
    dimensions: "45cm x 22cm x 8cm",
    material: "Linen",
    year: "1998",
    tags: ["Classic", "Portrait"],
    startingBid: 2000,
    endDate: "2025-05-08T12:00:00Z",

  },]



export default products;



// const products = [
//     {
//         image: '../public/productPicture/Abstract-Painting-Modern-Art-1.jpg',
//         title: 'Modern Portrait in Brown',
//         artist: 'Sophia Laurent',
//         price: 2450.00
//     },
//     {
//         image: '../public/productPicture/Abstract-Painting-Classic-Art-5.jpg',
//         title: 'Faint Shades of Silence',
//         artist: 'Marcus Aurelio',
//         price: 3870.00
//     },
//     {
//         image: '../public/productPicture/Portrait-Painting-Modern-Art-2.jpg',
//         title: 'Grace in Elegance',
//         artist: 'Isabella Moretti',
//         price: 5620.00
//     },
//     {
//         image: '../public/productPicture/Historical-Painting-Classic-Art-2.jpg',
//         title: 'Wisdom of the Ages',
//         artist: 'Pietro Bernini',
//         price: 6350.00
//     },{
//         image: '../public/productPicture/Portrait-Painting-Classic-Art-1.jpg',
//         title: 'Woman with Gold Earrings',
//         artist: 'Pietro Bernini',
//         price: 6350.00
//     },{
//         image: '../public/productPicture/Abstract-Painting-Contemporary-Art-4.jpg',
//         title: 'Solar Radiance',
//         artist: 'Pietro Bernini',
//         price: 6350.00
//     },{
//         image: '../public/productPicture/Abstract-Painting-Contemporary-Art-3.jpg',
//         title: 'Fragmented Woman',
//         artist: 'Pietro Bernini',
//         price: 6350.00
//     },{
//         image: '../public/productPicture/Landscape-Painting-Classic-Art-5.jpg',
//         title: 'Country Cottage',
//         artist: 'Pietro Bernini',
//         price: 6350.00
//     },]


// const products = [ {
//   id: 1,
//   image: '/productPicture/Abstract-Painting-Classic-Art-1.jpg',
//   title: 'A',
//   artist: 'Sophia Laurent',
//   price: 2450.00,
//   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed molestie sem sagittis felis ornare euismod. Proin egestas convallis nisl, in consectetur libero rhoncus at. Integer nec varius felis. Maecenas nec nulla ac neque facilisis fermentum non a elit. In eu sapien eu leo imperdiet maximus. Nulla bibendum congue felis, vulputate auctor dolor venenatis sit amet. Nunc fermentum congue fringilla. Nulla sit amet porta risus. Aliquam id gravida dolor, vitae accumsan erat. Mauris vel ultrices mi. Sed molestie metus laoreet purus pretium gravida. Proin non semper nulla. Praesent vel egestas orci. Sed porttitor nulla eu dolor imperdiet, fermentum cursus ex ultrices. In consectetur sagittis ex a auctor. Nunc varius diam eu viverra pulvinar.',
//   dimensions: "45cm x 22cm x 8cm",
//   material: "Linen",
//   year: "1998"
// },
// {
//   id: 2,
//   image: '/productPicture/Abstract-Painting-Classic-Art-5.jpg',
//   title: 'B',
//   artist: 'Sophia Laurent',
//   price: 2450.00,
//   description: 'Suspendisse potenti. Nullam facilisis odio in nulla tempus vehicula sed lacinia mi. Nulla facilisi. Suspendisse mauris velit, varius a porta ut, pulvinar sit amet sem. Praesent commodo tincidunt nisl, eget eleifend tellus sagittis vitae. Vivamus ut vestibulum massa, ac porta massa. Integer scelerisque tellus vitae lorem luctus, non varius purus posuere. Etiam sit amet odio sapien. Fusce id est auctor, porta felis in, lobortis tellus. Praesent at dapibus magna, vitae ullamcorper mi. Sed tincidunt sem sit amet massa sagittis, in ultrices massa vestibulum. Cras interdum ante sit amet lacus efficitur finibus. Sed nec vulputate quam, mollis placerat augue. In at semper est, ac posuere mauris. Nullam lorem magna, bibendum id augue vitae, congue vulputate nisl. Proin imperdiet ligula id lacinia tempor.',
//   alt: 'Genre Painting Modern Art'
//   , tags: ["modern", "dernmo"],
// },
// {
//   id: 3,
//   image: '/productPicture/Abstract-Painting-Classic-Art-4.jpg',
//   title: 'C',
//   artist: 'Sophia Laurent',
//   price: 2450.00,
//   description: 'Sed at bibendum ligula. Phasellus hendrerit tempus libero, et euismod enim volutpat sit amet. Etiam congue lorem in orci elementum maximus. Aenean dictum mattis erat interdum faucibus. Vivamus vulputate tortor diam, eget tempus ante commodo at. Nullam lobortis nulla ac vestibulum commodo. Sed in iaculis felis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed porttitor dui a vestibulum consequat. Donec ornare mattis quam, eu bibendum enim suscipit ac.',
//   alt: 'Genre Painting Classic Art'
//   , tags: ["modern", "dernmo"],
// },
// {
//   id: 4,
//   image: '/productPicture/Abstract-Painting-Classic-Art-3.jpg',
//   title: 'D',
//   artist: 'Sophia Laurent',
//   price: 2450.00,
//   alt: 'Abstract Painting Classic Art'
//   , tags: ["man", ""],
// },
// {
//   id: 5,
//   image: '/productPicture/Portrait-Painting-Classic-Art-2.jpg',
//   title: 'TEST',
//   artist: 'Sophia Laurent',
//   price: 2450.00,
//   alt: 'Abstract Painting Classic Art'
//   , tags: ["modern", "man"],
// },
// {
//   id: 6,
//   image: '/productPicture/Abstract-Painting-Contemporary-Art-1.jpg',
//   title: 'TEST',
//   artist: 'Sophia Laurent',
//   price: 2450.00,
//   alt: 'Abstract Painting Contemporary Art'
//   , tags: ["modern", "dernmo"],
// },
// {
//   id: 7,
//   image: '/productPicture/Abstract-Painting-Contemporary-Art-2.jpg',
//   title: 'TEST',
//   artist: 'Sophia Laurent',
//   price: 2450.00,
//   alt: 'Abstract Painting Contemporary Art'
//   , tags: ["modern", "dernmo"],
// },
// {
//   id: 8,
//   image: '/productPicture/Abstract-Painting-Contemporary-Art-5.jpg',
//   title: 'TEST',
//   artist: 'Sophia Laurent',
//   price: 2450.00,
//   alt: 'Abstract Painting Contemporary Art'
//   , tags: ["Classic", "Portrait"],
// },
// {
//   id: 9,
//   image: '/productPicture/Abstract-Painting-Contemporary-Art-4.jpg',
//   title: 'TEST',
//   artist: 'Sophia Laurent',
//   price: 2450.00,
//   description: 'abcd',
//   alt: 'Abstract Painting Contemporary Art',
//   tags: ["Classic", "Portrait"],
// },
// {
//   id: 10,
//   image: '/productPicture/Portrait-Painting-Classic-Art-1.jpg',
//   title: "The Wanderer's Gaze",
//   artist: "Marcus Aurelius",
//   price: "2,950.00",
//   description: "This oil painting portrays a man with flowing hair and a pensive expression, illuminated by dramatic lighting that contrasts golden highlights against deep shadows. His upward gaze suggests contemplation or longing, evoking a sense of mystery and introspection. The bold brushstrokes and rich hues—predominantly reds, yellows, and dark blues—convey raw emotion and depth, blending classical portraiture with an impressionistic touch. The figure's timeless appearance invites viewers to interpret his story: Is he a philosopher, a traveler, or a figure from a distant era? This piece captures the intersection of light and thought, leaving a lasting impression of both strength and vulnerability.",
//   dimensions: "45cm x 22cm x 8cm",
//   material: "Linen",
//   year: "1998",
//   tags: ["Classic", "Portrait"],

// },]