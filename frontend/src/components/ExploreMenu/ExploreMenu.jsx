import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";
import { useRef, useState } from "react";

const ExploreMenu = ({ category, setCategory }) => {
  const scrollableRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  const handleMouseDown = (e) => {
    const scrollable = scrollableRef.current;
    if (!scrollable) return;

    setIsDragging(true);
    setStartX(e.pageX - scrollable.offsetLeft);
    setStartY(e.pageY - scrollable.offsetTop);
    setScrollLeft(scrollable.scrollLeft);
    setScrollTop(scrollable.scrollTop);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollableRef.current) return;

    const scrollable = scrollableRef.current;
    const x = e.pageX - scrollable.offsetLeft;
    const y = e.pageY - scrollable.offsetTop;

    const walkX = x - startX;
    const walkY = y - startY;

    scrollable.scrollLeft = scrollLeft - walkX;
    scrollable.scrollTop = scrollTop - walkY;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <>
      <div className="explore-menu" id="explore-menu">
        <h1>Explore our menu</h1>
        <p className="explore-menu-text">
          Choose from a diverse menu featuring a delectable array of dishes
        </p>
        <div
          className={`explore-menu-list scrollable ${
            isDragging ? "dragging" : ""
          }`}
          ref={scrollableRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {menu_list.map((list_item, index) => {
            const menu_name = list_item.menu_name;
            const menu_image = list_item.menu_image;
            return (
              <div
                onClick={() =>
                  setCategory((prev) =>
                    prev === menu_name ? "All" : menu_name
                  )
                }
                key={index}
                className="explore-menu-list-item"
              >
                <img
                  className={
                    category === menu_name || category === "All" ? "active" : ""
                  }
                  src={menu_image}
                  alt={menu_name}
                />
                <p
                  className={
                    category === menu_name || category === "All" ? "active" : ""
                  }
                >
                  {menu_name}
                </p>
              </div>
            );
          })}
        </div>
        <hr />
      </div>
    </>
  );
};

export default ExploreMenu;
