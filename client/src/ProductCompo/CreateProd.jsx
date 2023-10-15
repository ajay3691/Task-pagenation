import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateProd() {
  const [product, setProduct] = useState({
    name: '',
    code: '', // Add 'code' to your state
    category: '', // Add 'category' to your state
    image: null, // Modify 'image' to accept a file
    description: '',
  });
  const navigate = useNavigate();

  const updateHandler = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const fileChangeHandler = (event) => {
    const selectedFile = event.target.files[0];
  
    if (selectedFile) {
      // Check file type
      if (selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/png') {
        // Check file size (max 2MB)
        if (selectedFile.size <= 2 * 1024 * 1024) {
          // Create a FileReader to read the selected image
          const reader = new FileReader();
  
          // Listen for the load event when the reader is done
          reader.onload = () => {
            const imageDataUrl = reader.result;
            console.log('Image data URL:', imageDataUrl);
            setProduct({ ...product, image: imageDataUrl });
          };
  
          // Read the selected image as a data URL
          reader.readAsDataURL(selectedFile);
        } else {
          alert('Image size exceeds 2MB. Please choose a smaller image.');
        }
      } else {
        alert('Invalid image format. Please select a JPEG or PNG image.');
      }
    }
  };  
  
 /*  const fileChangeHandler=(event)=>{
    let imageFile=event.target.files[0]
    let reader=new FileReader()
    reader.readAsDataURL(imageFile)
    reader.addEventListener('load',()=>{
      if(reader.result){
        setProduct({...product,image:reader.result})
      }
      else{
        alert('Error Occurred')
      }
    })
  } */
  
  const submitHandler = (event) => {
    event.preventDefault();
   /*  const formData = new FormData();
    formData.append('name', product.name);
    formData.append('code', product.code);
    formData.append('category', product.category);
    formData.append('image', product.image);
    formData.append('description', product.description); */

    axios
      .post('http://localhost:5000/api/product', product)
      .then((resp) => {
        navigate('/admin');
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to add product. Please try again.');
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="d-flex vh-100 bg-danger justify-content-center align-items-center">
            <div className='w-50 bg-white rounded p-3'>
              <form>
                <h2> Add Product</h2>
                <div className="mb-2">
                  <label htmlFor="name"> Product Name</label>
                  <input
                    type="text"
                    onChange={updateHandler}
                    name="name"
                    placeholder="Enter name"
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="code"> Code</label>
                  <input
                    type="text"
                    onChange={updateHandler}
                    name="code"
                    placeholder="Enter Code"
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="category"> Category</label>
                  <select
                    onChange={updateHandler}
                    name="category"
                    className="form-control"
                  >
                    <option value="">Select Category</option>
                    <option value="Category1">Category 1</option>
                    <option value="Category2">Category 2</option>
                    {/* Add more category options here */}
                  </select>
                </div>
             
                <div className="mb-2">
                  <label htmlFor="image"> Image (PNG/JPEG, max 2MB)</label>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    onChange={fileChangeHandler}
                    name="image"
                    className="form-control"
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="description"> Description</label>
                  <input
                    type="text"
                    onChange={updateHandler}
                    name="description"
                    placeholder="Enter Description"
                    className="form-control"
                  />
                </div>
                <button className="btn btn-success" onClick={submitHandler}>Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProd;
