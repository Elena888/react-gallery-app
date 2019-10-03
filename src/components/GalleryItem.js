import React, {memo} from 'react';
import noImage from '../no-image.jpg'

const GalleryItem = memo((props) => {
    let url = props.item.data.thumbnail === 'self' || props.item.data.thumbnail ==='default'
        ? noImage
        : props.item.data.thumbnail;

    let permalink = `https://www.reddit.com/${props.item.data.permalink}`;

    console.log('render')
    return(
        <div className="gallery-item">
            <div className="image" style={{backgroundImage: `url(${url})`}}/>
            <h4>{props.item.data.title}</h4>
            <h5>Number of comments {props.item.data.num_comments}</h5>
            <a href={permalink} target="_blank" rel="noopener noreferrer">Link</a>
        </div>
    )
});

export default GalleryItem;