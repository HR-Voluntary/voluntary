import React, {useState, useEffect} from 'react';
//import empty thumb and filled in thumb svg files

const Thumbs = () => {
  const [selected, setSelected] = useState(false);
  const [selectedThumb, setSelectedThumb] = useState(null);

  //hoverFillThumb
    //filled thumb appears when mouse hovers over thumb

  //handleSubmit
    //clicking thumb sets selected state to true
    //clicking thumb sets selected state to filled thumb
    //axios post request to database to add/minus trust score

  //Text should say: "Did you receive transaction" for buyer
  //Text should say: "Did you coomplete transaction" for seller

  return <button>thumbss</button>
};

export default Thumbs;