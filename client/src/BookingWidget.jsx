import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const BookingWidget = ({ place, setPlace }) => {
  const [checkIn, setCheckin] = useState("");
  const [checkOut, setCheckout] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [bookings, setBookings] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  let numberOfDays = 0;
  if (checkIn && checkOut) {
    numberOfDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }

  const handleBooking = () => {
    axios
      .post("/bookings", {
        checkIn,
        checkOut,
        guests,
        name,
        mobile,
        place: place._id,
        price: numberOfDays * place.price,
        numberOfDays,
      })
      .then(({ data }) => {
        setBookings(data);
        enqueueSnackbar("Booked Successfully", { variant: "success" });
        navigate(`/accounts/bookings/${data._id}`);
      })
      .catch(() => {
        enqueueSnackbar("couldn't book", { variant: "error" });
      });
  };

  return (
    <div>
      <div className="bg-white border shadow-gray-400 flex flex-col items-center rounded-2xl">
        <div className=" text-xl font-semibold  text-center pb-4 pt-8">
          Price: Rs.{place.price}k/-per night
        </div>
        <div className=" border border-gray-400 rounded-2xl mx-16">
          <div className=" flex">
            <div className=" py-3 px-4 border-r-2">
              <label>
                Check-in time:
                <input
                  type="date"
                  value={checkIn}
                  onChange={(ev) => setCheckin(ev.target.value)}
                />
              </label>
            </div>
            <div className=" py-3 px-4">
              <label>
                Check-out time:
                <input
                  type="date"
                  value={checkOut}
                  onChange={(ev) => setCheckout(ev.target.value)}
                />
              </label>
            </div>
          </div>
          <div className=" py-3 px-4 border-t-2">
            <label>Number of Guests:</label>
            <input
              type="number"
              className=" border border-black "
              value={guests}
              onChange={(ev) => setGuests(ev.target.value)}
            />
          </div>
          {numberOfDays > 0 && (
            <div className="py-3 px-4 border-t-2">
              <label>Name:</label> <br />
              <input
                type="text"
                className=" border border-black mb-4 "
                value={name}
                onChange={(ev) => setName(ev.target.value)}
              />
              <br />
              <label>Mobile:</label> <br />
              <input
                type="tel"
                className=" border border-black mb-2 "
                value={mobile}
                onChange={(ev) => setMobile(ev.target.value)}
              />
            </div>
          )}
        </div>

        <div className=" mt-4 mb-8">
          <button
            onClick={handleBooking}
            className=" bg-red-500 px-4 py-2 text-white rounded-xl w-60"
          >
            Book this Place
            {numberOfDays > 0 && (
              <span className="ml-2 text-white">
                ({numberOfDays * place.price}k )
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
