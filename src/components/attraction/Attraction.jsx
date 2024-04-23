import "./attraction.css"

const Attraction = () => {
  return (
    <div className="information">
        <div className="informationItem">
            <img src="https://img.freepik.com/premium-vector/travel-around-world-online-journey-couple-is-planning-their-trip-choosing-best-route-travel-agency-tour-abroad-color-vector-illustration-flat-style_776652-2239.jpg" alt="cj-img" className="informationImg" />
            <div className="informationTitles">
                <h1>Comfortable Journey</h1>
                <h2>Experience the epitome of relaxation and convenience with our seamless and comfortable journeys tailored just for you.</h2>
            </div>
        </div>
        <div className="informationItem">
            <img src="https://img.freepik.com/free-vector/lifestyle-hotel-illustration_335657-398.jpg" alt="lh-img" className="informationImg" />
            <div className="informationTitles">
                <h1>Luxurious Hotel</h1>
                <h2>Indulge in opulent comfort and unmatched elegance at our handpicked selection of luxurious hotels, where every stay is a journey into refined luxury.</h2>
            </div>
        </div>
        <div className="informationItem">
            <img src="https://img.freepik.com/free-vector/inside-country-traveling-abstract-concept-illustration_335657-2480.jpg" alt="tg-img" className="informationImg" />
            <div className="informationTitles">
                <h1>Travel Guide</h1>
                <h2>Embark on a journey of discovery with our comprehensive Travel Guide, curated to enhance every step of your adventure.</h2>
            </div>
        </div>
    </div>
  )
}

export default Attraction;