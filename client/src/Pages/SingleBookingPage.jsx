import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { BsMoonStarsFill } from "react-icons/bs";

const SingleBookingPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [allPhotos, setAllPhotos] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get(`/bookings/${id}`).then((res) => {
        const foundBooking = res.data;
        if (foundBooking) {
          setBooking(foundBooking);
        }
      });
    }
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
        <h2 className=" text-3xl text-center">
          Photos of {booking.place.title}
        </h2>
        <div className="grid grid-cols-2 gap-8 ">
          {booking.place.photos.length > 0 &&
            booking.place.photos.map((photo, index) => (
              <img
                src={"http://localhost:4000/uploads/" + photo}
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
      <div className="px-20 py-8">
        {booking && booking.place && (
          <>
            <h1 className="text-3xl py-2">{booking.place.title}</h1>
            <a
              className="font-semibold underline flex gap-1 items-center"
              target="_blank"
              href={"https://map.google.com/?q=" + booking.place.address}
            >
              <FaMapMarkerAlt /> {booking.place.address}
            </a>
            <div className=" flex bg-gray-300 p-4 mt-8 justify-between">
              <div>
                <h2> Booking Information </h2>
                <div className=" flex gap-2 items-center text-md my-2 text-gray-600">
                  {booking.checkIn} <MdKeyboardDoubleArrowRight />
                  {booking.checkOut}
                </div>
                <h2 className=" flex items-center gap-2 text-xl rounded-xl ">
                  {booking.numberOfDays} <BsMoonStarsFill /> Incredible magic
                  nights
                </h2>
              </div>
              <div className=" bg-red-500 px-4 py-4 text-white text-xl rounded-2xl">
                Total Price :
                <div className=" text-center">{booking.price}k</div>
              </div>
            </div>
            <div className=" relative">
              <div className="grid grid-cols-3 gap-6 my-8">
                {booking.place.photos?.[0] && (
                  <img
                    className=" aspect-square object-cover grow shrink-0 rounded-2xl"
                    src={
                      "http://localhost:4000/uploads/" + booking.place.photos[0]
                    }
                    alt=""
                  />
                )}

                {booking.place.photos?.[1] && (
                  <img
                    className=" aspect-square object-cover grow shrink-0 rounded-2xl"
                    src={
                      "http://localhost:4000/uploads/" + booking.place.photos[1]
                    }
                    alt=""
                  />
                )}

                {booking.place.photos?.[2] && (
                  <img
                    className=" aspect-square object-cover grow shrink-0 rounded-2xl"
                    src={
                      "http://localhost:4000/uploads/" + booking.place.photos[2]
                    }
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
          </>
        )}
      </div>
    </div>
  );
};

export default SingleBookingPage;
