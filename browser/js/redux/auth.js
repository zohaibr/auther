import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT = 'SET_CURRENT_USER';



/* ------------   ACTION CREATORS     ------------------ */

const login = currentuser => ({type: SET_CURRENT, currentuser});

/* ------------       REDUCER     ------------------ */

export default function reducer (currentuser = [], action) {
  switch (action.type) {

    case SET_CURRENT:
      return action.currentuser;

    default:
      return currentuser;
  }
}



/* ------------       DISPATCHERS     ------------------ */

export const loginUser = (email, password) => dispatch => {
  axios.get(`/api/users/`+ email + `/` + password)
    .then(res => dispatch(login(res.data)))
    .catch(err => console.error(`Updating user: ${user} unsuccesful`, err))
}

export const signupUser = (email, password) => dispatch => {
  axios.post(`/api/users/`+ email + `/` + password)
       .then(res => dispatch(create(res.data)))
       .catch(err => console.error('whatevers', err));
};

export const logoutUser = () => dispatch => {
  axios.get('/api/users/logout');
}
