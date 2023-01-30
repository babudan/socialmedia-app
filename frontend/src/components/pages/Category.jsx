import React from 'react'
  
  function Category(props) {
      return (
          <>
              <div className="container">
                  <h1>{props.data.category}</h1>
              </div>
          </>
      )
  }
  
  export default Category
