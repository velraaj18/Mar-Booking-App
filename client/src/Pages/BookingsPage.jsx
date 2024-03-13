import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import Images from "./Images";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then(({ data }) => {
      setBookings(data);
    });
  }, []);
  return (
    <div>
      <div className="mt-4 mx-20">
        {bookings.length > 0 &&
          bookings.map((booking, index) => (
            <Link
              to={"/accounts/bookings/" + booking._id}
              className="  flex gap-4 p-4 bg-gray-200 rounded-xl cursor-pointer my-4"
              key={index}
            >
              {booking.place.photos.length > 0 && (
                <Images
                  className=" w-52 h-40 object-cover"
                  src={booking.place.photos[0]}
                  alt=""
                  srcset=""
                />
              )}
              <div className=" ml-4">
                <h2 className=" text-xl text-left">{booking.place.title}</h2>
                <div className=" flex gap-2 items-center text-md my-2 text-gray-600">
                  {booking.checkIn} <MdKeyboardDoubleArrowRight />
                  {booking.checkOut}
                </div>
                <h2 className=" bg-white text-xl text-center rounded-xl p-2 ">
                  {booking.numberOfDays} incredible magic nights
                </h2>
                <h2 className=" text-xl  rounded-xl p-2 ">
                  Only for {booking.price}k
                </h2>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default BookingsPage;
