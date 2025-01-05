import "./ExploreMenu.css";
import { menu_list } from "../../assets/assets";

const ExploreMenu = () => {
  return (
    <>
      <div className="explore-menu" id="explore-menu">
        <h1>Explore our menu</h1>
        <p className="explore-menu-text">
          Choose from a diverse menu featuring a delectable array of dishes
        </p>
        <div className="explore-menu-list">
          {menu_list.map((list_item, index) => {
            return (
              <div key={index} className="explore-menu-list-item">
                <img src={list_item.menu_image} alt={list_item.menu_name} />
                <p>{list_item.menu_name}</p>
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
