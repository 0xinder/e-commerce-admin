import React, { useState,useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../Components/Layout'
import Input from '../../Components/UI/Input';
import Modal from '../../Components/UI/Modal';
import linearCategories from '../../helpers/linearCategories';
import {createPage} from '../../actions'
/**
* @author
* @function NewPage
**/

const NewPage = (props) => {
  const [createModal,setCreateModal]=useState(false);
  const [title,setTitle]=useState('');
  const category=useSelector(state=>state.category);
  const page=useSelector(state=>state.page);
  const [categories,setCategories]=useState([]);
  const [type,setType]=useState('');
  const [categoryId,setCategoryId]=useState('');
  const [desc,setDesc]=useState('');
  const [banners,setBanners]=useState([]);
  const [products,setProducts]=useState([]);
  const dispatch=useDispatch();
  const handleBannerImages=(e)=>{
    setBanners([...banners,e.target.files[0]]);
  }
  const onCategoryChange=(e)=>{
    const categ=categories.find(category=>category._id==e.target.value);
    setCategoryId(e.target.value);
    setType(categ.type);
  }
  const handleProductImages=(e)=>{
    setProducts([...products,e.target.files[0]]);
  }
  useEffect(()=>{
    setCategories(linearCategories(category.categories));
  },[category]);
  useEffect(()=>{
    if(!page.loading){
      setCreateModal(false);
      setTitle('');
      setCategoryId('');
      setDesc('');
      setProducts([]);
      setBanners([]);
    }
  },[page])
  const submitPageForm=(e)=>{
    if(title===""){
      alert("title is required");
      setCreateModal(false);
      return;
    }
    const form =new FormData();
    form.append('title',title);
    form.append('description',desc);
    form.append('category',categoryId);
    form.append('type',type);
    banners.forEach((banner,index)=>{
      form.append('banners',banner);
    })
    products.forEach((product,index)=>{
      form.append('products',product);
    })
    dispatch(createPage(form));
  }
  const renderCreatePageModal=()=>{
    return (
      <Modal show={createModal} modalTitle={'Create New Page'} handleClose={submitPageForm}>
        <Container>
        <Row>
          <Col>
            <select className="form-control" value={categoryId} onChange={onCategoryChange}>
              <option value="">select category</option>{
                categories.map(cat=><option key={cat._id} value={cat._id}>{cat.name}</option>)
              }
            </select>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input className="form-control-sm" value={title} onchange={(e)=>setTitle(e.target.value)} placeholder={'Page Title'}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Input className="form-control-sm" value={desc} onchange={(e)=>setDesc(e.target.value)} placeholder={'Page Desc'}/>
          </Col>
        </Row>
        {
          (banners.length>0)?
          banners.map((banner,index)=>
            <Row key={index}>
              <Col>
                {banner.name}
              </Col>
            </Row>
          ):null
        }
        <Row>
          <Col>
            <Input type="file" name="banners" className="form-control " onchange={handleBannerImages}/>
          </Col>
        </Row>
        {
          products.length>0?
          products.map((banner,index)=>
            <Row key={index}>
              <Col>
                {banner.name}
              </Col>
            </Row>
          ):null
        }
        <Row>
          <Col>
            <Input type="file" name="products" className="form-control" onchange={handleProductImages}/>
          </Col>
        </Row>
        </Container> 
      </Modal>
    )
  }
  return(
      <Layout sidebar>
        {
          page.loading?
          <>Creating Page...</>
          :
          <>
          {renderCreatePageModal()}
          <button onClick={()=>setCreateModal(true)}>Create Page</button>
          </>
        }
      </Layout>
   )

 }

export default NewPage