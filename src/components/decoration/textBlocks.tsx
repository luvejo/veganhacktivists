import classNames from 'classnames';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Fragment } from 'react';

type textSize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl';

interface SubSectionContent {
  header?: string;
  firstWordsNum?: number;
  headerSize?: textSize;
  contentSize?: textSize;
  textColor?: string;
  className?: string;
  spacing?: number;
}

interface SectionHeaderProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  header: string | string[];
  startWithBoldFont?: boolean;
}

// TODO: this file is a mess, I wanna speak to Kate and determine all the headers we might need,
// in the sorts of custom <H1> components
export const SectionHeader: React.FC<SectionHeaderProps> = ({
  header,
  startWithBoldFont = false,
  children,
  ...props
}) => {
  const boldClasses = 'text-5xl md:text-6xl font-mono font-semibold uppercase';
  const italicClasses = 'font-italic text-4xl';

  return (
    <div {...props}>
      <h2>
        {Array.isArray(header) ? (
          <div>
            {header.map((content, i) => {
              const italics = startWithBoldFont ? i % 2 === 1 : i % 2 === 0;
              return (
                <Fragment key={i}>
                  <span
                    className={classNames({
                      [italicClasses]: italics,
                      [boldClasses]: !italics,
                    })}
                  >
                    {content}
                  </span>
                  {i !== header.length - 1 && ' '}
                </Fragment>
              );
            })}
          </div>
        ) : (
          <span className={startWithBoldFont ? boldClasses : italicClasses}>
            {header}
          </span>
        )}
      </h2>
      {children && (
        <div className="mt-5 md:w-1/2 mx-auto text-2xl">{children}</div>
      )}
    </div>
  );
};

export const BoldHeaderText: React.FC<SubSectionContent> = ({
  children,
  className = 'text-black',
}) => {
  const classes = classNames(
    'font-mono font-bold text-5xl uppercase',
    className
  );
  return <span className={classes}>{children}</span>;
};

export const HeaderContainer: React.FC<{ className?: string }> = ({
  children,
  className = 'text-grey',
}) => {
  return (
    <div
      className={classNames(
        'content-center px-5 mx-auto my-12 md:w-1/2 text-2xl',
        className
      )}
    >
      <h1 className="mb-10">{children}</h1>
    </div>
  );
};

export const FirstSubSection: React.FC<SubSectionContent> = ({
  header = '',
  children,
  firstWordsNum = 1,
  className = 'text-grey',
}) => {
  const tokenizedHeader = header.split(' ');
  const firstWords = tokenizedHeader.splice(0, firstWordsNum).join(' ');
  const remainingWords = tokenizedHeader.join(' ');

  return (
    <HeaderContainer className={className}>
      <div className="pb-[15px]">
        <span className="font-italic text-3xl">{firstWords}</span>{' '}
        <BoldHeaderText className={className}>{remainingWords}</BoldHeaderText>
      </div>
      <div>{children}</div>
    </HeaderContainer>
  );
};

export const PlainHeader: React.FC<SubSectionContent> = ({
  header = '',
  children,
}) => {
  return (
    <HeaderContainer>
      <BoldHeaderText>{header}</BoldHeaderText>
      <p className="text-2xl">{children}</p>
    </HeaderContainer>
  );
};

export const SubSection: React.FC<SubSectionContent> = ({
  header,
  children,
  headerSize = '2xl',
  contentSize = 'xl',
  textColor = 'black',
  spacing = 10,
}) => {
  return (
    <div className={`mb-${spacing}`}>
      {header && (
        <h1 className={`text-${headerSize} text-${textColor}  mb-3 font-bold`}>
          {header}
        </h1>
      )}
      <div
        className={`max-w-2xl text-${contentSize} text-${textColor} m-auto px-10`}
      >
        {children}
      </div>
    </div>
  );
};
