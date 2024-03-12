import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";
import Images from "./Images";

const SinglePlacePage = () => {
  const { id } = useParams();
  const [place, SetPlace] = useState([]);
  const [allPhotos, setAllPhotos] = useState(false);
  useEffect(() => {
    axios.get(`/place/${id}`).then((res) => {
      SetPlace(res.data);
    });
  }, [id]);

  if (allPhotos) {
    return (
      <div className=" mx-20 grid gap-8">
        <div className=" my-4">
          <button
            onClick={() => setAllPhotos(false)}
            className=" fixed bg-black text-white rounded-full text-3xl p-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </button>
        </div>
        <h2 className=" text-3xl text-center">Photos of {place.title}</h2>
        <div className="grid grid-cols-2 gap-8 ">
          {place.photos.length > 0 &&
            place.photos.map((photo, index) => (
              <Images
                src={photo}
                key={index}
                className=" object-cover rounded-2xl"
              />
            ))}
        </div>
      </div>
    );
  }
  return (
    <div className=" bg-gray-100">
      <div className=" px-20 py-8">
        <h1 className="text-3xl py-2">{place.title}</h1>
        <a
          className=" font-semibold underline flex gap-1"
          target="_blank"
          href={"https://map.google.com/?q=" + place.address}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
              clipRule="evenodd"
            />
          </svg>
          {place.address}
        </a>
        <div className=" relative">
          <div className="grid grid-cols-3 gap-6 my-8">
            {place.photos?.[0] && (
              <Images
                className=" aspect-square object-cover grow shrink-0 rounded-2xl"
                src={place.photos[0]}
                alt=""
              />
            )}

            {place.photos?.[1] && (
              <Images
                className=" aspect-square object-cover grow shrink-0 rounded-2xl"
                src={place.photos[1]}
                alt=""
              />
            )}

            {place.photos?.[2] && (
              <Images
                className=" aspect-square object-cover grow shrink-0 rounded-2xl"
                src={place.photos[2]}
                alt=""
              />
            )}
          </div>
          <button
            onClick={() => setAllPhotos(true)}
            className=" absolute bottom-2 right-2 bg-white text-black px-4 py-2 rounded-2xl flex gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            More photos
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 mx-20 mt-2 gap-8">
        <div className=" col-span-2">
          <div className=" -mt-6 mb-4 ">
            <h1 className=" text-3xl font-bold mb-2">Description</h1>
            <p>{place.description}</p>
          </div>
          Check-in : {place.checkintime} <br />
          Check-out : {place.checkouttime} <br />
          Number of Guests: {place.guests}
        </div>
        <BookingWidget place={place} setPlace={SetPlace} />
      </div>
      <div className=" bg-white px-20 py-4 mt-8">
        <h1 className=" text-3xl font-bold mb-2">Extra Info</h1>
        <p>{place.extrainfo}</p>
      </div>
    </div>
  );
};

export default SinglePlacePage;
