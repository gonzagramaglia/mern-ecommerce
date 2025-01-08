import "./Add.css";
import { assets } from "../../assets/assets.js";
import { useState, useEffect } from "react";

const Add = () => {
  const [image, setImage] = useState(null);

  useEffect(() => {
    console.log(image);
  }, [image]);

  return (
    <>
      <div className="add">
        <form className="flex-col">
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
            <input type="text" name="name" placeholder="Type here" />
          </div>
          <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea
              name="description"
              rows="6"
              placeholder="Write content here"
              required
            ></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product category</p>
              <select name="category">
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
              <input type="Number" name="price" placeholder="$20" />
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
