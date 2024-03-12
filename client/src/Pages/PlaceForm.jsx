import React, { useEffect } from "react";
import Perks from "../Perks.jsx";
import axios from "axios";
import PhotoUploader from "../PhotoUploader.jsx";
import { useSnackbar } from "notistack";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const PlaceForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [checkintime, setCheckintime] = useState("");
  const [checkouttime, setCheckouttime] = useState("");
  const [perks, setPerks] = useState([]);
  const [extrainfo, setExtrainfo] = useState("");
  const [guests, setGuests] = useState(1);
  const [photoLink, setPhotoLink] = useState("");
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get("/place/" + id).then((response) => {
      const { data } = response;
      setTitle(data.title);
      setDescription(data.description);
      setAddress(data.address);
      setPhotos(data.photos);
      setCheckintime(data.checkintime);
      setCheckouttime(data.checkouttime);
      setPerks(data.perks);
      setExtrainfo(data.extrainfo);
      setGuests(data.guests);
      setPhotoLink(data.photoLink);
      setPrice(data.price);
      setRedirect(true);
    });
  }, [id]);
  const handleSave = async (e) => {
    e.preventDefault();
    const data = {
      title,
      description,
      address,
      photos,
      guests,
      extrainfo,
      checkintime,
      checkouttime,
      perks,
      price,
    };
    if (id) {
      //update
      try {
        await axios.put("/place", {
          id,
          ...data,
        });
        setRedirect(true);
        enqueueSnackbar("Successfully updated", { variant: "success" });
        navigate("/accounts/places");
      } catch (error) {
        console.error("Error updating");
        enqueueSnackbar("Error updating", { variant: "error" });
      }
    } else {
      //create
      try {
        await axios.post("/place", data);
        setRedirect(true);
        enqueueSnackbar("Successfully saved", { variant: "success" });
        navigate("/accounts/places");
      } catch (error) {
        console.error("Error saving");
        enqueueSnackbar("Error saving", { variant: "error" });
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSave} className=" mx-20 py-2">
        <h2 className=" font-bold text-2xl">Title</h2>
        <p className=" text-gray-600 text-sm">Your title goes here</p>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder=" Title of the place"
          className=" border border-gray-300 rounded-lg w-3/4 h-10 mt-2"
        />
        <h2 className=" font-bold text-2xl mt-4">Address</h2>
        <p className=" text-gray-600 text-sm">Your Address goes here</p>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder=" Address of the place"
          className=" border border-gray-300 rounded-lg w-3/4 h-10 mt-2"
        />

        <PhotoUploader addedPhotos={photos} onChange={setPhotos} />

        <h2 className=" font-bold text-2xl mt-4">Description</h2>
        <p className=" text-gray-600 text-sm">Your description goes here</p>
        <textarea
          className=" border border-gray-300 rounded-lg w-3/4 h-40 mt-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div>
          <Perks value={perks} onChange={setPerks} />
        </div>
        <h2 className=" font-bold text-2xl mt-6">Check in and out times</h2>

        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className=" font-bold text-xl mt-4">Check in time</h2>
            <input
              type="text"
              placeholder="Check in time"
              value={checkintime}
              onChange={(e) => setCheckintime(e.target.value)}
              className=" border border-gray-300 rounded-lg w-3/4 h-10 mt-2"
            />
          </div>
          <div>
            <h2 className=" font-bold text-xl mt-4">Check out time</h2>
            <input
              type="text"
              value={checkouttime}
              onChange={(e) => setCheckouttime(e.target.value)}
              placeholder="Check out time"
              className=" border border-gray-300 rounded-lg w-3/4 h-10 mt-2"
            />
          </div>
          <div>
            <h2 className=" font-bold text-xl mt-4">Number of guests</h2>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="Number of guests"
              className=" border border-gray-300 rounded-lg w-3/4  h-10 mt-2"
            />
          </div>
          <div>
            <h2 className=" font-bold text-xl mt-4">price</h2>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className=" border border-gray-300 rounded-lg w-3/4  h-10 mt-2"
            />
          </div>
        </div>
        <h2 className=" font-bold text-2xl mt-4">ExtraInfo</h2>
        <p className=" text-gray-600 text-sm">
          Your Extra information goes here
        </p>
        <textarea
          value={extrainfo}
          onChange={(e) => setExtrainfo(e.target.value)}
          className=" border border-gray-300 rounded-lg w-3/4 h-32 mt-2"
        />
        <button className=" my-4 w-full bg-red-500 text-white px-4 py-2 rounded-full">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default PlaceForm;
