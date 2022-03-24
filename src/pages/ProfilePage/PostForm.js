import React from "react";
import styles from './PostForm.module.css';

const PostForm = ({
  onFormSubmit,
  productTitle,
  handleProductTitleChange,
  productDescription,
  handleProductDescriptionChange,
  productCategory,
  handleProductCategoryChange,
  onFileChange,
}) => {
  return (
    <form className={styles.formContainer} onSubmit={(e) => onFormSubmit(e)}>
      <h1>LIST AN ITEM</h1>
      <label className={styles["form-product-margin"]}>
        <h2>Product Title:</h2>
        <input
          className={styles["form-product-title"]}
          type="text"
          value={productTitle}
          onChange={handleProductTitleChange}
          placeholder="Enter Product Name"
        />
      </label>

      <label>
        <h2>Product Description:</h2>
        <textarea
          className={styles["form-product-description"]}
          type="text"
          value={productDescription}
          onChange={handleProductDescriptionChange}
          placeholder="Enter Product Category"
        />
      </label>

      <label>
        <h2>Category:</h2>
        <input
          className={styles["form-product-title"]}
          type="text"
          value={productCategory}
          onChange={handleProductCategoryChange}
          placeholder="Enter Product Category"
        />
      </label>

      <h2>Upload Picture:</h2>
      <input className={styles["form-picture"]}type="file" multiple="multiple" onChange={onFileChange} />

      <button className={styles["form-submit"]} type="submit">
        SUBMIT
      </button>
    </form>
  );
};

export default PostForm;
