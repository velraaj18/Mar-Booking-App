import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PlaceForm from "./PlaceForm";
import PlacesListPage from "./PlacesListPage";

const PlacePage = () => {
  const { action } = useParams();

  return (
    <div>
      {action !== "new" && (
        <div className=" text-center">
          <Link
            className="bg-red-500 text-white inline-flex gap-1 justify-center py-2 px-4 rounded-full "
            to={"/accounts/places/new"}
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new place
          </Link>
          <div>
            <PlacesListPage />
          </div>
        </div>
      )}

      {action === "new" && (
        <div>
          <PlaceForm />
        </div>
      )}
    </div>
  );
};

export default PlacePage;
