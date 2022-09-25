import React from 'react';
import ReactImageGallery from 'react-image-gallery';
import { Button, List, RichTextRenderer } from '../../../elements';
import { IBenefitContent3ColumnImagesWithText } from '../../../interfaces/contentful.types.generated';
import { GalleryWrapper } from '../../Car/components/CarSummaryCard/CarSummary.styled';
import 'react-image-gallery/styles/css/image-gallery.css';

const ImageGridAndFeatures: React.FC<IBenefitContent3ColumnImagesWithText> = (component) => {
  const { fields } = component;

  const images =
    fields?.images?.map((image) => ({
      original: image.fields.file.url,
      thumbnail: image.fields.file.url,
    })) ?? undefined;

  return (
    <div className="image-grid-and-features">
      <div className="images">
        {images ? (
          <GalleryWrapper>
            <ReactImageGallery
              items={images}
              showFullscreenButton={false}
              showNav={false}
              showPlayButton={false}
            />
          </GalleryWrapper>
        ) : null}
      </div>
      <div className="content">
        <h3>{fields.title}</h3>
        <div className="description">
          <RichTextRenderer>{fields.description}</RichTextRenderer>
        </div>
        <div className="main-features">
          {fields.mainFeatures?.map((feature) => (
            <div className="card" key={`mf-${feature.sys.id}`}>
              <span>{feature.fields.title}</span>
              <p>{feature.fields.shortDescription}</p>
            </div>
          ))}
        </div>
        <div className="features">
          <List
            listColumns={2}
            listItems={fields.features?.map((bFeature) => (
              <div className="list-item" key={bFeature.sys.id}>
                <h2>{bFeature.fields.title}</h2>
                <p>{bFeature.fields.description ?? bFeature.fields.shortDescription}</p>
              </div>
            ))}
            listTitle="Features"
          />
        </div>
        {fields.cta && <Button link={fields.cta} />}
        <div className="small">{fields.disclaimer}</div>
      </div>
    </div>
  );
};

export default ImageGridAndFeatures;
