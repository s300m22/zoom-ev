import React from 'react';
import ReactPlayer from 'react-player';
import { IBenefitContent3ColumnImagesWithText } from '../../../interfaces/contentful.types.generated';

const BenefitVideo: React.FC<IBenefitContent3ColumnImagesWithText> = ({ fields }) => {
  return (
    <div className="video">
      <span className="title">Watch this video</span>
      <ReactPlayer
        controls
        height="100%"
        style={{ borderRadius: '15px', overflow: 'hidden' }}
        url={fields.video?.fields.file.url}
        width={'100%'}
      />
    </div>
  );
};

export default BenefitVideo;
