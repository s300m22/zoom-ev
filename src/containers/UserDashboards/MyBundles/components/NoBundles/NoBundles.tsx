import { Button, Heading, List, SimpleCard } from '../../../../../elements';
import { MessagesIcon } from '../../../../../icons';
import { ListWrapper, HeadingWrapper, NoBundlesWrapper } from './NoBundles.styled';

const NoBundles = () => (
  <NoBundlesWrapper>
    <MessagesIcon />
    <HeadingWrapper>
      <Heading variant="h3">You have no bundles</Heading>
    </HeadingWrapper>
    <SimpleCard>
      <ListWrapper>
        <List
          listColumns={1}
          listItems={[
            'Save up to £650 in your first year',
            'Great discounts on charging, parking and home energy from leading brands',
          ]}
          listTitle="Zoom bundle"
        />
      </ListWrapper>
      <Button customStyles={{ maxWidth: '171px', alignSelf: 'center' }} href="/checkout" withArrow>
        Buy bundle
      </Button>
    </SimpleCard>
  </NoBundlesWrapper>
);

export default NoBundles;
