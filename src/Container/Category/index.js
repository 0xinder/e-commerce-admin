import React, {useState} from 'react';
import Layout from '../../Components/Layout';
import {Container,Row,Col} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory,getAllCategory} from '../../actions';
import Input from '../../Components/UI/Input';
import Modal from '../../Components/UI/Modal';
/**
* @author
* @function Category
**/
const Category = (props) => {
  const [show, setShow] = useState(false);
  const [categoryName,setCategoryName]=useState('');
  const [parentCategoryId,setParentCategoryId]=useState('');
  const [categoryImage,setCategoryImage]=useState('');
  const [categoryType,setCategoryType]=useState('');
  const [updateCategoryModal,setUpdateCategoryModal]=useState(false);
  const category=useSelector(state=>state.category)
  const dispatch=useDispatch();
  const handleClose = () => {
    const form=new FormData();
    form.append('name',categoryName);
    form.append('parentId',parentCategoryId);
    form.append('categoryImage',categoryImage);
    form.append('categoryType',categoryType);
    dispatch(addCategory(form));
    setCategoryName('');
    setParentCategoryId('');
    setShow(false);
  }
  const handleShow = () => setShow(true);
  const renderCategories=(categories)=>{
      let myCategories=[];
      for(let category of categories){
        myCategories.push(
          <li key={category.name}>
              {category.name}
              {category.children.length>0?(<ul>{renderCategories(category.children)}</ul>):null}
          </li>
        );
      }
    return myCategories;  
  }
  const handleCategoryImage=(e)=>{
    setCategoryImage(e.target.files[0]);
  }
  const createCategoryList=(categories,options=[])=>{
    for(let category of categories){
      options.push({value:category._id,name:category.name,parentId:category.parentId,type:category.type});
      if(category.children.length>0){
        createCategoryList(category.children,options)
      }
    }
  return options;
  }
  const updateCategory=()=>{
    setUpdateCategoryModal(true);
  }
  return (
    <Layout sidebar>
      <Container>
        <Row>
          <Col md={12}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Category</h3>
              <button onClick={handleShow}>Add</button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ul>{renderCategories(category.categories)}</ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <button>Delete</button>
            <button onClick={updateCategory}>Update</button>
          </Col>
        </Row>
        <Modal
          show={show}
          handleClose={handleClose}
          modalTitle={"Add New Category"}
        >
          <Input
            value={categoryName}
            placeholder={"Category Name"}
            onchange={(e) => setCategoryName(e.target.value)}
          />
          <Input
            value={categoryType}
            placeholder={"Category Type"}
            onchange={(e) => setCategoryType(e.target.value)}
          />
          <select
            value={parentCategoryId}
            className="form-control"
            onChange={(e) => setParentCategoryId(e.target.value)}
          >
            <option>select category</option>
            {createCategoryList(category.categories).map((option) => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
          <Input
            type="file"
            name="categoryImage"
            onchange={handleCategoryImage}
          ></Input>
        </Modal>
        {/*  */}
        <Modal
          show={updateCategoryModal}
          handleClose={() => setUpdateCategoryModal(true)}
          modalTitle={"Update Categories"}
          size="lg"
        >
          <Row>
            <Col>
              <Input
                value={categoryName}
                placeholder={"Category Name"}
                onchange={(e) => setCategoryName(e.target.value)}
              />
            </Col>
            <Col>
              <select
                value={parentCategoryId}
                className="form-control"
                onChange={(e) => setParentCategoryId(e.target.value)}
              >
                <option>select category</option>
                {createCategoryList(category.categories).map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Col>
            <Col>
                <select className="form-control">
                  <option value="">Select Type</option>
                  <option value="store">Store</option>
                  <option value="product">Product</option>
                  <option value="page">Page</option>
                </select>
            </Col>
          </Row>
          <Input
            type="file"
            name="categoryImage"
            onchange={handleCategoryImage}
          ></Input>
        </Modal>
      </Container>
    </Layout>
  );
 }
export default Category;