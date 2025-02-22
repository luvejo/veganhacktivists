import PixelChicken from '../../../public/images/VH_PixelChicken.png';
import CustomImage from '../../components/decoration/customImage';
import {
  FirstSubSection,
  SubSection,
} from '../../components/decoration/textBlocks';
import AboutLayout from '../../components/layout/about';
import type PageWithLayout from '../../types/persistentLayout';
import { NextSeo } from 'next-seo';

const OurValues: PageWithLayout = () => {
  return (
    <>
      <NextSeo title="Our Values" />
      <FirstSubSection header="Our values">
        We embrace strong core values for our organization and recruit diverse
        and talented volunteers. By making our community open and safe for
        everyone, we build an environment in which all of us can be the best
        version of ourselves when fighting for the animals.
      </FirstSubSection>
      <div className="m-10 pb-10">
        <div className="pb-5">
          <CustomImage
            src={PixelChicken.src}
            width={PixelChicken.width / 3}
            height={PixelChicken.height / 3}
            alt="Our values"
          />
        </div>

        <SubSection header="Animal Liberation">
          We value and respect the lives of all animals and denounce all forms
          of violence and exploitation against them. We believe animals have the
          right to be free, and we fight for that with our activism.
        </SubSection>

        <SubSection header="Non-violence">
          We practice a love-based organizational approach. We exercise
          kindness, compassion, and nonviolence. We encourage every member to
          fearlessly and openly communicate with their leaders and peers.
        </SubSection>
        <SubSection header="Safe Community">
          We believe in building and fostering inclusive communities regardless
          of race, gender, species, age, sexual orientation, or political
          affiliation. We strive to be diverse and embrace growth in improving
          ourselves.
        </SubSection>

        <SubSection header="Farmed Animals">
          We believe farmed animals are in most need of our support, and thus as
          an organization we encourage and focus primarily on farmed animal
          liberation within our activism, projects, and support.
        </SubSection>

        <SubSection header="Open Feedback">
          We value the viewpoints, feedback, and criticisms from every person,
          we believe everyone has something of value to contribute to the
          discussion. We always listen first, then respond constructively.
        </SubSection>

        <SubSection header="Anti-Oppression">
          We believe the discrimination and oppression of our friends, family,
          and activists affects both their right to well-being and their ability
          to fight for animal liberation – we aim to support our community.
        </SubSection>
      </div>
    </>
  );
};

OurValues.getLayout = AboutLayout;

export default OurValues;
