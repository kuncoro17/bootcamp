import React  from "react";
import Masonry from 'react-masonry-css';

const Service =({ photos})=>{
    const breakpointColumnsOBJ={
        defaultL:3,
        1100:2,
        700:1
    };
    return (
        <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-full"
            columnClassName="bg-clip-padding"
        >
            {photos.map((photo) => (
                <div key={photo.id} className="p-2">
                    <img
                        src={photo.urls.small}
                        alt={photo.alt_description}
                        className="w-full h-auto"
                    />
                </div>
            ))
            
            }
            </Masonry>
    )
}
export default Service;
