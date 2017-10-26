import React, { Component } from "react";
//import { Redirect } from 'react-router';
import "./ProfileEdit.css";
import API from "../../utils/API";
import { Input, Select } from "../../components/Form";
import { Modal } from "react-bootstrap";
import $ from "jquery";

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      file: '', 
      name: '',
      _id: '', 
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      zipCode: '',
      ageRange: '',
      sex: '',
      userCategory: '',
      categoryDescription: '',
      publicProfile: '',
      imagePreviewUrl: '',
      imagePath: ''
    };

  }
  
  // componentDidMount() {
    
  // };

  componentDidMount() {
    var token = window.localStorage.getItem('token');

    if (token) {
      API.memberInfo(token)
        .then(res => {
          this.setState({ _id: res.data._id, token: token });
          this.loadProfile();

          //Update the Login/log out Button
          document.getElementById("logInBttn").innerHTML = "<p>Log Out</p>";
      })
      .catch(err => console.log(err));
    }
  }

  loadProfile = () => {
    API.getUser(this.state._id)
      .then(res => {
        return this.setState({ 
          data: res.data,
          _id: res.data._id,
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          password: res.data.password,
          zipCode: res.data.zipCode,
          ageRange: res.data.ageRange,
          sex: res.data.sex,
          userCategory: res.data.userCategory,
          categoryDescription: res.data.categoryDescription,
          publicProfile: res.data.publicProfile,
          imagePreviewUrl: res.data.imagePath,
          imagePath: res.data.imagePath
        });
      })
      .catch(err => console.log(err));
  }


  _handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(document.getElementById('uploadForm'));

    let updatedProfileData = {};
    updatedProfileData = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      // email: this.state.email,
      // password: this.state.password,
      zipCode: this.state.zipCode,
      ageRange: this.state.ageRange,
      sex: this.state.sex,
      userCategory: this.state.userCategory,
      categoryDescription: this.state.categoryDescription,
      publicProfile: this.state.publicProfile,
      imagePath: this.state.imagePath
    };

    //If no files entered, just save the provfile without the file
    if (!this.state.file){
      API.updateProfile(this.state._id, updatedProfileData)
      .then(resbook => this.loadProfile())
      .catch(err => console.log(err));
    }
    //Otherwise, save the file first, then save the profile with the link of the file.
    else {
      API.uploadImage(formData)
        .then(res => {
          if (res.data.success === false) {
            setTimeout(() => {
              alert(res.data.message);
            }, 1000);
          } 
          else {
            this.setState({ file: res.data.response, imagePath: res.data.imagePath, name: '', imagePreviewUrl: ''});
            
            //After Updating the image, saving the profile with the image url from Amazon
            updatedProfileData.imagePath = res.data.imagePath;
            API.updateProfile(this.state._id, updatedProfileData)
              .then(resbook => this.loadProfile())
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log(err));
    }
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });

    //Check to only deal with checkboxes
    if (event.target.type === "checkbox"){
      this.setState({ 
        publicProfile: event.target.checked
      });
    }
  };

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        name: file.name,
        imagePath: 'https://s3.amazonaws.com/msconnect/images/' + file.name,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  close() {
    //this.setState({ showModal: false });
    $("#warningModal").hide();
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} alt="My Pic"/>);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
        {!this.state.token ? (
          <div id="warningModal">
            <Modal.Dialog>
                  <Modal.Header>
                    <button type="button" className="close" data-dismiss="modal" onClick={this.close}>&times;</button>
                    <h4 className="modal-title">Login Warning</h4>
                  </Modal.Header>
                  <Modal.Body>
                    <div>
                      Please Login to Access this feature
                    </div>
                  </Modal.Body>
            </Modal.Dialog>
          </div>
        ) : (<span></span>
        )}
        
          <form 
            id="uploadForm"
            method="POST"
            action="/upload"
            formEncType="multipart/form-data" 
            onSubmit={(e)=>this._handleSubmit(e)}>
            <div className="leftColumn">
            <Input
              disabled="true"
              value={this.state.email}
              onChange={this.handleInputChange}
              name="email"
              type="email"
            />
            <Input
              disabled="true"
              value={this.state.password}
              onChange={this.handleInputChange}
              name="password"
              type="password"
            />          
            <Input
              value={this.state.firstName}
              onChange={this.handleInputChange}
              name="firstName"
              placeholder="First Name"
            />
            <Input
              value={this.state.lastName}
              onChange={this.handleInputChange}
              name="lastName"
              placeholder="Last Name"
            />
            <Input
              value={this.state.zipCode}
              onChange={this.handleInputChange}
              name="zipCode"
              placeholder="zip Code"
            />
            <label>Age Range:
              <Select value={this.state.ageRange} name="ageRange" onChange={this.handleInputChange}>
                <option value="">Prefer Not to Say</option>
                <option value="0">18 and under</option>
                <option value="19">19 - 29</option>
                <option value="30">30 - 39</option>
                <option value="40">40 - 49</option>
                <option value="50">50 - 59</option>
                <option value="60">60 and Over</option>
              </Select>
            </label>
            <br />          
            <label>Sex:
              <Select value={this.state.sex} name="sex" onChange={this.handleInputChange}>
                <option value="">Prefer Not to Say</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </label>
            <br />
            <label>Category: 
              <Select value={this.state.userCategory} name="userCategory" onChange={this.handleInputChange}>
                <option value="">Prefer Not to Say</option>
                <option value="Patient">Patient</option>
                <option value="Friend">Friend</option>
                <option value="Family">Family</option>
                <option value="Other">Other</option>
              </Select>
            </label>
            <Input
              value={this.state.categoryDescription}
              onChange={this.handleInputChange}
              name="categoryDescription"
              placeholder="Fill in only if other selected as Category Description"
              className="other"
            />
            <label className="public">Is Profile Public?: 
            <input
              value={this.state.publicProfile}
              onChange={this.handleInputChange}
              name="publicProfile"
              type="checkbox"
              className="publicCheck"
            />
            </label>
            
            <br />
          </div>
          <div className="rightColumn">
            <div className="imgPreview">
              {$imagePreview}
            </div>
            <input className="fileInput" 
              type="file" name="userPhoto"
              onChange={(e)=>this._handleImageChange(e)} />
            <button className="submitButton" 
              type="submit" 
              onClick={(e)=>this._handleSubmit(e)}>Upload image and Update profile
            </button>
            
          </div>
          </form>
      </div>
    )
  }
}
export default ProfileEdit;