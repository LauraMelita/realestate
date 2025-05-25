import SEARCH_CONFIG from '#config/search';
import ORALIS_CONFIG from '#scrapers/oralis/constants';
import { encodeObjectAsUrlParam } from '#utils/helpers';

const postalCodes = SEARCH_CONFIG.locations.map(({ postalCode }) => postalCode.toString());

const params = {
  SliderList: false,
  SliderMultiAgencies: false,
  IsProject: false,
  PageMaximum: 0,
  FirstPage: true,
  CanGetNextPage: false,
  CMSListType: ORALIS_CONFIG.listingTypes[SEARCH_CONFIG.purpose],
  SortParameter: 5,
  MaxItemsPerPage: 1000,
  PageNumber: 0,
  EstateSearchParams: [
    { FieldName: 'StatusIDList', FieldValue: [1] }, // Only active listings
    { FieldName: 'ShowDetails', FieldValue: true },
    { FieldName: 'ShowRepresentatives', FieldValue: true },
    { FieldName: 'CanHaveChildren', FieldValue: false },
    {
      FieldName: 'CategoryIDList',
      FieldValue: [ORALIS_CONFIG.propertyTypes[SEARCH_CONFIG.category]],
    },
    { FieldName: 'ZipList', FieldValue: postalCodes },
    { FieldName: 'PriceRange', FieldValue: [0, SEARCH_CONFIG.maxPrice] },
  ],
  CustomQuery: null,
  jsonEstateParams: null,
  BaseEstateID: 0,
};

export const endpoint = `${ORALIS_CONFIG.baseUrl}/fr/List/InfiniteScroll?json=${encodeObjectAsUrlParam(params)}`;
