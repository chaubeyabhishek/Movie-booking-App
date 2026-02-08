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
        location: "Mission District",
        city: "San Francisco",
        facilities: ["Dine-in", "35mm"]
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
