import api from '../utils/api';
import { setAlert } from './alert';

import {
  ADD_POST,
  POST_ERROR
} from './types';

// Add post
export const addPost = formData => async dispatch => {
  try {
    const res = await api.post('/posts', formData);

    dispatch({
      type: ADD_POST,
      payload: res.data
    });

   dispatch(setAlert('Request Submitted. Thank you!', 'success'));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};