import mixpanel from 'mixpanel-browser';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Container, RichTextRenderer } from '../../../elements';
import DropdownIcon from '../../../icons/DropdownIcon';
import { BundleSubscriptionType } from '../../../interfaces/api.types.generated';
import {
  IBenefit,
  IBenefitGroup,
  IBenefitGroupsSectionFields,
  IBenefitGroupTips,
  IBlogPost,
} from '../../../interfaces/contentful.types.generated';
import BenefitFullView from '../../BenefitFullView';
import ChargerComparisonTable from '../../ChargerComparisonTable';

import {
  Group,
  GroupContainer,
  GreenLine,
  CardHolder,
  ExtrasLink,
  PrePurchaseTitle,
} from './BenefitGroupsSection.styled';
import BenefitCard from './Cards/Benefit';
import BlogCard from './Cards/Blog';
import TipCard from './Cards/Tips';
import Menu from './Components/Menu';
import PostPurchaseModal from './Components/PostPurchaseModal';

interface BGS extends IBenefitGroupsSectionFields {
  postPurchase?: boolean;
  bundleSubscription?: BundleSubscriptionType;
}
const BenefitGroupsSection: React.FC<BGS> = ({
  groups,
  postPurchase = false,
  bundleSubscription,
  type,
  partnerLogo,
  stickyCtaLink,
  partnerTitle,
  partnerPriceText,
  displayTitle,
}) => {
  const [activeFilter, setActiveFilter] = useState<number | undefined>(undefined);
  const [groupSelected, setGroupSelected] = useState<IBenefitGroup | undefined>(undefined);

  const [benefitShown, setBenefitShown] = useState<IBenefit | undefined>(undefined);
  const [additionalInfoShown, setAdditionalInfoShown] = useState(false);

  const [lastScrollPos, setLastScrollPos] = useState(0);

  const router = useRouter();
  const { benefitId } = router.query;

  useEffect(() => {
    if (benefitShown) {
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden';
      document.documentElement.scrollTop = 0;
    } else if (postPurchase && additionalInfoShown) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.height = 'auto';
      document.body.style.overflow = '';
      document.documentElement.scrollTop = lastScrollPos;
    }

    return () => {
      document.body.style.height = 'auto';
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [benefitShown, additionalInfoShown, postPurchase, router.asPath]);

  useEffect(() => {
    if (benefitId) {
      groups.forEach((group) => {
        group.fields?.benefits?.map((benefit) => {
          if (benefit.sys.id === benefitId) {
            setGroupSelected(group);
            setBenefitShown(benefit as IBenefit);
            mixpanel.track('benefit.view', {
              group: {
                id: group.sys.id,
                title: group.fields.title,
              },
              benefit: {
                id: benefit.sys.id,
                name: benefit.fields.title,
              },
            });
          }
        });
      });
    } else {
      setGroupSelected(undefined);
      setBenefitShown(undefined);
    }
  }, [benefitId, groups]);

  useEffect(() => {
    mixpanel.track('benefits_group.filter', {
      show: activeFilter === undefined ? 'all' : groups[activeFilter].fields.title,
    });
  }, [activeFilter, groups]);

  const SingleGroupBox = ({ group }: { group: IBenefitGroup }) => {
    const singBRef = useRef(null);

    const [showShaddow, setShowShadow] = useState(false);
    const getInitialShadow = () => {
      const elem = singBRef.current;
      // @ts-expect-error doesn't register as a div
      const atRight = elem.scrollWidth - elem.scrollLeft === elem.clientWidth;
      setShowShadow(!atRight);
    };

    useEffect(() => {
      getInitialShadow();
    }, []);

    return (
      <Group id={`group-to-watch-scroll-${group.sys.id}`} postPurchase={postPurchase}>
        <div className="title-container">
          <div>
            <h2>{group.fields.title}</h2>
            {!postPurchase && (
              <>
                <GreenLine />
                <RichTextRenderer>{group.fields.overview}</RichTextRenderer>
                <br />
                <br />
              </>
            )}
          </div>
          {postPurchase && group.fields.additionalInfoComponent && (
            <Button
              onClick={() => {
                setLastScrollPos(document.documentElement.scrollTop || document.body.scrollTop);
                setAdditionalInfoShown(true);
              }}
              variant="text_blue"
              withArrow
            >
              {group.fields.additionalInfoComponent.fields.title}
            </Button>
          )}
        </div>
        <div className="relative">
          <CardHolder
            onLoadedData={(e) => {
              const elem = e.target;
              // @ts-expect-error doesn't register as a div
              const atRight = elem.scrollWidth - elem.scrollLeft === elem.clientWidth;
              setShowShadow(!atRight);
            }}
            onScroll={(e) => {
              const elem = e.target;
              // @ts-expect-error doesn't register as a div
              const atRight = elem.scrollWidth - elem.scrollLeft === elem.clientWidth;
              setShowShadow(!atRight);
            }}
            ref={singBRef}
            showShadow={showShaddow}
          >
            {group.fields.benefits &&
              group.fields.benefits?.map((benefit) => {
                switch (benefit.sys.contentType.sys.id) {
                  case 'benefit':
                    return (
                      <BenefitCard
                        {...(benefit as IBenefit)}
                        key={benefit.sys.id}
                        onClick={() => {
                          setLastScrollPos(
                            document.documentElement.scrollTop || document.body.scrollTop,
                          );

                          router.push(
                            `${router.asPath.split('?')[0]}?benefitId=${benefit.sys.id}`,
                            undefined,
                            {
                              shallow: true,
                              scroll: true,
                            },
                          );
                        }}
                      />
                    );
                  case 'benefitGroupTips':
                    return <TipCard key={benefit.sys.id} {...(benefit as IBenefitGroupTips)} />;

                  case 'blogPost':
                    return <BlogCard key={benefit.sys.id} {...(benefit as IBlogPost)} />;

                  default:
                    return <div key={benefit.sys.id}>Unsupported Type</div>;
                }
              })}
          </CardHolder>
          {showShaddow && (
            <div
              className={`absolute  right-0 top-0 h-full w-20 bg-gradient-to-l ${
                postPurchase ? 'from-[#f0f4f7]' : 'from-[#fafafa]'
              } to-transparent`}
            ></div>
          )}
        </div>

        {!postPurchase && group.fields.additionalInfoComponent && (
          <>
            <ExtrasLink
              onClick={() => {
                setLastScrollPos(document.documentElement.scrollTop || document.body.scrollTop);
                setAdditionalInfoShown(!additionalInfoShown);
                mixpanel.track('button_click', {
                  title: group.fields?.additionalInfoComponent?.fields.title,
                  action: !additionalInfoShown ? 'show' : 'hide',
                });
              }}
            >
              <p>{group.fields.additionalInfoComponent.fields.title}</p>

              <DropdownIcon
                style={{
                  marginLeft: '5px',
                  transition: 'transform 1s',
                  transform: `rotate(${additionalInfoShown ? '180deg' : '0deg'})`,
                }}
              />
            </ExtrasLink>
            {additionalInfoShown && (
              <ChargerComparisonTable
                {...group.fields.additionalInfoComponent}
                onBenefitSelect={(benefit) => {
                  setLastScrollPos(document.documentElement.scrollTop || document.body.scrollTop);
                  router.push(
                    `${router.asPath.split('?')[0]}?benefitId=${benefit.sys.id}`,
                    undefined,
                    {
                      shallow: true,
                      scroll: true,
                    },
                  );
                }}
              />
            )}
          </>
        )}

        {postPurchase && group.fields.additionalInfoComponent && additionalInfoShown && (
          <PostPurchaseModal
            onClose={() => {
              setAdditionalInfoShown(false);
            }}
          >
            <h3>{group.fields.additionalInfoComponent.fields.title}</h3>
            <ChargerComparisonTable
              {...group.fields.additionalInfoComponent}
              onBenefitSelect={(benefit) => {
                setAdditionalInfoShown(false);
                setLastScrollPos(document.documentElement.scrollTop || document.body.scrollTop);
                router.push(
                  `${router.asPath.split('?')[0]}?benefitId=${benefit.sys.id}`,
                  undefined,
                  {
                    shallow: true,
                    scroll: true,
                  },
                );
              }}
            />
          </PostPurchaseModal>
        )}
      </Group>
    );
  };

  return (
    <Container style={{ flexDirection: 'column', maxWidth: postPurchase ? 'none' : '' }}>
      {!postPurchase && displayTitle && (
        <PrePurchaseTitle>
          <h2>{displayTitle}</h2>
        </PrePurchaseTitle>
      )}
      <Menu
        activeFilter={activeFilter}
        groups={groups}
        postPurchase={postPurchase}
        setActiveFilter={(v) => {
          setActiveFilter(v);
        }}
      />
      <GroupContainer>
        {groups
          .filter((group, groupIndex) => activeFilter === undefined || activeFilter === groupIndex)
          .map((group, groupIndex) => (
            <SingleGroupBox group={group} key={groupIndex} />
          ))}
      </GroupContainer>

      {benefitShown && groupSelected && (
        <BenefitFullView
          benefit={benefitShown}
          bundleSubscription={bundleSubscription}
          group={groupSelected}
          groupSectionData={{ partnerLogo, stickyCtaLink, type, partnerTitle, partnerPriceText }}
          onClose={() => {
            router.push(`${router.asPath.split('?')[0]}`, undefined, {
              shallow: true,
              scroll: true,
            });
          }}
          onOpenWorksWithBenefit={async (benefit) => {
            setBenefitShown(undefined);
            await new Promise((resolve) => setTimeout(resolve, 100));
            setBenefitShown(benefit);
          }}
          postPurchase={postPurchase}
        />
      )}
    </Container>
  );
};

export default BenefitGroupsSection;
