"use client"
import React from 'react'

const Events = () => {
    const e = ["INNOVISION 6.0", "TECHNO TREASURE", "GEN AI DESIGN SPRINT", "GAMEXCITE", "TECHWHIZ", "REELIFY", "UX MARVELS"];
    
    return (
      <p>evt</p>
    )
}

const getEventDescription = (event) => {
    const descriptions = {
        "INNOVISION 6.0": "Ideathon Competition",
        "TECHNO TREASURE": "Treasure Hunt",
        "GEN AI DESIGN SPRINT": "Poster Making Competition",
        "GAMEXCITE": "Gaming Event",
        "TECHWHIZ": "Kahoot Quiz Competition",
        "REELIFY": "Reel Making Challenge",
        "UX MARVELS": "Figma UI Challenge"
    };
    return descriptions[event] || "";
}

export default Events;
