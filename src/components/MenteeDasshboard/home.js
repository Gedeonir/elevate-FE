/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Layout from "./../Layouts/menteeLayout";
import { NavLink } from "react-router-dom";
import MentorsHomeCards from "./mentorsHomeCards";
import axios from "axios";
import { toast } from "react-toastify";
import { BounceLoader } from "react-spinners";
import { searchEngine } from "../../utils/searchEngine";
import { useCookies } from "react-cookie";

const MentorsCard = () => {
  const [cookies] = useCookies(["user"]);
  const [loading, setLoading] = useState(false);
  const [mentors, setMentors] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [keyword, setKeyword] = useState("");
  let timeOfDay = "";

  useEffect(() => {
    if (keyword === "" && mentors.length === 0) {
      getAllMentors();
    }
  }, [keyword]);

  useEffect(() => {
    if (keyword !== "") {
      handleSearchMentors();
    }
  }, [keyword]);

  const handleSearchMentors = () => {

      let result = searchEngine(mentors, keyword);
      setSearchResults(result);
    
  };

  const getAllMentors = async () => {
    try {
      setLoading(true);
      const { data } = await axios({
        url: "https://elevate-backend.vercel.app/api/v1/elevate/user/users",
        method: "GET",
        params: {
          role: "mentor",
        },
      });
      setMentors(data.data);
      setLoading(false);
    } catch (err) {
      toast.error("There was an error. getting mentors");
    }
  };

  const now = new Date();
  const currentHour = now.getHours();

  if (currentHour >= 0 && currentHour < 12) {
    timeOfDay = "Good Morning";
  } else if (currentHour >= 12 && currentHour < 17) {
    timeOfDay = "Good Afternoon";
  } else if (currentHour >= 17 && currentHour < 20) {
    timeOfDay = "Good Evening";
  } else {
    timeOfDay = "Good Night";
  }

  const printMentors = () => {

    if (keyword !== "") {
      return (
        <>
          {searchResults.length > 0 ? (
            searchResults.map((mentor) => (
              <MentorsHomeCards key={mentor._id} mentor={mentor} />
            ))
          ) : (
            <h1>Mentor not  Found.</h1>
          )}
        </>
      );
    } else {
      return (
        <>
          {mentors.map((mentor) => (
            <MentorsHomeCards key={mentor._id} mentor={mentor} />
          ))}
        </>
      );
    }
  };

  return (
    <Layout>
      <div>
        <div class="block max-w-sm p-6 bg-white  rounded-lg shadow-sm">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {timeOfDay}, {cookies?.user?.user?.firstName} 👋
          </h5>
          <p class="font-normal">
            You have{" "}
            <NavLink to="/mentee/appointments" className="text-[#2467F6]">
              3 upcoming appointments
            </NavLink>
          </p>
        </div>
        <div className="mt-4">
          <form>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-200 rounded-lg bg-gray-50  dark:bg-white dark:white dark:placeholder-gray-400 focus:outline-none"
                placeholder="Type to search"
                required
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
            </div>
          </form>
        </div>
        {loading ? (
          <div className="flex justify-center items-center mt-20">
            <BounceLoader color="#2467F6" />
          </div>
        ) : (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-5">
            {printMentors()}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MentorsCard;
