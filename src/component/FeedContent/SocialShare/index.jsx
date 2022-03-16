import React from 'react';
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  TwitterIcon,
  FacebookIcon,
  EmailIcon
} from "react-share";

export default function SocialShare({ shareLink }) {
  return (
    <div className='flex align-items space-around'>
      <FacebookShareButton
        url={shareLink}
      >
        <FacebookIcon size={36} />
      </FacebookShareButton>

      <TwitterShareButton
        url={shareLink}
      >
        <TwitterIcon size={36} />
      </TwitterShareButton>
      <EmailShareButton
        url={shareLink}
      >
        <EmailIcon size={36} />
      </EmailShareButton>
    </div>
  )
}
