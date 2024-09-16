import React, { useEffect, useState } from "react";
import { Footer } from "./../comps/Footer";
import { Cards } from "../comps/Cards";
import { Slider } from "../comps/Slider";

export const Home = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

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
      <Slider />
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
                          (item) => item.CategoryName === data.CategoryName
                        )
                        .map((filteredItem) => (
                          <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3"><Cards foodname = {filteredItem.name} foodimage = {filteredItem.img} foodDiscription = {filteredItem.description} foodOption = {filteredItem.options}/></div>
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
