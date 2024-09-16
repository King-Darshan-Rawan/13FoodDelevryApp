import React, { useEffect, useState } from "react";
import { Footer } from "./../comps/Footer";
import { Cards } from "../comps/Cards";
import "./../comps/Slider.css";


export const Home = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      // Corrected the URL by adding http://
      let response = await fetch("http://localhost:5000/api/Items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Parsing the response as JSON
      response = await response.json();

      // Logging and storing the data
      // console.log(response[0], response[1]);
      setItems(response[0]); // ApnaKhanaItem
      setCategories(response[1]); // foodCategory
    } catch (error) {
      console.error("Error loading data", error);
    }
  };

  // Using useEffect to load data on component mount
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
      <div
        id="carouselExampleCaptions"
        className="carousel slide hhhxjsjbhbhcxhb"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption d-none d-md-block">
            <div class="container-fluid">
              <div class="d-flex justify-content-center">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  
                />
                {/* <button class="btn text-info bg-dark btn-outline-success " type="prevent"> */}
                  {/* Search */}
                {/* </button> */}
              </div>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="./../../public/photos/premium_photo-1699612395018-ccaace9d2294.jpeg"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(50%"}}
            />
            <div className="carousel-caption d-none d-md-block mb-8  fw-bold fw-italic">
            <h5 className="fontCaps">Burger</h5>
              <p>
                Brothers Charles and Frank Menches were sold out of sausage at
                their stand at a fair in Hamburg, New York.
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="./../../public/photos/premium_photo-1673108852141-e8c3c22a4a22.jpeg"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(50%"}}
            />
            <div className="carousel-caption d-none d-md-block mb-8 fw-bold fw-italic">
              <h5 className="fontCaps">Pizza</h5>
              <p>
                It's widely speculated that pizza came from the Greek word
                “pitta,” which means “pie” ; however some historians believe
                that pizza came from the Langobardic word “bizzo,” which means
                “bite.”
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="./../../public/photos/premium_photo-1693086421783-906de07df6b6.jpeg"
              className="d-block w-100"
              style={{ filter: "brightness(50%"}}
            />
            <div className="carousel-caption d-none d-md-block mb-8 fw-bold fw-italic">
              <h5 className="fontCaps ">Sandwich</h5>
              <p>
                A sandwich is a dish typically consisting of vegetables, sliced
                cheese or meat, placed on or between slices of bread
              </p>
            </div>
          </div>
          
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
        <div className="search-carousel">
            <div className="carousel-caption d-none d-md-block">
            
            <div class="d-flex">
                <input
                  class="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e)=> {setSearch(e.target.value)}}
                />
                {/* <button class="btn btn-outline-success" type="submit">
                  Search
                </button> */}
              </div>
            </div>
          </div>
      </div>
    </div>
      {
        <div className="container">
          {categories !== null
            ? categories.map((data) => {
                return (
                  <div className="row mb-3">
                    <div key={data._id} className="m-3 fs-3">
                      {data.CategoryName}
                    </div>
                    <hr />
                    {items !== null ? (
                      items
                        .filter(
                          (item) => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase())
                        )
                        .map((filteredItem) => (
                          <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3"><Cards foodname = {filteredItem.name} foodimage = {filteredItem.img} foodDiscription = {filteredItem.description} foodOption = {filteredItem.options[0]}/></div>
                        ))
                    ) : (
                      <div>No such data foun d</div>
                    )}
                  </div>
                );
              })
            : ""}
        </div>
      }
      <Footer />
    </>
  );
};
