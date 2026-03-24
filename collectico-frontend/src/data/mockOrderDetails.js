const mockOrderDetails = [
  {
    // สถานะ Deliver
    orderId: "ORD-8742",
    orderDate: "March 5, 2025",
    status: "Deliver",
    paymentStatus: "PAID",
    total: 1250.00,
    customer: {
      name: "Jonathan Richards",
      email: "jonathan.richards@example.com",
      phone: "+1 (555) 123-4567",
    },
    shippingAddress: {
      name: "Jonathan Richards",
      address: "1234 Luxury Lane",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },

    items: [
      {
        id: "P001",
        title: "Modern Portrait in Brown",
        artist: "Sophia Laurent",
        price: 950.00,
        quantity: 1,
        image: "public/productPicture/Abstract-Painting-Modern-Art-1.jpg",
      },
      {
        id: "P002",
        title: "Sunset Over Still Waters",
        artist: "Marcus Finley",
        price: 300.00,
        quantity: 1,
        image: "public/productPicture/Abstract-Painting-Modern-Art-1.jpg",
      },
    ],
    summary: {
      subtotal: "$1,250.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$1,250.00",
    },
  },

  // สถานะ Preparing
  {
    orderId: "ORD-9421",
    orderDate: "April 15, 2025",
    status: "Preparing",
    paymentStatus: "AWAITING_PAYMENT",
    total: 780.00,
    customer: {
      name: "Jonathan Richards",
      email: "jonathan.richards@example.com",
      phone: "+1 (555) 123-4567",
    },
    shippingAddress: {
      name: "Jonathan Richards",
      address: "1234 Luxury Lane",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    items: [
      {
        id: "P010",
        title: "Abstract Geometry",
        artist: "Elena Rodriguez",
        price: 420.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
      {
        id: "P015",
        title: "Moonlit Forest",
        artist: "Thomas Blake",
        price: 360.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$780.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$780.00",
    },
  },

  // สถานะ IN TRANSIT
  {
    orderId: "ORD-6358",
    orderDate: "April 2, 2025",
    status: "InTransit",
    paymentStatus: "PAID",
    total: 1850.00,
    customer: {
      name: "Jonathan Richards",
      email: "jonathan.richards@example.com",
      phone: "+1 (555) 123-4567",
    },
    shippingAddress: {
      name: "Jonathan Richards",
      address: "1234 Luxury Lane",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    items: [
      {
        id: "P007",
        title: "City Lights at Dusk",
        artist: "James Anderson",
        price: 1200.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
      {
        id: "P023",
        title: "Summer Breeze",
        artist: "Lily Park",
        price: 650.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$1,850.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$1,850.00",
    },
  },

  // สถานะ CANCEL
  {
    orderId: "ORD-2715",
    orderDate: "March 18, 2025",
    status: "Cancel",
    paymentStatus: "REFUNDED",
    total: 525.00,
    customer: {
      name: "Jonathan Richards",
      email: "jonathan.richards@example.com",
      phone: "+1 (555) 123-4567",
    },
    shippingAddress: {
      name: "Jonathan Richards",
      address: "1234 Luxury Lane",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    items: [
      {
        id: "P031",
        title: "Spring Blossoms",
        artist: "Olivia Wright",
        price: 525.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$525.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$525.00",
    },
  },

  // ===== EMMA WATSON =====
  // สถานะ Deliver
  {
    orderId: "ORD-5391",
    orderDate: "March 12, 2025",
    status: "Deliver",
    paymentStatus: "PAID",
    total: 1820.00,
    customer: {
      name: "Emma Watson",
      email: "emma.watson@example.com",
      phone: "+1 (555) 234-5678",
    },
    shippingAddress: {
      name: "Emma Watson",
      address: "567 Lakeside Drive",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "United States",
    },
    items: [
      {
        id: "P005",
        title: "Urban Minimalism",
        artist: "Daniel Chen",
        price: 1120.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
      {
        id: "P008",
        title: "Golden Horizon",
        artist: "Nora Kim",
        price: 700.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$1,820.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$1,820.00",
    },
  },

  // สถานะ Preparing
  {
    orderId: "ORD-5392",
    orderDate: "April 18, 2025",
    status: "Preparing",
    paymentStatus: "AWAITING_PAYMENT",
    total: 950.00,
    customer: {
      name: "Emma Watson",
      email: "emma.watson@example.com",
      phone: "+1 (555) 234-5678",
    },
    shippingAddress: {
      name: "Emma Watson",
      address: "567 Lakeside Drive",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "United States",
    },
    items: [
      {
        id: "P012",
        title: "Desert Sunset",
        artist: "Maya Johnson",
        price: 950.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$950.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$950.00",
    },
  },

  // สถานะ InTransit
  {
    orderId: "ORD-5393",
    orderDate: "April 5, 2025",
    status: "InTransit",
    paymentStatus: "PAID",
    total: 1400.00,
    customer: {
      name: "Emma Watson",
      email: "emma.watson@example.com",
      phone: "+1 (555) 234-5678",
    },
    shippingAddress: {
      name: "Emma Watson",
      address: "567 Lakeside Drive",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "United States",
    },
    items: [
      {
        id: "P003",
        title: "Mountain Whispers",
        artist: "Robert Frost",
        price: 850.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
      {
        id: "P019",
        title: "Coastal Dreams",
        artist: "Sophia Laurent",
        price: 550.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$1,400.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$1,400.00",
    },
  },

  // สถานะ Cancel
  {
    orderId: "ORD-5394",
    orderDate: "March 22, 2025",
    status: "Cancel",
    paymentStatus: "REFUNDED",
    total: 680.00,
    customer: {
      name: "Emma Watson",
      email: "emma.watson@example.com",
      phone: "+1 (555) 234-5678",
    },
    shippingAddress: {
      name: "Emma Watson",
      address: "567 Lakeside Drive",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "United States",
    },
    items: [
      {
        id: "P025",
        title: "Ethereal Dreams",
        artist: "Liam Parker",
        price: 680.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$680.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$680.00",
    },
  },

  // ===== MICHAEL ZHANG =====
  // สถานะ Deliver
  {
    orderId: "ORD-7210",
    orderDate: "March 8, 2025",
    status: "Deliver",
    paymentStatus: "PAID",
    total: 2100.00,
    customer: {
      name: "Michael Zhang",
      email: "michael.zhang@example.com",
      phone: "+1 (555) 345-6789",
    },
    shippingAddress: {
      name: "Michael Zhang",
      address: "890 Maple Street",
      city: "Chicago",
      state: "IL",
      zip: "60607",
      country: "United States",
    },
    items: [
      {
        id: "P004",
        title: "Abstract Symphony",
        artist: "Isabelle Lyon",
        price: 1500.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
      {
        id: "P016",
        title: "Dawn Reflections",
        artist: "Jonathan Reed",
        price: 600.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$2,100.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$2,100.00",
    },
  },

  // สถานะ Preparing
  {
    orderId: "ORD-7211",
    orderDate: "April 16, 2025",
    status: "Preparing",
    paymentStatus: "AWAITING_PAYMENT",
    total: 890.00,
    customer: {
      name: "Michael Zhang",
      email: "michael.zhang@example.com",
      phone: "+1 (555) 345-6789",
    },
    shippingAddress: {
      name: "Michael Zhang",
      address: "890 Maple Street",
      city: "Chicago",
      state: "IL",
      zip: "60607",
      country: "United States",
    },
    items: [
      {
        id: "P011",
        title: "Serene Waters",
        artist: "Olivia Chen",
        price: 890.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$890.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$890.00",
    },
  },

  // สถานะ InTransit
  {
    orderId: "ORD-7212",
    orderDate: "April 3, 2025",
    status: "InTransit",
    paymentStatus: "PAID",
    total: 1750.00,
    customer: {
      name: "Michael Zhang",
      email: "michael.zhang@example.com",
      phone: "+1 (555) 345-6789",
    },
    shippingAddress: {
      name: "Michael Zhang",
      address: "890 Maple Street",
      city: "Chicago",
      state: "IL",
      zip: "60607",
      country: "United States",
    },
    items: [
      {
        id: "P009",
        title: "Winter's Embrace",
        artist: "Alexander Smith",
        price: 1250.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
      {
        id: "P022",
        title: "Geometric Dreams",
        artist: "Emma Parker",
        price: 500.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$1,750.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$1,750.00",
    },
  },

  // สถานะ Cancel
  {
    orderId: "ORD-7213",
    orderDate: "March 20, 2025",
    status: "Cancel",
    paymentStatus: "REFUNDED",
    total: 720.00,
    customer: {
      name: "Michael Zhang",
      email: "michael.zhang@example.com",
      phone: "+1 (555) 345-6789",
    },
    shippingAddress: {
      name: "Michael Zhang",
      address: "890 Maple Street",
      city: "Chicago",
      state: "IL",
      zip: "60607",
      country: "United States",
    },
    items: [
      {
        id: "P029",
        title: "Forest Whispers",
        artist: "Nina Thomas",
        price: 720.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$720.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$720.00",
    },
  },

  // ===== SOPHIA PATEL =====
  // สถานะ Deliver
  {
    orderId: "ORD-3845",
    orderDate: "March 15, 2025",
    status: "Deliver",
    paymentStatus: "PAID",
    total: 1350.00,
    customer: {
      name: "Sophia Patel",
      email: "sophia.patel@example.com",
      phone: "+1 (555) 456-7890",
    },
    shippingAddress: {
      name: "Sophia Patel",
      address: "123 Orchard Lane",
      city: "Austin",
      state: "TX",
      zip: "78701",
      country: "United States",
    },
    items: [
      {
        id: "P014",
        title: "Urban Reflections",
        artist: "David Wong",
        price: 875.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
      {
        id: "P017",
        title: "Seaside Dreams",
        artist: "Maria Santos",
        price: 475.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$1,350.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$1,350.00",
    },
  },

  // สถานะ Preparing
  {
    orderId: "ORD-3846",
    orderDate: "April 20, 2025",
    status: "Preparing",
    paymentStatus: "AWAITING_PAYMENT",
    total: 1080.00,
    customer: {
      name: "Sophia Patel",
      email: "sophia.patel@example.com",
      phone: "+1 (555) 456-7890",
    },
    shippingAddress: {
      name: "Sophia Patel",
      address: "123 Orchard Lane",
      city: "Austin",
      state: "TX",
      zip: "78701",
      country: "United States",
    },
    items: [
      {
        id: "P020",
        title: "Autumn Reverie",
        artist: "Lucas Wright",
        price: 580.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
      {
        id: "P024",
        title: "Midnight Blues",
        artist: "Sarah Johnson",
        price: 500.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$1,080.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$1,080.00",
    },
  },

  // สถานะ InTransit
  {
    orderId: "ORD-3847",
    orderDate: "April 8, 2025",
    status: "InTransit",
    paymentStatus: "PAID",
    total: 1500.00,
    customer: {
      name: "Sophia Patel",
      email: "sophia.patel@example.com",
      phone: "+1 (555) 456-7890",
    },
    shippingAddress: {
      name: "Sophia Patel",
      address: "123 Orchard Lane",
      city: "Austin",
      state: "TX",
      zip: "78701",
      country: "United States",
    },
    items: [
      {
        id: "P013",
        title: "Serene Landscapes",
        artist: "Jason Miller",
        price: 1500.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$1,500.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$1,500.00",
    },
  },

  // สถานะ Cancel
  {
    orderId: "ORD-3848",
    orderDate: "March 25, 2025",
    status: "Cancel",
    paymentStatus: "REFUNDED",
    total: 920.00,
    customer: {
      name: "Sophia Patel",
      email: "sophia.patel@example.com",
      phone: "+1 (555) 456-7890",
    },
    shippingAddress: {
      name: "Sophia Patel",
      address: "123 Orchard Lane",
      city: "Austin",
      state: "TX",
      zip: "78701",
      country: "United States",
    },
    items: [
      {
        id: "P026",
        title: "Morning Light",
        artist: "Thomas Lee",
        price: 550.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
      {
        id: "P028",
        title: "Ocean Whispers",
        artist: "Claire Bennett",
        price: 370.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$920.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$920.00",
    },
  },

  // ===== DAVID RODRIGUEZ =====
  // สถานะ Deliver
  {
    orderId: "ORD-6729",
    orderDate: "March 10, 2025",
    status: "Deliver",
    paymentStatus: "PAID",
    total: 2450.00,
    customer: {
      name: "David Rodriguez",
      email: "david.rodriguez@example.com",
      phone: "+1 (555) 567-8901",
    },
    shippingAddress: {
      name: "David Rodriguez",
      address: "456 Elm Street",
      city: "Miami",
      state: "FL",
      zip: "33101",
      country: "United States",
    },
    items: [
      {
        id: "P006",
        title: "Vibrant Horizon",
        artist: "Elena Cruz",
        price: 1800.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
      {
        id: "P021",
        title: "Peaceful Garden",
        artist: "Michael Brown",
        price: 650.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$2,450.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$2,450.00",
    },
  },

  // สถานะ Preparing
  {
    orderId: "ORD-6730",
    orderDate: "April 21, 2025",
    status: "Preparing",
    paymentStatus: "AWAITING_PAYMENT",
    total: 1250.00,
    customer: {
      name: "David Rodriguez",
      email: "david.rodriguez@example.com",
      phone: "+1 (555) 567-8901",
    },
    shippingAddress: {
      name: "David Rodriguez",
      address: "456 Elm Street",
      city: "Miami",
      state: "FL",
      zip: "33101",
      country: "United States",
    },
    items: [
      {
        id: "P027",
        title: "Summer Memories",
        artist: "Hannah Wilson",
        price: 750.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
      {
        id: "P030",
        title: "Cityscape at Dawn",
        artist: "Ryan Taylor",
        price: 500.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$1,250.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$1,250.00",
    },
  },

  // สถานะ InTransit
  {
    orderId: "ORD-6731",
    orderDate: "April 6, 2025",
    status: "InTransit",
    paymentStatus: "PAID",
    total: 2100.00,
    customer: {
      name: "David Rodriguez",
      email: "david.rodriguez@example.com",
      phone: "+1 (555) 567-8901",
    },
    shippingAddress: {
      name: "David Rodriguez",
      address: "456 Elm Street",
      city: "Miami",
      state: "FL",
      zip: "33101",
      country: "United States",
    },
    items: [
      {
        id: "P018",
        title: "Golden Sunset",
        artist: "Sophia Laurent",
        price: 1300.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
      {
        id: "P032",
        title: "Mountain Vista",
        artist: "Emily Chang",
        price: 800.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$2,100.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$2,100.00",
    },
  },

  // สถานะ Cancel
  {
    orderId: "ORD-6732",
    orderDate: "March 23, 2025",
    status: "Cancel",
    paymentStatus: "REFUNDED",
    total: 1150.00,
    customer: {
      name: "David Rodriguez",
      email: "david.rodriguez@example.com",
      phone: "+1 (555) 567-8901",
    },
    shippingAddress: {
      name: "David Rodriguez",
      address: "456 Elm Street",
      city: "Miami",
      state: "FL",
      zip: "33101",
      country: "United States",
    },
    items: [
      {
        id: "P033",
        title: "Abstract Dreams",
        artist: "Marcus Williams",
        price: 750.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
      {
        id: "P034",
        title: "Moonlit Bay",
        artist: "Amanda Lee",
        price: 400.00,
        quantity: 1,
        image: "/api/placeholder/120/120",
      },
    ],
    summary: {
      subtotal: "$1,150.00",
      shipping: "$0.00",
      tax: "$0.00",
      total: "$1,150.00",
    },
  },
];
// ฟังก์ชันสำหรับดึงข้อมูล order ตาม ID
export const getOrderById = (orderId) => {
  return mockOrderDetails.find((order) => order.orderId === orderId);
};

// ฟังก์ชันสำหรับดึงข้อมูล orders ทั้งหมด
export const getAllOrders = () => {
  return mockOrderDetails;
};

export default mockOrderDetails;
