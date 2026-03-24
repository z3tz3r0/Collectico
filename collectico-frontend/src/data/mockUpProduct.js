const mockUpProduct = [
  {
    title: "Cubist Portrait in Gold Tones",
    description:
      "This cubist-style painting depicts a person with short dark hair and a contemplative expression, set against a golden-brown background. The artist employs geometric shapes and angular planes to fragment and reconstruct the subject's face, creating a multidimensional perspective typical of the cubist movement. The warm palette of ochres, browns, golds, and muted reds gives the portrait a rich, earthy quality. The subject appears to be wearing a coat with a textured collar, possibly fur, adding to the sophisticated atmosphere of the piece. The simplified yet expressive features convey a sense of melancholy or introspection, characteristic of early 20th century modernist portraiture.",
    artist: "André Lhote",
    price: 3850,
    image:
      "public/productPicture/Abstract-Painting-Modern-Art-1.jpg",
    dimensions: "40cm x 32cm x 2cm",
    material: "Oil on canvas",
    yearCreated: "c. 1920",
    tags: ["Abstract", "Modern"],
    sellerName: "Galerie Moderne",
  },

  {
    title: "Seated Figure in Grey",
    description:
      "This contemporary abstract painting depicts a solitary figure seated on a dark chair, rendered in bold, expressive white brushstrokes against a muted grey background. The artist employs a minimalist approach, using quick, confident strokes to suggest the human form rather than define it precisely. The figure appears contemplative, isolated in an ambiguous space that creates a sense of solitude and introspection. The limited palette of whites, greys, and blacks enhances the emotional weight of the composition, while the textured, impasto application of paint adds physical dimension to the work. The stark contrast between the ethereal white figure and the solid black chair creates a compelling visual tension, inviting viewers to contemplate themes of presence and absence, solidity and transience.",
    artist: "Emil Nordström",
    price: 4200,
    image:
      "public/productPicture/Abstract-Painting-Classic-Art-5.jpg",
    dimensions: "60cm x 75cm x 3cm",
    material: "Oil on canvas",
    yearCreated: "2018",
    tags: ["Abstract", "Contemporary"],
    sellerName: "Gallery Nord",
  },

  {
    title: "Lady in White Silk Gown",
    description:
      "This exquisite historical portrait depicts a young aristocratic woman in an elaborate white silk gown with intricate lace details. She is adorned with elegant pearl jewelry, including a multi-strand necklace and matching earrings, as well as gold bracelets that highlight her refined status. The subject's serene expression and graceful pose embody 19th-century ideals of feminine beauty and nobility. The artist masterfully renders the luminous quality of the silk dress and the delicate transparency of the lace sleeves. The background combines rich red drapery with a glimpse of a landscape vista, creating a sense of depth and grandeur typical of formal court portraiture. The meticulous attention to texture and light, particularly in the rendering of the sumptuous fabric and jewels, demonstrates exceptional technical skill characteristic of academic painting traditions.",
    artist: "Franz Xaver Winterhalter",
    price: 8750000,
    image:
      "public/productPicture/Portrait-Painting-Modern-Art-2.jpg",
    dimensions: "142cm x 102cm x 4cm",
    material: "Oil on canvas",
    yearCreated: "c. 1850",
    tags: ["Portrait", "Historical", "Classic"],
    sellerName: "Royal Heritage Auctions",
  },

  {
    title: "The Philosopher's Lesson",
    description:
      "This dramatic historical painting depicts an ancient philosopher addressing his disciples in what appears to be a Greek or Roman setting. The central figure, an elderly bearded man draped in white and terracotta robes, gestures emphatically while holding a scroll, embodying the classical ideal of wisdom and oratory. His students, arranged in rapt attention around him, wear simple tunics in muted tones, creating a visual hierarchy that emphasizes the master's importance. The scene is illuminated by dramatic chiaroscuro lighting reminiscent of Caravaggio, with a bright shaft of light highlighting the philosopher against a darkened background where a classical statue can be faintly discerned. The painter demonstrates exceptional technical skill in rendering the folds of fabric, the varied expressions of the disciples, and the atmospheric perspective that creates a sense of sacred space dedicated to learning and discourse. This work exemplifies neoclassical history painting traditions while exploring timeless themes of knowledge transmission and intellectual authority.",
    artist: "Jean-François Ducis",
    price: 3200000,
    image:
      "public/productPicture/Historical-Painting-Classic-Art-2.jpg",
    dimensions: "185cm x 170cm x 5cm",
    material: "Oil on canvas",
    yearCreated: "c. 1830",
    tags: ["Historical", "Classic", "Genre"],
    sellerName: "Antiquities & Fine Art Gallery",
  },

  {
    title: "Woman with Gold Earrings",
    description:
      "This striking contemporary portrait captures a young woman with an intense, direct gaze against a neutral taupe background. The artist employs bold, confident brushstrokes and a palette knife technique that creates rich texture and depth throughout the composition. Her face is rendered with remarkable expressiveness, showing subtle emotions through the slight tension in her features and the careful attention to the play of light across her skin tones. The subject wears a dark blue garment and delicate gold earrings that catch the light, providing a warm contrast to the cool tones of her clothing. The color palette is restrained yet sophisticated, with warm flesh tones set against cool blues and neutral backgrounds. The impasto technique gives the painting a sculptural quality, with each brushstroke contributing to both the form and emotional resonance of the portrait. This work demonstrates a contemporary approach to traditional portraiture, balancing technical skill with expressive immediacy.",
    artist: "Malcolm T. Liepke",
    price: 12800,
    image:
      "public/productPicture/Portrait-Painting-Classic-Art-1.jpg",
    dimensions: "50cm x 45cm x 3cm",
    material: "Oil on linen",
    yearCreated: "2019",
    tags: ["Portrait", "Contemporary", "Modern"],
    sellerName: "Atelier Gallery",
  },

  {
    title: "Solar Radiance",
    description:
      "This vibrant abstract painting captures the essence of sunlight through bold geometric forms and a warm color palette. At the center, a radiant sun glows in concentric circles of orange and yellow, emanating stylized rays that stretch across the composition. The artist employs fluid, organic shapes in varying tones of yellow, gold, and amber that create a sense of warmth and energy. Thin vertical black lines provide structural counterpoints to the flowing sunbeams, adding rhythm and balance to the composition. The painterly technique combines distinct color fields with more transparent, watercolor-like effects, particularly in the lower portions where the colors appear to drip and blend. This artwork evokes the sensation of summer heat, dawn light, or spiritual illumination through its abstract interpretation of solar imagery, inviting viewers to experience the emotional qualities of light and color.",
    artist: "Marisa Redondo",
    price: 3850,
    image:
      "public/productPicture/Abstract-Painting-Contemporary-Art-4.jpg",
    dimensions: "76cm x 102cm x 3cm",
    material: "Acrylic on canvas",
    yearCreated: "2021",
    tags: ["Abstract", "Contemporary", "Modern"],
    sellerName: "Sunshine Gallery",
  },

  {
    title: "Fragmented Woman with Plants",
    description:
      "This striking modernist portrait presents a stylized female figure through a bold geometric approach, fragmenting her features into distinctive color planes and simplified forms. The subject wears a vibrant red garment with vertical striping against a soft beige background, while her face combines angular elements in cream, blue, and yellow tones. The composition incorporates abstracted plant forms with elongated leaves in green and white, creating a harmonious integration of figure and environment. A mysterious black circle hovers in the upper left corner, adding a sense of cosmic balance to the scene. The palette is bright yet sophisticated, with primary colors thoughtfully distributed throughout the canvas. This work exemplifies mid-century modernist aesthetics with its flattened perspective, decorative elements, and confident simplification of natural forms, revealing influences from both cubism and expressionism while maintaining a distinctive contemporary sensibility.",
    artist: "Leah Hewson",
    price: 8600,
    image:
      "public/productPicture/Abstract-Painting-Contemporary-Art-3.jpg",
    dimensions: "92cm x 72cm x 3cm",
    material: "Oil on canvas",
    yearCreated: "2018",
    tags: ["Portrait", "Modern", "Abstract"],
    sellerName: "Contemporary Arts Platform",
  },

  {
    title: "Country Cottage with Garden Gate",
    description:
      "This charming landscape painting depicts a quintessential English countryside scene centered around a whitewashed cottage with distinctive chimneys and a reddish-brown roof. The composition guides the viewer's eye along a rustic dirt path that leads through a wooden gate and opens onto the pastoral property. Magnificent trees with golden-green foliage frame the left side of the canvas, while billowing cumulus clouds dominate a brilliant blue sky. The artist employs an impressionistic technique with confident, textured brushstrokes that capture the play of sunlight across the scene, particularly in the golden fields and illuminated clouds. The palette is rich yet naturalistic, featuring verdant greens, warm ochres, and cool blues that evoke the sensation of a perfect summer day. This work celebrates rural tranquility and the timeless appeal of cottage life, rendered with both technical skill and evident affection for the landscape tradition.",
    artist: "James Fletcher-Watson",
    price: 5400,
    image:
      "public/productPicture/Landscape-Painting-Classic-Art-5.jpg",
    dimensions: "60cm x 60cm x 3cm",
    material: "Oil on canvas",
    yearCreated: "1995",
    tags: ["Landscape", "Classic", "Genre"],
    sellerName: "Heritage Art Gallery",
  },

  {
    title: "Arcadian Landscape with Classical Figures",
    description:
      "This magnificent historical landscape painting depicts an idealized pastoral scene inspired by classical antiquity. The composition presents a harmonious vision of nature and civilization, with a serene lake or river flowing through verdant countryside, framed by majestic trees and distant mountains under a brilliant blue sky adorned with soft clouds. In the foreground, several figures in classical dress engage in conversation near decorative architectural elements including a stone urn and fallen column, suggesting the romantic ruins of an ancient civilization. A grand villa or temple occupies a hilltop in the middle distance, while shepherds tend to cattle near the water's edge. The artist employs the conventions of classical landscape painting with meticulous attention to atmospheric perspective, creating a sense of depth through gradually lightening tones and softening details in the distance. The golden light suffusing the scene evokes the nostalgic concept of Arcadia—a mythical paradise of peaceful coexistence between humans and nature—that was central to Baroque and Neoclassical landscape traditions.",
    artist: "Jan Frans van Bloemen",
    price: 480000,
    image:
      "public/productPicture/Landscape-Painting-Modern-Art-5.jpg",
    dimensions: "120cm x 95cm x 4cm",
    material: "Oil on canvas",
    yearCreated: "c. 1730",
    tags: ["Landscape", "Historical", "Classic"],
    sellerName: "Imperial Fine Arts",
  },

  {
    title: "Man in Contemplation by Candlelight",
    description:
      "This evocative genre painting captures an intimate moment of a bearded man deep in thought as he sits at a simple wooden desk by candlelight. The subject appears to be reading or writing a letter, his hands pressed thoughtfully to his lips in a gesture of profound concentration or concern. The artist masterfully employs chiaroscuro technique, contrasting the warm golden glow of the candle against the deep shadows of the humble interior. Light streams in from a window on the left, creating a secondary source of illumination that highlights the subject's face and the papers before him. The rustic room, with its textured walls and sparse furnishings, suggests a modest life dedicated to intellectual or spiritual pursuits. The painter's brushwork is expressive yet controlled, creating a moody atmosphere that emphasizes the psychological depth of the scene. This work exemplifies 19th-century realist traditions in its sympathetic portrayal of ordinary life and its attention to the emotional and contemplative dimensions of human experience.",
    artist: "Joseph Marius Avy",
    price: 85000,
    image:
      "public/productPicture/Genre-Painting-Classic-Art-5.jpg",
    dimensions: "75cm x 60cm x 3cm",
    material: "Oil on canvas",
    yearCreated: "1885",
    tags: ["Genre", "Historical", "Classic"],
    sellerName: "Heritage Masters Gallery",
  },

  {
    title: "Cubist Portrait of a Gentleman with Mustache",
    description:
      "This striking modernist portrait exemplifies the cubist movement's revolutionary approach to representation. The subject, a distinguished man with a prominent mustache, is depicted through a complex arrangement of geometric planes and fragmented forms. His face is divided into angular sections of varying earthy tones—ochres, terracottas, greens, and salmon pinks—creating a multidimensional perspective that allows the viewer to perceive multiple viewpoints simultaneously. The artist employs a sophisticated color harmony against a dark green background that emphasizes the luminosity of the facial planes. Despite the abstraction, the subject's personality remains powerfully present through his direct gaze and the carefully rendered mustache that serves as an anchor for the composition. This work represents the early 20th century's radical break with traditional representational art, demonstrating how portraiture could explore psychological depth through formal deconstruction rather than naturalistic rendering. The painting's geometric precision and emotional intensity reflect the intellectual ambitions of the cubist movement to express the complexity of modern experience.",
    artist: "André Lhote",
    price: 420000,
    image:
      "public/productPicture/Abstract-Painting-Modern-Art-5.jpg",
    dimensions: "65cm x 54cm x 3cm",
    material: "Oil on canvas",
    yearCreated: "1917",
    tags: ["Portrait", "Modern", "Abstract"],
    sellerName: "Modernist Masters Gallery",
  },

  {
    title: "Scholars Reading by Candlelight",
    description:
      "This powerful chiaroscuro painting depicts three elderly men gathered closely around a single candle, intensely focused on reading from an open book. The dramatic lighting technique creates a striking contrast between the profound darkness surrounding the figures and the warm golden glow illuminating their weathered faces from below. The artist demonstrates exceptional technical mastery in rendering the play of light across the subjects' features, capturing every crease and wrinkle with remarkable precision. The men wear period clothing including caps and heavy garments that suggest a historical setting, possibly 17th or 18th century. Their expressions convey deep concentration and reverence for the knowledge contained in the text before them. The composition creates an intimate atmosphere of shared intellectual pursuit and camaraderie, enhanced by the circular arrangement of the figures. This work exemplifies the tenebrism tradition popularized by Caravaggio, using extreme contrasts between light and shadow to create theatrical drama and psychological intensity. The painting invites contemplation on themes of wisdom, age, scholarship, and the enduring human quest for understanding.",
    artist: "Matthias Stom",
    price: 380000,
    image:
      "public/productPicture/Genre-Painting-Classic-Art-3.jpg",
    dimensions: "92cm x 92cm x 4cm",
    material: "Oil on canvas",
    yearCreated: "c. 1640",
    tags: ["Genre", "Historical", "Classic"],
    sellerName: "Old Masters Collection",
  },

  {
    title: "Musician with Accordion and Spectators",
    description:
      "This vibrant Art Deco painting showcases a sailor or musician in stylized attire playing an accordion, while two elegant women observe from the background. The artist employs a cubist-influenced approach with geometric simplification of forms and flattened perspective typical of 1920s modernism. The composition features bold angular planes and a sophisticated color palette of blues, whites, reds, and greens that create a rhythmic visual harmony reflecting the musical theme. The musician, wearing a distinctive cap with tricolor details and a geometric collar, appears in profile with elongated limbs and simplified facial features that embody the streamlined aesthetics of the era. The female figures in the background are rendered with the characteristic bobbed hair and simplified oval faces of Art Deco portraiture. This work exemplifies the interwar period's celebration of modern leisure activities and jazz-age entertainment, capturing the vibrant cafe culture and artistic experimentation of the time. The painting's dynamic composition and decorative stylization brilliantly convey the energy and sophistication of early 20th-century modernist movements.",
    artist: "André Lhote",
    price: 380000,
    image:
      "public/productPicture/Abstract-Painting-Modern-Art-4.jpg",
    dimensions: "81cm x 65cm x 3cm",
    material: "Oil on canvas",
    yearCreated: "c. 1925",
    tags: ["Modern", "Portrait", "Genre"],
    sellerName: "Galerie Art Deco",
  },

  {
    title: "Tuscan Fields with Cypress Trees",
    description:
      "This vibrant contemporary landscape painting captures the iconic rolling hills of Tuscany through a bold, stylized approach that balances between representation and abstraction. The artist employs a distinctive technique of simplified forms and exaggerated contours to create a rhythmic pattern of undulating fields in golden yellows, rich browns, and verdant greens. Slender cypress trees, rendered in deep blue-green, punctuate the composition like exclamation points, creating vertical counterpoints to the horizontal flow of the cultivated terrain. The curved, parallel lines of the plowed fields create a sense of movement across the canvas, guiding the viewer's eye through the panoramic countryside. Above, a bright blue sky with stylized white clouds completes the composition. The color palette is intensified beyond naturalism, with saturated hues that evoke the Mediterranean warmth and light. This work exemplifies the modern approach to landscape painting that honors traditional subject matter while employing contemporary formal innovations, resulting in a scene that feels at once familiar and freshly imagined.",
    artist: "Claudia Vetter",
    price: 6800,
    image:
      "public/productPicture/Landscape-Painting-Contemporary-Art-4.jpg",
    dimensions: "76cm x 76cm x 3cm",
    material: "Acrylic on canvas",
    yearCreated: "2017",
    tags: ["Landscape", "Modern", "Contemporary"],
    sellerName: "Mediterranean Art Collection",
  },

  {
    title: "Three Figures on the Horizon",
    description:
      "This evocative contemporary abstract work features three elongated, silhouetted figures standing together against an atmospheric background of soft beige and subtle gray tones. The artist employs a minimalist approach with loose, gestural lines and a restrained palette dominated by neutrals with strategic touches of gold and navy blue. The composition is divided by horizontal and vertical elements that suggest a landscape, with the figures appearing to stand on an abstract horizon line. Delicate linear elements create a sense of structure and movement throughout the piece, with scratched lines and textural elements adding depth and visual interest. The mixed media technique combines painting with drawing elements, creating a rich interplay between defined forms and more ambiguous spaces. This work speaks to themes of human connection, solitude, and our relationship to place through its poetic simplification of form. The abstracted figures, reduced to their essential outlines, invite viewers to project their own narratives onto these anonymous presences standing together in a dreamlike, contemplative space.",
    artist: "Cathy Hegman",
    price: 3850,
    image:
      "public/productPicture/Abstract-Painting-Classic-Art-1.jpg",
    dimensions: "76cm x 46cm x 3cm",
    material: "Mixed media on canvas",
    yearCreated: "2021",
    tags: ["Abstract", "Contemporary", "Modern"],
    sellerName: "Contemporary Art Gallery",
  },

  {
    title: "Scholar Reading by Mirror Light",
    description:
      "This intimate Dutch Golden Age painting depicts a young scholar seated at a small table, engrossed in reading by the warm glow of unseen candlelight reflected in a mirror. The artist masterfully employs chiaroscuro technique to create a serene nocturnal atmosphere, with the soft golden illumination dramatically contrasting against the deep shadows that envelop the rest of the modest interior. The subject, shown from behind wearing a loose white shirt and dark breeches, leans slightly forward in concentrated study, his reflection faintly visible in the mirror mounted on the wall. The composition is characterized by careful attention to domestic details—a simple wooden chair, a dark cloth-covered table with writing implements, and a small pouch hanging on the wall—all rendered with meticulous precision. The limited palette of warm ochres, deep browns, and subtle creams creates a harmonious visual effect while emphasizing the contemplative mood. This work exemplifies the Dutch 17th-century fascination with quiet moments of scholarship and introspection, celebrating the virtues of learning and the private pursuit of knowledge within the intimate confines of a simple interior.",
    artist: "Gerrit Dou",
    price: 2800000,
    image:
      "public/productPicture/Genre-Painting-Modern-Art-5.jpg",
    dimensions: "35cm x 28cm x 2cm",
    material: "Oil on panel",
    yearCreated: "c. 1635",
    tags: ["Genre", "Historical", "Classic"],
    sellerName: "Old Masters Fine Art",
  },

  {
    title: "Lady in Shadow",
    description:
      "This striking contemporary digital artwork features a mysterious female profile partially obscured by shadow and abstract elements. The composition is dominated by a vibrant, fiery palette of reds, oranges, and golds that contrasts dramatically with cool teal and deep black accents. The subject's face is rendered with elegant minimalism—pale skin, red lips, and the suggestion of dark hair or perhaps a hat—emerging from an abstract background of textured digital brushwork that resembles a fabric-like grid. Vertical drips and horizontal elements create a structured yet fluid composition that balances geometric precision with emotional expressiveness. The interplay between representation and abstraction gives the piece a dreamlike quality, while the dynamic color transitions evoke a sense of passionate intensity. This work exemplifies contemporary digital painting techniques that blend traditional portraiture concepts with modern abstract sensibilities, creating an image that is both hauntingly familiar and refreshingly innovative in its approach to the human form.",
    artist: "Anna Razumovskaya",
    price: 2200,
    image:
      "public/productPicture/Abstract-Painting-Classic-Art-4.jpg",
    dimensions: "80cm x 60cm x 0cm",
    material: "Digital print on canvas",
    yearCreated: "2023",
    tags: ["Portrait", "Contemporary", "Abstract"],
    sellerName: "Digital Art Collective",
  },

  {
    title: "Figures in Bold Colors",
    description:
      "This vibrant modernist painting portrays two abstracted figures arranged in a dynamic composition of color blocks and simplified forms. The artist employs a bold, non-naturalistic color palette with striking primaries and complementary hues—yellows, reds, blues, oranges, and greens—dividing the canvas into geometric sections that both define and fragment the human forms. The figures appear to be seated or reclining in an intimate arrangement, their bodies deconstructed into color planes that intersect and overlap in a manner reminiscent of synthetic cubism yet with the emotional expressiveness of fauvism. Anatomical elements like limbs and heads are reduced to their essential shapes and rendered in contrasting colors that defy realistic representation. The flatness of the picture plane and the elimination of perspectival depth create a powerful two-dimensional design that celebrates color relationships and formal arrangement. This work exemplifies mid-20th century modernist explorations of the human figure, departing from traditional representation to express emotional and psychological dimensions through color harmony and compositional rhythm.",
    artist: "Oswaldo Guayasamin",
    price: 185000,
    image:
      "public/productPicture/Abstract-Painting-Contemporary-Art-1.jpg",
    dimensions: "120cm x 115cm x 3cm",
    material: "Acrylic on canvas",
    yearCreated: "1970",
    tags: ["Modern", "Abstract", "Contemporary"],
    sellerName: "International Modern Art Gallery",
  },

  {
    title: "Geometric Portrait in Cubist Style",
    description:
      "This striking cubist portrait presents a face deconstructed into a series of geometric planes and angular forms, exemplifying the core principles of analytical cubism. The subject's features are simultaneously viewable from multiple perspectives, with the face fragmented into interlocking triangles, rectangles, and polygons in a sophisticated arrangement. The color palette employs a harmonious range of earth tones—amber yellows, burnt siennas, cool grays, and deep umbers—that create depth and dimension despite the flattened perspective. The large, almond-shaped eyes serve as anchoring elements in the composition, providing a human focal point amid the abstract geometric structure. The artist skillfully employs subtle gradations of color and light to suggest three-dimensionality within the fractured planes. The angular representation of facial features—nose, mouth, and jawline—creates a powerful, monumental quality that transcends traditional portraiture. This work demonstrates the intellectual and aesthetic innovations of cubism, challenging viewers to reconstruct the human form through multiple simultaneous viewpoints and embracing the tension between representation and abstraction.",
    artist: "Eduardo Kingman",
    price: 68000,
    image:
      "public/productPicture/Abstract-Painting-Contemporary-Art-2.jpg",
    dimensions: "90cm x 60cm x 3cm",
    material: "Oil on canvas",
    yearCreated: "1962",
    tags: ["Portrait", "Modern", "Abstract"],
    sellerName: "Galería Moderna",
  },

  {
    title: "Abstract Composition with Vessels",
    description:
      "This vibrant abstract painting presents a modernist interpretation of a still life arrangement, featuring a collection of cups, glasses, vases, and containers transformed into a dynamic composition of overlapping geometric forms. The artist employs a bright palette dominated by yellows, blues, greens, and coral reds against a warm golden background, creating a sense of energetic harmony. The vessels are deconstructed and reimagined as simplified shapes that intersect and merge, their contours defined by confident linear elements that weave throughout the composition. Traditional perspective is abandoned in favor of a flattened, multi-viewpoint approach that shows the influence of synthetic cubism while maintaining a distinctly mid-century modern sensibility. The playful arrangement of forms creates visual rhythm through repetition and variation, with the circular and rectangular shapes building a complex spatial relationship that is both ordered and spontaneous. This work exemplifies the post-war exploration of abstraction that retained connections to recognizable subject matter while celebrating color relationships, gestural expression, and formal innovation.",
    artist: "Terry Frost",
    price: 24500,
    image:
      "public/productPicture/Abstract-Painting-Contemporary-Art-5.jpg",
    dimensions: "76cm x 66cm x 3cm",
    material: "Oil on canvas",
    yearCreated: "1958",
    tags: ["Abstract", "Modern", "Contemporary"],
    sellerName: "Mid-Century Art Gallery",
  },
];

export default mockUpProduct;
