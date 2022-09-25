import React from 'react';
import { CloseIcon } from '../../../../icons';
import { PostPurchaseModalStyled } from '../BenefitGroupsSection.styled';

const PostPurchaseModal: React.FC<{ onClose: () => void }> = ({ children, onClose }) => {
  return (
    <PostPurchaseModalStyled>
      <div className="body">
        <div className="content">{children}</div>
        <div className="sidebar">
          <div className="close-btn" onClick={() => onClose()}>
            <CloseIcon height={20} width={20} />
          </div>
        </div>
      </div>
    </PostPurchaseModalStyled>
  );
};

export default PostPurchaseModal;
