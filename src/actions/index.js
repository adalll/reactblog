import jasonPlaceholder from '../api/jasonPlaceholder';


export const fetchPosts = () => {
    return async dispatch => {
        const response = await jasonPlaceholder.get('/posts');
        dispatch ( {type: 'FETCH_POSTS', payload: response});
    };
};