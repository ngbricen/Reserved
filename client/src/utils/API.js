import axios from "axios";

//defining API calls that will be handled by express

export default {
  register: function(userData) {
  	return axios.post("/api/auth/register", userData);
  },
  authenticate: function(userData) {
  	return axios.post("/api/auth/authenticate", userData);
  },
  uploadImage: function(formData) {
  	return axios.post("/api/file/upload", formData);
  },
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  // Update a profile in the database
  updateProfile: function(id, profileData) {
    return axios.put("/api/users/" + id, profileData);
  },
  // Verify the current token
  memberInfo: function(token) {
    return axios.get("/api/auth/" + token);
  },
  logout: function(){
    return axios.get("api/auth/logout");
  },
  
  addEvent: function(eventData) {
    return axios.post("/api/events/", eventData);
  },

  // Gets all events
  getEvents: function() {
    return axios.get("/api/events");
  },

  // Deletes the Event with the given id
  deleteEvent: function(id) {
    return axios.delete("/api/userEvents/" + id);
  },

  getSavedEvents: function(id) {
    return axios.get("/api/userEvents/" + id);
  },

  // Saves an article to the database
  saveEvent: function(eventData) {
    return axios.post("/api/userEvents", eventData);
  }
};