import React from 'react';
import GalleryItem from './GalleryItem'

const Gallery = (props) => {
    const renderItem = () => {
        return props.data.map(item => {
            return <GalleryItem key={item.data.id} item={item}/>
        })
    };

    return(
        <div className="gallery">
            {renderItem()}
        </div>
    )
};

export default Gallery;