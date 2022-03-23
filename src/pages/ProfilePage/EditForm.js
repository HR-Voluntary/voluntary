import React from 'react';
import styles from './ProfilePage.module.css';

const EditForm =({
  onEditFormSubmit,
  editProductId,
  productTitle,
  handleProductTitleChange,
  productDescription,
  handleProductDescriptionChange,
  productCategory,
  handleProductCategoryChange,
  onFileChange
}) => {

  return (
    <form className={styles.formContainer} onSubmit={(e) => onEditFormSubmit(e, editProductId)}>
      <label>
        <h2>Product Title:</h2>
        <input
          className={styles['form-product-title']}
          type="text"
          value={productTitle}
          onChange={handleProductTitleChange}
        />
      </label>

      <label>
        <h2>Product Description:</h2>
        <textarea
          className={styles['form-product-description']}
          type="text"
          value={productDescription}
          onChange={handleProductDescriptionChange}
        />
      </label>

      <label>
        <h2>Category:</h2>
        <input
          className={styles['form-product-title']}
          type="text" value={productCategory}
          onChange={handleProductCategoryChange}
        />
      </label>

      <h2>Upload Picture:</h2>
      <input type="file" multiple="multiple" onChange={onFileChange}/>

      <button className={styles['form-submit']} type="submit">SUBMIT</button>
    </form>
  )
}

export default EditForm;