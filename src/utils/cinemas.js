export const cinemas = [
    {
        id: 1,
        name: "PVR Directors Cut",
        location: "Vasant Kunj, New Delhi",
        city: "New York", // Mapping to US cities for consistency with movie data
        facilities: ["Dolby Atmos", "Recliner", "4K"]
    },
    {
        id: 2,
        name: "INOX Laserplex",
        location: "Nariman Point, Mumbai",
        city: "New York",
        facilities: ["IMAX", "Dolby 7.1"]
    },
    {
        id: 3,
        name: "AMC Empire 25",
        location: "Times Square",
        city: "New York",
        facilities: ["IMAX", "Dolby Cinema"]
    },
    {
        id: 4,
        name: "Regal LA Live",
        location: "Downtown LA",
        city: "Los Angeles",
        facilities: ["4DX", "RPX"]
    },
    {
        id: 5,
        name: "TCL Chinese Theatre",
        location: "Hollywood Blvd",
        city: "Los Angeles",
        facilities: ["IMAX"]
    },
    {
        id: 6,
        name: "Alamo Drafthouse",
        facilities: ["Dine-in", "35mm"]
    },
    {
        id: 7,
        name: "PVR Icon",
        location: "Phoenix Palladium, Mumbai",
        city: "Mumbai",
        facilities: ["Gold Class", "4DX", "IMAX"]
    },
    {
        id: 8,
        name: "PVR Priya",
        location: "Vasant Vihar, Delhi",
        city: "Delhi",
        facilities: ["IMAX", "Recliner"]
    },
    {
        id: 9,
        name: "PVR Koramangala",
        location: "The Forum Mall, Bangalore",
        city: "Bangalore",
        facilities: ["Gold Class", "Dolby 7.1"]
    },
    {
        id: 10,
        name: "Prasads Multiplex",
        location: "Necklace Road, Hyderabad",
        city: "Hyderabad",
        facilities: ["Large Screen", "Dolby Atmos"]
    },
    {
        id: 11,
        name: "Sathyam Cinemas",
        location: "Royapettah, Chennai",
        city: "Chennai",
        facilities: ["Dolby Atmos", "RGB Laser"]
    }
];

export const generateShows = (movieId, cinemaId) => {
    // Generate some random shows for the selected movie and cinema
    const baseTimes = ["10:00 AM", "01:30 PM", "04:45 PM", "08:00 PM", "11:15 PM"];
    return baseTimes.map((time, index) => ({
        id: `${movieId}-${cinemaId}-${index}`,
        time: time,
        seatsAvailable: Math.floor(Math.random() * 50) + 10,
        price: 12 + Math.floor(Math.random() * 8)
    }));
};
