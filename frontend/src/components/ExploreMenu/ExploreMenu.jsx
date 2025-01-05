import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <>
      <div className="explore-menu" id="explore-menu">
        <h1>Explore our menu</h1>
        <p className="explore-menu-text">
          Choose from a diverse menu featuring a delectable array of dishes
        </p>
        <div className="explore-menu-list">
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
                    (category === menu_name) | (category === "All")
                      ? "active"
                      : ""
                  }
                  src={menu_image}
                  alt={menu_name}
                />
                <p
                  className={
                    (category === menu_name) | (category === "All")
                      ? "active"
                      : ""
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
