/**
 * In-memory product catalogue for the Indian Furniture Online Store.
 * Each product follows the schema:
 *   { id, name, category, price (INR), stock, description, image }
 */

const products = [
  {
    id: "PROD-001",
    name: "Sheesham Wood King Bed",
    category: "Bedroom",
    price: 42000,
    stock: 12,
    image: "/images/products/PROD-001.jpg",
    description:
      "Handcrafted solid Sheesham (Indian Rosewood) king-size bed with intricate floral carvings on the headboard. Eco-friendly natural finish. Dimensions: 72\" x 78\".",
  },
  {
    id: "PROD-002",
    name: "Teakwood Diwan",
    category: "Living Room",
    price: 28500,
    stock: 8,
    image: "/images/products/PROD-002.jpg",
    description:
      "Premium Burmese teak wood diwan with a thick cushioned mattress included. Features classic Mughal-inspired lattice work on the sides. Perfect for lounging.",
  },
  {
    id: "PROD-003",
    name: "Cane Swing Chair (Jhula)",
    category: "Outdoor",
    price: 15000,
    stock: 20,
    image: "/images/products/PROD-003.jpg",
    description:
      "Artisan-crafted natural cane hanging swing chair with a thick cotton rope and a weather-resistant cushion. Holds up to 120 kg. Ideal for balconies and gardens.",
  },
  {
    id: "PROD-004",
    name: "Rajasthani Jali Wardrobe",
    category: "Bedroom",
    price: 55000,
    stock: 6,
    image: "/images/products/PROD-004.jpg",
    description:
      "4-door wardrobe crafted from mango wood with traditional Rajasthani jali (lattice) fretwork doors. Brass antique pulls. Three shelves, two hanging rails, and two drawers.",
  },
  {
    id: "PROD-005",
    name: "Kerala Teak Dining Table Set",
    category: "Dining Room",
    price: 75000,
    stock: 4,
    image: "/images/products/PROD-005.jpg",
    description:
      "Solid teak dining set comprising a 6-seater table and six chairs with hand-woven cane seats. Finished with eco-friendly teak oil. Sturdy mortise-and-tenon joinery.",
  },
  {
    id: "PROD-006",
    name: "Acacia Wood Coffee Table",
    category: "Living Room",
    price: 18500,
    stock: 15,
    image: "/images/products/PROD-006.jpg",
    description:
      "Live-edge acacia slab coffee table with hairpin steel legs in matte black. Each piece is unique due to the natural grain of the wood. Dimensions: 48\" x 24\" x 18\".",
  },
  {
    id: "PROD-007",
    name: "Bamboo Bookshelf (5-Tier)",
    category: "Study",
    price: 9800,
    stock: 30,
    image: "/images/products/PROD-007.jpg",
    description:
      "Sustainably sourced bamboo 5-tier open bookshelf with a slatted back panel. Lightweight yet supports up to 50 kg per shelf. Easy self-assembly with included hardware.",
  },
  {
    id: "PROD-008",
    name: "Mango Wood Sideboard",
    category: "Living Room",
    price: 32000,
    stock: 10,
    image: "/images/products/PROD-008.jpg",
    description:
      "Solid mango wood sideboard with two hinged doors and three central drawers. Features hand-stamped geometric patterns in the Dhurrie style across the door fronts. 55\" wide.",
  },
  {
    id: "PROD-009",
    name: "Rosewood Rocking Chair",
    category: "Living Room",
    price: 22000,
    stock: 9,
    image: "/images/products/PROD-009.jpg",
    description:
      "Elegant rosewood rocking chair with a hand-caned back and seat. Curved armrests and spindle detailing give it a timeless South Indian colonial aesthetic.",
  },
  {
    id: "PROD-010",
    name: "Iron & Mango Wood Console Table",
    category: "Hallway",
    price: 13500,
    stock: 18,
    image: "/images/products/PROD-010.jpg",
    description:
      "Industrial-chic console table combining a reclaimed mango wood top with a hand-forged iron base. Two lower shelves for extra storage. 48\" x 14\" x 30\".",
  },
];

module.exports = products;
