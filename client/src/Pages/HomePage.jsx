import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Images from "./Images";

const HomePage = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/place").then(({ data }) => {
      setPlaces(data);
    });
  }, []);

  return (
    <div className="mx-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 my-12 gap-x-8 gap-y-6">
      {places.length > 0 &&
        places.map((place, index) => (
          <Link
            to={"/place/" + place._id}
            key={index}
            className="bg-gray-100 rounded-2xl cursor-pointer"
          >
            <div className="mb-2 rounded-2xl">
              {place.photos?.[0] !== undefined && (
                <Images
                  className="aspect-square object-cover grow shrink-0 rounded-2xl"
                  src={place.photos[0]}
                />
              )}
            </div>
            <h2 className="font-semibold truncate px-2">{place.address}</h2>
            <h2 className="text-sm truncate px-2">{place.title}</h2>
            <h2 className="font-semibold px-2 pb-2">
              Rs.{place.price}k per night
            </h2>
          </Link>
        ))}
    </div>
  );
};

export default HomePage;
