import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />

        <div className="home__row">
          <Product
            id="12321341"
            title="Master Lock 8143D Bike Lock Cable with Combination"
            price={5.71}
            image="https://m.media-amazon.com/images/I/61Lq0UqkrjL._AC_SL1000_.jpg"
            rating={5}
          />
          <Product
            id="49538094"
            title="Fitbit Charge 4 Fitness and Activity Tracker with Built-in GPS, Heart Rate, Sleep & Swim Tracking, Black/Black, One Size (S &L Bands Included)"
            price={122.27}
            rating={4}
            image="https://m.media-amazon.com/images/I/71smqRr0pmL._AC_SL1500_.jpg"
          />
        </div>

        <div className="home__row">
          <Product
            id="23445930"
            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
            price={98.99}
            image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?$300x400_retinamobilex2$"
            rating={5}
          />
          <Product
            id="4903850"
            title="Hydration Backpack by Mountain Designs - 10L Leakproof Hiking Backpack has Large Compartments and 3L Water Bladder"
            price={38.49}
            image="https://m.media-amazon.com/images/I/61v-3mIYEvS._AC_SL1500_.jpg"
            rating={3}
          />
          <Product
            id="3254354354"
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
            price={598.99}
            image="https://images-na.ssl-images-amazon.com/images/I/816ctt5WV5L._AC_SY400_.jpg"
            rating={4}
          />
        </div>

        <div className="home__row">
          <Product
            id="90829332"
            title="Samsung LC49RG90SSUXEN 49' Curved LED Gaming Monitor - Super Ultra Wide Dual WQHD 5120 x 1440"
            price={1094.98}
            image="https://images-na.ssl-images-amazon.com/images/I/6125mFrzr6L._AC_SY355_.jpg"
            rating={4}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
