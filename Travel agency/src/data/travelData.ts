export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  featured?: boolean;
}

export interface DestinationItem {
  id: string;
  name: string;
  country: string;
  price: string;
  duration: string;
  image: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  role?: string;
  avatar: string;
  quote: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 'weather',
    title: 'Calculated Weather',
    description: 'Built Wicket longer admire do barton vanity itself do in it.',
    icon: 'radar',
  },
  {
    id: 'flights',
    title: 'Best Flights',
    description: 'Engrossed listening. Park gate sell they west hard for the.',
    icon: 'plane',
    featured: true,
  },
  {
    id: 'events',
    title: 'Local Events',
    description: 'Barton vanity itself do in it. Preferd to men it engrossed listening.',
    icon: 'mic',
  },
  {
    id: 'customization',
    title: 'Customization',
    description: 'We deliver outsourced aviation services for military customers',
    icon: 'gear',
  },
];

export const destinationsData: DestinationItem[] = [
  {
    id: 'rome',
    name: 'Rome, Italy',
    country: 'Italy',
    price: '$5,42k',
    duration: '10 Days Trip',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'london',
    name: 'London, UK',
    country: 'UK',
    price: '$4.2k',
    duration: '12 Days Trip',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'europe',
    name: 'Full Europe',
    country: 'Europe',
    price: '$15k',
    duration: '28 Days Trip',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80',
  },
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 'mike',
    name: 'Mike taylor',
    location: 'Lahore, Pakistan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    quote: '“On the Windows talking painted pasture yet its express parties use. Sure last upon he same as knew next. Of believed or diverted no.”',
  },
  {
    id: 'chris',
    name: 'Chris Thomas',
    location: 'CEO of Red Button',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    quote: '“Built Wicket longer admire do barton vanity itself do in it. Preferred to sportsmen it engrossed listening. Park gate sell they west hard for the.”',
  },
  {
    id: 'sarah',
    name: 'Sarah Jenkins',
    location: 'Madrid, Spain',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    quote: '“The trip to Greece arranged by Jadoo was beyond our highest expectations! Effortless booking, flawless flight connection, and memories for life.”',
  },
];

export const partnersData = [
  { name: 'Axon', logoText: 'axon' },
  { name: 'Jetstar', logoText: 'Jetstar★' },
  { name: 'Expedia', logoText: 'Expedia' },
  { name: 'Qantas', logoText: 'QANTAS' },
  { name: 'Alitalia', logoText: 'Alitalia' },
];

