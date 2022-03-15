import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import Loading from "../utils/loading/Loading";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "Please Provide description",
  content: "Please provide content",
  category: "",
	id: ""
};

const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesApi.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin] = state.userApi.isAdmin;
  const [token] = state.token;

  const navigate = useNavigate();
	const param = useParams();

	const [products] = state.productsApi.products
	const [onEdit, setOnEdit] = useState(false)

	useEffect(() => {
		if(param.id){
			setOnEdit(true)
			products.forEach(product => {
				if(product._id === param.id) {
					setProduct(product)
					setImages(product.images)
				}
			})
		}else{
			setOnEdit(false);
			setProduct(initialState)
			setImages(false)
		}
	},[param.id, products])

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You are not an admin");
      const file = e.target.files[0];

      if (!file) return alert("File does not exist");

      if (file.size > 1024 * 1024)
        //1mb
        return alert("Size is too large");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File format is incorrect");

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoading(false);
      setImages(res.data);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You are not an admin");
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You are not an admin");
      if (!images) return alert("no image upload");

			if(onEdit){
				await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
			}else{
				await axios.post(
          "/api/products",
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
			}
      

      setImages(false);
      setProduct(initialState);
      navigate("/");
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  const styleUpload = {
    display: images ? "block" : "none",
  };
  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload} />
        {loading ? (
          <div id="file_img">
            <Loading />
          </div>
        ) : (
          <div id="file_img" style={styleUpload}>
            <img src={images ? images.url : ""} alt="" />
            <span onClick={handleDestroy}>X</span>
          </div>
        )}
      </div>

      <form action="" onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="product_id">Product Id</label>
          <input
            type="text"
            name="product_id"
            id="product_id"
            required
            value={product.product_id}
            onChange={handleChangeInput}
						disabled={onEdit}
          />
        </div>

        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={product.title}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="price">price</label>
          <input
            type="number"
            name="price"
            id="price"
            required
            value={product.price}
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="description">description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            value={product.description}
            rows="5"
            onChange={handleChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="content">content</label>
          <textarea
            type="text"
            name="content"
            id="content"
            required
            value={product.content}
            rows="7"
            onChange={handleChangeInput}
          />
        </div>

        <div className="row">
          <label htmlFor="categories">categories:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleChangeInput}
          >
            <option value="">Please select a category</option>
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">{onEdit ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
};

export default CreateProduct;
