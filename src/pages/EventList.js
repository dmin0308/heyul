import React from "react";
import {Link} from 'react-router-dom'
import { Arrow} from '../components/common/_common'
import EventCard from "../components/product/EventCard";

export default function EventList() {
  return (
    <div className="px-3 px-xxl-0">
      <div className="mw mb88 ">
        <div className="location d-flex justify-content-end py-4 align-items-center">
          <span>
            <Link to="/">홈</Link>
          </span>
          <span className="mx-2">
            <Arrow icon="gray" />
          </span>
          <span>
            <Link to="/event">기획전</Link>
          </span>
        </div>
        <div
          className="position-relative overflow-hidden rounded-3 mb-3"
          style={{ height: "290px" }}
        >
          <div
            className="position-relative w-100 h-100 overflow-hidden top-0 start-0"
            style={{
              backgroundImage: "url('/img/recipe/0.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <EventCard couponFilter="5|신규회원  " className="event-list mw" />
        <div className="w-100 border-top mt32"></div>
      </div>

      <div className="mw mb88">
        <div
          className="position-relative overflow-hidden rounded-3 mb-3"
          style={{ height: "290px" }}
        >
          <div
            className="position-relative w-100 h-100 overflow-hidden top-0 start-0"
            style={{
              backgroundImage: "url('/img/recipe/0.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <EventCard couponFilter="10|가을 기획전 " className="event-list mw" />
        <div className="w-100 border-top mt32"></div>
      </div>

      <div className="mw mb88">
        <div
          className="position-relative overflow-hidden rounded-3 mb-3"
          style={{ height: "290px" }}
        >
          <div
            className="position-relative w-100 h-100 overflow-hidden top-0 start-0"
            style={{
              backgroundImage: "url('/img/recipe/0.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
        <EventCard couponFilter="5|회원 특별 " className="event-list mw" />
        <div className="w-100 border-top mt32"></div>
      </div>
    </div>
  );
}
