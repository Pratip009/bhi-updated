import React from 'react';

type Props = {
    video: string,
};

const SliderCard = ({ video }: Props) => {
    return (
        <div className="w-full bg-black"> {/* or any color you want */}
            <div className='flex justify-center items-center w-full h-full py-8'>
                <div className='w-full max-w-2xl'>
                    <video
                        src={video}
                        controls
                        muted
                        className='w-full h-64 md:h-80 lg:h-96 rounded-lg shadow-lg object-contain bg-black'
                        preload="metadata"
                        poster="/images/thumb.jpg"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>

    );
};

export default SliderCard;
