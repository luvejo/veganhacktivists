import Image from 'next/image';
import impactReviewImage from '../../../../public/images/grants/impact-header.png';
import beeImage from '../../../../public/images/grants/bee-header.png';
import { DarkButton } from '../../decoration/buttons';
import React from 'react';

const Info: React.FC<{
  title: string;
  image: StaticImageData;
  backgroundColor?: string;
  button: {
    content: React.ReactNode;
    href: string;
  };
}> = ({ children, title, image, backgroundColor = 'white', button }) => {
  return (
    <div className="flex flex-row gap-14 mb-20">
      <div className={`bg-${backgroundColor}`}>
        <div className="overflow-hidden w-full h-56">
          <Image
            src={image}
            width={image.width / 2}
            height={image.height / 2}
            className="w-full bg-cover"
            alt=""
          />
        </div>
        <div className="items-center">
          <div className="text-left break-words max-w-sm pb-8 h-full px-10">
            <div className="mb-12 text-grey-dark pt-16 text-4xl font-mono font-semibold uppercase px-2">
              {title}
            </div>
            <div className="mb-12 text-2xl">{children}</div>
          </div>
          <div className="flex flex-row justify-between px-10 mb-12">
            <DarkButton className="w-max" href={button.href}>
              {button.content}
            </DarkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const GrantsCallToAction: React.FC = () => {
  return (
    <div className="bg-gray-background pt-14">
      <div className="drop-shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-0 w-1/2 mx-auto">
        <Info
          image={beeImage}
          backgroundColor="white"
          title="Apply for a 1000$ seed grant"
          button={{ content: 'Apply now!', href: '/grants' }}
        >
          We&apos;re excited to offer up to $1000 USD in seed grants!
        </Info>
        <Info
          image={impactReviewImage}
          title="Our 2020 impact review"
          backgroundColor="grey-over-background"
          button={{ content: 'See our impact!', href: '' }}
        >
          Check out what we&apos;ve accomplished last year!
        </Info>
      </div>
    </div>
  );
};

export default GrantsCallToAction;