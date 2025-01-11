import { useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets.js";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const res = await axios.get(`${url}/api/food/list`);
    if (res.data.success) {
      setList(res.data.data);
    } else {
      toast.error("Error fetching food list");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async (foodId) => {
    const res = await axios.delete(`${url}/api/food/remove`, {
      data: { id: foodId },
    });
    if (res.data.success) {
      await fetchList();
      toast.success(res.data.message);
    } else {
      toast.error("Error removing food item");
    }
  };

  return (
    <>
      <div className="list add flex-col">
        <p>All Foods List</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item, index) => {
            return (
              <>
                <div key={index} className="list-table-format">
                  <img src={item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                  <p>{item.price} pesos</p>
                  <img
                    onClick={() => removeFood(item._id)}
                    className="cross"
                    src={assets.cross_icon}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default List;
