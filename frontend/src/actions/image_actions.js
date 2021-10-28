import * as APIUTIL from "../util/image_api_util";
export const RECEIVE_IMAGES = "RECEIVE_IMAGES";

const receiveImages = (images) => ({
    type: RECEIVE_IMAGES,
    images
});

export const fetchAllImages = () => dispatch => (
    APIUTIL.fetchImages().then(images => dispatch(receiveImages(images))) 
)