import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Images from "./Images";

const PlacesListPage = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios
      .get("/user-place")
      .then(({ data }) => {
        setPlaces(data);
      })
      .catch(() => {
        setPlaces([]);
      });
  });

  return (
    <div>
      <div className="mt-4 mx-20">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={"/accounts/place/" + place._id}
              className="  flex gap-4 p-4 bg-gray-200 rounded-xl cursor-pointer my-4"
              key={place._id}
            >
              {place.photos.length > 0 && (
                <Images
                  className=" w-52 h-40 object-cover grow shrink-0"
                  src={place.photos[0]}
                  alt=""
                  srcset=""
                />
              )}
              <div>
                <h2 className=" text-xl text-left">{place.title}</h2>
                <p className=" text-gray-600 text-sm text-justify mt-4">
                  {place.description}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default PlacesListPage;
