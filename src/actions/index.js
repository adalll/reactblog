import _ from "lodash";
import jasonPlaceholder from "../api/jasonPlaceholder";

export const fetchPosts = () => {
  return async dispatch => {
    const response = await jasonPlaceholder.get("/posts");
    dispatch({ type: "FETCH_POSTS", payload: response.data });
  };
};

export const fetchUser = function(id) {
  return async function(dispatch) {
    const response = await jasonPlaceholder.get(`/users/${id}`);
    dispatch({ type: "FETCH_USER", payload: response.data });
  };
};

export const fetchPostsAndUser = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());
  /*const userIds = _.uniq(_.map(getState().posts, 'userId'));
  userIds.forEach(id => dispatch(fetchUser(id)));*/
  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};
//меморайзед версия
/*export const fetchUser = id => dispatch => {
    _fetchUser(id, dispatch);
};

const _fetchUser = _.memoize(async(id, dispatch) => {
    const response = await jasonPlaceholder.get(`/users/${id}`);
    dispatch ( {type: 'FETCH_USER', payload: response.data});
});*/
