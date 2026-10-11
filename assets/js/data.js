// assets/js/data.js
const contactConfig = {
    name: "Greenland Nursery and Horticulture Services",
    email: "info@greenlandnurseryofficial.com",
    phone: "+91 93933 99116",
    address: "7-1, 621/11, beside ESI hospital, BK Guda, Sanjeeva Reddy Nagar, Hyderabad, Telangana 500038, India",
    established: "1985",
    city: "Hyderabad"
};

const plantsData = [
    { 
        id: '1', name: 'Monstera Deliciosa', scientific: 'Monstera deliciosa', category: 'indoor', 
        price: '₹650/-', difficulty: 'Easy Care', light: 'Bright Indirect', watering: 'Weekly', 
        salesCount: 1250, petFriendly: false, 
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80', 
        description: 'Commonly known as the "Swiss Cheese Plant", it thrives beautifully in the Hyderabad climate.' 
    },
    { 
        id: '2', name: 'Fiddle Leaf Fig', scientific: 'Ficus lyrata', category: 'indoor', 
        price: '₹950/-', difficulty: 'Intermediate', light: 'Bright Light', watering: 'Weekly', 
        salesCount: 980, petFriendly: false, 
        image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80', 
        description: 'A premium statement plant that adds a touch of luxury to any modern home.' 
    },
    { 
        id: '3', name: 'Snake Plant (Laurentii)', scientific: 'Sansevieria', category: 'indoor', 
        price: '₹250/-', difficulty: 'Beginner', light: 'Low to Medium', watering: 'Bi-weekly', 
        salesCount: 890, petFriendly: false, 
        image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80', 
        description: 'The ultimate "hard to kill" plant. Perfect for purifying indoor air.' 
    },
    { 
        id: '4', name: 'Golden Pothos (Money Plant)', scientific: 'Epipremnum aureum', category: 'indoor', 
        price: '₹180/-', difficulty: 'Beginner', light: 'Any Light', watering: 'Weekly', 
        salesCount: 850, petFriendly: false, 
        image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?auto=format&fit=crop&w=800&q=80', 
        description: 'A fast-growing favorite in Indian households, perfect for hanging pots.' 
    },
    { 
        id: '5', name: 'Peace Lily', scientific: 'Spathiphyllum', category: 'indoor', 
        price: '₹350/-', difficulty: 'Beginner', light: 'Low to Medium', watering: 'Weekly', 
        salesCount: 720, petFriendly: false, 
        image: 'https://images.unsplash.com/photo-1593691509543-c55fb32e7355?auto=format&fit=crop&w=800&q=80', 
        description: 'Produces elegant white spathe flowers that bloom throughout the year.' 
    },
    { 
        id: '6', name: 'French Lavender', scientific: 'Lavandula', category: 'outdoor', 
        price: '₹450/-', difficulty: 'Moderate', light: 'Full Sun', watering: 'Weekly', 
        salesCount: 680, petFriendly: true, 
        image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=800&q=80', 
        description: 'Fragrant and soothing. Requires good sunlight and well-drained soil.' 
    },
    { 
        id: '7', name: 'Japanese Red Maple', scientific: 'Acer palmatum', category: 'outdoor', 
        price: '₹2,800/-', difficulty: 'Intermediate', light: 'Partial Sun', watering: 'Regular', 
        salesCount: 540, petFriendly: true, 
        image: 'https://images.unsplash.com/photo-1508873696983-2df515122519?auto=format&fit=crop&w=800&q=80', 
        description: 'An exotic ornamental tree that adds a striking crimson hue to your garden.' 
    },
    { 
        id: '8', name: 'Aloe Vera', scientific: 'Aloe barbadensis', category: 'succulent', 
        price: '₹150/-', difficulty: 'Easy', light: 'Bright Light', watering: 'Bi-weekly', 
        salesCount: 510, petFriendly: true, 
        image: 'https://images.unsplash.com/photo-1567333090944-104854a83625?auto=format&fit=crop&w=800&q=80', 
        description: 'A medicinal marvel. Very easy to maintain and propagate.' 
    }
];

const servicesData = [
    {
        title: "Horticulture Consult",
        icon: "pen-tool",
        desc: "Expert horticulture services for balcony, terrace, and commercial spaces in Hyderabad.",
        price: "₹2,500/-"
    },
    {
        title: "Plant Doctor Clinic",
        icon: "stethoscope",
        desc: "Professional pest diagnosis and plant health recovery by our senior horticulturists.",
        price: "₹150/-"
    },
    {
        title: "Soil & Potting",
        icon: "flower2",
        desc: "Premium organic soil amendment and repotting services delivered to your doorstep.",
        price: "₹99/-"
    }
];