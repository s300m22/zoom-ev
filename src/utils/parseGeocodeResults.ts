/* eslint-disable @typescript-eslint/no-explicit-any */
const parseGeocodeResults = (addressComponents: google.maps.GeocoderAddressComponent[]) => {
  const ShouldBeComponent = {
    home: ['street_number'],
    postal_code: ['postal_code'],
    street: ['street_address', 'route'],
    region: [
      'administrative_area_level_1',
      'administrative_area_level_2',
      'administrative_area_level_3',
      'administrative_area_level_4',
      'administrative_area_level_5',
    ],
    city: [
      'locality',
      'sublocality',
      'sublocality_level_1',
      'sublocality_level_2',
      'sublocality_level_3',
      'sublocality_level_4',
    ],
    country: ['country'],
  };

  const address = {
    home: '',
    postal_code: '',
    street: '',
    region: '',
    city: '',
    country: '',
  };

  type Keys = keyof typeof ShouldBeComponent;

  addressComponents.forEach((component) => {
    Object.entries(ShouldBeComponent).forEach((key) => {
      key[1].forEach((entry: any) => {
        if (entry.indexOf(component.types[0]) !== -1) {
          address[key[0] as Keys] = component.long_name;
        }
      });
    });
  });
  return address;
};

export default parseGeocodeResults;
