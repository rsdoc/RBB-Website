import React from 'react';

import { graphql } from 'gatsby';
import { Flex } from '@chakra-ui/core';
import { PageHero, Layout, BusinessFeed } from '../components';
import CardSkeleton from '../components/Loading/CardSkeleton';

export default function Businesses(data) {
  // AirTable passes us and extra data...
  const businessFeedData = data.data.allAirtableBusinesses.nodes;

  const pageSubtitle = (
    <p>
      These business owners have been impacted during the protests. Your support
      will assist their rebuilding efforts. If you are a business owner in need,
      please <a href="#temp">sign up to be added to our list</a>
    </p>
  );

  const heroBackgroundImageUrl =
    '//res.cloudinary.com/rebuild-black-business/image/upload/c_scale,f_auto,h_0.6,q_auto/v1/assets/business-header';

  return (
    <Layout>
      <Flex align="center" justify="center" direction="column">
        <PageHero
          title="Businesses"
          subtitle={pageSubtitle}
          heroImageUrl={heroBackgroundImageUrl}
          hasFadedHeroImage
        />
        <CardSkeleton data={businessFeedData}>
          <BusinessFeed {...data} />
        </CardSkeleton>
      </Flex>
    </Layout>
  );
}

export const query = graphql`
  query($itemsPerPage: Int!, $skip: Int!) {
    allAirtableBusinesses(limit: $itemsPerPage, skip: $skip) {
      nodes {
        data {
          Email
          Name
          Business_Name
          Category
          Zip_Code
          Business_Description
          Website
          Donation_Link
          In_Need
          CreatedAt
        }
      }
    }
  }
`;
