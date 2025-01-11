import "./Add.css";
import { assets } from "../../assets/assets.js";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salads",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const res = await axios.post(`${url}/api/food/add`, formData);

    if (res.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Salads",
      });
      setImage(null);
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <>
      <div className="add">
        <form className="flex-col" onSubmit={handleSubmit}>
          <div className="add-img-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
              />
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </div>
          <div className="add-product-name flex-col">
            <p>Product name</p>
            <input
              onChange={handleChange}
              type="text"
              name="name"
              value={data.name}
              placeholder="Type here"
            />
          </div>
          <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea
              onChange={handleChange}
              name="description"
              value={data.description}
              rows="6"
              placeholder="Write content here"
              required
            ></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product category</p>
              <select onChange={handleChange} name="category">
                <option value="Salads">Salads</option>
                <option value="Rolls">Rolls</option>
                <option value="Desserts">Desserts</option>
                <option value="Sandwiches">Sandwiches</option>
                <option value="Cakes">Cakes</option>
                <option value="Veggie">Veggie</option>
                <option value="Pastas">Pastas</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product price</p>
              <input
                onChange={handleChange}
                type="Number"
                name="price"
                value={data.price}
                placeholder="3000 ARS"
              />
            </div>
          </div>
          <button type="submit" className="add-btn">
            ADD
          </button>
        </form>
      </div>
    </>
  );
};

export default Add;
