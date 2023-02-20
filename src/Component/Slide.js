import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Header from "./Header";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";
import "./slide.css";
function Slide() {
  const [paginationSet, setPaginationSet] = useState([]);
  const [searchFlag, setSearchFlag] = useState(false);
  const [search, setSearch] = useState("");
  const [searchDetails, setSearchDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  async function searchData() {
    let tempData = await fetch("https://emoji-backend.vercel.app/emoji/all")
      .then((res) => res.json())
      .then((res) => {
        return res;
      })
      .catch((e) => console.log(e));
    let filteredData = tempData.filter(
      (data) =>
        data.unicodeName.includes(search.toLowerCase()) ||
        data.subGroup.includes(search.toLowerCase())
    );
    setSearchDetails(filteredData);
    setSearchFlag(true);
    setSearch("");
  }
  useEffect(() => {
    axios
      .get(`https://emoji-backend.vercel.app/emoji/limit/${currentPage}`)
      .then((res) => setPaginationSet(res.data))
      .catch((e) => console.log(e));
    window.scrollTo({
      top: "100px",
      behavior: "smooth",
    });
  }, [currentPage]);
  return (
    <div className="container" onClick={() => setSearchFlag(false)}>
      <Header />
      <div className="input-group mb-3">
        <input
          type="text"
          value={search}
          className="form-control"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Enter the Emoji name"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          <span
            onClick={() => searchData()}
            className="input-group-text"
            id="basic-addon2"
          >
            Search Emoji
          </span>
        </div>
      </div>
      {!searchFlag ? (
        <div className="whole-emoji">
          {paginationSet.map((emote) => {
            return (
              <div className="each">
                <span className="hoveremoji" style={{ fontSize: "3.5rem" }}>
                  {emote.character}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="whole-emoji">
          {searchDetails.length !== 0 ? (
            <>
              {searchDetails.map((emote) => {
                return (
                  <div className="each">
                    <span className="hoveremoji" style={{ fontSize: "3.5rem" }}>
                      {emote.character}
                    </span>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <div className="no-result">
                <h2>No Emoji Found Search another name</h2>
                <h3> Example: Joy</h3>
              </div>
            </>
          )}
        </div>
      )}
      {!searchFlag && (
        <div className="pagination-button">
          {currentPage !== 1 && (
            <span
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              <BsFillArrowLeftCircleFill />
            </span>
          )}
          {currentPage !== 226 && (
            <span onClick={() => setCurrentPage(currentPage + 1)}>
              <BsFillArrowRightCircleFill />
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default Slide;
